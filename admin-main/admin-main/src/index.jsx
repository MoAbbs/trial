import React from 'react';
import TailwindConfig from './_config/tailwind-config'
// import ReactDOM from 'react-dom';
// import "bootstrap/dist/css/bootstrap.min.css";
// import "popper.js/dist/umd/popper.js";
// import "bootstrap/dist/js/bootstrap.min.js";
// import 'bootstrap/js/dist/util';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js'
// import 'bootstrap/js/dist/dropdown';
// import 'bootstrap/js/dist/modal';
// import "jquery";
// import "@fortawesome/fontawesome-free/css/all.min.css";
// import 'antd/dist/antd.less';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux'
import {store,persistor} from './store'
import { PersistGate } from 'redux-persist/integration/react'
// import {BrowserRouter as Router} from "react-router-dom";
import interceptor from './interceptor'
import {I18nextProvider} from 'react-i18next';
import i18n from 'translate/config'
import Helpers from './help_component';
import { MuiThemeProvider, createTheme, StylesProvider } from '@material-ui/core/styles';
import { render } from "react-dom";
import main from './main'
import { ConfigProvider } from 'antd';
import CssBaseLine from "@material-ui/core/CssBaseline";

if(window){
  window.url = process.env.REACT_APP_API_URI
  window.tailwind.config = TailwindConfig
}

const theme = createTheme({
  palette: {
    primary: {
      main: '#fd7101',
      light:'#fff',
      contrastText:'#fff',
      dark: 'red',
    },static:{
      main: '#fd7101',
      light:'#fff',
      contrastText:'#fff',
      dark: 'red',
    }
  }
});

interceptor(store)
main(store)
const Apps = (props)=>(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <ConfigProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <>
            <StylesProvider injectFirst>
              <MuiThemeProvider theme={theme}>
                <CssBaseLine></CssBaseLine>
                <App />
              </MuiThemeProvider>
              </StylesProvider>
              <Helpers />
            </>
          </PersistGate>
        </Provider>
      </ConfigProvider>
    </I18nextProvider>
  </React.StrictMode>
);

const rootElement = document.getElementById("root");
// if (rootElement.hasChildNodes()) {
//   hydrate(<Apps />,   rootElement);
// } else {
render(<Apps />,   rootElement);
// }
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
