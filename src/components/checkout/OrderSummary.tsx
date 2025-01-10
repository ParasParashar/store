import { useCart } from "@/hooks/useCart";
import { FaLock } from "react-icons/fa6";
import { Navigate } from "react-router-dom";

const OrderSummary = () => {
  const { detailedItems } = useCart();
  const total = detailedItems.reduce((sum, item) => {
    const p = item.variants[0].attributes[0].price || item.price;
    const discountedPrice = item.discountPercent
      ? p - (item.discountPercent * p) / 100
      : p;
    return sum + discountedPrice * item.quantity;
  }, 0);
  if (detailedItems.length === 0 || !detailedItems) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-col h-full lg:h-screen  bg-gray-100 rounded-b-lg p-5">
      <div className=" flex flex-col items-center justify-center py-10 lg:py-14 border-b">
        <span className=" text-[#737373] text-sm">Total Amount</span>
        <span className="text-5xl text-blue-800 font-semibold">
          ₹ {total.toFixed(2)}
        </span>
        <div className="flex items-center gap-2 mt-3 text-sm">
          <FaLock color={"green"} />
          <span>Secure</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto h-full custom-scrollbar ">
        <p className="text-lg font-semibold pt-2">Order Details</p>
        {detailedItems.map((item) => {
          const p = item.variants[0].attributes[0].price || item.price;

          const discountedPrice = item.discountPercent
            ? p - (item.discountPercent * p) / 100
            : p;
          const totalPrice = discountedPrice * item.quantity;

          return (
            <div
              key={`${item.id}-${item.variants[0]?.id}-${item.variants[0]?.attributes[0]?.id}`}
              className="relative flex items-center justify-between p-4 "
            >
              <div className="flex gap-3 items-center">
                <div className="w-[10%] flex-shrink-0 relative">
                  <img
                    src={item.variants[0]?.images[0] || "/default-image.jpg"}
                    alt={item.name}
                    className="rounded-lg object-fill w-full aspect-square border"
                  />
                </div>
                <div className="flex flex-col flex-1">
                  <h6 className=" text-sm font-semibold text-muted-foreground truncate">
                    {item.name}-
                    <span className=" text-muted-foreground">
                      {item.variants[0]?.color}
                    </span>
                  </h6>
                  <div className="flex gap-2 items-center">
                    <div className="flex gap-3 text-sm font-medium mt-1">
                      <p className="text-muted-foreground">
                        Size:{" "}
                        <span className="text-primary">
                          {item.variants[0]?.attributes[0]?.size}
                        </span>
                      </p>
                    </div>
                    <div className="flex gap-3 text-sm font-medium mt-1">
                      <p className="text-muted-foreground">
                        Qty:{" "}
                        <span className="text-primary">{item.quantity}</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-md font-medium">₹{totalPrice.toFixed(2)}</p>
            </div>
          );
        })}
      </div>

      {/* Sticky Footer */}
      <div className="  border-t py-2 px-4  ">
        <div className="flex justify-between items-center text-sm mt-2">
          <p className="text-muted-foreground">
            Subtotal -{" "}
            <span className=" font-semibold text-black">
              {detailedItems.length} items
            </span>
          </p>
          <p className="font-semibold">₹{total.toFixed(2)}</p>
        </div>
        <div className="flex justify-between items-center text-sm mt-2">
          <p className="text-muted-foreground">Shipping</p>
          <p className="font-semibold text-muted-foreground">FREE</p>
        </div>
        <div className="flex justify-between items-center text-sm mt-2">
          <p className="text-black text-lg font-bold">Total</p>
          <div className="flex flex-col  items-end">
            <p className="text-lg font-bold">₹{total.toFixed(2)}</p>
            <p className="text-muted-foreground text-sm font-medium">
              (Incl. of All Taxes)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
