import { BarChart2, Clock, Leaf, Upload, X } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

interface SidebarProps {
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const navItems = [
    {
      path: "/predictions",
      name: "Predictions",
      icon: <BarChart2 size={20} />,
    },
    {
      path: "/in-real-time",
      name: "Real-Time Analysis",
      icon: <Clock size={20} />,
    },
    { path: "/upload-file", name: "Upload Files", icon: <Upload size={20} /> },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-5 border-b">
        <div className="flex items-center space-x-2">
          <Leaf size={28} className="text-green-600" />
          <span className="text-xl font-bold text-gray-900">RoviNDVI</span>
        </div>
        <button
          className="text-gray-500 hover:text-gray-700 lg:hidden"
          onClick={onClose}
        >
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center px-4 py-3 rounded-lg transition-colors duration-150 ease-in-out ${
                isActive
                  ? "bg-green-50 text-green-700"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
            onClick={() => onClose()}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      <div className="px-4 py-4 border-t">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
            <Leaf size={16} className="text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">RoviNDVI v1.0</p>
            <p className="text-xs text-gray-500">© 2025 Rovigos</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
