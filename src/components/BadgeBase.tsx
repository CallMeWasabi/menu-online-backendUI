import { ReactNode } from "react";


interface BadgeBasePrimary extends React.ComponentProps<"p"> {
    children: ReactNode
}

export const BadgeBasePrimary = (props:BadgeBasePrimary) => {
    return (
        <p className={"bg-[#0C1F17] cursor-default border border-[#1B543A] text-[#40bf86] rounded-full font-semibold text-center px-2 py-1 text-[12px]"}>{props.children}</p>
    );
}

interface BadgeBaseSecondary extends React.ComponentProps<"p"> {
    children: ReactNode
}

export const BadgeBaseSecondary = (props:BadgeBaseSecondary) => {
    return (
        <p className="bg-[#232323] cursor-default  border border-[#505050] rounded-full font-semibold text-center px-2 py-1 text-[#bbbbbb] text-[12px]">{props.children}</p>
    );
}
 
interface BadgeBaseDanger extends React.ComponentProps<"p"> {
    children: ReactNode
}

export const BadgeBaseDanger = (props:BadgeBaseDanger) => {
    return (
        <p className="bg-[#291415] cursor-default text-[#E5484D] font-semibold text-[12px] border px-2 py-1 text-center border-[#822025] rounded-full">{props.children}</p>
    );
}