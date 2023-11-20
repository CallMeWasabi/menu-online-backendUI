import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { TypeMenuProps } from "../page";
import SecondaryButton from "@/components/SecondaryButton";
import DangerButton from "@/components/DangerButton";
import { useContext } from "react";
import { DataContext } from "../layout";
import { deleteType } from "@/model/dbModuleTypeMenu";
import toast, { ToasterModify } from "@/provider/toastProvider";

async function deleteObject(
    typeMenu: TypeMenuProps,
    context: { reload: boolean; callReload: Function }
) {
    if (typeMenu.menus.length !== 0) {
        throw new Error("For this type of menu, the number of menus is not equal to zero, please delete before trying again")
    }

    const response = await deleteType(typeMenu.id);

    if (response === null) {
        throw new Error("Something went wrong, deleted type of menu had failed");
    }

    context.callReload(!context.reload);
}

const AlertDialogDelete = ({
    typeMenu,
    stateDialogDelete,
    setStateDialogDelete,
}: {
    typeMenu: TypeMenuProps
    stateDialogDelete: boolean
    setStateDialogDelete: (value: boolean) => void;
}) => {
    const context = useContext(DataContext);

    return (
        <AlertDialog open={stateDialogDelete} onOpenChange={setStateDialogDelete}>
            <AlertDialogContent className="p-0 overflow-hidden bg-[#232323] border border-[#2e2e2e]">
                <AlertDialogHeader className="bg-[#282828] text-[#ebebeb] border-b border-[#2e2e2e] px-5 py-3">
                    <AlertDialogTitle className="text-[15px] font-semibold">
                        Confirm to delete type of food
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <div className="text-[14px] text-[#bbbbbb] border-b border-[#2e2e2e] px-5 pb-5">
                    <p>
                        This is permanent! Are you sure you want to delete the
                        type of food {'"'}
                        {typeMenu.title}
                        {'"'}
                    </p>
                </div>
                <AlertDialogFooter className="flex justify-start px-3 mb-2">
                    <AlertDialogCancel
                        className="p-0 bg-transparent border-0 hover:bg-transparent basis-1/6 outline-0"
                        onClick={() => setStateDialogDelete(false)}
                    >
                        <SecondaryButton className="text-[12px] w-full">
                            Cancle
                        </SecondaryButton>
                    </AlertDialogCancel>
                    <AlertDialogAction
                        className="p-0 bg-transparent border-0 hover:bg-transparent basis-1/6 outline-0"
                        onClick={() => {
                            setStateDialogDelete(false);
                            toast.promise(deleteObject(typeMenu, context), {
                                loading: "Deleting type of menu",
                                success: `Deleted menu "${typeMenu.title}" success`,
                                error: (message) => `${message}`,
                            })
                        }}
                    >
                        <DangerButton className="text-[12px] w-full">
                            Delete
                        </DangerButton>
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertDialogDelete;
