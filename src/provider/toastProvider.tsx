import toast, { Toaster } from "react-hot-toast";

export const ToasterModify = () => {
    return <Toaster position="top-right" reverseOrder={false} toastOptions={{
        style: {
            background: "#1c1c1c",
            border: "1px solid #2e2e2e",
            color: "#ffffff",
            fontSize: "14px",
        }
    }}/>;
};

export default toast;
