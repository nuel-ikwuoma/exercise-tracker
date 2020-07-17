import React from "react";
import axios from "axios";

import DatePicker from "react-datepicker";

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
    axios
      .get("http://localhost:5000/exercises/" + this.props.match.params.id)
      .then((res) => {
        const { username, description, duration, date } = res.data;
        this.setState({
          username,
          description,
          duration: Number(duration),
          date: new Date(date),
        });
      })
      .catch(console.error);

    axios
      .get("http://localhost:5000/users")
      .then((res) =>
        this.setState({ users: res.data.map(({ username }) => username) })
      )
      .catch(console.error);
  }

  onChangeUsername = (e) => {
    this.setState({ username: e.target.value });
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

    const exercise = {
      username,
      description,
      duration,
      date,
    };
    axios
      .post(
        "http://localhost:5000/exercises/update/" + this.props.match.params.id,
        exercise
      )
      .then((res) => console.log(res.data))
      .catch(console.error);

    window.location = "/";

    e.preventDefault()
  };

  render() {
    return (
      <div>
        <h3>Edit Exercise</h3>

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
            <button className="btn btn-primary" type="submit">
              Edit Exercise-Log
            </button>
          </div>
        </form>
      </div>
    );
  }
}
