import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Macadam Tool Box",
    description: "",
};

export default function AuthLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html>
            <body className="h-full flex items-center justify-center 
                bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] 
                from-sky-300 to-blue-800"
            >
                {children}
            </body>
        </html>
    );
}
