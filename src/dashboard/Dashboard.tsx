import React, { useState, useEffect } from "react";
import {
  Box,
  Plus,
  ShoppingCart,
  Users,
  Megaphone,
  MessageSquare,
  LayoutDashboard,
} from "lucide-react";
import ProductItems from "./products/ProductItems";
import AddProduct from "./products/AddProduct";
import PubsItems from "./pub/PubsItems";
import AddPub from "./pub/AddPub";
import OrderItems from "./orders/OrderItems";
import ContactItems from "./contacts/ContactItems";
import UserItems from "./user/UserItems";

const Dashboard: React.FC = () => {
  const [activePage, setActivePage] = useState<string>("home");
  const [loading, setLoading] = useState<boolean>(true);
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  // Simulate initial dashboard loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Simulate loading when switching between dashboard items
  const handlePageChange = (page: string) => {
    setPageLoading(true);
    setActivePage(page);
    setTimeout(() => setPageLoading(false), 800);
  };

  const renderContent = () => {
    switch (activePage) {
      case "products":
        return <ProductItems />;
      case "addProduct":
        return <AddProduct />;
      case "orders":
        return <OrderItems />;
      case "users":
        return <UserItems />;
      case "addPub":
        return <AddPub />;
      case "viewPubs":
        return <PubsItems />;
      case "contact":
        return <ContactItems />;
      default:
        return <ProductItems />;
    }
  };

  // Global Dashboard Loading Spinner
  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-full md:w-1/4 bg-white shadow-lg p-6 md:min-h-screen border-r border-gray-200">
        <div className="flex items-center space-x-2 mb-8">
          <LayoutDashboard className="text-indigo-600 w-6 h-6" />
          <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
        </div>

        <nav className="space-y-6">
          {/* Products */}
          <div>
            <div className="flex items-center text-gray-800 font-semibold mb-2">
              <Box className="w-5 h-5 mr-2 text-indigo-500" /> Products
            </div>
            <div className="ml-6 space-y-2 text-sm">
              <button
                onClick={() => handlePageChange("products")}
                className="block w-full text-left hover:text-indigo-600 transition"
              >
                View Products
              </button>
              <button
                onClick={() => handlePageChange("addProduct")}
                className="block w-full text-left flex items-center hover:text-indigo-600 transition"
              >
                <Plus className="w-4 h-4 mr-1" /> Add Product
              </button>
            </div>
          </div>

          {/* Pubs */}
          <div>
            <div className="flex items-center text-gray-800 font-semibold mb-2">
              <Megaphone className="w-5 h-5 mr-2 text-indigo-500" /> Pubs
            </div>
            <div className="ml-6 space-y-2 text-sm">
              <button
                onClick={() => handlePageChange("addPub")}
                className="block w-full text-left hover:text-indigo-600 transition"
              >
                Add Pub
              </button>
              <button
                onClick={() => handlePageChange("viewPubs")}
                className="block w-full text-left hover:text-indigo-600 transition"
              >
                View Pubs
              </button>
            </div>
          </div>

          {/* Orders */}
          <div>
            <div className="flex items-center text-gray-800 font-semibold mb-2">
              <ShoppingCart className="w-5 h-5 mr-2 text-indigo-500" /> Orders
            </div>
            <div className="ml-6 space-y-2 text-sm">
              <button
                onClick={() => handlePageChange("orders")}
                className="block w-full text-left hover:text-indigo-600 transition"
              >
                View Orders
              </button>
            </div>
          </div>

          {/* Users */}
          <div>
            <div className="flex items-center text-gray-800 font-semibold mb-2">
              <Users className="w-5 h-5 mr-2 text-indigo-500" /> Users
            </div>
            <div className="ml-6 space-y-2 text-sm">
              <button
                onClick={() => handlePageChange("users")}
                className="block w-full text-left hover:text-indigo-600 transition"
              >
                Manage Users
              </button>
            </div>
          </div>

          {/* Feedback */}
          <div>
            <div className="flex items-center text-gray-800 font-semibold mb-2">
              <MessageSquare className="w-5 h-5 mr-2 text-indigo-500" /> Feedback
            </div>
            <div className="ml-6 space-y-2 text-sm">
              <button
                onClick={() => handlePageChange("contact")}
                className="block w-full text-left hover:text-indigo-600 transition"
              >
                Feedback / Contacts
              </button>
            </div>
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="bg-white shadow-md rounded-xl p-6 transition-all duration-500 ease-in-out">
          {pageLoading ? (
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="opacity-100 transition-opacity duration-500">
              {renderContent()}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
