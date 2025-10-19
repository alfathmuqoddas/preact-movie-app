import { type ComponentChildren } from "preact";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
export default function MainLayout({
  children,
}: {
  children: ComponentChildren;
}) {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-4rem-3rem)] max-w-6xl px-4 sm:px-6 lg:px-8 mx-auto py-4">
        {children}
      </main>
      <Footer />
    </>
  );
}
