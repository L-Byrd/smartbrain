import React, { Component } from "react";
import "./Profile.css";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.user.name,
      age: this.props.user.age,
      pet: this.props.user.pet,
    };
  }

  onFormChange = (event) => {
    switch (event.target.name) {
      case "user-name":
        this.setState({ name: event.target.value });
        break;
      case "user-age":
        this.setState({ age: event.target.value });
        break;
      case "user-pet":
        this.setState({ pet: event.target.value });
        break;
      default:
        return;
    }
  };

  onProfileUpdate = (data) => {
    fetch(`/profile/${this.props.user.id}`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${window.sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({ formInput: data }),
    })
      .then((resp) => {
        if (resp.status === 200 || resp.status === 304) {
          this.props.toggleModal();
          this.props.loadUser({ ...this.props.user, ...data });
        }
      })
      .catch(console.log);
  };

  render() {
    const { user } = this.props;
    const { name, age, pet } = this.state;
    return (
      <div className="profile-modal">
        <article className="br3 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center bg-white">
          <main className="pa4 black-80 w-80">
            <img
              src="https://toppng.com/uploads/preview/instagram-default-profile-picture-11562973083brycehrmyv.png"
              className="br-100 ba h3 w3 dib center"
              alt="avatar"
            />
            <h1>{this.state.name}</h1>
            <h4>{`Images Submitted: ${user.entries}`}</h4>
            <p>{`Member Since: ${new Date(
              user.joined
            ).toLocaleDateString()}`}</p>

            <label className="mt2 fw6" htmlFor="user-name">
              Name:
            </label>
            <input
              onChange={this.onFormChange}
              className="pa2 ba w-100 "
              type="text"
              placeholder={user.name}
              name="user-name"
              id="name"
            />
            <label className="mt2 fw6" htmlFor="user-age">
              Age:
            </label>
            <input
              onChange={this.onFormChange}
              className="pa2 ba w-100 "
              type="text"
              placeholder={user.age}
              name="user-age"
              id="age"
            />
            <label className="mt2 fw6" htmlFor="user-name">
              Pet:
            </label>
            <input
              onChange={this.onFormChange}
              className="pa2 ba w-100 "
              type="text"
              placeholder={user.pet}
              name="user-pet"
              id="pet"
            />
            <div
              className="mt4"
              style={{ display: "flex", justifyContent: "space-evenly" }}
            >
              <button
                onClick={() => this.onProfileUpdate({ name, age, pet })}
                className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
              >
                Save
              </button>
              <button
                className="b pa2 grow pointer hover-white w-40 bg-red b--black-20"
                onClick={this.props.toggleModal}
              >
                Cancel
              </button>
            </div>
          </main>
          <div className="modal-close" onClick={this.props.toggleModal}>
            &times;
          </div>
        </article>
      </div>
    );
  }
}

export default Profile;
