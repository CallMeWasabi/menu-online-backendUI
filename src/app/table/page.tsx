"use client";

import { color } from "@/provider/themeColor";
import { useEffect, useState } from "react";
import { loadInfoTable } from "@/model/dbModuleTable";
import InputBase from "@/components/InputBase";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    BadgeBaseDanger,
    BadgeBasePrimary,
    BadgeBaseSecondary,
} from "@/components/BadgeBase";
import { swal } from "@/provider/swalProvider";
import SheetCreateTable from "@/app/table/SheetCreateTable";
import SecondaryButton from "@/components/SecondaryButton";
import DialogProperties from "./DialogProperties";
import { BiGridSmall } from "react-icons/bi";
import { HiStatusOffline, HiStatusOnline } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import SheetUpdateTable from "./SheetUpdateTable";
import { FiLoader } from "react-icons/fi";
import toast, { ToasterModify } from "@/provider/toastProvider";


export interface TableInfo {
    id: string;
    uuid: string;
    value: string;
    status: "0" | "1" | "2";
    createdAt: Date;
    updatedAt: Date;
}

function badgeSelect(status: string) {
    if (status === "1") {
        return <BadgeBasePrimary>Online</BadgeBasePrimary>;
    } else if (status === "2") {
        return <BadgeBaseSecondary>Offline</BadgeBaseSecondary>;
    } else {
        return <BadgeBaseDanger>Closed</BadgeBaseDanger>;
    }
}

async function refreshTable(
    setButtonLoading: Function,
    setTableQuery: Function
) {
    setButtonLoading(true);

    const query = await loadInfoTable();
    if (query === null) {
        toast.error("Fetch data failed", {
            
        })
        swal.fire({
            icon: "error",
            title: "Oops...",
            text: "fetch data failed.",
            confirmButtonColor: color.lightGreen,
        });
        return;
    } else {
        setTableQuery(query);
    }
    toast.success("Table successfully reloaded!");
    setButtonLoading(false);
}

const ViewsPage = () => {
    const [tableQuery, setTableQuery] = useState<any>([]);
    const [backup, setBackup] = useState<any>([]);
    const [filter, setFilter] = useState<string>("4");
    const [search, setSearch] = useState<string>("");
    const [refresh, setRefresh] = useState<boolean>(false);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);

    useEffect(() => {
        async function asyncProcess() {
            const query = await loadInfoTable();

            if (query === null) {
                return [];
            }
            setBackup(query);
        }
        asyncProcess();
    }, [refresh]);

    useEffect(() => {
        let filterTable: TableInfo[] = backup;

        if (search === "") {
            filterTable = backup;
        } else {
            filterTable = backup.filter((table: TableInfo) => {
                if (search.length > table.value.length) {
                    return false;
                }
                for (
                    let i = 0;
                    i < table.value.length - search.length + 1;
                    i++
                ) {
                    if (table.value.substr(i, search.length) === search) {
                        return true;
                    }
                }
                return false;
            });
        }

        if (filter === "4") {
            setTableQuery(filterTable);
        } else {
            setTableQuery([
                ...filterTable.filter(
                    (table: TableInfo) => table.status === filter
                ),
            ]);
        }
    }, [search, backup, filter]);

    return (
        <div className="px-5">
            <ToasterModify />
            <div className="sticky top-[49px] block mb-3 bg-[#1c1c1c] pb-5">
                <h3 className="text-xl mb-5 pt-5">Table editor</h3>
                <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                        <InputBase
                            placeholder="Search by table id"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Select
                            onValueChange={(value) => setFilter(value)}
                            defaultValue="4"
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Filter" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#1c1c1c] text-white">
                                <SelectItem value="4" className="transition">
                                    <div className="flex items-center space-x-2 text-white">
                                        <BiGridSmall />
                                        <p>All</p>
                                    </div>
                                </SelectItem>
                                <SelectItem value="1" className="transition">
                                    <div className="flex items-center space-x-2 text-[#40bf86]">
                                        <HiStatusOnline />
                                        <p>Online</p>
                                    </div>
                                </SelectItem>
                                <SelectItem value="2" className="transition">
                                    <div className="flex items-center space-x-2 text-[#969696]">
                                        <HiStatusOffline />
                                        <p>Offline</p>
                                    </div>
                                </SelectItem>
                                <SelectItem value="0" className="transition">
                                    <div className="flex items-center space-x-2 text-[#e5484d]">
                                        <AiFillCloseCircle />
                                        <p>Closed</p>
                                    </div>
                                </SelectItem>
                            </SelectContent>
                        </Select>
                        <div>
                            <SecondaryButton
                                onClick={() =>
                                    refreshTable(
                                        setButtonLoading,
                                        setTableQuery
                                    )
                                }
                                className={`${
                                    buttonLoading ? "bg-opacity-50" : ""
                                }`}
                                disabled={buttonLoading}
                            >
                                <div className="flex space-x-2 items-center">
                                    {buttonLoading && (
                                        <div className="animate-spin">
                                            <FiLoader />
                                        </div>
                                    )}
                                    <p>Reload</p>
                                </div>
                            </SecondaryButton>
                        </div>
                    </div>
                    <div>
                        <SheetCreateTable
                            refresh={refresh}
                            setRefresh={setRefresh}
                        />
                    </div>
                </div>
            </div>
            <Table>
                <TableCaption>Menu-Online Web Application.</TableCaption>
                <TableHeader>
                    <TableRow className="hover:bg-[#272727]">
                        <TableHead className="w-[100px]">Index</TableHead>
                        <TableHead className="w-[150px]">Status</TableHead>
                        <TableHead className="w-[100px]">uuid</TableHead>
                        <TableHead className="w-[100px]">Table Id</TableHead>
                        <TableHead></TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {tableQuery.map((query: TableInfo, key: number) => {
                        return (
                            <TableRow
                                key={query.id}
                                className={`hover:bg-[#272727] cursor-default ${
                                    query.status === "0" ? "text-[#707070]" : ""
                                }`}
                            >
                                <TableCell>{key}</TableCell>
                                <TableCell>
                                    <div className="w-[70px]">
                                        {badgeSelect(query.status)}
                                    </div>
                                </TableCell>
                                <TableCell className="truncate">
                                    {query.uuid.substr(0, 11)}...
                                </TableCell>
                                <TableCell>{query.value}</TableCell>
                                <TableCell>
                                    <div className="flex items-center space-x-5 text-white text-[18px]">
                                        <SheetUpdateTable
                                            table={query}
                                            refresh={refresh}
                                            setRefresh={setRefresh}
                                        />
                                        <DialogProperties table={query} />
                                    </div>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default ViewsPage;
