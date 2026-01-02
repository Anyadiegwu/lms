import { useCallback } from 'react';

export const useGoogleAuth = (onLogin, OnRegister) => {
  const handleCredentialResponse = useCallback(async (response) => {
    const idToken = response.credential;

  try {
    const res = await fetch('http://localhost:5000/api/auth/google', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: idToken }),
    });

    const data = await res.json();

    if (data.success && data.user) {
      localStorage.setItem('authToken', data.token);
      if(onLogin){
        onLogin(data.user);
      }else if(OnRegister){
        OnRegister(data.user)
      }
      else{
        alert("Login failed: "+ (data.message || "Unknown error"))
      }

      
      alert(`Welcome ${data.user.name}! Logged in with Google.`);
    }
  } catch (err) {
    console.error('Network error:', err);
    alert('Network error – is your backend running?');
  }  
  }, [onLogin, OnRegister]);

  const initializeGoogleSignIn = useCallback(() => {
    if (!window.google) return;

  if (!window.google) {
    console.warn('Google script not loaded yet');
    return;
  }
    window.google.accounts.id.initialize({
      client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      callback: handleCredentialResponse,
      auto_select: false,
    });
  }, [handleCredentialResponse]);

  const renderGoogleButton = (elementId) => {
    if (!window.google || !elementId) return;

    window.google.accounts.id.renderButton(
      document.getElementById(elementId),
      { theme: 'outline', size: 'large', text: 'signin_with', width: '300' }
    );
  };

  const renderRegisterGoogleButton = (elementId) => {
    if (!window.google || !elementId) return;

    window.google.accounts.id.renderButton(
      document.getElementById(elementId),
      { theme: 'outline', size: 'large', text: 'signup_with', width: '300', margin: 0 }
    );
  };


  return { initializeGoogleSignIn, renderGoogleButton, renderRegisterGoogleButton };
};
