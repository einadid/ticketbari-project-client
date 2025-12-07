import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role = 'user', isLoading: isRoleLoading } = useQuery({
    queryKey: ['role', user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      try {
        const res = await axiosSecure.get(`/users/role/${user.email}`);
        return res.data.role;
      } catch (error) {
        console.error('Error fetching role:', error);
        return 'user';
      }
    }
  });

  return [role, isRoleLoading];
};

export default useRole;