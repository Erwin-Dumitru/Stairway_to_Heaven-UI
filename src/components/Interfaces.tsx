
export interface Stair {
    name: string;
}
  
export interface AddressDetail {
    address: string;
    stairs: Stair[];
}
  
export interface Address {
    name: string;
    type: string;
    addresses?: AddressDetail[];
}

export interface AddressContextType {
    addresses: Address[];
    setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
    currentAddress: Address;
    setCurrentAddress: React.Dispatch<React.SetStateAction<Address>>;
}
