"use client";

import { BadgeBaseDanger, BadgeBasePrimary } from "@/components/BadgeBase";
import { MenuProps } from "../../page";
import DropdownButtonOption from "../../components/DropdownButtonOption";
import { useState } from "react";
import AlertDialogDelete from "./AlertDialogDelete";
import DialogProperties from "./DialogProperties";

const CardMenu = ({ menu, typeName }: { menu: MenuProps, typeName: string }) => {
    const [stateDialogDelete, setStateDialogDelete] = useState<boolean>(false);
    const [stateDialogProperties, setStateProperties] =
        useState<boolean>(false);

    return (
        <div className="px-6 py-4 border-b">
            <div className="flex justify-between space-y-2">
                <p
                    className={`${
                        menu.status === "0" ? "text-[#707070] " : "#ffffff"
                    }`}
                >
                    {menu.title}
                </p>
                <DropdownButtonOption
                    setStateDialogDelete={setStateDialogDelete}
                    setStateDialogProperties={setStateProperties}
                />
            </div>
            <div className="flex justify-start items-baseline space-x-2">
                <p className="text-[#707070]">Status: </p>
                {menu.status === "0" ? (
                    <BadgeBaseDanger>Closed</BadgeBaseDanger>
                ) : (
                    <BadgeBasePrimary>Enable</BadgeBasePrimary>
                )}
            </div>
            <AlertDialogDelete
                menu={menu}
                stateDialogDelete={stateDialogDelete}
                setStateDialogDelete={setStateDialogDelete}
            />
            <DialogProperties
                menu={menu}
                typeName={typeName}
                stateDialogProperties={stateDialogProperties}
                setStateDialogProperties={setStateProperties}
            />
        </div>
    );
};

export default CardMenu;
