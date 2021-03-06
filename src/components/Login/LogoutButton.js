import React from 'react';

function LogoutButton({ logout }) {
  return (
    <button
      type='button'
      onClick={() => logout({ returnTo: window.location.origin })}
      className='text-lg p-2 border border-gray-200 shadow rounded-md font-bold w-32'>
      Logout
    </button>
  );
}

export default LogoutButton;
