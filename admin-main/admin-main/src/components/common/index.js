import {lazy} from 'react';
const comps = {
  avatar: lazy(()=>import('./avatar/index.jsx')),
  text: lazy(()=>import('./text/index.jsx')),
  label: lazy(()=>import('./label/index.jsx')),
  list: lazy(()=>import('./list/index.jsx')),
  file: lazy(()=>import('./file/index.jsx')),
  collapse: lazy(()=>import('./collapse/index.jsx')),
  normal_list: lazy(()=>import('./normal_list/index.jsx')),
  button: lazy(()=>import('./button/index.jsx')),
  image: lazy(()=>import('./image/index.jsx')),
  fun: lazy(()=>import('./fun/index.jsx')),
  popover: lazy(()=>import('./popover/index.jsx')),
  icon: lazy(()=>import('./icon/index.jsx')),
  allIcons: lazy(()=>import('./icon/allicons.jsx')),
  input: lazy(()=>import('./inputs/index.jsx')),
  fragment: lazy(()=>import('./fragment/index.jsx')),
  menu: lazy(()=>import('./menu/menu.jsx')),
  sub_menu: lazy(()=>import('./menu/sub.jsx')),
  menu_item: lazy(()=>import('./menu/item.jsx')),
  condition: lazy(()=>import('./condition/index.jsx')),
  data_view: lazy(()=>import('./data_view/index.jsx')),
}
export default comps