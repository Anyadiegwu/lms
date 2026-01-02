import { GraduationCap } from "lucide-react";
import "./AuthLayout.css";

export const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-card">
        <div className="auth-header">
          <GraduationCap className="auth-icon" />
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="auth-content">
          {children}
        </div>
      </div>
    </div>
  );
};
