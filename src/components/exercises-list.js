import React from "react";
import Exercise from "./exercise"

import axios from "axios";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { exercises: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises")
      .then((res) => this.setState({ exercises: res.data }))
      .catch(console.error);
  }

  deleteExercise = (id) => {
    axios
      .delete("http://localhost:5000/exercises/" + id)
      .then((res) => {
        this.setState({
          exercises: this.state.exercises.filter((ex) => ex._id !== id),
        });
        console.log(res.data);
      })
      .catch(console.error);
  };

  exercises = () => {
      return this.state.exercises.map(ex => {
          return <Exercise exercise={ex} onDeleteExercise={this.deleteExercise} key={ex._id} />
      })
  }

  render() {
    return (
        <div>
            <h3>All Exercises</h3>
            <table className="table">
                <thead className="table-light">
                    <tr>
                        <th>Useername</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {this.exercises()}
                </tbody>
            </table>
        </div>
    )
  }
}
