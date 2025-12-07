import { Helmet } from 'react-helmet-async';
import UserProfile from '../User/UserProfile';

const AdminProfile = () => {
  return (
    <>
      <Helmet>
        <title>Admin Profile | TicketBari</title>
      </Helmet>
      <UserProfile />
    </>
  );
};

export default AdminProfile;