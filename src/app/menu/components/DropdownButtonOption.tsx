import SecondaryButton from "@/components/SecondaryButton";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AiOutlineMore,
    AiOutlineDelete,
    AiOutlineInfoCircle,
} from "react-icons/ai";

interface DropdownButtonOptionProps {
    setStateDialogDelete: Function;
    setStateDialogProperties: Function;
}

const DropdownButtonOption = ({
    setStateDialogDelete,
    setStateDialogProperties,
}: DropdownButtonOptionProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <SecondaryButton>
                    <AiOutlineMore />
                </SecondaryButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent>

                <DropdownMenuItem>
                    <div
                        className="flex items-center justify-start space-x-2"
                        onClick={() => setStateDialogProperties(true)}
                    >
                        <AiOutlineInfoCircle />
                        <p>Properties</p>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setStateDialogDelete(true)}>
                    <div className="flex items-center justify-start space-x-2">
                        <AiOutlineDelete />
                        <p>Delete</p>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default DropdownButtonOption;
