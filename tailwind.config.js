module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Raleway", "sans-serif"],
      },
      fontSize: {
        xsm: ["10px", { lineHeight: "12px" }],
        ins: ["11px", { lineHeight: "12px" }],
        xxs: ["12px", { lineHeight: "14px" }],
        xs: ["13px", { lineHeight: "15px" }],
        sm: ["14px", { lineHeight: "16px" }],
        base: ["16px", { lineHeight: "19px" }],
        m: ["16px", { lineHeight: "21.6px" }],
        lg: ["18px", { lineHeight: "21px" }],
        xl: ["20px", { lineHeight: "23px" }],
        xxl: ["24px", { lineHeight: "26px" }],
        "2xl": ["28px", { lineHeight: "33px" }],
        "3xl": ["60px", { lineHeight: "70px" }],
        "4xl": ["44px", { lineHeight: "48px" }],
      },
      gap: {
        43: "43px",
      },
      spacing: {
        "3px": "3px",
        "6px": "6px",
        "10px": "10px",
        "10.5px": "10.5px",
        "13px": "13px",
        "15px": "15px",
        "19px": "19px",
        "45px": "45px",
        "74px": "74px",
        "148px": "148px",
      },
    },
  },
  plugins: [],
};
