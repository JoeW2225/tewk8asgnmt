/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        edu: ['var(--font-edu)', 'sans-serif'],
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};

//! USING CUSTOM FONTS WITH TAILWIND:
//? lines 10 - 12: putting the custom font in so we can use it with Tailwind. See examples below:
// <p className="font-edu">This text uses the EduAUVICWANTHand font</p>
//? As this is a variable font, we can use different weights:
// <p className="font-edu font-thin">This is thin text (weight 100)</p>
// <p className="font-edu font-normal">This is normal text (weight 400)</p>
// <p className="font-edu font-bold">This is bold text (weight 700)</p>
// <p className="font-edu" style={{ fontWeight: 550 }}>This is custom weight text</p>