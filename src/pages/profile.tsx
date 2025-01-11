import { Button } from "@/components/ui/button";
import { FaCubesStacked, FaLocationArrow, FaSpinner } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

import { motion } from "framer-motion";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import MyAddress from "@/components/profile/MyAddress";
import MyOrders from "@/components/profile/MyOrders";
import { User } from "@/types/product";
import { Loader, LucideLogOut } from "lucide-react";
import AxiosBase from "@/lib/axios";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { data: authUser } = useQuery<User>({ queryKey: ["authUser"] });
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (!authUser) return null;

  const section = searchParams.get("section") || "orders";

  const handleSectionChange = (newSection: "orders" | "address") => {
    setSearchParams({ section: newSection });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      try {
        const { data } = await AxiosBase.post("/api/store/profile/logout");
        if (!data.success) throw new Error(data.error);
        navigate("/login");
        return data;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success(data.message || "Logged out successfully");
      navigate("/login");
    },
    onError: (error: any) => {
      toast.error(error.message || "Logout failed");
    },
  });
  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  return (
    <main className="flex flex-col md:flex-row gap-4 py-6 px-4 container mx-auto mt-2">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className=" h-[500px] flex flex-col justify-between gap-3 p-4 border-secondary border-2   lg:sticky  top-20  rounded-xl"
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center gap-3 pb-4 border-b border-double">
            <FaUserCircle size={28} />
            <p className="text-xl font-semibold">Hello, {authUser.name}</p>
          </div>
          <h2 className=" text-lg text-slate-700 font-semibold ">
            Your Activity
          </h2>

          <Button
            size="lg"
            variant="secondary"
            className="flex gap-2 justify-start px-4 py-8  items-center border border-black/10 rounded-md relative overflow-hidden group"
            onClick={() => handleSectionChange("orders")}
          >
            <FaCubesStacked size={20} />
            <div className="flex flex-col items-start z-10">
              <p className="text-base font-medium text-start">My Order</p>
              <p className="text-xs min-[350px]:text-sm text-gray-600 text-start">
                Check your order status
              </p>
            </div>

            {/* Hover Animation */}
            <span className="absolute inset-0 bg-[#646262ae]  transition-transform transform translate-x-[-100%] group-hover:translate-x-0 z-[-1]"></span>
          </Button>

          <Button
            size="lg"
            variant="secondary"
            className="flex gap-2 justify-start px-4 py-8 items-center border border-black/10 rounded-md relative overflow-hidden group"
            onClick={() => handleSectionChange("address")}
          >
            <FaLocationArrow size={20} />
            <div className="flex flex-col items-start z-10">
              <p className="text-base font-medium text-start">
                Shipping Address
              </p>
              <p className="text-xs min-[350px]:text-sm text-gray-600 text-start text-wrap ">
                Enter address for effortless checkout
              </p>
            </div>

            {/* Hover Animation */}
            <span className="absolute inset-0 bg-[#646262ae]  transition-transform transform translate-x-[-100%] group-hover:translate-x-0 z-[-1]"></span>
          </Button>
        </div>

        <Button onClick={handleLogout} variant="destructive">
          {isPending ? (
            <FaSpinner className="animate-spin" size={15} />
          ) : (
            <LucideLogOut size={16} />
          )}{" "}
          <span>Logout</span>
        </Button>
      </motion.div>

      {/* Main Content Area */}
      <motion.div
        className="flex-1 max-h-[calc(100vh-120px)] overflow-y-auto hide-scrollbar"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {section === "orders" && <MyOrders />}
        {section === "address" && <MyAddress data={authUser.addresses} />}
      </motion.div>
    </main>
  );
};

export default ProfilePage;
