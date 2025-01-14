// app/api/contributions/route.ts
import { NextResponse } from 'next/server';
import { load } from 'cheerio';
import { COLOR_MAP, Contribution, Year, YearData } from '../types';

async function fetchYears(username: string): Promise<Year[]> {
  const data = await fetch(`https://github.com/${username}?tab=contributions`, {
    headers: {
      "x-requested-with": "XMLHttpRequest"
    }
  });
  const body = await data.text();
  const $ = load(body);

  return $(".js-year-link.filter-item")
    .get()
    .map((a) => {
      const $a = $(a);
      const href = $a.attr("href") || '';
      const githubUrl = new URL(`https://github.com${href}`);
      githubUrl.searchParams.set("tab", "contributions");
      const formattedHref = `${githubUrl.pathname}${githubUrl.search}`;

      return {
        href: formattedHref,
        text: $a.text().trim()
      };
    });
}

async function fetchDataForYear(url: string, year: string): Promise<YearData> {
  const data = await fetch(`https://github.com${url}`, {
    headers: {
      "x-requested-with": "XMLHttpRequest"
    }
  });

  const $ = load(await data.text());
  const $days = $("table.ContributionCalendar-grid td.ContributionCalendar-day");

  // Parse contribution count from the text
  const contribText = $(".js-yearly-contributions h2")
    .text()
    .trim()
    .match(/^([0-9,]+)\s/);

  // Initialize as string first, then convert to number
  let contribCount: number = 0;
  if (contribText && contribText[1]) {
    const countStr = contribText[1];
    contribCount = parseInt(countStr.replace(/,/g, ""), 10);
  }

  const contributions = $days.get().map((day) => {
    const $day = $(day);
    const level = $day.attr("data-level") || "0";
    const count = parseInt($day.attr("data-count") || "0", 10); // Ensure count is parsed as a number

    return {
      date: $day.attr("data-date") || '',
      count: count,
      color: COLOR_MAP[level] || COLOR_MAP[0],
      intensity: level
    };
  });

  return {
    year,
    total: contribCount,
    range: {
      start: $($days.get(0)).attr("data-date") || '',
      end: $($days.get($days.length - 1)).attr("data-date") || ''
    },
    contributions
  };
}

export async function GET(request: Request) {
  try {
    const username = 'taimurey'; // You can make this dynamic using URL params if needed
    const years = await fetchYears(username);

    if (years.length === 0) {
      return NextResponse.json({ error: 'No contribution data found' }, { status: 404 });
    }

    // Fetch data for all years
    const allContributions: Contribution[] = [];
    for (const year of years) {
      const yearData = await fetchDataForYear(year.href, year.text);
      allContributions.push(...yearData.contributions);
    }

    // Filter contributions for the past 365 days
    const today = new Date();
    const past365Days = new Date(today);
    past365Days.setDate(today.getDate() - 365);

    const filteredContributions = allContributions.filter((contribution) => {
      const contributionDate = new Date(contribution.date);
      return contributionDate >= past365Days && contributionDate <= today;
    });

    return NextResponse.json(filteredContributions);
  } catch (error) {
    console.error('Error fetching contributions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch contributions' },
      { status: 500 }
    );
  }
}