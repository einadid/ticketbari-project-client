import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';
import Home from '../pages/Home/Home';
import AllTickets from '../pages/AllTickets/AllTickets';
import TicketDetails from '../pages/TicketDetails/TicketDetails';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ErrorPage from '../pages/ErrorPage';
import PrivateRoute from './PrivateRoute';

// User Dashboard
import UserProfile from '../pages/Dashboard/User/UserProfile';
import MyBookedTickets from '../pages/Dashboard/User/MyBookedTickets';
import TransactionHistory from '../pages/Dashboard/User/TransactionHistory';

// Vendor Dashboard
import VendorProfile from '../pages/Dashboard/Vendor/VendorProfile';
import AddTicket from '../pages/Dashboard/Vendor/AddTicket';
import MyAddedTickets from '../pages/Dashboard/Vendor/MyAddedTickets';
import RequestedBookings from '../pages/Dashboard/Vendor/RequestedBookings';
import RevenueOverview from '../pages/Dashboard/Vendor/RevenueOverview';

// Admin Dashboard
import AdminProfile from '../pages/Dashboard/Admin/AdminProfile';
import ManageTickets from '../pages/Dashboard/Admin/ManageTickets';
import ManageUsers from '../pages/Dashboard/Admin/ManageUsers';
import AdvertiseTickets from '../pages/Dashboard/Admin/AdvertiseTickets';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'all-tickets',
        element: <PrivateRoute><AllTickets /></PrivateRoute>
      },
      {
        path: 'ticket/:id',
        element: <PrivateRoute><TicketDetails /></PrivateRoute>
      },
      {
        path: 'login',
        element: <Login />
      },
      {
        path: 'register',
        element: <Register />
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    errorElement: <ErrorPage />,
    children: [
      // Default redirect
      {
        index: true,
        element: <UserProfile />
      },
      // User Routes
      {
        path: 'profile',
        element: <UserProfile />
      },
      {
        path: 'my-booked-tickets',
        element: <MyBookedTickets />
      },
      {
        path: 'transaction-history',
        element: <TransactionHistory />
      },
      // Vendor Routes
      {
        path: 'vendor-profile',
        element: <VendorProfile />
      },
      {
        path: 'add-ticket',
        element: <AddTicket />
      },
      {
        path: 'my-added-tickets',
        element: <MyAddedTickets />
      },
      {
        path: 'requested-bookings',
        element: <RequestedBookings />
      },
      {
        path: 'revenue-overview',
        element: <RevenueOverview />
      },
      // Admin Routes
      {
        path: 'admin-profile',
        element: <AdminProfile />
      },
      {
        path: 'manage-tickets',
        element: <ManageTickets />
      },
      {
        path: 'manage-users',
        element: <ManageUsers />
      },
      {
        path: 'advertise-tickets',
        element: <AdvertiseTickets />
      }
    ]
  }
]);

export default router;