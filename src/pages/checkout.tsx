import { useNavigate } from "react-router-dom";
import { FaLeftLong } from "react-icons/fa6";
import { motion } from "framer-motion";
import { lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const Shipping = lazy(() => import("@/components/checkout/Shipping"));
  const OrderSummary = lazy(() => import("@/components/checkout/OrderSummary"));
  return (
    <main className=" w-full  mx-auto min-h-screen container ">
      {/* Header with Back Button and Logo */}
      <header className="flex items-center justify-between border-b border-black/10  pb-2 sticky top-0 bg-background z-50 px-10 lg:px-20">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-neutral-900 transition-all"
        >
          <FaLeftLong />
          Back
        </button>
        <img src="/logo.png" alt="Company Logo" className="w-10 h-auto" />
      </header>
      <section className="grid gap-5 lg:gap-0  grid-cols-1 lg:grid-cols-2 ">
        {/*payment method and order address  or billing address  */}
        <motion.div
          className="flex-1 lg:pl-32 lg:border-r"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {" "}
          <Suspense
            fallback={
              <div>
                <Skeleton className="w-full mt-3 rounded-lg h-20" />
                <Skeleton className="w-full mt-3 rounded-lg h-20" />
                <Skeleton className="w-full mt-3 rounded-lg h-20" />
                <Skeleton className="w-full mt-5 rounded-lg h-24" />
              </div>
            }
          >
            <Shipping />
          </Suspense>
        </motion.div>
        <motion.div
          className="flex-1 bg-secondary lg:pr-20  h-[calc(100vh-75px)]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Suspense
            fallback={
              <div>
                <Skeleton className="w-full mt-3 rounded-lg h-20" />
                <Skeleton className="w-full mt-3 rounded-lg h-20" />
                <Skeleton className="w-full mt-3 rounded-lg h-20" />
              </div>
            }
          >
            <OrderSummary />
          </Suspense>
        </motion.div>
      </section>
    </main>
  );
};

export default CheckoutPage;
