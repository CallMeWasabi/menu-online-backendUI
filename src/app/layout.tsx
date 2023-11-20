import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./Navbar";
import { ThemeProvider } from "@/components/Theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Controls Web App",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {

    return (
        <html lang="en">
            <body className={`${inter.className}`}>
                <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
                    <Navbar />
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
