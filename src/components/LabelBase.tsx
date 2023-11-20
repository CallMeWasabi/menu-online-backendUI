import { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface LabelBaseProps extends React.ComponentProps<"label"> {
    htmlFor: string,
    children: ReactNode,
    className?: string
}

const LabelBase = ({ className = "", ...props }: LabelBaseProps) => {
    return (
        <label htmlFor={props.htmlFor} className={twMerge("text-[#969696] text-[14px]", className)}>{props.children}</label>
    );
}
 
export default LabelBase;