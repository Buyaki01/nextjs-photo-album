import "./globals.css";

export const metadata = {
  title: "Photo Album",
  description: "Created by Ritta Sweta",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
