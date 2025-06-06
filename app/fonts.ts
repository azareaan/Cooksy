import localFont from "next/font/local";

export const boldtextFont = localFont({
  src: [
    { path: "../public/fonts/baloo-2/baloo-2-v21-latin-regular.woff2", weight: "400" },
    { path: "../public/fonts/baloo-2/baloo-2-v21-latin-500.woff2", weight: "500" },
    { path: "../public/fonts/baloo-2/baloo-2-v21-latin-600.woff2", weight: "600" },
    { path: "../public/fonts/baloo-2/baloo-2-v21-latin-700.woff2", weight: "700" },
    { path: "../public/fonts/baloo-2/baloo-2-v21-latin-800.woff2", weight: "800" },
  ],
  variable: "--boldtext-font",
});

export const primaryFont = localFont({
  src: [
    { path: "../public/fonts/inter/inter-v18-latin-100.woff2", weight: "100" },
    { path: "../public/fonts/inter/inter-v18-latin-200.woff2", weight: "200" },
    { path: "../public/fonts/inter/inter-v18-latin-300.woff2", weight: "300" },
    { path: "../public/fonts/inter/inter-v18-latin-regular.woff2", weight: "400" },
    { path: "../public/fonts/inter/inter-v18-latin-500.woff2", weight: "500" },
    { path: "../public/fonts/inter/inter-v18-latin-600.woff2", weight: "600" },
    { path: "../public/fonts/inter/inter-v18-latin-700.woff2", weight: "700" },
    { path: "../public/fonts/inter/inter-v18-latin-800.woff2", weight: "800" },
    { path: "../public/fonts/inter/inter-v18-latin-900.woff2", weight: "900" },
  ],
  variable: "--primary-font",
});