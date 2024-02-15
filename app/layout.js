import { Toaster } from "react-hot-toast"
import Header from "./components/Header"
import "./globals.css"

export const metadata = {
  title: "Photo Album",
  description: "Created by Ritta Sweta",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Toaster position="top-left" />
        <Header/>
        {children}
      </body>
    </html>
  );
}
