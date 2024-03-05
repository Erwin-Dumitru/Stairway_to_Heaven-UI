import { createContext } from "react";
import { AddressContextType } from "@/components/Interfaces";

export const AddressContext = createContext<AddressContextType | undefined>(undefined);
