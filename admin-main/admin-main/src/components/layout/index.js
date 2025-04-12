import {lazy} from 'react'
const comps = {
  row: lazy(()=>import('./row/index.jsx')),
  widget: lazy(()=>import('./widget/index.jsx')),
  comps: lazy(()=>import('./comps/index.jsx')),
  col: lazy(()=>import('./col/index.jsx')),
  style: lazy(()=>import('./style/index.jsx')),
  tabs: lazy(()=>import('./tabs/index.jsx')),
  main: lazy(()=>import('./main/index.jsx')),
  table: lazy(()=>import('./table/index.jsx')),
  tree: lazy(()=>import('./tree/index.jsx')),
}
export default comps;

