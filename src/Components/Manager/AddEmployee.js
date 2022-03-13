import React, { Component } from "react";
import axios from "axios";

export default class AddEmployee extends Component {
  handleSubmit = () => {
    const newUser = {
      name: document.getElementById("name").value,
      username: document.getElementById("username").value,
      password: document.getElementById("password").value,
      role: "employee",
    };
    console.log(newUser);
    axios
      .post("https://mkonuk-live-meeting.herokuapp.com/register", newUser)
      .then((res) => window.open("/employeeList", "_self"))
      .catch((err) => console.log("Hata: " + err));
  };
  render() {
    return (
      <div className="container mt-5">
        <div className="container d-flex justify-content-center align-items-center column mb-5">
          <a
            href="/employeeList"
            className="  btn btn-warning  btn-lg m-5 mt-0 mb-0"
          >
            Geri Dön
          </a>{" "}
          <h2 className="d-flex justify-content-center display-2 m-5 mt-0 mb-0">
            Çalışan Ekle
          </h2>
        </div>
        <form className="text-center">
          <div className="form-group mb-3">
            <label className="mb-1">Çalışan Adı</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Çalışan Adı Giriniz"
            />
          </div>
          <div className="form-group">
            <label className="mb-1">Çalışan Kullanıcı Adı</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Çalışan Kullanıcı Adı Giriniz"
            />
          </div>
          <div className="form-group">
            <label className="mb-1">Çalışan Şifre</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Çalışan Şifre Giriniz"
            />
          </div>
          <a className="btn btn-warning mb-2 mt-5" onClick={this.handleSubmit}>
            Çalışan Ekle
          </a>
        </form>
      </div>
    );
  }
}
