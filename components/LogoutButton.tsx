import React from 'react';

const LogoutButton = () => {
  const handleLogout = async () => {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    if (response.ok) {
      // Handle successful logout
      console.log('Logged out successfully');
    } else {
      // Handle logout error
      console.error('Logout failed');
    }
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
