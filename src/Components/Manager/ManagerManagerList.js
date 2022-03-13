import React, { Component } from "react";
import axios from "axios";
const User = (props) => (
  <tr>
    <td>{props.user.name}</td>
    <td>{props.user.username}</td>
  </tr>
);

export default class ManagerManagerList extends Component {
  constructor(props) {
    super(props);
    this.state = { user: [] };
  }
  componentDidMount() {
    this.usersList();
  }
  usersList() {
    axios
      .get(
        "https://mkonuk-live-meeting.herokuapp.com/api/users?token=" +
          localStorage.getItem("jwtToken")
      )
      .then((response) => {
        this.setState({ user: response.data.users.users });
      })
      .catch((error) => {
        console.log(error);
      });

    return this.state.user.map((currentuser) => {
      let managerList = [];
      if (currentuser.role === "manager") {
        managerList.push(currentuser);
      }
      return managerList.map(() => {
        return (
          <User
            user={currentuser}
            key={currentuser._id}
            deleteUser={this.props.deleteUser}
          />
        );
      });
    });
  }
  render() {
    return (
      <div>
        {" "}
        <h1 className="text-center display-1 mt-5">Yöneticiler</h1>
        <div className="d-flex justify-content-around align-items-center mt-5 mb-3">
          <a href="/managerDashboard" className="btn btn-lg btn-warning ">
            Geri Gel
          </a>
          <a href="/addManager" className="btn btn-lg btn-warning ">
            Yönetici Ekle
          </a>
        </div>
        <div className="container">
          {" "}
          <table className="table mt-5">
            <caption>Yöneticiler Listesi</caption>
            <thead>
              <tr>
                <th scope="col">İsim</th>
                <th scope="col">Kullanıcı Adı</th>
              </tr>
            </thead>
            <tbody className="font-italic">{this.usersList()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
