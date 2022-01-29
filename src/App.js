import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Main from "./components/Main.js"
import './App.css';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Main />}>
          </Route>
        </Routes>
      </Router>



    );
  }
}
