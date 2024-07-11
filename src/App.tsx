// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { HelpRequestForm } from './components/HelpRequestForm';

function App() {
  return (
    <div className="form">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Reactssss
        </a>
      </header> */}
      <HelpRequestForm />

    </div>
  );
}

export default App;
