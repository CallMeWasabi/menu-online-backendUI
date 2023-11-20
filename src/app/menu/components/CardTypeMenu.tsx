import { BadgeBaseDanger, BadgeBasePrimary } from "@/components/BadgeBase";
import DropdownButtonOption from "./DropdownButtonOption";
import { TypeMenuProps } from "../page";
import { useState } from "react";
import AlertDialogDelete from "./AlertDialogDelete.";
import DialogProperties from "./DialogProperties";

const CardTypeMenu = ({ typeMenu }: { typeMenu: TypeMenuProps }) => {
    const [stateDialogDelete, setStateDialogDelete] = useState<boolean>(false);
    const [stateDialogProperties, setStateDialogProperties] =
        useState<boolean>(false);

    return (
        <div className="px-6 py-4 border-b">
            <div className="flex justify-between space-y-2">
                <p
                    className={`${
                        typeMenu.status === "0" ? "text-[#707070] " : "#ffffff"
                    }`}
                >
                    {typeMenu.title}
                </p>
                <DropdownButtonOption
                    setStateDialogDelete={setStateDialogDelete}
                    setStateDialogProperties={setStateDialogProperties}
                />
            </div>
            <div className="flex justify-start items-baseline space-x-2">
                <p className="text-[#707070]">Status: </p>
                {typeMenu.status === "0" ? (
                    <BadgeBaseDanger>Closed</BadgeBaseDanger>
                ) : (
                    <BadgeBasePrimary>Enable</BadgeBasePrimary>
                )}
            </div>
            <AlertDialogDelete
                stateDialogDelete={stateDialogDelete}
                setStateDialogDelete={setStateDialogDelete}
                typeMenu={typeMenu}
            />

            <DialogProperties
                typeMenu={typeMenu}
                stateDialogProperties={stateDialogProperties}
                setStateDialogProperties={setStateDialogProperties}
            />
        </div>
    );
};

export default CardTypeMenu;
