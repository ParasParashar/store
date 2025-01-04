import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import React, { useEffect, useState } from "react";
import PhoneInput from "react-phone-input-2";
import { Button } from "../ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "../ui/hover-card";
import { Loader, Loader2, Pencil, Trash, X } from "lucide-react";
import { formatDate } from "@/lib/utils";
import AxiosBase from "@/lib/axios";
import toast from "react-hot-toast";

type props = {
  address: {
    id: string;
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
    phoneNumber: string;
    updatedAt?: string;
  };
  setIsAdding?: () => void | null;
  type: "shipping" | "profile";
};

const AddressCard = ({ address, type, setIsAdding }: props) => {
  const queryClient = useQueryClient();
  const [initialphoneNumber, setInitialphoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState(false);
  const [showReenter, setShowReenter] = useState(false);
  const [isEdit, setIsEdit] = useState(type === "shipping" ? true : false);
  const [formData, setFormData] = useState({
    id: "",
    street: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phoneNumber: "",
  });

  useEffect(() => {
    if (address) {
      setFormData(address);
    }
    if (!address.phoneNumber) {
      setIsEdit(true);
    }
  }, [address]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      phoneNumber: value,
    }));
    const phoneRegex = /^[6-9]\d{9}$/; //to check numver is valid or not
    if (!phoneRegex.test(value)) {
      setPhoneError(true);
    } else {
      setPhoneError(false);
    }

    //  if re-entry is needed
    if (value !== initialphoneNumber) {
      setShowReenter(true);
    } else {
      setShowReenter(false);
    }
  };

  const handleReenterPhoneChange = (value: string) => {
    setInitialphoneNumber(value);

    if (value === formData.phoneNumber) {
      setShowReenter(false);
      setPhoneError(false);
    } else {
      setPhoneError(true);
    }
  };

  const { mutate: handleSubmit, isPending } = useMutation({
    mutationFn: async (e: React.FormEvent) => {
      try {
        e.preventDefault();
        const { data } = await AxiosBase.post(
          "/api/store/profile/create/address",
          formData
        );
        if (!data.success) throw new Error(data.message);
        return data;
      } catch (error: any) {
        console.error(error.message);
        toast.error("Failed to create or update address");
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      setIsEdit(false);
      setIsAdding?.();
      toast.success(data.message || "Created successfully");
    },
  });

  // delete address
  const { mutate: deleteAddress, isPending: deletePending } = useMutation({
    mutationFn: async (e: MouseEvent) => {
      e.preventDefault();
      const { data } = await AxiosBase.delete(
        `/api/store/profile/address/delete/${address.id}`
      );
      if (!data.success) throw new Error(data.message);
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message || "Procuct is deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to do action.");
    },
  });
  return (
    <motion.div
      className="flex-1"
      initial={{ opacity: 0, y: 50, scale: 0 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden">
        {type === "profile" && (
          <CardHeader className="flex flex-row items-center justify-between gap-3 overflow-hidden  mb-4 pb-4 border-b  ">
            <CardTitle className="text-xl sm:text-2xl font-semibold sm:text-center text-muted-foreground  ">
              {address.phoneNumber !== "" ? "Edit" : "Add"} Address
            </CardTitle>
            <div className="flex items-center  gap-3">
              {address.phoneNumber !== "" && (
                <HoverCard>
                  <HoverCardTrigger className="">
                    <Button
                      onClick={(e) => deleteAddress(e)}
                      size={"icon"}
                      disabled={deletePending}
                      variant={"ghost"}
                      className="rounded-full text-red-500"
                    >
                      {deletePending ? (
                        <Loader2 className="animate-spin" />
                      ) : (
                        <Trash className="h-4 w-4" />
                      )}
                    </Button>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-auto p-1 text-xs">
                    Delete Addres
                  </HoverCardContent>
                </HoverCard>
              )}
              {isEdit ? (
                <X
                  size={20}
                  className="cursor-pointer right-0 top-0"
                  onClick={() => setIsEdit(!isEdit)}
                />
              ) : (
                <HoverCard>
                  <HoverCardTrigger className="">
                    <Pencil
                      size={15}
                      className="cursor-pointer"
                      onClick={() => setIsEdit(true)}
                    />
                  </HoverCardTrigger>
                  <HoverCardContent className="w-auto p-1 text-xs">
                    Edit Addres
                  </HoverCardContent>
                </HoverCard>
              )}
            </div>
          </CardHeader>
        )}

        {!address ||
          (isEdit && (
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-2 gap-4 px-4 p-2"
            >
              <div className="row-span-1">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <Input
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                  required
                  disabled={!isEdit}
                  autoFocus
                />
              </div>
              <div className="row-span-1">
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700"
                >
                  State
                </label>
                <Input
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="State"
                  required
                  disabled={!isEdit}
                />
              </div>
              <div className="row-span-1">
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </label>
                <Input
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City"
                  required
                  disabled={!isEdit}
                />
              </div>
              <div className="row-span-1">
                <label
                  htmlFor="postalCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Postal Code
                </label>
                <Input
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="Postal Code"
                  required
                  disabled={!isEdit}
                />
              </div>
              <div className="col-span-2">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-gray-700"
                >
                  Street
                </label>
                <Input
                  id="street"
                  name="street"
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Street Address"
                  required
                  disabled={!isEdit}
                />
              </div>
              <div className="col-span-2 space-y-3">
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <PhoneInput
                  inputProps={{
                    id: "phoneNumber",
                    name: "phoneNumber",
                    required: true,
                    placeholder: "Enter phone number",
                  }}
                  country={"in"}
                  onlyCountries={["in"]}
                  value={formData.phoneNumber}
                  onChange={handlePhoneChange}
                  inputStyle={{
                    width: "100%",
                    height: "40px",
                    fontSize: "16px",
                    color: "black",
                    borderRadius: "0.375rem",
                    border: "1px solid #e5e7eb",
                    background: "#fff9ed",
                  }}
                  containerClass="react-phone-input-container"
                  disabled={!isEdit}
                />
                {showReenter && (
                  <div>
                    <label
                      htmlFor="reenterPhone"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Re-enter Phone Number
                    </label>
                    <PhoneInput
                      inputProps={{
                        id: "reenterPhone",
                        name: "reenterPhone",
                        required: true,
                        placeholder: "Re-enter phone number",
                      }}
                      country={"in"}
                      onlyCountries={["in"]}
                      value={initialphoneNumber}
                      onChange={handleReenterPhoneChange}
                      inputStyle={{
                        width: "100%",
                        height: "40px",
                        fontSize: "16px",
                        color: "black",
                        borderRadius: "0.375rem",
                        border: "1px solid #e5e7eb",
                        background: "#fff9ed",
                      }}
                    />
                    {phoneError && (
                      <p className="text-red-500 text-sm mt-2">
                        Phone number does not match the initial value.
                      </p>
                    )}
                  </div>
                )}
              </div>
              {isEdit && (
                <Button
                  type="submit"
                  disabled={isPending || phoneError}
                  variant={"secondary"}
                  size={"lg"}
                  className="col-span-2"
                >
                  {isPending ? (
                    <Loader className="animate-spin" />
                  ) : address.phoneNumber === "" ? (
                    "Add Address"
                  ) : (
                    "Update Address"
                  )}
                </Button>
              )}
            </form>
          ))}
        {address.phoneNumber && !isEdit && (
          <CardDescription className="p-2 px-2">
            <p className="text-sm font-medium">
              {address.street}, {address.city}, {address.state},{" "}
              {address.country}
            </p>
            <p className="text-sm font-medium">{address.postalCode}</p>
            <p className="text-sm font-medium">{address.phoneNumber}</p>
            <p className="text-sm">{formatDate(address.updatedAt)}</p>
          </CardDescription>
        )}
      </Card>
    </motion.div>
  );
};

export default AddressCard;
