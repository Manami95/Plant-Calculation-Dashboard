import { useState } from "react";
import { Home, User, Briefcase, Cpu, DollarSign, Menu } from "lucide-react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-20 bg-gray-800 text-white p-2 rounded-md"
        onClick={toggleSidebar}
      >
        <Menu className="w-6 h-6" />
      </button>
      <div
        className={`bg-gray-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0 transition duration-200 ease-in-out z-10`}
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center space-y-2 px-4 mb-8">
          <div className="bg-white p-3 rounded-full">
          <img 
              src="/HEEPL.png" 
              alt="HEEPL Logo" 
              className="h-40 w-40 object-cover rounded-full"
          />
          </div>
          <span className="text-xl font-extrabold tracking-wider">HITESH ENVIRO ENGINEERS PVT LTD</span>
          <span className="text-l text-white-400">Waste Water Management</span>
        </div>
        
        <nav className="space-y-1">
          <a 
            href="#" 
            className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          >
            <Home className="w-5 h-5 mr-3" /> 
            <span>Home</span>
          </a>
          <a 
            href="#" 
            className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          >
            <User className="w-5 h-5 mr-3" /> 
            <span>User Info</span>
          </a>
          <a 
            href="#" 
            className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          >
            <Briefcase className="w-5 h-5 mr-3" /> 
            <span>Plant Info</span>
          </a>
          <a 
            href="#" 
            className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          >
            <Cpu className="w-5 h-5 mr-3" /> 
            <span>Equipment</span>
          </a>
          <a 
            href="#" 
            className="flex items-center py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          >
            <DollarSign className="w-5 h-5 mr-3" /> 
            <span>Total Cost</span>
          </a>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;