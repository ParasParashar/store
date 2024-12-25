import { useNavigate } from "react-router-dom";
import { FaLeftLong } from "react-icons/fa6";
import OrderSummary from "@/components/checkout/OrderSummary";
import Shipping from "@/components/checkout/Shipping";

const CheckoutPage = () => {
  const navigate = useNavigate();

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
      <section className="grid  grid-cols-1 lg:grid-cols-2 ">
        {/*payment method and order address  or billing address  */}
        <div className="lg:pl-32">
          <Shipping />
        </div>
        <div className="bg-secondary lg:pr-20  h-[calc(100vh-75px)]">
          <OrderSummary />
        </div>
      </section>
    </main>
  );
};

export default CheckoutPage;
