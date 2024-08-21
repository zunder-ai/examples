import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  theme: {
    extend: {
      aspectRatio: {
        auto: "auto",
        square: "1 / 1",
      },
      colors: {
        "cod-gray": {
          "400": "#aaa",
          "300": "#454545",
          "200": "#1d1d1d",
          "100": "#101010",
          "50": "#0b0b0b",
        },
      },
      fontFamily: {
        main: ["Inter", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
} satisfies Config;
