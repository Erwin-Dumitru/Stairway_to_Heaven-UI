import { Route, Routes } from "react-router-dom";
import { useState } from "react";
import { Address, SelectedAddress } from "@/components/Interfaces";
import { AddressContext } from "@/components/Context";
import { AddressContextType } from "@/components/Interfaces";
import addressesData from "@/data/addresses.json";

import Nav from "./nav/Nav";
import Bar from "./bar/Bar";
import Home from "./home/Home";
import History from "./history/History";
import Chat from "./chat/Chat";
import Settings from "./settings/Settings";

import "./Dashboard.scss";

function App() {
  const [addresses, setAddresses] = useState<Address[]>(addressesData);

  const [currentAddress, setCurrentAddress] = useState<SelectedAddress>(
    {
      id: addresses[0].id,
      name: addresses[0].name,
      type: addresses[0].administrations ? "admin" : "client"
    }
  );

  return (
    <div className="dashboard">
      <AddressContext.Provider value={{ addresses, setAddresses, currentAddress, setCurrentAddress } as AddressContextType}>
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
