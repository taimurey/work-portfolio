"use client";

import { Activity, ActivityCalendar } from "react-activity-calendar";
import { memo, useCallback, useEffect, useState } from "react";

import { useTheme } from "next-themes";
import { COLOR_MAP } from "@/app/api/types";

/**
 * Props for the GitHub contribution graph component
 */
type GithubGraphProps = {
  /** GitHub username to fetch contributions for */
  username: string;
  /** Margin between contribution blocks in pixels */
  blockMargin?: number;
  /** Custom color palette for light theme */
  lightColorPalette?: string[];
  /** Custom color palette for dark theme */
  darkColorPalette?: string[];
};

const DEFAULT_LIGHT_PALETTE = [
  COLOR_MAP["0"],
  COLOR_MAP["1"],
  COLOR_MAP["2"],
  COLOR_MAP["3"],
  COLOR_MAP["4"],
];

const DEFAULT_DARK_PALETTE = [
  COLOR_MAP["0"],
  COLOR_MAP["1"],
  COLOR_MAP["2"],
  COLOR_MAP["3"],
  COLOR_MAP["4"],
];

/**
 * GitHub contribution graph component that displays user's contribution activity
 */
export const GithubGraph = memo(({
  blockMargin,
  lightColorPalette = DEFAULT_LIGHT_PALETTE,
  darkColorPalette = DEFAULT_DARK_PALETTE,
}: Omit<GithubGraphProps, 'username'>) => {
  const [contribution, setContribution] = useState<Activity[]>([]);
  const [loading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const contributions = await fetchContributionData();
      setContribution(contributions);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch contribution data");
      setContribution([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const label = {
    totalCount: `{{count}} contributions in the last year`,
  };

  if (error) {
    return (
      <div className="text-zinc-500 p-4 text-center text-xs">
        Unable to load contributions
      </div>
    );
  }

  // Create placeholder data for loading state
  const placeholderData: Activity[] = loading ?
    Array.from({ length: 365 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - 365 + i);
      return {
        date: date.toISOString().split('T')[0],
        count: 0,
        level: 0
      };
    }) : [];

  return (
    <div className="relative">
      <div className={loading ? "animate-pulse" : ""}>
        <ActivityCalendar
          data={loading ? placeholderData : contribution}
          maxLevel={4}
          blockMargin={blockMargin ?? 2}
          loading={false}
          labels={label}
          theme={{
            light: lightColorPalette,
            dark: darkColorPalette,
          }}
          colorScheme={theme === "dark" ? "dark" : "light"}
        />
      </div>
    </div>
  );
});

GithubGraph.displayName = "GithubGraph";

/**
 * Fetches GitHub contribution data for a given username
 */
async function fetchContributionData(): Promise<Activity[]> {
  try {
    const response = await fetch('/api/contributions');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("Invalid data format received");
    }

    if (data.length === 0) {
      // Return empty array with proper structure for the past 365 days
      const result: Activity[] = [];
      const today = new Date();
      for (let i = 364; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        result.push({
          date: date.toISOString().split('T')[0],
          count: 0,
          level: 0
        });
      }
      return result;
    }

    // Transform the data to match Activity format
    // Use intensity to generate count since GitHub's count might be 0
    return data.map(item => {
      const level = parseInt(item.intensity || '0', 10);
      // Map intensity to approximate counts: 0=0, 1=1-3, 2=4-6, 3=7-10, 4=11+
      const countMap = [0, 2, 5, 8, 12];
      return {
        date: item.date,
        count: countMap[level] || 0,
        level: level
      };
    });
  } catch (error) {
    console.error("Error fetching GitHub contributions:", error instanceof Error ? error.message : "Unknown error");
    // Return empty data for the past 365 days on error
    const result: Activity[] = [];
    const today = new Date();
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      result.push({
        date: date.toISOString().split('T')[0],
        count: 0,
        level: 0
      });
    }
    return result;
  }
}

