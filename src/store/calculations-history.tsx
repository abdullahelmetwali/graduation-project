/* eslint-disable react-refresh/only-export-components */
import type { History } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

export const HistoryContext = createContext<History | null>(null);

export const HistoryProvider = ({ children }) => {
    const [capacity, setCapacity] = useState([]);
    const [coverage, setCoverage] = useState([]);

    useEffect(() => {
        const getLocalStorage = () => {
            try {
                const resCap = localStorage.getItem("capacity");
                const resCov = localStorage.getItem("coverage");
                if (resCap) setCapacity(JSON.parse(resCap));
                if (resCov) setCoverage(JSON.parse(resCov));
            } catch (err) {
                console.error("Failed to load from localStorage:", err);
            }
        };
        getLocalStorage();
    }, []);

    return (
        <HistoryContext.Provider value={{ capacity, setCapacity, coverage, setCoverage }}>
            {children}
        </HistoryContext.Provider>
    );
};

export const useHistory = () => {
    const context = useContext(HistoryContext);
    if (!context) {
        throw new Error("useHistory must be used within a HistoryProvider");
    }
    return context;
};