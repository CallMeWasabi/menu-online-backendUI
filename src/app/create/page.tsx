"use client";

import DangerButton from "@/components/DangerButton";
import PrimaryButton from "@/components/PrimaryButton";
import { findTable, loadOnlineTable, updateUidTable } from "@/model/dbModuleTable";
import { swal, offsetAsk, offsetTimer } from "@/provider/swalProvider";
import { useEffect, useState } from "react";
import { color } from "@/provider/themeColor";
import { generateFileQr } from "./qrcodeManager";
import LabelBase from "@/components/LabelBase";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { TableInfo } from "../table/page";

async function createQr(tableId: string, setTableId: Function) {
    swal.fire({
        icon: "warning",
        title: "Want to create QRCode ?",
        text: `table id "${tableId}"`,
        allowOutsideClick: !swal.isLoading,
        preConfirm: async () => {
            const tableFromDb = await findTable(tableId);

            if (tableFromDb === null) {
                return swal.fire({
                    icon: "error",
                    title: "Not found table",
                    confirmButtonColor: color.lightGreen,
                });
            } else if (tableFromDb.status !== "1") {
                return swal.fire({
                    icon: "error",
                    title: "This table id is not online.",
                    text: "Please check the status of the table id.",
                    confirmButtonColor: color.lightGreen,
                });
            }

            const uuid = await updateUidTable(tableFromDb.id);
            const imageUrl = await generateFileQr(
                `http://192.168.1.3:3001?table-id=${uuid}`
            );

            swal.fire({
                title: `Table id "${tableId}"`,
                timer: 60000,
                timerProgressBar: true,
                confirmButtonColor: color.lightGreen,
                confirmButtonText: "Close",
                imageUrl: imageUrl,
                imageWidth: 200,
                imageHeight: 200,
                imageAlt: "Custom image",
            });
            setTableId("");
        },
        ...offsetAsk,
    });
}

function clearQr() {
    swal.fire({
        icon: "warning",
        title: <p className={`text-[${color.dangerRed}]`}>Danger!</p>,
        text: "Want to clear QRCode ?",
        ...offsetAsk,
        preConfirm: () => {
            const canvas = document.getElementById(
                "qrcode-canvas"
            ) as HTMLCanvasElement;
            const context = canvas.getContext("2d");
            context?.clearRect(0, 0, canvas.width, canvas.height);
        },
    }).then((result) => {
        if (result.isConfirmed) {
            swal.fire({
                icon: "success",
                title: "Delete QR Success",
                ...offsetTimer,
            });
        }
    });
}

const CreatePage = () => {
    const [tableId, setTableId] = useState("");
    const [allPossibleTable, setAllPossibleTabel] = useState<any>([]);

    useEffect(() => {
        async function asyncProcess() {
            const response = await loadOnlineTable();
            if (response === null) {
                swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Fetch data table failed.",
                    confirmButtonColor: color.lightGreen,
                });
            }
            setAllPossibleTabel(response);
        }
        asyncProcess();
    }, []);

    return (
        <div className="flex flex-col space-y-2 px-5 mt-5">
            <h3 className="text-xl">Create QR</h3>
            <LabelBase htmlFor="table-id">Table id</LabelBase>
            <form
                className="space-y-2"
                onSubmit={(e) => {
                    e.preventDefault();
                    createQr(tableId, setTableId);
                }}
            >
                <Select onValueChange={(value) => setTableId(value)}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="table id" />
                    </SelectTrigger>
                    <SelectContent>
                        {allPossibleTable.map((table: TableInfo) => {
                            return (
                                <SelectItem value={table.value} key={table.id}>
                                    {table.value}
                                </SelectItem>
                            );
                        })}
                    </SelectContent>
                </Select>
                <div className="flex justify-start space-x-2">
                    <PrimaryButton type="submit">Create</PrimaryButton>
                    <DangerButton type="button" onClick={clearQr}>
                        Clear
                    </DangerButton>
                </div>
            </form>
            <div className="inline-block space-y-3">
                <canvas id="qrcode-canvas"></canvas>
            </div>
        </div>
    );
};

export default CreatePage;
