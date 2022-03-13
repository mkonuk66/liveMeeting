import React, { Component } from "react";

export default class CustomerDashboard extends Component {
  handleLogOut = () => {
    localStorage.setItem("jwtToken", null);
    window.open("/", "_self");
    alert("Çıkış Yapılıyor...");
  };
  render() {
    return (
      <div>
        <div className="display-1 text-center mt-5"> Ana Sayfa</div>{" "}
        <div className="h5 text-center mt-2 mb-5">
          Hoşgeldiniz {localStorage.getItem("kullaniciAdi")}
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
          <a className="btn btn-lg btn-warning " href="/liveMeeting">
            Canlı Görüşme
          </a>
          <form>
            <a
              className="btn btn-lg btn-danger mt-3"
              onClick={this.handleLogOut}
            >
              Çıkış Yap
            </a>
          </form>
        </div>
      </div>
    );
  }
}
