import { createBrowserRouter } from 'react-router-dom';

// Layouts
import MainLayout from '../layouts/MainLayout';
import DashboardLayout from '../layouts/DashboardLayout';

// Public Pages
import Home from '../pages/Home/Home';
import AllTickets from '../pages/AllTickets/AllTickets';
import TicketDetails from '../pages/TicketDetails/TicketDetails';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import ErrorPage from '../pages/ErrorPage';

// Private Route
import PrivateRoute from './PrivateRoute';
import AdminRoute from './AdminRoute';
import VendorRoute from './VendorRoute';

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
        element: <VendorRoute><VendorProfile /></VendorRoute>
      },
      {
        path: 'add-ticket',
        element: <VendorRoute><AddTicket /></VendorRoute>
      },
      {
        path: 'my-added-tickets',
        element: <VendorRoute><MyAddedTickets /></VendorRoute>
      },
      {
        path: 'requested-bookings',
        element: <VendorRoute><RequestedBookings /></VendorRoute>
      },
      {
        path: 'revenue-overview',
        element: <VendorRoute><RevenueOverview /></VendorRoute>
      },
      
      // Admin Routes
      {
        path: 'admin-profile',
        element: <AdminRoute><AdminProfile /></AdminRoute>
      },
      {
        path: 'manage-tickets',
        element: <AdminRoute><ManageTickets /></AdminRoute>
      },
      {
        path: 'manage-users',
        element: <AdminRoute><ManageUsers /></AdminRoute>
      },
      {
        path: 'advertise-tickets',
        element: <AdminRoute><AdvertiseTickets /></AdminRoute>
      }
    ]
  }
]);

export default router;