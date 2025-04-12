import {lazy} from 'react';
export const master = lazy(()=>import('./master/index.jsx'))
export const section = lazy(()=>import('./section/index.jsx'))
export const object = lazy(()=>import('./object/index.jsx'))
export const icons = lazy(()=>import('./icons/index.jsx'))
