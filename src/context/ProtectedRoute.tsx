import { Loader } from "lucide-react";
import LoginBox from "@/components/shared/LoginBox";
import { useQuery } from "@tanstack/react-query";
import AxiosBase from "@/lib/axios";
import { User } from "@/types/product";
import { Skeleton } from "@/components/ui/skeleton";

const ProtectedRoute = ({ children }: { children: React.ReactElement }) => {
  const { data: authUser, isLoading } = useQuery<User>({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await AxiosBase("/api/store/profile/me");
        if (res.data.error || res.data.success === false) return null;
        return res.data;
      } catch (error: any) {
        throw new Error(error.message);
      }
    },
    retry: false,
  });

  if (isLoading)
    return (
      <div className="w-full min-h-screen   flex items-center justify-between">
        <Skeleton className=" h-auto lg:h-[500px]" />
        <div className="flex flex-col gap-3">
          <Skeleton className=" w-full h-[500px]" />
          <Skeleton className=" w-full h-[500px]" />
        </div>
      </div>
    );

  return authUser ? children : <LoginBox />;
};

export default ProtectedRoute;
