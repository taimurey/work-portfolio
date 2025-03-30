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

/**
 * API response type for GitHub contributions
 */
type GithubApiResponse = {
  data: Activity[];
  error?: string;
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
  username,
  blockMargin,
  lightColorPalette = DEFAULT_LIGHT_PALETTE,
  darkColorPalette = DEFAULT_DARK_PALETTE,
}: GithubGraphProps) => {
  const [contribution, setContribution] = useState<Activity[]>([]);
  const [loading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  const fetchData = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);
      const contributions = await fetchContributionData(username);
      setContribution(contributions);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to fetch contribution data");
      setContribution([]);
    } finally {
      setIsLoading(false);
    }
  }, [username]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const label = {
    totalCount: `{{count}} contributions in the last year`,
  };

  if (error) {
    return (
      <div className="text-red-500 p-4 text-center">
        Error: {error}
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
async function fetchContributionData(username: string): Promise<Activity[]> {
  try {
    const response = await fetch(`https://github.vineet.pro/api/${username}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    let responseBody: GithubApiResponse;
    try {
      responseBody = await response.json();
    } catch (parseError) {
      throw new Error("Failed to parse response data", { cause: parseError as Error });
    }

    if (!responseBody.data) {
      throw new Error("No contribution data received");
    }

    return responseBody.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error fetching GitHub contributions:", error.message);
      return [];
    }
    console.error("An unexpected error occurred while fetching GitHub contributions");
    return [];
  }
}

