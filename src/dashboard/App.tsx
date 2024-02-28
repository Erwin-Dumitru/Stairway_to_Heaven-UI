// import React from "react";
import "./styles/App.css";
import Nav from "./Nav";
import Bar from "./Bar";
import Home from "./Home";
import History from "./History";
import Chat from "./Chat";
import Settings from "./settings/Settings";
import HomeAdmin from "./admin/config/HomeAdmin";
import HistoryAdmin from "./HistoryAdmin";
import ChatAdmin from "./ChatAdmin";
import { Route, Routes } from "react-router-dom";
import { useState } from "react";

function App() {
  // const addresses = ["Apartamentul 5", "Apartamentul 6", "Apartamentul 7", "Apartamentul 8"];
  const [addresses, setAddresses] = useState(["Apartamentul 5", "Apartamentul 6", "Apartamentul 7", "Apartamentul 8"]);
  const [currentAddress, setCurrentAddress] = useState(addresses[0]);

  return (
    <div className="app">
      <Nav />
      <div className="appContent">
        <Bar addresses={addresses} currentAddress={currentAddress} setCurrentAddress={setCurrentAddress} />
        <Routes>
          <Route path="/dashboard/" element={<Home currentAddress={currentAddress}/>} />
          <Route path="/dashboard/history" element={<History currentAddress={currentAddress}/>} />
          <Route path="/dashboard/news" element={<Chat currentAddress={currentAddress}/>} />
          <Route path="/dashboard/settings" element={<Settings currentAddress={currentAddress}/>} />
          <Route path="/dashboard/admin" element={<HomeAdmin currentAddress={currentAddress}/>} />
          <Route path="/dashboard/history-admin" element={<HistoryAdmin currentAddress={currentAddress}/>} />
          <Route path="/dashboard/news-admin" element={<ChatAdmin currentAddress={currentAddress}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
