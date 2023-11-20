"use client";

import Link from "next/link";
import { loadTypeNameOnline } from "@/model/dbModuleTypeMenu";
import { useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { AiOutlineReload } from "react-icons/ai";
import { DataContext } from "../layout";
import { MenuProps } from "../page";

const SidebarMenu = () => {
    const [query, setQuery] = useState<any>([]);
    const [buttonLoading, setButtonLoading] = useState<boolean>(false);
    const [current, setCurrent] = useState<string>("");
    const [singleReload, callSingleReload] = useState<boolean>(false);

    const context = useContext(DataContext);
    const pathname = usePathname().split("/");

    useEffect(() => {
        async function asyncProcess() {
            setButtonLoading(true)
            const queryFromDb = await loadTypeNameOnline();

            if (queryFromDb === null) {
                setQuery([]);
                setCurrent("");
                return;
            }

            setQuery(queryFromDb);
            setButtonLoading(false);
        }
        asyncProcess();
    }, [context.reload, singleReload]);

    useEffect(() => {
        if (pathname.length === 2) {
            setCurrent("home");
        } else if (pathname.length >= 3) {
            setCurrent(pathname[2]);
        }
    }, [pathname]);

    return (
        <div className="space-y-4 flex flex-col h-full text-[14px]">
            <div className="flex flex-col space-y-2 p-6 border-b border-[#2e2e2e]">
                <p className="text-[#707070] mb-2">Type</p>
                <Link
                    className={`w-full ${
                        current === "home"
                            ? "text-white font-semibold"
                            : "text-[#bbbbbb]"
                    } cursor-pointer rounded-md hover:text-white transition`}
                    href={"/menu/"}
                >
                    Home
                </Link>
            </div>
            <div className="flex flex-col space-y-2 px-6 py-3">
                <div className="flex justify-between text-[#707070] mb-2">
                    <p>Menu</p>
                    <button
                        className={`hover:text-white transition ${buttonLoading && "animate-spin bg-opacity-50"}`}
                        onClick={() => callSingleReload(!singleReload)}
                        disabled={buttonLoading}
                    >
                        <AiOutlineReload />
                    </button>
                </div>
                {query.map((menu: MenuProps) => {
                    return (
                        <Link
                            key={menu.id}
                            className={`w-full ${
                                current === menu.title
                                    ? "text-white font-semibold"
                                    : "text-[#bbbbbb]"
                            } cursor-pointer rounded-md hover:text-white transition`}
                            href={`/menu/${menu.title}`}
                        >
                            {menu.title}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default SidebarMenu;
