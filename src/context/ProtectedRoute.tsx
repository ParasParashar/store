import LoginBox from "@/components/shared/LoginBox";
import { useQuery } from "@tanstack/react-query";
import AxiosBase from "@/lib/axios";
import { User } from "@/types/product";
import { ProfilePageSkeleton } from "@/components/loaders/ProfilePageSkeleton";

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

  if (isLoading) return <ProfilePageSkeleton />;

  return authUser ? children : <LoginBox />;
};

export default ProtectedRoute;
