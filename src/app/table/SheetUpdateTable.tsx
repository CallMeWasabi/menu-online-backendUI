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
import { FormEvent, useEffect, useState } from "react";
import DangerButton from "@/components/DangerButton";
import { createTable, findTable, updateTable } from "@/model/dbModuleTable";
import { swal, offsetTimer } from "@/provider/swalProvider";
import { color } from "@/provider/themeColor";
import SelectStatus from "./SelectStatus";
import { BiSolidEdit } from "react-icons/bi";
import { TableInfo } from "./page";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const forbiddenCharacter = [
    " ",
    ".",
    ",",
    "/",
    "\\",
    ";",
    "]",
    "[",
    "{",
    "}",
    "=",
    "`",
];

enum StateProcess {
    red,
    none,
    green,
}

interface Props {
    table: TableInfo;
    refresh: boolean;
    setRefresh: Function;
}

const SheetUpdateTable = ({ table, refresh, setRefresh }: Props) => {
    const [tableId, setTableId] = useState<string>(table.value);
    const [tableStatus, setTableStatus] = useState<string>(table.status);
    const [haveChange, setHaveChange] = useState<boolean>(false);
    const [field, setField] = useState<{
        state: StateProcess;
        message: string;
    }>({ state: StateProcess.none, message: "" });

    useEffect(() => {
        if (tableId !== table.value || tableStatus !== table.status) {
            setHaveChange(true);
            return;
        }
        setHaveChange(false);
    }, [tableId, tableStatus, table]);

    async function validationInfo(e: FormEvent, tableId: string) {
        e.preventDefault();

        setField({ state: StateProcess.none, message: "" });

        if (tableId === "") {
            setField({
                state: StateProcess.red,
                message: "* Error: Table id can't be space",
            });
            return;
        }

        for (let i = 0; i < tableId.length; i++) {
            for (let j = 0; j < forbiddenCharacter.length; j++) {
                if (tableId[i] == forbiddenCharacter[j]) {
                    setField({
                        state: StateProcess.red,
                        message: `* Error: Have forbidden character ("${forbiddenCharacter[j]}") in table id, please change before try again.`,
                    });
                    return;
                }
            }
        }

        swal.showLoading();

        const response = await updateTable(table.id, tableId, tableStatus);

        if (response === null) {
            setField({
                state: StateProcess.red,
                message:
                    "* Error: Something went wrong update table had failed.",
            });
            swal.close();
            return;
        }

        setField({
            state: StateProcess.green,
            message: "* Success: Update a new table success.",
        });

        swal.fire({
            icon: "success",
            title: "Success",
            text: "Update a new table success",
            confirmButtonColor: color.lightGreen,
            ...offsetTimer,
        });

        setRefresh(!refresh);
    }

    function initSheet(open: boolean) {
        if (open) {
            setField({ state: StateProcess.none, message: "" });
        }
    }

    return (
        <Sheet onOpenChange={initSheet}>
            <SheetTrigger>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <BiSolidEdit />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Edit</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader className="mb-5">
                    <SheetTitle>Edit a table</SheetTitle>
                </SheetHeader>
                <hr />
                <div className="flex flex-col mt-5">
                    <form onSubmit={(e) => validationInfo(e, tableId)}>
                        <div className="flex flex-col space-y-7">
                            <div className="block space-y-2">
                                <div className="flex justify-between items-start">
                                    <LabelBase htmlFor="input-table-id">
                                        Table id
                                    </LabelBase>
                                    <InputBase
                                        id="input-table-id"
                                        value={tableId}
                                        onChange={(e) =>
                                            setTableId(e.target.value)
                                        }
                                        minLength={1}
                                        maxLength={4}
                                        required
                                    />
                                </div>
                                {field.state === StateProcess.red && (
                                    <div className="flex justify-end">
                                        <DangerButton
                                            disabled
                                            className="text-left"
                                        >
                                            {field.message}
                                        </DangerButton>
                                    </div>
                                )}
                            </div>
                            <div className="flex justify-between items-start">
                                <LabelBase htmlFor="input-table-uuid">
                                    uuid
                                </LabelBase>
                                <InputBase
                                    id="input-table-uuid"
                                    value={table.uuid}
                                    className="text-opacity-50"
                                    readOnly
                                />
                            </div>
                            <div className="flex justify-between">
                                <LabelBase htmlFor="input-table-status">
                                    status
                                </LabelBase>
                                <SelectStatus
                                    defaultSelect={table.status}
                                    setTableStatus={setTableStatus}
                                />
                            </div>
                        </div>
                        {field.state === StateProcess.green && (
                            <div className="flex justify-start mt-5">
                                <PrimaryButton className="bg-opacity-50 w-full">
                                    {field.message}
                                </PrimaryButton>
                            </div>
                        )}
                        <div className="flex justify-end mt-10">
                            <div className="flex space-x-3">
                                <SheetClose asChild>
                                    <SecondaryButton type="button">
                                        Cancle
                                    </SecondaryButton>
                                </SheetClose>
                                {haveChange && (
                                    <PrimaryButton type="submit">
                                        Update
                                    </PrimaryButton>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default SheetUpdateTable;
