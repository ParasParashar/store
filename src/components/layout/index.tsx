import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import CartSlider from "../shared/CartSlider";
import SelectProductVariant from "../shared/SelectProductVariant";

export function Layout() {
  return (
    <section
      className="flex min-h-screen flex-col w-full
  "
    >
      <Navbar />
      <main className="flex-1">
        <CartSlider />
        <Outlet />
        <SelectProductVariant />
      </main>
      <Footer />
    </section>
  );
}
