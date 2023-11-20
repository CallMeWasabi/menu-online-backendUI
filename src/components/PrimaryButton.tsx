import React from "react";
import { twMerge } from "tailwind-merge";

interface PrimaryButtonProps extends React.ComponentProps<"button"> {
    className?: string;
    children: React.ReactNode;
}

const PrimaryButton = ({ className = "", children, ...props }: PrimaryButtonProps) => {
    return (
        <button
            className={twMerge(
                " bg-[#2B825B] border  border-[#40BF86] text-white text-[12px] px-2 py-1 rounded-md hover:bg-[#40BF86] transition",
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;
