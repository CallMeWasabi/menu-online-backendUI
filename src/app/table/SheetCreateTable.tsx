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
import { createTable, findTable } from "@/model/dbModuleTable";
import { swal, offsetTimer } from "@/provider/swalProvider";
import { color } from "@/provider/themeColor";
import SelectStatus from "./SelectStatus";
import { AiOutlinePlus } from "react-icons/ai";

export const forbiddenCharacter = [
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
    refresh: boolean;
    setRefresh: Function;
}

async function validationInfo(
    e: FormEvent,
    tableId: string,
    setTableId: Function,
    setField: Function,
    tableUid: string,
    setTableUid: Function,
    tableStatus: string,
    setTableStatus: Function,
    refresh: boolean,
    setRefresh: Function
) {
    e.preventDefault();
    setField({ state: StateProcess.none, message: "" });

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
    const tableFromDb = await findTable(tableId);
    if (tableFromDb !== null) {
        setField({
            state: StateProcess.red,
            message: "* Error: This table id already exist.",
        });
        swal.close();
        return;
    }

    const response = await createTable(tableId, tableUid, tableStatus);

    if (response === null) {
        setField({
            state: StateProcess.red,
            message: "* Error: Something went wrong create table had failed.",
        });
        swal.close();
        return;
    }

    setTableId("");
    setTableUid(crypto.randomUUID());
    setField({
        state: StateProcess.green,
        message: "* Success: Create a new table success.",
    });
    swal.fire({
        icon: "success",
        title: "Success",
        text: "Create a new table success",
        confirmButtonColor: color.lightGreen,
        ...offsetTimer,
    });

    setRefresh(!refresh);
}

function initSheet(open: boolean, setTableId: Function, setField: Function) {
    if (open) {
        setTableId("");
        setField({ state: StateProcess.none, message: "" });
    }
}

const SheetCreateTable = ({ refresh, setRefresh }: Props) => {
    const [tableId, setTableId] = useState<string>("");
    const [tableStatus, setTableStatus] = useState<string>("1");
    const [tableUid, setTableUid] = useState<string>(() => crypto.randomUUID());
    const [field, setField] = useState<{
        state: StateProcess;
        message: string;
    }>({ state: StateProcess.none, message: "" });
    const [trigger, setTrigger] = useState<boolean>(false);

    useEffect(() => {
        setTableUid(crypto.randomUUID());
    }, [trigger]);

    return (
        <Sheet onOpenChange={(open) => initSheet(open, setTableId, setField)}>
            <SheetTrigger>
                <PrimaryButton onClick={() => setTrigger(!trigger)}>
                    <div className="flex justify-start items-center space-x-2">
                        <AiOutlinePlus />
                        <p>Create new table</p>
                    </div>
                </PrimaryButton>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader className="mb-5">
                    <SheetTitle>Create a new table</SheetTitle>
                </SheetHeader>
                <hr />
                <div className="flex flex-col mt-5">
                    <form
                        onSubmit={(e) =>
                            validationInfo(
                                e,
                                tableId,
                                setTableId,
                                setField,
                                tableUid,
                                setTableUid,
                                tableStatus,
                                setTableStatus,
                                refresh,
                                setRefresh
                            )
                        }
                    >
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
                                    value={tableUid}
                                    className="text-opacity-50"
                                    readOnly
                                />
                            </div>
                            <div className="flex justify-between">
                                <LabelBase htmlFor="input-table-status">
                                    status
                                </LabelBase>
                                <SelectStatus setTableStatus={setTableStatus} />
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
                                <PrimaryButton type="submit">
                                    Create
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default SheetCreateTable;
