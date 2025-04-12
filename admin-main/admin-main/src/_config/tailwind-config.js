const module = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bcs": "#000000",
      }
    }
  },
  safelist: [
    // {
    //   pattern: /w-*/,
	  //   variants: ['md', 'lg', 'xl']
    // }
    // {
      // pattern: /.*/,
      // variants: [
      //   "first",
      //   "last",
      //   "odd",
      //   "even",
      //   "visited",
      //   "checked",
      //   "empty",
      //   "read-only",
      //   "group-hover",
      //   "group-focus",
      //   "focus-within",
      //   "hover",
      //   "focus",
      //   "focus-visible",
      //   "active",
      //   "disabled",
      // ],
    // },
  ],
  plugins: [],
}

export default module