
export interface Address {
    name: string;
    type: string;
}

export interface AddressContextType {
    addresses: Address[];
    setAddresses: React.Dispatch<React.SetStateAction<Address[]>>;
    currentAddress: Address;
    setCurrentAddress: React.Dispatch<React.SetStateAction<Address>>;
}
