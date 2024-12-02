import React, { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { Loader } from "lucide-react";
import useAuthModal from "@/hooks/useAuthModal";
import { auth } from "@/lib/firebase.config";
import OtpPhoneNoRegister from "@/components/shared/OtpPhoneNoRegister";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const [user, setUser] = useState<User | null>(null);
  const { onOpen } = useAuthModal();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [onOpen]);

  if (loading)
    return (
      <div className="w-full mx-auto">
        <Loader className=" animate-spin" />
      </div>
    );

  return user ? children : <OtpPhoneNoRegister />;
};

export default ProtectedRoute;
