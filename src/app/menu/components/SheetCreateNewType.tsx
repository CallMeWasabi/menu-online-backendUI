import DangerButton from "@/components/DangerButton";
import InputBase from "@/components/InputBase";
import LabelBase from "@/components/LabelBase";
import PrimaryButton from "@/components/PrimaryButton";
import SecondaryButton from "@/components/SecondaryButton";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { swal } from "@/provider/swalProvider";
import { useState, useContext, ChangeEvent } from "react";
import { createTypeName, findTypeName } from "@/model/dbModuleTypeMenu";
import { AiOutlinePlus } from "react-icons/ai";
import SelectStatus from "./SelectStatus";
import { forbiddenCharacter } from "@/app/table/SheetCreateTable";
import { DataContext } from "../layout";
import toast, { ToasterModify } from "@/provider/toastProvider";

const MAX_SIZE_IMAGE = 0.2 * 1024 * 1024;

function convertImagetoBase64(
    e: ChangeEvent<HTMLInputElement>,
    setImage: (value: string) => void
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
            setImage(`data:image/png;base64,${base64String}`);
        };

        reader.readAsDataURL(file);
    }
}

async function validationInput(
    status: string,
    typeName: string,
    image: string,
    setTypeName: Function,
    context: { reload: boolean; callReload: Function }
) {
    for (let i = 0; i < typeName.length; i++) {
        for (let j = 0; j < forbiddenCharacter.length; j++) {
            if (typeName[i] == forbiddenCharacter[j]) {
                throw new Error(
                    `* Error: Have forbidden character ("${forbiddenCharacter[j]}") in name for type of food, please change before try again.`
                );
            }
        }
    }

    const typeNameFormDb = await findTypeName(typeName);
    if (typeNameFormDb !== null) {
        throw new Error("* Error: This type of food already exist.");
    }

    const response = await createTypeName(typeName, status, image);

    if (response === null) {
        throw new Error(
            "* Error: Something went wrong create type of food had failed."
        );
    }

    setTypeName("");
    context.callReload(!context.reload);
}

function initSheet(
    open: boolean,
    setTypeName: Function,
    setStatus: Function,
    setImage: Function
) {
    if (open) {
        setTypeName("");
        setStatus("1");
        setImage("");
    }
}
const SheetCreateNewType = () => {
    const context = useContext(DataContext);
    const [typeName, setTypeName] = useState<string>("");
    const [status, setStatus] = useState<string>("1");
    const [image, setImage] = useState<string>("");

    return (
        <Sheet
            onOpenChange={(open) =>
                initSheet(open, setTypeName, setStatus, setImage)
            }
        >
            <SheetTrigger>
                <PrimaryButton>
                    <div className="flex justify-start items-center space-x-2">
                        <AiOutlinePlus />
                        <p>Add type of food</p>
                    </div>
                </PrimaryButton>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Create new type of food</SheetTitle>
                </SheetHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        toast.promise(
                            validationInput(
                                status,
                                typeName,
                                image,
                                setTypeName,
                                context
                            ),
                            {
                                loading: "Creating type of food",
                                success: `Create a new type of food "${typeName}" success`,
                                error: (message) => {
                                    return message;
                                },
                            }
                        );
                    }}
                >
                    <div className="mt-10 flex flex-col space-y-4">
                        <div className="flex justify-between">
                            <LabelBase htmlFor="input-type">Name</LabelBase>
                            <InputBase
                                id="input-type"
                                placeholder="name for type of food"
                                value={typeName}
                                onChange={(e) =>
                                    setTypeName(e.target.value.toLowerCase())
                                }
                                maxLength={32}
                                required
                            />
                        </div>

                        <div className="flex justify-between">
                            <LabelBase htmlFor="select-status">
                                Status
                            </LabelBase>
                            <SelectStatus setStatus={setStatus} />
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
                                    onChange={(e) => {
                                        convertImagetoBase64(e, setImage);
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-2">
                            <SheetClose>
                                <SecondaryButton type="button">
                                    Cancle
                                </SecondaryButton>
                            </SheetClose>
                            <SheetClose>
                                <PrimaryButton type="submit">Add</PrimaryButton>
                            </SheetClose>
                        </div>
                    </div>
                </form>
            </SheetContent>
        </Sheet>
    );
};

export default SheetCreateNewType;
