import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core/styles";
import {yellow} from "@material-ui/core/colors";


const theme = createMuiTheme({
    palette: {
        primary: {
            main: yellow["A200"]
        },
    },
});

ReactDOM.render(
    <MuiThemeProvider theme={theme}>
          <App />
      </MuiThemeProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
