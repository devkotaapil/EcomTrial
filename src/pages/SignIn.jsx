// src/pages/SignIn.jsx
import { SignIn } from '@clerk/clerk-react';

const SignInPage = () => {
  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-[50vh]">
      <SignIn />
    </div>
  );
};

export default SignInPage;