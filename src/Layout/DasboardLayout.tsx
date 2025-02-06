
import { Button } from "@/components/ui/button";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import { ArrowRightLeft, Car, Home, House, Menu, SquareChartGantt, UserRoundPen } from "lucide-react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";

import { Link, Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";


const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = useAppSelector(selectCurrentUser)

  return (
  <ProtectedRoute role={user?.role}>
  <div className="flex h-screen text-white">
          <Helmet> <title>NextGen Cars | Dashboard</title></Helmet>
      {/* Sidebar  */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-40 bg-[#003d1f] shadow-md p-6 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out md:relative md:w-64 lg:w-72 xl:w-80`}
      >
        <div className="text-2xl font-title font-bold  mb-10 hidden md:block">
          NextGen Cars
        </div>
        <nav>
          <ul>
            <li className="mb-6">
              <div className="block md:hidden">
                <Button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className=" focus:outline-none "
                >
               <Menu />
                </Button>
              </div>
            </li>
      
            {/* admin route */}
            {user?.role == 'admin' && (
              <>
              
                <li className="mb-6">
                  <Link
                    to="/dashboard/createProduct"
                    className="flex items-center space-x-4 font-body"
                  >
                   <Car />
                    <span>Create Product</span>
                  </Link>
                </li>
                <li className="mb-6">
                  <Link
                    to="/dashboard/manageProducts"
                    className="flex items-center space-x-4 font-body"
                  >
                  <SquareChartGantt />
                    <span>Manage Product</span>
                  </Link>
                </li>
                <li className="mb-6">
                  <Link
                    to="/dashboard/manageOrder"
                    className="flex items-center space-x-4 font-body"
                  >
                  <SquareChartGantt />
                    <span>Manage Orders</span>
                  </Link>
                </li>
                <li className="mb-6">
                  <Link
                    to="/dashboard/manageUsers"
                    className="flex items-center space-x-4 font-body"
                  >
                 <UserRoundPen />
                    <span>Manage User</span>
                  </Link>
                </li>
                <li className="mb-6">
                  <Link
                    to="/"
                    className="flex items-center space-x-4 font-body"
                  >
                  <House />
                    <span>Home</span>
                  </Link>
                </li>
               
              </>
            )}
            {/* User route */}

            {user?.role === 'user' && (
              <>
                <li className="mb-6">
                  <Link
                    to="/dashboard/myOrders"
                    className="flex items-center space-x-4 font-body"
                  >
                   <ArrowRightLeft />
                    <span>View Orders</span>
                  </Link>
                </li>
                
                <li className="mb-6">
                  <Link
                    to="/dashboard/manageProfile"
                    className="flex items-center space-x-4 font-body"
                  >
                   <UserRoundPen />
                    <span>Manage Profile</span>
                  </Link>
                </li>
                <li className="mb-6">
                  <Link
                    to="/"
                    className="flex items-center space-x-4 font-body"
                  >
                  <Home/>
                    <span>Home</span>
                  </Link>
                </li>
              
              </>
            )}

          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white shadow-md flex items-center justify-between px-6">
          <div className="block md:hidden">
            <Button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className=" focus:outline-none "
            >
             <Menu />
            </Button>
          </div>
          <h2 className="text-2xl font-title text-black font-semibold">Dashboard</h2>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto  p-4 sm:p-6 md:p-8 lg:p-10">
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  </ProtectedRoute>
  );
};

export default DashboardLayout;
