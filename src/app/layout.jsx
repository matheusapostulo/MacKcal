import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MacKcal",
<<<<<<< HEAD
  description: "Controle suas refeições para obter uma vida mais saudável!",
=======
  description: "Site responsivo para a matéria de Web Mobile",
>>>>>>> release/1.0
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <Header/>
        <section className="containerChildrenLayout">
          {children}
        </section>
      </body>
    </html>
  );
}
