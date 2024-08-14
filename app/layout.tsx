import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";
import ToasterContext from "context/ToasterContext";
import AuthContext from "context/AuthContext";
import ActiveStatus from "components/ActiveStatus";
import ThemeProvider from "provider/ThemeProvider";

const inter = Vazirmatn({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat Messenger",
  description: "Hello Friend",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthContext>
            <ToasterContext />
            <ActiveStatus />
            {children}
          </AuthContext>
        </ThemeProvider>
      </body>
    </html>
  );
}
