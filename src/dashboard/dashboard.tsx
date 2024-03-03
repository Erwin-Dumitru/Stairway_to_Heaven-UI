import { Route, Routes } from "react-router-dom";
import { useState, createContext } from "react";
import Nav from "./nav/Nav";
import Bar from "./bar/Bar";
import Home from "./home/Home";
import History from "./history/History";
import Chat from "./chat/Chat";
import Settings from "./settings/Settings";
// import HomeAdmin from "./admin/config/HomeAdmin";
// import HistoryAdmin from "./HistoryAdmin";
// import ChatAdmin from "./ChatAdmin";
import "./Dashboard.scss";

interface AddressContextType {
  addresses: string[];
  setAddresses: React.Dispatch<React.SetStateAction<string[]>>;
  currentAddress: string;
  setCurrentAddress: React.Dispatch<React.SetStateAction<string>>;
}

export const AddressContext = createContext<AddressContextType | undefined>(undefined);

function App() {
  // const addresses = ["Apartamentul 5", "Apartamentul 6", "Apartamentul 7", "Apartamentul 8"];
  const [addresses, setAddresses] = useState(["Apartamentul 5", "Apartamentul 6", "Apartamentul 7", "Apartamentul 8"]);
  const [currentAddress, setCurrentAddress] = useState(addresses[0]);

  return (
    <div className="app">
      <Nav />
      <div className="appContent">
        <AddressContext.Provider value={{ addresses, setAddresses, currentAddress, setCurrentAddress }}>
          {/* <Bar addresses={addresses} currentAddress={currentAddress} setCurrentAddress={setCurrentAddress} /> */}
          <Bar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/history" element={<History />} />
            <Route path="/news" element={<Chat />} />
            <Route path="/settings" element={<Settings />} />
            {/* <Route path="/admin" element={<HomeAdmin />} /> */}
            {/* <Route path="/history-admin" element={<HistoryAdmin />} /> */}
            {/* <Route path="/news-admin" element={<ChatAdmin />} /> */}
          </Routes>
        </AddressContext.Provider>
        
        {/* <Routes>
          <Route path="/" element={<Home currentAddress={currentAddress}/>} />
          <Route path="/history" element={<History currentAddress={currentAddress}/>} />
          <Route path="/news" element={<Chat currentAddress={currentAddress}/>} />
          <Route path="/settings" element={<Settings currentAddress={currentAddress}/>} />
          <Route path="/admin" element={<HomeAdmin currentAddress={currentAddress}/>} />
          <Route path="/history-admin" element={<HistoryAdmin currentAddress={currentAddress}/>} />
          <Route path="/news-admin" element={<ChatAdmin currentAddress={currentAddress}/>} />
        </Routes> */}
      </div>
    </div>
  );
}

export default App;
