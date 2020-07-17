import React from "react";

import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"

import axios from "axios";

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };
  }

  componentDidMount() {
      axios.get("http://localhost:5000/users")
        .then(res => {
            this.setState({
                users: res.data.map(({username}) => username),
                username: res.data[0].username,
            });
        })
    console.log("Mounted");
  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  onChangeDescription = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onChangeDuration = (e) => {
    this.setState({
      duration: e.target.value,
    });
  };

  onChangeDate = (dateObject) => {
    this.setState({
      date: dateObject,
    });
  };

  onSubmit = (e) => {
    const { username, description, duration, date } = this.state;
    const exercise = { username, description, duration, date };

    console.log(exercise);
    window.location = "/";

    axios.post("http://localhost:5000/exercises/add", exercise)
        .then(res => console.log(res.data));
    
    e.preventDefault();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username</label>
            <select
                ref="userInput"
                value={this.state.username}
                onChange={this.onChangeUsername}
            >
              {this.state.users.map((user) => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label>description</label>
            <input
                className="form-control"
                type="text"
                value={this.state.description}
                onChange={this.onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label>duration (mins)</label>
            <input
                className="form-control"
                type="text"
                value={this.state.duration}
                onChange={this.onChangeDuration}
            />
          </div>
          <div className="form-group">
            <label>date</label>
            <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
            />
          </div>
          <div className="form-group">
            <button
                className="btn btn-primary"
            >
                Add Exercise
            </button>
            
          </div>
        </form>
      </div>
    );
  }
}
