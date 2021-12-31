import React from 'react';
import CardView from './view/CardView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AddQueryView from './view/AddQueryView';


function App() {
  return (
    <>
      <header className="App-header">
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </header>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CardView />} />
          <Route path="/add" element={<AddQueryView/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
