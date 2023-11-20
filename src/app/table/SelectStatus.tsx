import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { HiStatusOnline, HiStatusOffline } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";

interface SelectStatusProps {
    defaultSelect?: string;
    setTableStatus: Function;
}

const SelectStatus = ({
    defaultSelect = "1",
    setTableStatus,
}: SelectStatusProps) => {
    return (
        <Select
            defaultValue={defaultSelect}
            onValueChange={(value) => setTableStatus(value)}
        >
            <SelectTrigger className="w-[150px] transition">
                <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup defaultValue={"1"}>
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
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default SelectStatus;
