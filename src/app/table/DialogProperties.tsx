import { FiMoreHorizontal } from "react-icons/fi";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import LabelBase from "@/components/LabelBase";
import { TableInfo } from "./page";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

interface DialogPropertiesProps {
    table: TableInfo;
}

const DialogProperties = ({ table }: DialogPropertiesProps) => {
    return (
        <Dialog>
            <DialogTrigger>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <FiMoreHorizontal />
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>Properties</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </DialogTrigger>
            <DialogContent className="bg-[#232323] p-0 border border-[#2e2e2e] overflow-hidden">
                <DialogHeader className="bg-[#282828] border-b border-[#2e2e2e] px-6 py-4 outline-0">
                    <DialogTitle className="text-[#ebebeb] text-[15px]">
                        Properties
                    </DialogTitle>
                </DialogHeader>
                <div className="flex justify-start space-x-7 px-6 pb-4">
                    <div className="flex flex-col space-y-2 text-[14px]">
                        <LabelBase htmlFor="input-table-id">Table id</LabelBase>
                        <LabelBase htmlFor="input-uuid">uuid</LabelBase>
                        <LabelBase htmlFor="input-status">status</LabelBase>
                        <br />
                        <LabelBase htmlFor="input-created">Created</LabelBase>
                        <LabelBase htmlFor="input-updated">Updated</LabelBase>
                    </div>
                    <div className="flex flex-col text-[14px] space-y-2">
                        <p id="input-table-id">{table.value}</p>
                        <p id="input-uuid">{table.uuid}</p>
                        <p id="input-status">
                            {table.status === "1"
                                ? "Online"
                                : table.status === "0"
                                ? "Closed"
                                : table.status === "2"
                                ? "offline"
                                : "no info"}
                        </p>
                        <br />
                        <p id="input-created">
                            {table.createdAt.toLocaleString("en-TH")}
                        </p>
                        <p id="input-updated">
                            {table.updatedAt.toLocaleString("en-TH")}
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DialogProperties;
