import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import LabelBase from "@/components/LabelBase";
import SecondaryButton from "@/components/SecondaryButton";
import { useState, useContext } from "react";
import PrimaryButton from "@/components/PrimaryButton";
import toast, { ToasterModify } from "@/provider/toastProvider";
("react-hot-toast");
import { MenuProps } from "../../page";
import { DataContext } from "../../layout";
import SelectStatus from "../../components/SelectStatus";
import { updateMenu } from "@/model/dbModuleMenu";
import InputBase from "@/components/InputBase";

interface DialogPropertiesProps {
    menu: MenuProps;
    typeName: string;
    stateDialogProperties: boolean;
    setStateDialogProperties: (value: boolean) => void;
}

async function updateObject(
    newStatus: string,
    newPrice: number,
    objectId: string,
    context: { reload: boolean; callReload: (value: boolean) => void }
) {
    const response = await updateMenu(newStatus, newPrice, objectId);

    if (response === null) {
        throw new Error("response null");
    }

    context.callReload(!context.reload);
}

const DialogProperties = ({
    menu,
    typeName,
    stateDialogProperties,
    setStateDialogProperties,
}: DialogPropertiesProps) => {
    const [edit, setEdit] = useState<boolean>(false);
    const [editStatus, setEditStatus] = useState<string>(menu.status);
    const [editPrice, setEditPrice] = useState(menu.price);
    const context = useContext(DataContext);

    return (
        <Dialog
            open={stateDialogProperties}
            onOpenChange={setStateDialogProperties}
        >
            <ToasterModify />
            <DialogContent className="bg-[#232323] p-0 border border-[#2e2e2e]">
                <DialogHeader className="px-5 py-3 border-b border-[#2e2e2e]">
                    <DialogTitle className="text-[#ebebeb] text-[15px]">
                        Properties
                    </DialogTitle>
                </DialogHeader>
                <div className="flex justify-start px-5 pb-3 text-[14px] space-x-7">
                    <div className="flex flex-col space-y-2 items-start">
                        <LabelBase htmlFor="label-title">Title</LabelBase>
                        <LabelBase htmlFor="label-type">Type</LabelBase>
                        <LabelBase htmlFor="label-status">Status</LabelBase>
                        <LabelBase htmlFor="label-price">Price</LabelBase>
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
                        <p id="label-title">{menu.title}</p>
                        <p id="label-type">{typeName}</p>
                        {edit ? (
                            <SelectStatus
                                setStatus={setEditStatus}
                                defaultValue={editStatus}
                            />
                        ) : (
                            <p id="label-status">
                                {menu.status === "1" ? "Enable" : "Closed"}
                            </p>
                        )}
                        {edit ? (
                            <InputBase
                                value={editPrice}
                                onChange={(e) =>
                                    setEditPrice(parseFloat(e.target.value))
                                }
                            />
                        ) : (
                            <p id="label-price">{menu.price}</p>
                        )}
                        <div className="flex justify-between space-x-5 items-center">
                            <p id="label-image" className="truncate">
                                {menu.thumbnailImage === ""
                                    ? "No preview image"
                                    : menu.thumbnailImage}
                            </p>
                            <SecondaryButton
                                hidden={
                                    menu.thumbnailImage === "" ? true : false
                                }
                            >
                                show preview
                            </SecondaryButton>
                        </div>
                        <br />
                        <p id="label-created-at">
                            {menu.createdAt.toLocaleString("en-th")}
                        </p>
                        <p id="label-updated-at">
                            {menu.updatedAt.toLocaleString("en-th")}
                        </p>
                    </div>
                </div>
                <DialogFooter className="px-4 py-2">
                    <SecondaryButton
                        onClick={() => {
                            setEditStatus(menu.status);
                            setEditPrice(menu.price);
                            setEdit(!edit);
                        }}
                    >
                        {edit ? "Cancle" : "Edit"}
                    </SecondaryButton>
                    {(menu.status !== editStatus || menu.price !== editPrice) && (
                        <DialogTrigger>
                            <PrimaryButton
                                onClick={() => {
                                    setEdit(false);
                                    toast.promise(
                                        updateObject(
                                            editStatus,
                                            editPrice,
                                            menu.id,
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
