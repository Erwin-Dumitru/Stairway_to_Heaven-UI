interface HomeInformation {
    apartments: ApartmentData[];
    administrations: Administration[];
}

interface Administration {
    id: string;
    name: string;
    notifications?: number;
    associations: Association[];
}

interface Association {
    id: string;
    name: string;

    done: boolean;
    notifications?: number;
    county: string;
    countyCode: string;
    city: string;

    apartments?: Apartment[];
}

interface Apartment {
    id: string;
    name: string;
    notifications?: number;
}

interface ApartmentData {
    id: string;
    name: string;
    role: string;
    counters: Counter[];
    expenses: Expense[];
}

interface Counter {
    id: string;
    name: string;
    location?: string;
    oldValue: string;
    // newValue: string|null;
}

interface Expense {
    id: string;
    date: Date;
    amount: number;
}

interface SendCounter {
    id: string;
    value: string;
}

interface SelectedAddress {
    parent?: string;
    id: string;
    name: string;
    type: string;
}

interface AddressContextType {
    addresses: (Apartment | Administration)[];
    setAddresses: React.Dispatch<React.SetStateAction<(Apartment | Administration)[]>>;
    currentAddress: SelectedAddress;
    setCurrentAddress: React.Dispatch<React.SetStateAction<SelectedAddress>>;
    homeApartmentData: any;
}
