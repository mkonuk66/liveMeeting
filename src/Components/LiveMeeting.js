import React, { useState } from "react";

import { Jutsu } from "react-jutsu";
let oncekiSayfa = () => {
  window.history.back();
};
const App = () => {
  const [room, setRoom] = useState("");
  const [name, setName] = useState("");
  const [call, setCall] = useState(false);
  const [password, setPassword] = useState("");

  const handleClick = (event) => {
    event.preventDefault();
    if (room) setCall(true);
  };

  return call ? (
    <div className="liveMeet">
      <a onClick={oncekiSayfa} className="btn btn-warning liveMeetButton ">
        Geri Dön
      </a>

      <div>
        {" "}
        <Jutsu
          containerStyles={{ width: "95vw", height: "100vh" }}
          roomName={room}
          displayName={name}
          password={password}
          onMeetingEnd={() => console.log("Meeting has ended")}
          loadingComponent={<p>yükleniyor ...</p>}
          errorComponent={<p>Oops! Bir hata ile karşılaşıldı.</p>}
        />
      </div>
    </div>
  ) : (
    <div>
      <div className="display-1 text-center mt-5">Canlı Görüşme</div>
      <form className="d-flex flex-column justify-content-center align-items-center mt-5 form-group">
        <label className="font-italic">
          Lütfen Canlı Görüşme İle İlgili Bilgileri Giriniz
        </label>
        <input
          className="form-control container mt-3 font-italic"
          id="room"
          type="text"
          placeholder="Oda İsmi"
          value={room}
          required
          onChange={(e) => setRoom(e.target.value)}
        />
        <input
          className="form-control container mt-3 font-italic"
          id="name"
          type="text"
          placeholder={localStorage.getItem("kullaniciAdi") + " (tercihen)"}
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="form-control container mt-3 font-italic"
          id="password"
          type="text"
          placeholder="Şifre (tercihen)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleClick}
          type="submit"
          className="btn btn-warning btn-lg mt-3"
        >
          Giriş Yap
        </button>
      </form>
    </div>
  );
};

export default App;
