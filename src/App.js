import React from 'react';
// import logo from './logo.svg';
// import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"

import {BrowserRouter as Router, Route} from "react-router-dom"

import Navbar from "./components/navbar"

import ExercisesList from "./components/exercises-list"
import CreateExercise from "./components/create-exercise"
import EditExercise from "./components/edit-exercise"
import CreateUser from "./components/create-user"

function App() {
  return (
    <div className="container">
      <Router>
        <Navbar /><br />
        <Route path="/" exact component={ExercisesList} />
        <Route path="/create" component={CreateExercise} />
        <Route path="/edit/:id" component={EditExercise} />
        <Route path="/user" component={CreateUser} />
      </Router>
    
    </div>
  );
}

export default App;
