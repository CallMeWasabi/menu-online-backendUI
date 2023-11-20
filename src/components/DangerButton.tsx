import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface DangerButtonProps extends React.ComponentProps<"button"> {
    className?: string;
    children: ReactNode;
}

const DangerButton = ({ className = "", ...props }: DangerButtonProps) => {
    return (
        <button
            className={twMerge(
                "bg-[#291415] text-[#E5484D] text-[14px] border border-[#822025] rounded-md px-2 py-1 hover:bg-[#E5484D] hover:text-white hover:border-[#E5484D] transition",
                className
            )}
            {...props}
        >
            {props.children}
        </button>
    );
};

export default DangerButton;
