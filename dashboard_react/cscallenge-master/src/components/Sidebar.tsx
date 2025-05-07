// Sidebar.tsx
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MenuItem {
  id: string;
  icon: LucideIcon;
  label: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ menuItems, activeTab, setActiveTab }) => {
  return (
    <aside className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2">
      <nav>
        {menuItems.map((item) => (
          <button
            key={item.id}
            className={`flex items-center space-x-2 py-2.5 px-4 rounded transition duration-200 w-full text-left ${
              activeTab === item.id ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
            onClick={() => setActiveTab(item.id)}
          >
            <item.icon className="h-6 w-6" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
