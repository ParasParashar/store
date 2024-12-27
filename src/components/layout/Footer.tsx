import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t px-4 md:px-6 lg:px-10 w-full h-screen bg-[#000] relative z-20">
      <div className="container py-8 md:py-12 absolute">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="mb-4 text-lg text-muted-foreground font-semibold">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/products"
                  className="text-sm text-white hover:text-muted-foreground hover:underline"
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className="text-sm text-white hover:text-muted-foreground hover:underline"
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link
                  to="/featured"
                  className="text-sm text-white hover:text-muted-foreground hover:underline"
                >
                  Featured
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg text-muted-foreground font-semibold">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-white hover:text-muted-foreground hover:underline"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-white hover:text-muted-foreground hover:underline"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/careers"
                  className="text-sm text-white hover:text-muted-foreground hover:underline"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg text-muted-foreground font-semibold">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/faq"
                  className="text-sm text-white hover:text-muted-foreground hover:underline"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  to="/shipping"
                  className="text-sm text-white hover:text-muted-foreground hover:underline"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link
                  to="/returns"
                  className="text-sm text-white hover:text-muted-foreground hover:underline"
                >
                  Returns
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg text-muted-foreground font-semibold">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-muted-foreground">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-muted-foreground">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-muted-foreground">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 flex flex-col items-center gap-4  w-full">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Fashion Store. All rights reserved.
          </p>
          <p className="text-white text-7xl min-[380px]:text-8xl min-[500px]:text-9xl sm:text-[10rem] md:text-[12rem] min-[850px]:text-[14rem] min-[950px]:text-[15rem] mt-4 text-center uppercase jaro-LogoStyle tracking-widest w-full">Fashion</p>
        </div>
      </div>
    </footer>
  );
}
