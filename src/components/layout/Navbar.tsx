import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, Menu, X } from "lucide-react";
import { IoBagOutline } from "react-icons/io5";

import useCartController from "@/hooks/useCartController";
import { useCart } from "@/hooks/useCart";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { onOpen } = useCartController();
  const { items } = useCart();

  // tracking navbar visible or not
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      // Scrolling down
      setShowNavbar(false);
    } else {
      // Scrolling up
      setShowNavbar(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  return (
    <header
      className={`sticky sm:px-4 md:px-6 lg:px-10  top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="flex justify-between h-16 items-center">
        <div className="flex sm:gap-2 md:gap-4">
          <Button
            variant="ghost"
            size={"sm"}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <span className="flex items-center gap-3 ">
                {" "}
                <X className={`h-5 w-5`} />{" "}
                <span className=" max-sm:hidden">Close</span>
              </span>
            ) : (
              <span className="flex items-center gap-3">
                {" "}
                <Menu className="h-5 w-5" />{" "}
                <span className=" max-sm:hidden">Menu</span>
              </span>
            )}
          </Button>

          <Button variant="ghost" size={"sm"} className="gap-2">
            <MagnifyingGlassIcon className="h-5 w-5" />{" "}
            <span className=" max-sm:hidden">Search</span>
          </Button>
        </div>

        <Link to="/" className="flex items-center md:mr-16 lg:mr-24 space-x-2">
          <span className="max-[450px]:text-4xl text-5xl jaro-LogoStyle text-black/90">
            FASHION
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            asChild
            className=" max-sm:hidden"
          ></Button>
          <Button
            onClick={onOpen}
            variant="ghost"
            size="icon"
            asChild
            className="relative max-sm:hidden"
          >
            <div className="relative">
              <IoBagOutline size={20} />
              {items.length > 0 && (
                <span className="absolute rounded-full bg-blue-50 p-3 text-center flex items-center justify-center w-0 h-0 top-[-7px] right-[-5px]">
                  {items.length}
                </span>
              )}
            </div>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link to="/account">
              <User className="h-5 w-5" color="black" />
            </Link>
          </Button>
        </div>
      </div>

      {isMenuOpen && (
        <div className={`border border-black `}>
          <nav className="flex flex-col space-y-4 pb-4">
            <Link
              to="/products"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Shop
            </Link>
            <Link
              to="/collections"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Collections
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
