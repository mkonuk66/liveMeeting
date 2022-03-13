import React, { Component } from "react";

export default class ManagerDashboard extends Component {
  handleLogOut = () => {
    localStorage.setItem("jwtToken", null);
    window.open("/", "_self");
    alert("Çıkış Yapılıyor...");
  };
  render() {
    return (
      <div>
        <div className="display-1 text-center mt-5">IT Yönetim Ana Sayfa</div>{" "}
        <div className="h5 text-center mt-2 mb-5">
          Hoşgeldiniz {localStorage.getItem("kullaniciAdi")}
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center mt-5">
          <a href="/managerList" className="btn btn-lg btn-warning mt-3">
            Yönetici Listesi
          </a>
          <a href="/employeeList" className="btn btn-lg btn-warning mt-3">
            Çalışanlar Listesi
          </a>
          <a href="/customerStatistics" className="btn btn-lg btn-warning mt-3">
            Müşteri İstatistikleri
          </a>
          <a href="/liveMeeting" className="btn btn-lg btn-warning mt-3">
            Canlı Görüşme
          </a>
          <a onClick={this.handleLogOut} className="btn btn-lg btn-danger mt-3">
            Çıkış Yap
          </a>
        </div>
      </div>
    );
  }
}
