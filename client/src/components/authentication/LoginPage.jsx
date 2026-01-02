import { useState, useEffect, useRef } from "react";
import { Mail, Lock } from "lucide-react";
import { AuthLayout } from "./AuthLayout";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import "./RegLogin.css";

export const LoginPage = ({ onNavigate, onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

const handleLogin = async () => {
  setLoading(true);
  try {
    const res = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formData.email, password: formData.password }),
    });

    const data = await res.json();

    if (data.success) {
      onLogin(data.user);
    } else {
      setLoading(false);
      alert(data.message || 'Login failed');
    }
  } catch (err) {
    alert('Network error', err);
  }
};

  const { initializeGoogleSignIn, renderGoogleButton, showOneTap } = useGoogleAuth(onLogin);
  const buttonDivRef = useRef(null);

  useEffect(() => {
    initializeGoogleSignIn();

    const interval = setInterval(() => {
      if (window.google?.accounts) {
        if (buttonDivRef.current) {
          renderGoogleButton('google-signin-button');
        }
        clearInterval(interval);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [initializeGoogleSignIn, renderGoogleButton, showOneTap]);

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to continue learning">
      <div className="form-stack">
        <div className="form-group">
          <label>Email Address</label>
          <div className="input-wrapper">
            <Mail className="input-icon" />
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="Enter your email"
            />
          </div>
        </div>
        <div className="form-group">
          <label>Password</label>
          <div className="input-wrapper">
            <Lock className="input-icon" />
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="Enter your password"
            />
          </div>
        </div>
        <div className="form-options">
          <label className="remember-me">
            <input type="checkbox" />
            <span>Remember me</span>
          </label>
          <button type="button" className="link-btn">
            Forgot password?
          </button>
        </div>

        <button
          onClick={handleLogin}
          disabled={loading}
          className="primary-btn"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </div>

      <div className="divider">
        <span>Or continue with</span>
      </div>

      <div
      id="google-signin-button" ref={buttonDivRef} style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}>
        Sign in with Google
      </div>

      <p className="footer-text">
        Don&apos;t have an account?{" "}
        <button onClick={() => onNavigate("register")}>
          Sign up
        </button>
      </p>
    </AuthLayout>
  );
};
