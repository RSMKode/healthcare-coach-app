export type LightDarkThemeT = "light" | "dark";

export const LIGHT_DARK_THEMES: {
  [key: string]: LightDarkThemeT;
} = {
  light: "light",
  dark: "dark",
};

export const SHIMMER_CLASS =
  "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-linear-to-r before:from-transparent before:via-white/60 before:to-transparent";

  export const APP_MAX_WIDTH = "max-w-3xl";
