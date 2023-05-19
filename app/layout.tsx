import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar/Navbar";
import ClientOnly from "@/app/components/clientOnly";
import RegisterModal from "./components/modals/RegisterModal";
import ToasterProvider from "./provider/ToasterProvider";
import LoginModal from "./components/modals/LoginModal";
import getCurrentUser from "./actions/getCurrentUser";
import AddItemModal from "./components/modals/AddItemModal";
import VerifyPaymentAndAddressModal from "./components/modals/VerifyPaymentAndAddressModal";
import SearchModal from "./components/modals/SearchModal";

export const metadata = {
  title: "Modumart",
  description: "Korea Online Mart",
};

const font = Nunito({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={font.className}>
        <ClientOnly>
          <ToasterProvider />
          <LoginModal />
          <SearchModal />
          <AddItemModal />
          <RegisterModal />
          <VerifyPaymentAndAddressModal reservations={[]} />
          <Navbar currentUser={currentUser} />
        </ClientOnly>
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
