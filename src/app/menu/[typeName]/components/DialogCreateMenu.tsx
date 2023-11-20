"use client";

import InputBase from "@/components/InputBase";
import LabelBase from "@/components/LabelBase";
import PrimaryButton from "@/components/PrimaryButton";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import SelectStatus from "../../components/SelectStatus";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import toast, { ToasterModify } from "@/provider/toastProvider";
import { createMenu, findMenuByName } from "@/model/dbModuleMenu";
import SecondaryButton from "@/components/SecondaryButton";
import { DataContext } from "../../layout";
import { DialogClose } from "@radix-ui/react-dialog";

const MAX_SIZE_IMAGE = 0.2 * 1024 * 1024;

function convertImagetoBase64(
    e: ChangeEvent<HTMLInputElement>,
    setMenuImage: (value: string) => void
) {
    const file = e.target.files?.[0];

    if (file) {
        if (file.size > MAX_SIZE_IMAGE) {
            e.target.value = "";
            toast.error("File size is larger than maximum size", {
                duration: 5000,
            });
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const base64String = e.target?.result?.toString().split(",")[1];
            setMenuImage(`data:image/png;base64,${base64String}`);
        };

        reader.readAsDataURL(file);
    }
}

async function createObject(
    menuTitle: string,
    menuPrice: number,
    menuStatus: string,
    menuImage: string,
    objectIdTypeName: string,
    singleReload: boolean,
    callSingleReload: (value: boolean) => void
) {
    const menuFromDb = await findMenuByName(menuTitle, objectIdTypeName);

    if (menuFromDb !== null) {
        throw new Error("This menu already exists.");
    }

    const response = await createMenu(
        menuTitle,
        objectIdTypeName,
        menuStatus,
        menuImage,
        menuPrice
    );

    if (response === null) {
        throw new Error("Something went wrong create menu had failed.");
    }

    callSingleReload(!singleReload);
}

const DialogCreateMenu = ({
    objectIdTypeName,
    singleReload,
    callSingleReload,
}: {
    objectIdTypeName: string;
    singleReload: boolean;
    callSingleReload: (value: boolean) => void;
}) => {
    const [menuTitle, setMenuTitle] = useState<string>("");
    const [menuPrice, setMenuPrice] = useState<number>(0);
    const [menuStatus, setMenuStatus] = useState<string>("1");
    const [menuImage, setMenuImage] = useState<string>("");
    const context = useContext(DataContext);

    return (
        <Dialog
            onOpenChange={(open) => {
                if (open) {
                    setMenuTitle("");
                    setMenuPrice(0);
                    setMenuStatus("1");
                    setMenuImage("");
                }
            }}
        >
            <ToasterModify />
            <DialogTrigger>
                <PrimaryButton>New menu</PrimaryButton>
            </DialogTrigger>
            <DialogContent className="border border-[#2e2e2e] bg-[#232323] p-0 overflow-hidden">
                <DialogHeader className="px-5 py-3 bg-[#282828] border-b border-[#2e2e2e]">
                    <DialogTitle className="text-[16px] text-[#ebebeb]">
                        Adding new menu to {""}
                    </DialogTitle>
                </DialogHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        toast.promise(
                            createObject(
                                menuTitle,
                                menuPrice,
                                menuStatus,
                                menuImage,
                                objectIdTypeName,
                                singleReload,
                                callSingleReload
                            ),
                            {
                                loading: "Creating menu",
                                success: "Menu created successfully",
                                error: (message) => `${message}`,
                            }
                        );
                    }}
                >
                    <div className="flex flex-col space-y-3 px-5 pb-3">
                        <div className="flex justify-between">
                            <LabelBase htmlFor="input-menu-title">
                                Title
                            </LabelBase>
                            <InputBase
                                id="input-menu-title"
                                value={menuTitle}
                                onChange={(e) => setMenuTitle(e.target.value)}
                                maxLength={32}
                                required
                            />
                        </div>
                        <div className="flex justify-between">
                            <LabelBase htmlFor="input-menu-price">
                                Price
                            </LabelBase>
                            <InputBase
                                id="input-menu-price"
                                value={menuPrice.toString()}
                                onChange={(e) => {
                                    setMenuPrice(parseFloat(e.target.value));
                                }}
                                max={10000}
                                min={0}
                            />
                        </div>
                        <div className="flex justify-between">
                            <LabelBase htmlFor="input-menu-status">
                                Status
                            </LabelBase>
                            <SelectStatus setStatus={setMenuStatus} />
                        </div>
                        <div className="block space-y-3">
                            <LabelBase htmlFor="input-menu-image">
                                Image (maximum file size is 200kb)
                            </LabelBase>
                            <div className="flex text-[14px]">
                                <input
                                    id="input-menu-image"
                                    type="file"
                                    accept="image/"
                                    className="file:bg-[#2C845C] file:hover:bg-[#40bf86] file:border-none file:rounded-md file:me-2 transition file:transition"
                                    onChange={(e) =>
                                        convertImagetoBase64(e, setMenuImage)
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter className="px-5 pb-5">
                        <SecondaryButton
                            type="button"
                            onClick={() => setMenuPrice(0)}
                        >
                            Reset
                        </SecondaryButton>
                        <DialogClose>
                            <PrimaryButton type="submit">
                                Add this menu
                            </PrimaryButton>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default DialogCreateMenu;
