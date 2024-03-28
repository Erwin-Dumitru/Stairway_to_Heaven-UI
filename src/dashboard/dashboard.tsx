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
    {
      type: "client",
      name: "Apartamentul 5"
    },
    {
      type: "client",
      name: "Apartamentul 6"
    },
    {
      type: "admin",
      name: "Administrație",
      addresses: [
        {
          address: "TM, Mihai Viteazu, 1",
          stairs: [
            {
              name: "Scara A"
            },
            {
              name: "Scara B"
            }
          ]
        },
        {
          address: "TM, Mihai Viteazu, 2",
          stairs: [
            {
              name: "Scara A"
            },
            {
              name: "Scara B"
            }
          ]
        }
      ]
    },
  ]);

  const [currentAddress, setCurrentAddress] = useState<Address>(addresses[0]);

  return (
    <div className="dashboard">
      <AddressContext.Provider value={{ addresses, setAddresses, currentAddress, setCurrentAddress }}>
        <Nav />
        <div className="dashboard-content">
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
