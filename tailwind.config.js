module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Raleway", "sans-serif"],
      },
      fontSize: {
        smx: ["6px", { lineHeight: "8px" }],
        xsm: ["10px", { lineHeight: "12px" }],
        ins: ["11px", { lineHeight: "12px" }],
        xxs: ["12px", { lineHeight: "14px" }],
        xs: ["13px", { lineHeight: "15px" }],
        xss: ["13px", { lineHeight: "19px" }],
        sm: ["14px", { lineHeight: "16px" }],
        smm: ["14px", { lineHeight: "19px" }],
        base: ["16px", { lineHeight: "19px" }],
        m: ["16px", { lineHeight: "21.6px" }],
        lg: ["18px", { lineHeight: "21px" }],
        xl: ["20px", { lineHeight: "23px" }],
        xxl: ["24px", { lineHeight: "26px" }],
        "2xl": ["28px", { lineHeight: "33px" }],
        "3xl": ["60px", { lineHeight: "70px" }],
        "4xl": ["44px", { lineHeight: "48px" }],
        "5xl": ["28px", { lineHeight: "38px" }],
      },
      gap: {
        "6px": "6px",
        "11px": "11px",
        43: "43px",
      },
      spacing: {
        "2px": "2px",
        "3px": "3px",
        "4_75px": "4.75px",
        "6px": "6px",
        "9px": "9px",
        "10px": "10px",
        "11px": "11px",
        "13px": "13px",
        "14px": "14px",
        "15px": "15px",
        "19px": "19px",
        "22px": "22px",
        "23px": "23px",
        "29_25px": "29.25px",
        "45px": "45px",
        "74px": "74px",
        "148px": "148px",
      },
    },
  },
  plugins: [],
};
