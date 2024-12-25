import { lazy, Suspense, useState } from "react";
import { Button } from "../ui/button";
import { Address } from "@/types/product";
import { Plus } from "lucide-react";
import { AddressCardSkeleton } from "../loaders/ProfilePageSkeleton";

const MyAddress = ({ data }: { data?: Address[] }) => {
  const [isAdding, setIsAdding] = useState(false);

  const AddressCard = lazy(() => import("./AddressCard"));

  const handleAddAddress = () => {
    setIsAdding(true);
  };

  return (
    <main className="flex flex-col gap-4">
      <Button
        onClick={handleAddAddress}
        size="lg"
        variant="outline"
        className="mr-auto text-lg"
      >
        <Plus />
        Add Address
      </Button>

      {isAdding && (
        <Suspense fallback={<AddressCardSkeleton />}>
          <AddressCard
            type="profile"
            setIsAdding={() => setIsAdding(!isAdding)}
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
      )}

      {data &&
        data.map((address) => (
          <Suspense key={address.id} fallback={<AddressCardSkeleton />}>
            <AddressCard type="profile" key={address.id} address={address} />
          </Suspense>
        ))}
    </main>
  );
};

export default MyAddress;
