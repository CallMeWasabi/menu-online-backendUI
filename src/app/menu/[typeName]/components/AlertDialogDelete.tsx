import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import SecondaryButton from "@/components/SecondaryButton";
import DangerButton from "@/components/DangerButton";
import { useContext } from "react";
import { MenuProps } from "../../page";
import { DataContext } from "../../layout";
import { deleteMenu } from "@/model/dbModuleMenu";
import toast, { ToasterModify } from "@/provider/toastProvider";

async function deleteObject(
    menu: MenuProps,
    context: { reload: boolean; callReload: Function }
) {
    const response = await deleteMenu(menu.id);

    if (response === null) {
        throw new Error("");
    }

    context.callReload(!context.reload);
}

const AlertDialogDelete = ({
    menu,
    stateDialogDelete,
    setStateDialogDelete,
}: {
    menu: MenuProps;
    stateDialogDelete: boolean;
    setStateDialogDelete: (value: boolean) => void;
}) => {
    const context = useContext(DataContext);

    return (
        <AlertDialog
            open={stateDialogDelete}
            onOpenChange={setStateDialogDelete}
        >
            <ToasterModify />
            <AlertDialogContent className="p-0 overflow-hidden bg-[#232323] border border-[#2e2e2e]">
                <AlertDialogHeader className="bg-[#282828] text-[#ebebeb] border-b border-[#2e2e2e] px-5 py-3">
                    <AlertDialogTitle className="text-[15px] font-semibold">
                        Confirm to delete menu
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <div className="text-[14px] text-[#bbbbbb] border-b border-[#2e2e2e] px-5 pb-5">
                    <p>
                        This is permanent! Are you sure you want to delete the
                        menu {'"'}
                        {menu.title}
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
                            toast.promise(deleteObject(menu, context), {
                                loading: "Deleting menu",
                                success: `Deleted menu "${menu.title}" success`,
                                error: (message) => `${message}`,
                            });
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
