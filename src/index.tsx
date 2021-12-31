import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { Box } from '@mui/system';

export const myTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#629998',//'#395664',
    },
    secondary: {
      main: '#a65d4a',
    },
    info: {
      main: '#999999',
    },
    error: {
      main: '#e0625a',
    },
    background: {
      default: '#313131',
      paper: '#393939',
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={myTheme}>
      <Box style={{minHeight: '100vh', background: myTheme.palette.background.default}}>
        <App/>
      </Box>
    </ThemeProvider>  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
