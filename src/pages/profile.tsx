import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FaCubesStacked, FaLocationArrow, FaCircle } from "react-icons/fa6";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import MyAddress from "@/components/profile/MyAddress";
import MyOrders from "@/components/profile/MyOrders";
import { User } from "@/types/product";

const ProfilePage = () => {
  const { data: authUser } = useQuery<User>({ queryKey: ["authUser"] });

  if (!authUser) return null;

  const [activeSection, setActiveSection] = useState<"orders" | "address">(
    "address"
  );

  return (
    <main className="flex flex-col  min-h-screen md:flex-row gap-4 py-6 px-4 container mx-auto border-t border-black/10 mt-2">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="lg:h-[500px] flex flex-col justify-between gap-3 p-4 border-secondary border-2 lg:sticky top-20 rounded-xl"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-3 pb-4 border-b">
            <FaCircle size={28} />
            <p className="text-xl font-semibold">Hello, {authUser.name}</p>
          </div>

          <h2 className="text-lg text-slate-700 font-semibold">
            Your Activity
          </h2>
          <Button
            variant="secondary"
            className="flex gap-2 justify-start px-4 items-center"
            onClick={() => setActiveSection("orders")}
          >
            <FaCubesStacked size={20} />
            <p className="text-base font-medium">My Orders</p>
          </Button>

          <Button
            variant="secondary"
            className="flex gap-2 justify-start px-4 items-center"
            onClick={() => setActiveSection("address")}
          >
            <FaLocationArrow size={20} />
            <p className="text-base font-medium">My Address</p>
          </Button>
        </div>
      </motion.div>

      <motion.div
        className="flex-1 max-h-[calc(100vh-120px)] overflow-y-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {activeSection === "orders" && <MyOrders orders={authUser.orders} />}
        {activeSection === "address" && <MyAddress data={authUser.addresses} />}
      </motion.div>
    </main>
  );
};

export default ProfilePage;
