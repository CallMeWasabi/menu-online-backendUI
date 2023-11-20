import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface SecondaryButtonProps extends React.ComponentProps<"button"> {
    className?: string,
    children: ReactNode;
}

const SecondaryButton = ({ className="", ...props }: SecondaryButtonProps) => {
    return (
        <button className={twMerge("bg-[#2e2e2e] border border-[#3e3e3e] hover:bg-[#343434] hover:border-[#505050] rounded-md px-3 py-1 text-white text-[12px] transition", className)} {...props}>
            {props.children}
        </button>
    );
};

export default SecondaryButton;
