import React, { Component } from "react";
import axios from "axios";
const User = (props) => (
  <tr>
    <td>{props.user.username}</td>
  </tr>
);
let oncekiSayfa = () => {
  window.history.back();
};
export default class ManagerCustomerList extends Component {
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
      if (currentuser.role === "customer") {
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
        <h1 className="text-center display-1 mt-5">
          {" "}
          <a onClick={oncekiSayfa} className="  btn btn-warning">
            Geri Dön
          </a>{" "}
          Müşteriler
        </h1>
        <table className="table container mt-5">
          <caption>Müşteriler Listesi</caption>
          <thead>
            <tr>
              <th className="text-center h2" scope="col">
                Müşteri Kullanıcı Adı
              </th>
            </tr>
          </thead>
          <tbody className="text-center font-italic">{this.usersList()}</tbody>
        </table>
      </div>
    );
  }
}
