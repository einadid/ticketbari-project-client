import { Helmet } from 'react-helmet-async';
import UserProfile from '../User/UserProfile';

const VendorProfile = () => {
  return (
    <>
      <Helmet>
        <title>Vendor Profile | TicketBari</title>
      </Helmet>
      <UserProfile />
    </>
  );
};

export default VendorProfile;