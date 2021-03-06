import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Homepage from "./Homepage";
import reportWebVitals from './reportWebVitals';
import { SnackbarProvider } from "notistack";
import Slide from "@mui/material/Slide"

ReactDOM.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3} anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
    }}
    TransitionComponent={Slide}
    iconVariant={{
        success: '✅',
        error: '✖️',
        warning: '⚠️',
        info: 'ℹ️',
    }}
    >
    <Homepage />
    </SnackbarProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
