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
    <main className=" w-full min-h-screen">
     
      <section className="grid gap-5 lg:gap-0  grid-cols-1 lg:grid-cols-2 ">
        {/*payment method and order address  or billing address  */}
        <motion.div
          className="flex-1 lg:pl-32 lg:border-r order-2 lg:order-1"
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
          className="flex-1 lg:pr-20  h-[calc(100vh-75px)] order-1 lg:order-2"
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
