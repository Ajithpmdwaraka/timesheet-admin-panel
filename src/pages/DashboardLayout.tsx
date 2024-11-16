// // src/components/Layout/DashboardLayout.tsx


// import { Outlet, Link } from 'react-router-dom';
// import { Menu } from 'antd';
// import { Users, Briefcase, Clock, BarChart2, Settings } from 'lucide-react';

// const DashboardLayout = () => {
//   // Define the menu items with the required structure for Ant Design
//   const menuItems = [
//     { key: '/employees', icon: <Users />, label: <Link to="/employees">Employees</Link> },
//     { key: '/projects', icon: <Briefcase />, label: <Link to="/projects">Projects</Link> },
//     { key: '/logs', icon: <Clock />, label: <Link to="/logs">Activity Logs</Link> },
//     { key: '/analytics', icon: <BarChart2 />, label: <Link to="/analytics">Analytics</Link> },
//     { key: '/settings', icon: <Settings />, label: <Link to="/settings">Settings</Link> }
//   ];

//   return (
//     <div className="flex h-screen bg-gray-100">
//       <aside className="w-64 bg-white shadow-md">
//         <div className="p-4">
//           <h1 className="text-xl font-bold">Timesheet Admin</h1>
//         </div>
//         {/* Render the Menu component with structured `menuItems` */}
//         <Menu items={menuItems} mode="vertical" />
//       </aside>
//       <main className="flex-1 overflow-auto">
//         <div className="p-6">
//           <Outlet />
//         </div>
//       </main>
//     </div>
//   );
// };

// export default DashboardLayout;



// src/components/Layout/DashboardLayout.tsx


import { useState } from "react"
import { Menu } from "antd"
import { Users, Briefcase, Clock, BarChart2, Settings } from "lucide-react"
import EmployeeList from "../components/EmployeeList" // Import the EmployeeList component
import { ProjectList } from "../components/ProjectList"
import { ActivityLogView } from "../components/ActivityLogView"

const DashboardLayout = () => {
  // State to manage the active menu item
  const [activeMenu, setActiveMenu] = useState<string | null>(null)

  // Menu items configuration
  const menuItems = [
    { key: "employees", icon: <Users />, label: "Employees",  },
    { key: "projects", icon: <Briefcase />, label: "Projects" },
    { key: "logs", icon: <Clock />, label: "Activity Logs" },
    { key: "analytics", icon: <BarChart2 />, label: "Analytics" },
    { key: "settings", icon: <Settings />, label: "Settings" },
  ]

  // Render content based on active menu item
  const renderContent = () => {
    switch (activeMenu) {
      case "employees":
        return <EmployeeList />
      case "projects":
        return <ProjectList />
      case "logs":
        return <ActivityLogView />
      case "analytics":
        return <div>Analytics Component</div>
      case "settings":
        return <div>Settings Component</div>
      default:
        return (
          <div className="text-gray-500 text-center text-xl">
            Select an option from the menu to display content.
          </div>
        )
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h1 className="text-xl font-bold">Timesheet Admin</h1>
        </div>
        <Menu
          items={menuItems}
          mode="vertical"
          selectedKeys={activeMenu ? [activeMenu] : []}
          onClick={(e) => setActiveMenu(e.key)} // Set the active menu on click
        />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-gray-50 overflow-auto">
        {renderContent()}
      </main>
    </div>
  )
}

export default DashboardLayout
