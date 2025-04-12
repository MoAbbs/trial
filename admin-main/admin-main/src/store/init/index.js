// import * as RiLib from "react-icons/lib";
// const { IconsManifest } = require("react-icons/lib/cjs");
// export const ALL_ICONS = RiLib["IconsManifest"];
// const fs = require('fs')

// const dir = 'node_modules/@react-icons/all_files/ai'
// const files = fs.readdirSync(dir)

// for (const file of files) {
//   console.log(file)
// }
// console.log(ALL_ICONS, RiLib, IconsManifest)
export default ()=>({
  main: {lang: (process.env.LANG || window.navigator?.userLanguage || window.navigator?.language || 'en').split('-')[0]},
  // icons: {data: ALL_ICONS}
})
