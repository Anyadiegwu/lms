import { useState } from "react";
import { BookOpen, Users, FileText, Settings, LogOut, GraduationCap, Menu, X } from "lucide-react";
import "./Sidebar.css";

export const Sidebar = ({ activeTab, setActiveTab, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const tabs = ["overview", "courses", "community", "settings"];

  const icons = {
    overview: BookOpen,
    courses: FileText,
    community: Users,
    settings: Settings,
  };

  const getLabel = (tab) => {
    if (tab === "courses") return "My Courses";
    return tab.charAt(0).toUpperCase() + tab.slice(1);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setIsOpen(false); 
  };

  return (
    <>
      <button
        className={`menu-toggle ${isOpen ? "hidden" : ""}`}
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
      >
        <Menu />
      </button>

      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)} />}

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="brand">
            <GraduationCap className="brand-icon" />
            <div>
              <h1>EduLearn</h1>
              <p>Learning Platform</p>
            </div>
          </div>
          <button
            className="close-btn"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <X />
          </button>
        </div>

        <nav className="sidebar-nav">
          {tabs.map((tab) => {
            const Icon = icons[tab];
            const isActive = activeTab === tab;

            return (
              <button
                key={tab}
                onClick={() => handleTabClick(tab)}
                className={`nav-item ${isActive ? "active" : ""}`}
              >
                <Icon className="nav-icon" />
                <span>{getLabel(tab)}</span>
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button onClick={onLogout} className="logout-btn">
            <LogOut className="nav-icon" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};
