
export const COLOR_MAP: Record<string, string> = {
    "0": "#161b22",
    "1": "#0e4429",
    "2": "#006d32",
    "3": "#26a641",
    "4": "#39d353"
};

export interface Year {
    href: string;
    text: string;
}

export interface Contribution {
    date: string;
    count: number;
    color: string;
    intensity: string;
}

export interface YearData {
    year: string;
    total: number;
    range: {
        start: string;
        end: string;
    };
    contributions: Contribution[];
}
