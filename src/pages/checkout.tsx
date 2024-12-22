import { useNavigate } from "react-router-dom";
import { FaLeftLong } from "react-icons/fa6";

const CheckoutPage = () => {
  const navigate = useNavigate();
  return (
    <main className="container mx-auto  py-8 md:py-12">
      {/* Header with Back Button and Logo */}
      <header className="flex items-center justify-between border-b border-black/10  pb-2 sticky top-0 bg-background z-50">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-all"
        >
          <FaLeftLong />
          Back
        </button>
        <img src="/logo.png" alt="Company Logo" className="w-10 h-auto" />
      </header>
      {/* TODO DISPLAY THE ORDER SUMMARY */}
      <section></section>
    </main>
  );
};

export default CheckoutPage;
