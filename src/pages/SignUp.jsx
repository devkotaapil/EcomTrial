// src/pages/SignUp.jsx
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
  return (
    <div className="container mx-auto p-4 flex justify-center items-center min-h-[50vh]">
      <SignUp />
    </div>
  );
};

export default SignUpPage;