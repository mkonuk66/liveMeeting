import React, { Component } from "react";
import axios from "axios";

export default class LoginPage extends Component {
  handleSubmitLogin = () => {
    let isThere = 0;
    let role = "";
    let name = "";
    const loginUser = {
      username: document.getElementById("loginUsername").value,
      password: document.getElementById("loginPassword").value,
    };
    axios
      .post("https://mkonuk-live-meeting.herokuapp.com/login", loginUser)
      .then((res) =>
        res.data.success === true
          ? res.data.message.split(",")[0] === "customer"
            ? (window.open("/customerDashboard", "_self"),
              localStorage.setItem("jwtToken", res.data.token),
              localStorage.setItem(
                "kullaniciAdi",
                res.data.message.split(",")[1]
              ))
            : res.data.message.split(",")[0] === "employee"
            ? (window.open("/employeeDashboard", "_self"),
              localStorage.setItem("jwtToken", res.data.token),
              localStorage.setItem(
                "kullaniciAdi",
                res.data.message.split(",")[1]
              ))
            : res.data.message.split(",")[0] === "manager"
            ? (window.open("/managerDashboard", "_self"),
              localStorage.setItem("jwtToken", res.data.token),
              localStorage.setItem(
                "kullaniciAdi",
                res.data.message.split(",")[1]
              ))
            : alert("Hatalı giriş")
          : (alert("Kullanıcı Adı veya Şifre Hatalı! Lütfen tekrar deneyiniz."),
            window.open("/", "_self"))
      )
      .catch((err) => console.log("Hata: " + err));
    if (isThere === 1 && role === "customer") {
      alert("Hoşgeldiniz " + name);
      window.open("/customerDashboard", "_self");
    }
  };
  handleSubmitRegister = () => {
    const newUser = {
      name: document.getElementById("registerName").value,
      username: document.getElementById("registerUsername").value,
      password: document.getElementById("registerPassword").value,
      role: "customer",
    };

    console.log(newUser);
    axios
      .post("https://mkonuk-live-meeting.herokuapp.com/register", newUser)
      .then(
        (res) => (
          window.open("/", "_self"),
          alert("Kayıt Başarılı. Lütfen Giriş Yapınız.")
        )
      )
      .catch(
        (err) => (
          window.open("/", "_self"),
          alert("Kayıt oluşturulurken hata oluştu. Lütfen yeniden deneyiniz!")
        )
      );
  };
  render() {
    return (
      <div className="body">
        <div className="main slide navbar">
          <input type="checkbox" id="chk" aria-hidden="true" />

          <div className="signup">
            <form>
              <label for="chk" aria-hidden="true" className="loginLabel">
                Kayıt Ol
              </label>
              <input
                className="loginInput"
                type="text"
                id="registerUsername"
                placeholder="Lütfen Kullanıcı Adı Giriniz"
                required
              />
              <input
                className="loginInput"
                type="text"
                id="registerName"
                placeholder="Lütfen Ad ve Soyad Giriniz"
                required
              />
              <input
                className="loginInput"
                type="password"
                id="registerPassword"
                placeholder="Lütfen Şifre Giriniz"
                required
              />
              <a className="loginButton" onClick={this.handleSubmitRegister}>
                Kayıt Ol
              </a>
            </form>
          </div>

          <div className="login main">
            <form>
              <label className="loginLabel2" for="chk" aria-hidden="true">
                Giriş Yap
              </label>
              <input
                className="loginInput"
                type="text"
                id="loginUsername"
                placeholder="Lütfen Kullanıcı Adınızı Giriniz"
                required
              />
              <input
                className="loginInput"
                type="password"
                id="loginPassword"
                placeholder="Lütfen Şifrenizi Giriniz"
                required
              />
              <a className="loginButton" onClick={this.handleSubmitLogin}>
                Giriş Yap
              </a>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
