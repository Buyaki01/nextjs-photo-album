import { Toaster } from "react-hot-toast"
import Header from "./components/Header"
import "./globals.css"
import Footer from "./components/Footer";

export const metadata = {
  title: "Photo Album",
  description: "Created by Ritta Sweta",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen flex flex-col bg-gray-100">
        <Toaster position="top-left" />
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
