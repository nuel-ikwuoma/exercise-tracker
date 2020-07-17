import React from "react";

import axios from "axios"

export default class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
    };
  }

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  onSubmit = (e) => {
    const { username } = this.state;
    const user = { username };
    console.log(user);

    // read PORT(5000) from env variable instead
    axios.post("http://localhost:5000/users/add", user)
        .then(res => console.log(res.data))
        .catch(console.error)

    this.setState({ username: ""})
    e.preventDefault();
  };

  render() {
    return (
        <div>
            <h3>Create User Component</h3>
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input
                        type="text"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                    />
                </div>
                <div className="form-group">
                    <button
                        className="btn btn-primary"
                    >
                        Create User
                    </button>
                </div>
            </form>
        </div>
    )
  }
}
