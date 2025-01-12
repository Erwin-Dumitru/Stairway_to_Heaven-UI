import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import { AddressContext } from "@/components/Context";
import addressesData from "@/data/addresses.json";
// import agent from "@/api/agent";

import Nav from "./nav/Nav";
import Bar from "./bar/Bar";
import Home from "./home/Home";
import History from "./history/History";
import Chat from "./chat/Chat";
import Settings from "./settings/Settings";

import "./Dashboard.scss";

function App() {
  const [addresses, setAddresses] = useState<(Apartment | Administration)[]>();
  const [currentAddress, setCurrentAddress] = useState<SelectedAddress>();
  const [homeInfo, setHomeInfo] = useState<HomeInformation>();
  const [homeApartmentData, setHomeApartmentData] = useState<ApartmentData>();

  useEffect(() => {
    getInfo({ setAddresses, setHomeInfo });
  }, []);

  // Set the first address as the current address or the one stored in local storage
  // useEffect(() => {
  //   if (addresses.length === 0 || addresses === undefined) {
  //     return;
  //   }

  //   let storedAddress = localStorage.getItem("selectedAddress");
  //   let selectedAddress;

  //   if (storedAddress) {
  //     try {
  //       selectedAddress = JSON.parse(storedAddress);
  //     } catch (error) {
  //       localStorage.removeItem("selectedAddress");
  //       console.error("Error parsing selected address: ", error);
  //     }
  //   }

  //   if (selectedAddress) {
  //     // setCurrentAddress(selectedAddress);
  //     if (selectedAddress.type === "admin") {
  //       let address = addresses.find((address) => {
  //         if (address.associations) {
  //           return address.id === selectedAddress.id;
  //         }
  //       });

  //       if (address) {
  //         setCurrentAddress({
  //           id: address.id,
  //           name: address.name,
  //           type: "admin"
  //         });
  //       } else {
  //         setCurrentAddress({
  //           id: addresses[0].id,
  //           name: addresses[0].name,
  //           type: "admin"
  //         });
  //       }
  //     } else if (selectedAddress.type === "association") {
  //       let address = addresses.find((address) => {
  //         if (address.associations) {
  //           return address.associations.find((association) => association.id === selectedAddress.id);
  //         }
  //       });

  //       if (address) {
  //         setCurrentAddress({
  //           id: address.id,
  //           name: address.name,
  //           type: "association"
  //         });
  //       } else {
  //         setCurrentAddress({
  //           id: addresses[0].id,
  //           name: addresses[0].name,
  //           type: "association"
  //         });
  //       }
  //     } else {
  //       let address = addresses.find((address) => address.id === selectedAddress.id);

  //       if (address) {
  //         setCurrentAddress({
  //           id: address.id,
  //           name: address.name,
  //           type: "client"
  //         });
  //       } else {
  //         setCurrentAddress({
  //           id: addresses[0].id,
  //           name: addresses[0].name,
  //           type: "client"
  //         });
  //       }
  //     }
  //   } else {
  //     setCurrentAddress({
  //       id: addresses[0].id,
  //       name: addresses[0].name,
  //       type: "client"
  //     });
  //   }
  // }, [addresses]);

  // Set the first address as the current address or the one stored in local storage
  
  useEffect(() => {
    if (!addresses?.length) {
      return;
    }
  
    let storedAddress = localStorage.getItem("selectedAddress");
    console.log("Stored address: ");
    console.log(storedAddress);
    let selectedAddress: any;
  
    if (storedAddress) {
      try {
        selectedAddress = JSON.parse(storedAddress);
      } catch (error) {
        localStorage.removeItem("selectedAddress");
        console.error("Error parsing selected address: ", error);
        // refresh the page to get the default address
        // window.location.reload();
      }
    }
  
    let address;
    if (selectedAddress) {
      switch (selectedAddress.type) {
        case "admin":
        case "client":
          address = addresses.find((addr) => addr.id === selectedAddress.id);
          break;
        case "association":
          let administration = addresses.find((addr) => addr.id === selectedAddress.parent);
          if (administration as Administration) {
            address = (administration as Administration).associations.find((association) => association.id === selectedAddress.id);
          }
          break;
      }
    }

    if (!address) {
      address = addresses[0];
    }

    if (selectedAddress?.type === 'association') {
      setCurrentAddress({
        parent: selectedAddress.parent,
        id: address.id,
        name: address.name,
        type: selectedAddress.type
      });
    } else {
      setCurrentAddress({
        id: address.id,
        name: address.name,
        type: selectedAddress?.type || 'client'
      });
    }
  }, [addresses]);

  useEffect(() => {
    if (currentAddress) {
      localStorage.setItem("selectedAddress", JSON.stringify(currentAddress));

      if (currentAddress.type === "client") {
        let apartment = homeInfo?.apartments.find((apartment) => apartment.id === currentAddress.id);
        setHomeApartmentData(apartment);
      }

      // redirect to the home page
      // if (window.location.pathname !== "/dashboard/") {
      //   window.location.href = "/dashboard/";
      // }
    }
  }, [currentAddress]);

  return (
    <div className="dashboard">
      <AddressContext.Provider 
        value={
          { 
            addresses, 
            setAddresses, 
            currentAddress, 
            setCurrentAddress,
            homeApartmentData 
          } as AddressContextType 
        }>
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

async function getInfo(props: any) {
  // TODO: Get the data from the API

  // Get the data from the JSON 
  props.setAddresses(addressesData);
  return;

  // const homeInfo = await agent.Home.getHomeData("69f04c73-4ec5-401e-a265-103847edc1e3").catch((error) => {
  //   console.log(error);
  //   props.setAddresses(addressesData); // Use the data from the JSON file if the API call fails
  // });

  // if (homeInfo) {
  //   props.setHomeInfo(homeInfo);

  //   let APIAddresses: (Apartment | Administration)[] = homeInfo.apartments.map((address) => {
  //     return {
  //       id: address.id,
  //       name: address.name
  //     };
  //   });

  //   APIAddresses = APIAddresses.concat(homeInfo.administrations.map((address) => {
  //     return {
  //       id: address.id,
  //       name: address.name,
  //       associations: address.associations.map((association) => {
  //         return {
  //           id: association.id,
  //           name: association.name,
  //           done: false,
  //           notifications: 0,
  //           county: "Cluj",
  //           countyCode: "CJ",
  //           city: "Cluj-Napoca"
  //         };
  //       })
  //     };
  //   }));

  //   props.setAddresses(APIAddresses);
  // }
}

export default App;
