import React from 'react';
import CardView from './view/CardView';
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddQueryView from './view/AddQueryView';

const theme = createTheme({
  palette: {
    primary: {
      main: '#395664',
    },
    secondary: {
      main: '#a65d4a',
    },
    error: {
      main: '#e0625a',
    },
  },
});

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<CardView />} />
              <Route path="/add" element={<AddQueryView/>} />
            </Routes>
          </BrowserRouter>
        </ThemeProvider>
      </header>
    </div>
  );
}

export default App;
