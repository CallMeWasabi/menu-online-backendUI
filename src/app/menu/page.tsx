"use client";

import InputBase from "@/components/InputBase";
import SecondaryButton from "@/components/SecondaryButton";
import CardTypeMenu from "./components/CardTypeMenu";
import { useContext, useEffect, useState } from "react";
import { loadTypeName } from "@/model/dbModuleTypeMenu";
import { BiRefresh } from "react-icons/bi";
import { DataContext } from "./layout";
import SheetCreateNewType from "./components/SheetCreateNewType";
import { ToasterModify } from "@/provider/toastProvider";

export interface MenuProps {
    id: string;
    title: string;
    typeMenuId: string;
    price: number;
    thumbnailImage: string;
    status: string;
    haveDiscount: boolean;
    discountedPrice: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface TypeMenuProps {
    id: string;
    title: string;
    status: "0" | "1";
    thumbnailImage: string,
    menus: MenuProps[];
    createdAt: Date;
    updatedAt: Date;
}

const MenuPage = () => {
    const [allTypeName, setAllTypeName] = useState<any>([]);
    const [singleReload, callSingleReload] = useState<boolean>(false);
    const context = useContext(DataContext);

    useEffect(() => {
        async function asyncProcess() {
            const query = await loadTypeName();

            if (query === null) {
                setAllTypeName([]);
                return;
            }

            setAllTypeName(query);
        }
        asyncProcess();
    }, [context.reload, singleReload]);

    return (
        <div>
            <ToasterModify />
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
                        <SheetCreateNewType />
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex flex-col bg-[#232323] border borer-[#282828] rounded-md text-[14px]">
                        <div className="flex justify-between items-center border-b px-6 py-4">
                            <div className="flex justify-start space-x-4 items-center">
                                <p className="font-semibold">Type of food</p>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            {allTypeName.length === 0 ? (
                                <div className="px-6 py-4 text-[#bbbbbb]">
                                    <p>No type of food yet</p>
                                </div>
                            ) : (
                                <div>
                                    {allTypeName.map(
                                        (typeMenu: TypeMenuProps) => {
                                            return (
                                                <CardTypeMenu
                                                    typeMenu={typeMenu}
                                                    key={typeMenu.id}
                                                />
                                            );
                                        }
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuPage;
