import { Address, User } from "@/types/product";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "../ui/button";
import { lazy, Suspense, useEffect, useState } from "react";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { HoverCard } from "@radix-ui/react-hover-card";
import { HoverCardContent, HoverCardTrigger } from "../ui/hover-card";
import toast from "react-hot-toast";
import AxiosBase from "@/lib/axios";
import { useCart } from "@/hooks/useCart";
import { AddressCardSkeleton } from "../loaders/ProfilePageSkeleton";
import { GiTakeMyMoney } from "react-icons/gi";
import { RiBankFill } from "react-icons/ri";
import { FaLeftLong } from "react-icons/fa6";

const Shipping = () => {
  const { data: authUser } = useQuery<User>({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { items, clearCart } = useCart();
  const [closeStates, setCloseStates] = useState<Record<string, boolean>>({});

  const toggleCloseState = (id: string) => {
    setCloseStates((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const AddressCard = lazy(() => import("../profile/AddressCard"));
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "ONLINE">(
    "ONLINE"
  );
  const [errorMessage, seterrorMessage] = useState("");

  const [selectedAddress, setSelectedAddress] = useState("");
  if (!authUser) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    seterrorMessage("Select a address from the list.");
  }, []);

  const handleSelectAddress = (id: string) => {
    if (!id) seterrorMessage("Please select a address");
    setSelectedAddress(id);
    seterrorMessage("");
  };

  // payment function

  const handleCheckout = async () => {
    try {
      if (!selectedAddress || !paymentMethod) {
        seterrorMessage("Please select an address and payment method");
        return;
      }
      const payload = {
        userId: authUser?.id,
        items: items,
        paymentMethod: paymentMethod,
        addressId: selectedAddress,
      };

      const { data } = await AxiosBase.post(
        "/api/store/order/payment",
        payload
      );
      if (!data.success) throw new error("Order creation failed");
      if (paymentMethod === "COD" && data.success) {
        toast.success("Order placed successfully");
        navigate("/profile");
        setTimeout(() => {
          clearCart();
        }, 1000);
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        order_id: data.order.razorpayOrderId,
        amount: Math.round(data.order.totalAmount * 100),
        currency: "INR",
        name: "Fashion",
        description: "Fashion Store with the latest and trending collections ",
        image: "https://example.com/your_logo",
        handler: async function (response: any) {
          const verifyPayload = {
            orderId: data.order.id,
            ...response,
          };

          try {
            const { data: verifyResponse } = await AxiosBase.post(
              "/api/store/order/payment/verify",
              verifyPayload
            );
            if (verifyResponse.success) {
              toast.success("Payment Successful!");
              navigate("/profile");
              setTimeout(() => {
                clearCart();
              }, 1000);
            } else {
              throw new error("Payment verification failed");
            }
          } catch (errorMessage) {
            console.error("Payment verification errorMessage:", errorMessage);
            toast.error("Payment verification failed.");
          }
        },
        prefill: {
          name: authUser?.name,
          email: authUser?.email,
          // contact: authUser?.phoneNumber,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3c4a50",
        },
        method: {
          upi: true,
          netbanking: true,
          card: true,
          wallet: true,
        },
        modal: {
          ondismiss: async function () {
            try {
              const { data: res } = await AxiosBase.delete(
                `/api/store/order/payment/delete/${data.order.id}`
              );
              if (res.success) {
                toast.error("Order has been canceled.");
              }
            } catch (errorMessage) {
              console.error("Failed to delete the order:", errorMessage);
            }
          },
        },
      };
      // @ts-ignore
      const rzp1 = new window.Razorpay(options);

      rzp1.open();
    } catch (errorMessage: any) {
      toast.error("Failed to initiate payment. Please try again.");
      console.error("Checkout errorMessage:", errorMessage);
      throw new Error(errorMessage.message);
    }
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: handleCheckout,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (errorMessage: any) => {
      console.error(errorMessage);
      throw new errorMessage(
        errorMessage || "Something went wrong. Please try again later."
      );
    },
  });

  return (
    <div className="flex flex-col">
      <header className="h-28 flex items-center justify-between border-b border-black/10 px-4 bg-background ">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-neutral-900 transition-all"
        >
          <FaLeftLong />
          Back
        </button>
       
      </header>
    
    <div className="flex flex-col gap-3 lg:px-10 px-4">
      <p className="text-lg pt-3 text-muted-foreground">Ship to </p>
      {!authUser?.addresses ||
        (authUser.addresses.length === 0 && (
          <Suspense fallback={<AddressCardSkeleton />}>
            <p className="text-muted-foreground  text-sm ">
              Add Shipping address
            </p>
            <AddressCard
              type="shipping"
              address={{
                id: "",
                street: "",
                city: "",
                state: "",
                postalCode: "",
                country: "",
                phoneNumber: "",
              }}
            />
          </Suspense>
        ))}

      {authUser?.addresses &&
        authUser?.addresses?.map((address: Address) => {
          const isClose = closeStates[address.id] || false;

          return (
            <div
              key={address.id}
              onClick={() => handleSelectAddress(address.id)}
              className={cn(
                " rounded-lg border-blue-200 ",
                address.id === selectedAddress &&
                  "border-gray-200 shadow-md shadow-gray-200"
              )}
            >
              {isClose ? (
                <div className="relative ">
                  <Button
                    variant={"outline"}
                    className="rounded-full transition-all  duration-500 ease-in absolute top-[-10px] right-[-8px]"
                    size={"icon"}
                    onClick={() => toggleCloseState(address.id)}
                  >
                    <X size={18} />
                  </Button>
                  <Suspense fallback={<AddressCardSkeleton />}>
                    <AddressCard type="shipping" address={address} />
                  </Suspense>
                </div>
              ) : (
                <Card
                  className={cn(
                    " bg-secondary w-full flex items-center justify-between rounded-sm px-5  cursor-pointer hover:border-gray-200 p-2 border shadow-none   ",
                    address.id === selectedAddress &&
                      "border-gray-200 border-2 shadow-md shadow-gray-200"
                  )}
                >
                  <CardHeader className="p-0">
                    <CardTitle className="text-sm text-primary ">
                      <span className=" text-primary">{authUser.name}</span>-
                      {address.street}-{address.city}
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground">
                      {address.postalCode}-{address.country}
                    </CardDescription>
                  </CardHeader>
                  <HoverCard>
                    <HoverCardTrigger className="">
                      <BsThreeDotsVertical
                        size={15}
                        className="cursor-pointer text-black"
                        onClick={() => toggleCloseState(address.id)}
                      />
                    </HoverCardTrigger>
                    <HoverCardContent className="w-auto p-1 text-xs">
                      Edit Addres
                    </HoverCardContent>
                  </HoverCard>
                </Card>
              )}
            </div>
          );
        })}
      {errorMessage && (
        <p className="text-secondary-foreground  text-xs">{errorMessage}</p>
      )}

      <div className="border-y  py-3">
        <h6 className="text-lg font-semibold">Payments</h6>
        <p className="text-sm text-muted-foreground">
          All transactions are secure and encrypted.
        </p>
        <div className="  flex flex-col gap-3 mt-5">
          <p className="text-foreground ">Select payment type</p>

          <div className="flex items-center gap-1 sm:gap-4">
            <div className={`w-[50%] text-sm sm:text-balance flex items-center justify-center gap-1 sm:gap-3 py-5 px-2 sm:px-8 rounded-md border hover:cursor-pointer hover:border-blue-300  ${paymentMethod === "ONLINE"? 'bg-blue-50 border-blue-200 text-blue-700 font-semibold' : ""}  `}
            onClick={() => setPaymentMethod("ONLINE")}
            >
            
              <RiBankFill />
              <span>OnLine</span>
            </div>
            <div className={`w-[50%] text-sm sm:text-balance flex items-center justify-center gap-1 sm:gap-3 py-5 px-2 sm:px-6 rounded-md border hover:cursor-pointer hover:border-blue-300 ${paymentMethod === "COD"? 'bg-blue-50 border-blue-200 text-blue-700 font-semibold' : ""}  `}
            onClick={() => setPaymentMethod("COD")}
            >
              <GiTakeMyMoney size={20} />
              <span>Cash On Delivary</span>
            
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={() => mutate()}
        disabled={selectedAddress === "" || isPending}
        size={"lg"}
        variant={"outline"}
        className="text-lg  disabled:bg-slate-200 bg-blue-700 text-white hover:bg-blue-800 hover:text-white  transition-all duration-300 ease-in-out"
      >
        Make it Your
      </Button>
      {errorMessage && (
        <p className="text-destructive text-xs">
          Select a shipping address to continure shopping.
        </p>
      )}
      {isError && <p className="text-destructive text-xs">{error.message}</p>}
    </div>

    </div>
  );
};

export default Shipping;
