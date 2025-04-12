import { lazy } from "react";

const modules = {
  side: lazy(()=>(import('./side/index.jsx'))),
  top: lazy(()=>(import('./top/index.jsx'))),
  popup: lazy(()=>(import('./popup/index.jsx'))),
}
export default modules;