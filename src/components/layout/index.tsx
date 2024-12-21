import { Outlet } from "react-router-dom";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
// import CartSlider from "../shared/CartSlider";
// import SelectProductVariant from "../shared/SelectProductVariant";
import { lazy, Suspense } from "react";
import { Skeleton } from "../ui/skeleton";

export function Layout() {
  const CartSlider = lazy(() => import("../shared/CartSlider"));
  const SelectProductVariant = lazy(
    () => import("../shared/SelectProductVariant")
  );
  return (
    <section
      className="flex min-h-screen flex-col w-full
  "
    >
      <Navbar />
      <main className="flex-1 w-full">
        <Suspense fallback={<Skeleton className="w-10 h-10" />}>
          <CartSlider />
        </Suspense>
        <Outlet />
        <Suspense fallback={<Skeleton className="w-10 h-10" />}>
          <SelectProductVariant />
        </Suspense>
      </main>
      <Footer />
    </section>
  );
}
