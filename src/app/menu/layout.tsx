"use client";

import React, { useState } from "react"; 
import SidebarMenu from "./components/SidebarMenu";

export const DataContext = React.createContext({ reload: false, callReload: (value: boolean) => { return }})

export default function Layout({ children }: { children: React.ReactNode }) {
    const [reload, callReload] = useState<boolean>(false);
    

    return (
        <DataContext.Provider value={{ reload, callReload }}>
            <div className="h-full flex w-[255px] flex-col fixed border-e border-[#2e2e2e]">
                <SidebarMenu />
            </div>
            <main className="ms-[255px]">
                { children }
            </main>
        </DataContext.Provider>
    );
}
