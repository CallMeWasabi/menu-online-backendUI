import Link from "next/link";

const Navbar = () => {
    return (
        <div
            className={`sticky top-0 flex justify-start space-x-8 border-b px-5 py-3 border-[#2e2e2e] font-semibold bg-[#1c1c1c]`}
        >
            <Link href={"/create"}>Create QR</Link>
            <Link href={"/table"}>Table editor</Link>
            <Link href={"/menu"}>Menu</Link>
            <Link href={"/setting"}>Setting</Link>
        </div>
    );
};

export default Navbar;
