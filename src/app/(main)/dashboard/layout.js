import { Inter } from "next/font/google";
import "./globals.css";
import MainHeader from "@/components/main-header/main-header";
import NavigationBar from "@/components/navigation-bar/navigation-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
       <MainHeader />
        <div className="container">
          <NavigationBar />
          <section className="page-container">
              {children}
          </section>
        </div>
        
        
        </body>
    </html>
  );
}
