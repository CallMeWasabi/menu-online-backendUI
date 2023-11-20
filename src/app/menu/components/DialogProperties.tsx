import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { TypeMenuProps } from "../page";
import LabelBase from "@/components/LabelBase";
import SecondaryButton from "@/components/SecondaryButton";
import { useState, useContext } from "react";
import SelectStatus from "./SelectStatus";
import PrimaryButton from "@/components/PrimaryButton";
import { DataContext } from "../layout";
import toast, { ToasterModify } from "@/provider/toastProvider";
("react-hot-toast");
import { updateStatusTypeName } from "@/model/dbModuleTypeMenu";
import Link from "next/link";

interface DialogPropertiesProps {
    typeMenu: TypeMenuProps;
    stateDialogProperties: boolean;
    setStateDialogProperties: (value: boolean) => void;
}

async function updateObject(
    newStatus: string,
    objectId: string,
    context: { reload: boolean; callReload: (value: boolean) => void }
) {
    const response = await updateStatusTypeName(newStatus, objectId);

    if (response === null) {
        throw new Error("reponse null");
    }

    context.callReload(!context.reload);
}

const DialogProperties = ({
    typeMenu,
    stateDialogProperties,
    setStateDialogProperties,
}: DialogPropertiesProps) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editStatus, setEditStatus] = useState<string>(typeMenu.status);
    const context = useContext(DataContext);

    return (
        <Dialog
            open={stateDialogProperties}
            onOpenChange={setStateDialogProperties}
        >
            <DialogContent className="bg-[#232323] p-0 border border-[#2e2e2e]">
                <DialogHeader className="px-5 py-3 border-b border-[#2e2e2e]">
                    <DialogTitle className="text-[#ebebeb] text-[15px]">
                        Properties
                    </DialogTitle>
                </DialogHeader>
                <div className="flex justify-start px-5 pb-3 text-[14px] space-x-7">
                    <div className="flex flex-col space-y-2 items-start">
                        <LabelBase htmlFor="label-title">Title</LabelBase>
                        <LabelBase htmlFor="label-status">Status</LabelBase>
                        <LabelBase htmlFor="label-quantity">
                            Number of menus of this type
                        </LabelBase>
                        <LabelBase htmlFor="label-image">Image</LabelBase>
                        <br />
                        <LabelBase htmlFor="label-created-at">
                            Created at
                        </LabelBase>
                        <LabelBase htmlFor="label-updated-at">
                            Updated at
                        </LabelBase>
                    </div>
                    <div className="flex flex-col space-y-2 items-start">
                        <p id="label-title">{typeMenu.title}</p>
                        {edit ? (
                            <SelectStatus
                                setStatus={setEditStatus}
                                defaultValue={editStatus}
                            />
                        ) : (
                            <p id="label-status">
                                {typeMenu.status === "1" ? "Enable" : "Closed"}
                            </p>
                        )}
                        <p id="label-quantity">
                            {typeof typeMenu.menus === "undefined"
                                ? "0"
                                : typeMenu.menus.length}
                        </p>
                        <p id="label-image">
                            {typeMenu.thumbnailImage !== "" ? (
                                <SecondaryButton>
                                    <Link
                                        href={typeMenu.thumbnailImage.toString()}
                                        target="_blank"
                                    >
                                        Show image
                                    </Link>
                                </SecondaryButton>
                            ) : (
                                "Don't have image"
                            )}
                        </p>
                        <br />
                        <p id="label-created-at">
                            {typeMenu.createdAt.toLocaleString("en-th")}
                        </p>
                        <p id="label-updated-at">
                            {typeMenu.updatedAt.toLocaleString("en-th")}
                        </p>
                    </div>
                </div>
                <DialogFooter className="px-4 py-2">
                    <SecondaryButton
                        onClick={() => {
                            setEditStatus(typeMenu.status);
                            setEdit(!edit);
                        }}
                    >
                        {edit ? "Cancle" : "Edit"}
                    </SecondaryButton>
                    {typeMenu.status !== editStatus && (
                        <DialogTrigger>
                            <PrimaryButton
                                onClick={() => {
                                    setEdit(false);
                                    toast.promise(
                                        updateObject(
                                            editStatus,
                                            typeMenu.id,
                                            context
                                        ),
                                        {
                                            loading: "Updating new status",
                                            success: "New status updated",
                                            error: "Something went wrong updated failed",
                                        }
                                    );
                                }}
                            >
                                Update
                            </PrimaryButton>
                        </DialogTrigger>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default DialogProperties;
