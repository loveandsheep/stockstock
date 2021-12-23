import React from 'react';
import logo from './logo.svg';
import Button from '@mui/material/Button';
import CardView from './view/CardView';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

        <CardView />
      </header>
    </div>
  );
}

export default App;
