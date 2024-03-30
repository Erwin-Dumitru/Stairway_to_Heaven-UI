
export interface Stair {
    name: string;
}
  
export interface association {
    id: string;
    name: string;
    done: boolean;
    notifications?: number;
    county: string;
    countyCode: string;
    city: string;
}
  
export interface Address {
    id: string;
    name: string;
    notifications?: number;
    administrations?: association[];
}

export interface SelectedAddress {
    id: string;
    name: string;
    type: string;
}

export interface AddressContextType {
    addresses: Address[];
    setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
    currentAddress: SelectedAddress;
    setCurrentAddress: React.Dispatch<React.SetStateAction<SelectedAddress>>;
}
