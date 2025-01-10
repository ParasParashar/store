import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/hooks/useCart";
import useCartController from "@/hooks/useCartController";
import { Link, useNavigate } from "react-router-dom";
import { CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { MdDelete } from "react-icons/md";

const CartSlider = () => {
  const { isOpen, onClose } = useCartController();
  const { items, removeItem, detailedItems } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate("/checkout");
    onClose();
  };

  const total = detailedItems.reduce((sum, item) => {
    const p = item.variants[0].attributes[0].price || item.price;
    const discountedPrice = item.discountPercent
      ? p - (item.discountPercent * p) / 100
      : p;
    return sum + discountedPrice * item.quantity;
  }, 0);

  return (
    <Sheet open={isOpen} onOpenChange={() => onClose()}>
      <SheetContent
        side={"right"}
        className="p-0 border-none h-full ring-0  "
      >
        <SheetHeader>
          <SheetTitle className="text-muted-foreground px-4 py-3 border-b">
            Items in my cart: {items.length}
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full w-full">
          {/* Scrollable Cart Items */}
          <SheetDescription className="flex-1 overflow-y-auto p-1 custom-scrollbar">
            {detailedItems.map((item) => {
              const price = item.variants[0].attributes[0].price || item.price;
              const discountedPrice = item.discountPercent
                ? price - (item.discountPercent * price) / 100
                : price;
              const totalPrice = discountedPrice * item.quantity;

              const currentPrice = item?.discountPercent
                ? price - (item?.discountPercent / 100) * price
                : price;
              return (
                <div
                  key={`${item.id}-${item.variants[0]?.id}-${item.variants[0]?.attributes[0]?.id}`}
                  className="relative border-b"
                >
                  <Button
                    variant={"ghost"}
                    size="icon"
                    className="absolute top-2 right-2 rounded-full"
                    onClick={() =>
                      removeItem(
                        `${item.id}-${item.variants[0]?.id}-${item.variants[0]?.attributes[0]?.id}`
                      )
                    }
                  >
                    
                    <MdDelete color="red" size={'20'} />
                  </Button>
                  <CardContent className="p-4 flex gap-3 items-start">
                    <Link
                      to={`/product/${item.slug}`}
                      className="w-1/4 flex-shrink-0"
                    >
                      <img
                        src={
                          item.variants[0]?.images[0] || "/default-image.jpg"
                        }
                        alt={item.name}
                        className="rounded-lg object-cover w-full aspect-square"
                      />
                    </Link>
                    <div className="flex flex-col flex-1">
                      <h6 className="text-lg font-semibold text-muted-foreground truncate">
                        {item.name}
                      </h6>
                      <div className="flex gap-3 text-md font-medium mt-1">
                        <p className="text-muted-foreground">
                          Size:{" "}
                          <span className="text-primary">
                            {item.variants[0]?.attributes[0]?.size}
                          </span>
                        </p>
                        <p className="text-muted-foreground">
                          Qty:{" "}
                          <span className="text-primary">{item.quantity}</span>
                        </p>
                      </div>

                      {/* Price & Discount Section */}
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex gap-2 items-center ">
                        <p className=" text-lg font-bold">
                            ₹{currentPrice}
                          </p>
                          {item.discountPercent !== null &&
                            item?.discountPercent > 1 && (
                              <>
                                <span className="line-through text-xs text-muted-foreground font-bold text-red-500">
                                  {" "}
                                  ₹{item.price}
                                </span>
                                <Badge className="text-[10px] rounded-full">
                                  {item.discountPercent}% OFF
                                </Badge>
                              </>
                            )}
                          
                        </div>
                        {/* <div>
                          <p className="text-md font-medium">
                            Total: ₹{totalPrice.toFixed(2)}
                          </p>
                        </div> */}
                      </div>
                    </div>
                  </CardContent>
                </div>
              );
            })}
          </SheetDescription>

          {/* Sticky Footer */}
          <div className="bg-white shadow-inner rounded-t-xl border-t p-4 sticky bottom-0 backdrop-filter">
            <p className="text-lg font-semibold">Order Details</p>
            <div className="flex justify-between items-center text-sm mt-2">
              <p className="text-muted-foreground">Subtotal</p>
              <p className="font-semibold">₹{total.toFixed(2)}</p>
            </div>
            <div className="flex justify-between items-center mt-4">
              <div className="flex flex-col">
                <p className="text-lg font-bold">₹{total.toFixed(2)}</p>
                <p className="text-muted-foreground text-sm font-medium">
                  (Incl. of All Taxes)
                </p>
              </div>
              <Button
                onClick={handleCheckout}
                className="px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700"
                disabled={items.length === 0}
              >
                PLACE ORDER
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CartSlider;
