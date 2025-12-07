import { useQuery } from '@tanstack/react-query';
import { Helmet } from 'react-helmet-async';
import { FaUsers, FaUserShield, FaStore, FaBan, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Loading from '../../../components/shared/Loading';

const ManageUsers = () => {
  const axiosSecure = useAxiosSecure();

  const { data: users = [], isLoading, refetch } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axiosSecure.get('/users');
      return res.data;
    }
  });

  const handleRoleChange = async (user, role) => {
    try {
      const res = await axiosSecure.patch(`/users/role/${user._id}`, { role });
      if (res.data.modifiedCount > 0) {
        refetch();
        toast.success(`${user.name} is now a ${role}!`);
      }
    } catch (error) {
      toast.error('Failed to update role');
    }
  };

  const handleMarkFraud = (user) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "This will hide all tickets from this vendor!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, mark as fraud!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(`/users/fraud/${user._id}`);
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire('Marked as Fraud!', 'Vendor has been restricted.', 'success');
          }
        } catch (error) {
          toast.error('Failed to update status');
        }
      }
    });
  };

  if (isLoading) return <Loading />;

  return (
    <>
      <Helmet>
        <title>Manage Users | TicketBari</title>
      </Helmet>

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 flex items-center gap-3">
          <FaUsers className="text-primary" /> Manage Users
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">User Info</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Email</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300">Role</th>
                  <th className="px-6 py-4 text-sm font-semibold text-gray-600 dark:text-gray-300 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {users.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img 
                          src={user.photo || 'https://i.ibb.co/5GzXkwq/user.png'} 
                          alt={user.name} 
                          className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                        <span className="font-semibold text-gray-800 dark:text-white">{user.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold capitalize
                        ${user.role === 'admin' ? 'bg-red-100 text-red-700' : 
                          user.role === 'vendor' ? 'bg-blue-100 text-blue-700' :
                          'bg-green-100 text-green-700'}`}>
                        {user.role}
                      </span>
                      {user.isFraud && <span className="ml-2 text-xs font-bold text-red-600">(Fraud)</span>}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center gap-2">
                        {user.role !== 'admin' && (
                          <button 
                            onClick={() => handleRoleChange(user, 'admin')}
                            className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                            title="Make Admin"
                          >
                            <FaUserShield />
                          </button>
                        )}
                        {user.role !== 'vendor' && (
                          <button 
                            onClick={() => handleRoleChange(user, 'vendor')}
                            className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                            title="Make Vendor"
                          >
                            <FaStore />
                          </button>
                        )}
                        {user.role === 'vendor' && !user.isFraud && (
                          <button 
                            onClick={() => handleMarkFraud(user)}
                            className="p-2 bg-orange-100 text-orange-600 rounded-lg hover:bg-orange-200 transition-colors"
                            title="Mark as Fraud"
                          >
                            <FaBan />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUsers;