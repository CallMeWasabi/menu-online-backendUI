import { color } from "@/provider/themeColor";
import { twMerge } from "tailwind-merge";

interface InputProps extends React.ComponentProps<"input"> {
    className?: string;
}

const InputBase = ({ className = "", ...props }: InputProps) => {
    return (
        <input
            className={twMerge(
                `bg-[#292929] border border-[#3e3e3e] rounded-md px-3 py-1 text-[13px] text-white hover:border-[#292929}] outline-0 truncate placeholder-[#505050]`,
                className
            )}
            {...props}
        />
    );
};

export default InputBase;
