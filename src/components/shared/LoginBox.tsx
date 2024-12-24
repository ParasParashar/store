import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";

const LoginBox = () => {
  const handleGoogleSignIn = () => {
    window.location.href = `${
      import.meta.env.VITE_API_BACKEND_URL
    }/auth/google/user`;
  };

  return (
    <div className=" min-h-[500px] bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 opacity-20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-pink-500 opacity-20 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 z-10"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-block p-4 rounded-full bg-primary mb-4"
        >
          <ShoppingBag className="w-8 h-8 text-primary-foreground" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-gray-100 dark:to-gray-400"
        >
          Welcome to ShopHub
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-gray-600 dark:text-gray-300 mb-8"
        >
          Your one-stop destination for all things amazing
        </motion.p>
      </motion.div>

      {/* Sign-In Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <Button
          variant={"ghost"}
          className="w-full flex items-center justify-center bg-white border border-gray-300 shadow-sm hover:scale-105 transition-all duration-300 rounded-lg px-4 py-2"
          onClick={() => handleGoogleSignIn()}
        >
          <FcGoogle size={20} /> Login with Google
        </Button>
      </motion.div>
    </div>
  );
};

export default LoginBox;
