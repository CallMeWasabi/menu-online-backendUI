"use client";

import InputBase from "@/components/InputBase";
import SecondaryButton from "@/components/SecondaryButton";
import { BiRefresh } from "react-icons/bi";
import { MenuProps } from "../page";
import React, { useContext, useEffect, useState } from "react";
import DialogCreateMenu from "./components/DialogCreateMenu";
import CardMenu from "./components/CardMenu";
import { findTypeName } from "@/model/dbModuleTypeMenu";
import { findMenuMany } from "@/model/dbModuleMenu";
import { DataContext } from "../layout";

const MenuContext = React.createContext({
    reload: false,
    callReload: (value: boolean) => {
        return;
    },
});

const ShowMenu = ({ params }: { params: { typeName: string } }) => {
    const [backup, setBackup] = useState<any>([]);
    const [listMenu, setListMenu] = useState<any>([]);
    const [reload, callReload] = useState<boolean>(false);
    const [objectIdTypeName, setObjectIdTypeName] = useState<string>("");
    const [singleReload, callSingleReload] = useState<boolean>(false);
    const context = useContext(DataContext);

    useEffect(() => {
        async function asyncProcess() {
            const query = await findTypeName(params.typeName);

            if (query === null) {
                setObjectIdTypeName("");
                return;
            }

            setObjectIdTypeName(query.id);
        }
        asyncProcess();
    }, [params.typeName]);

    useEffect(() => {
        async function asyncProcess() {
            const query = await findMenuMany(objectIdTypeName);

            if (query === null) {
                setListMenu([]);
                return;
            }

            setListMenu(query);
        }

        if (objectIdTypeName !== "") {
            asyncProcess();
        }
    }, [context.reload, objectIdTypeName, singleReload]);

    return (
        <MenuContext.Provider value={{ reload, callReload }}>
            <div className="flex flex-col text-[14px]">
                <div className="flex justify-between p-6">
                    <div>
                        <InputBase placeholder="Search by type of food" />
                    </div>
                    <div className="flex space-x-2">
                        <SecondaryButton
                            onClick={() => callSingleReload(!singleReload)}
                        >
                            <div className="flex items-center space-x-2">
                                <BiRefresh />
                                <p>Reload</p>
                            </div>
                        </SecondaryButton>
                        <DialogCreateMenu
                            objectIdTypeName={objectIdTypeName}
                            singleReload={singleReload}
                            callSingleReload={callSingleReload}
                        />
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex flex-col bg-[#232323] border borer-[#282828] rounded-md text-[14px]">
                        <div className="flex justify-between items-center border-b px-6 py-4">
                            <div className="flex justify-start space-x-4 items-center">
                                <p className="font-semibold">
                                    {params.typeName}
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            {listMenu.length === 0 ? (
                                <div className="px-6 py-4 text-[#bbbbbb]">
                                    <p>No menu yet</p>
                                </div>
                            ) : (
                                <div>
                                    {listMenu.map((menu: MenuProps) => {
                                        return (
                                            <CardMenu
                                                menu={menu}
                                                typeName={params.typeName}
                                                key={menu.id}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MenuContext.Provider>
    );
};

export default ShowMenu;
