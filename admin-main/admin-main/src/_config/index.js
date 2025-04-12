import TailwindConfig from './tailwind-config'
export const API_URL = '/api/'
export const SERVER_URL = localStorage.getItem('server') || process.env.REACT_APP_API_URI
export const version = '4';
export const mode = 'dev';
export const framework = 'react-web';
export const DEFAULT_LOCATION = 'Egypt';
window.process = process || {}
export const io_server = process.env.REACT_APP_API_SOCKET
export const SocketConfig = {
  // 'reconnection': true,
  "path": "/socket",
  "transports": ["polling","websocket"]
}
export const APP = process.env.REACT_APP_APP
export const id_key = 'id'
// window.tailwind.config = TailwindConfig
