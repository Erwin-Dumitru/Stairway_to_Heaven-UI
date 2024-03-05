import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Address } from "@/components/Interfaces";
import { AddressContext } from "@/components/Context";

import Nav from "./nav/Nav";
import Bar from "./bar/Bar";
import Home from "./home/Home";
import History from "./history/History";
import Chat from "./chat/Chat";
import Settings from "./settings/Settings";

import "./Dashboard.scss";

function App() {
  const [addresses, setAddresses] = useState<Address[]>([
    { name: "Apartamentul 5", type: "client" },
    { name: "Apartamentul 6", type: "client" },
    { name: "Asociatie", type: "admin" },
  ]);

  const [currentAddress, setCurrentAddress] = useState<Address>(addresses[0]);

  return (
    <div className="app">
      <AddressContext.Provider value={{ addresses, setAddresses, currentAddress, setCurrentAddress }}>
        <Nav />
        <div className="appContent">
            <Bar />

            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/history" element={<History />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
        </div>
      </AddressContext.Provider>
    </div>
  );
}

export default App;
