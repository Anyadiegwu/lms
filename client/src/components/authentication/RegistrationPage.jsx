import { useState, useRef, useEffect } from "react";
import { Mail, Lock, User } from "lucide-react";
import { AuthLayout } from "./AuthLayout";
import { useGoogleAuth } from "../../hooks/useGoogleAuth";
import "./RegLogin.css";

export const RegistrationPage = ({ onNavigate, onRegister }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { initializeGoogleSignIn, renderRegisterGoogleButton } = useGoogleAuth(onRegister);
  const buttonDivRef = useRef(null);

  useEffect(() => {
      initializeGoogleSignIn();
  
      const interval = setInterval(() => {
        if (window.google?.accounts) {
          if (buttonDivRef.current) {
            renderRegisterGoogleButton('google-signin-button');
          }
          clearInterval(interval);
        }
      }, 100);
  
      return () => clearInterval(interval);
    }, [initializeGoogleSignIn, renderRegisterGoogleButton ]);

const handleRegister = async () => {
  // console.log('Registering user:', formData);
  setLoading(true);
  if (!formData.name || !formData.email || !formData.password) {
    setLoading(false);
    alert('All fields required');
    return;
  }

  try {
    const res = await fetch('https://lms-4nir.onrender.com/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        fullName: formData.name,
        email: formData.email,
        password: formData.password,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setLoading(false);
      onRegister(data.user); 
    } else {
      setLoading(false);
      alert(data.message || 'Registration failed');
    }
  } catch (err) {
    alert('Network error', err);
  }
};
  

  return (
    <AuthLayout
      title="Join EduLearn"
      subtitle="Start your learning journey today"
    >
      <div className="form-stack">
        <div className="form-group">
          <label>Full Name</label>
          <div className="input-wrapper">
            <User className="input-icon" />
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Enter your name"
            />
          </div>
        </div>
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
              placeholder="Create a password"
            />
          </div>
        </div>

        <button
          onClick={handleRegister}
          disabled={loading}
          className="primary-btn"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>
      </div>

      <div className="divider">
        <span>Or continue with</span>
      </div>
      <div
        id="google-signin-button" ref={buttonDivRef} style={{ width: '100%', maxWidth: '300px', margin: '0 auto' }}
        >
          Sign up with Google
        </div>
      <p className="footer-text">
        Already have an account?{" "}
        <button onClick={() => onNavigate("login")}>
          Sign in
        </button>
      </p>
    </AuthLayout>
  );
};
