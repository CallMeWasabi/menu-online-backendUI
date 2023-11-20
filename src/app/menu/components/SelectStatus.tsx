import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { HiStatusOnline } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";

const SelectStatus = ({
    setStatus,
    defaultValue = "1",
}: {
    setStatus: Function;
    defaultValue?: string;
}) => {
    return (
        <Select
            defaultValue={defaultValue}
            onValueChange={(value) => setStatus(value)}
        >
            <SelectTrigger id="select-status" className="w-[180px]">
                <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="1">
                    <div className="flex items-center text-[#40bf86] space-x-2">
                        <HiStatusOnline />
                        <p>Enable</p>
                    </div>
                </SelectItem>
                <SelectItem value="0">
                    <div className="flex items-center text-[#e5484d] space-x-2">
                        <AiFillCloseCircle />
                        <p>Closed</p>
                    </div>
                </SelectItem>
            </SelectContent>
        </Select>
    );
};

export default SelectStatus;
