
import { useUser } from '@clerk/clerk-react';
import React from 'react';

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <div className="container mx-auto p-4">Loading...</div>;
  }

  // Clone the children element and pass isSignedIn as a prop
  return React.cloneElement(children, { isSignedIn });
};

export default ProtectedRoute;