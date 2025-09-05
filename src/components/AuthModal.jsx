
import { SignIn, SignUp } from '@clerk/clerk-react';

const AuthModal = ({ authMode, setAuthMode, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{authMode === 'sign-in' ? 'Sign In' : 'Sign Up'}</h2>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-gray-800 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex space-x-4 mb-4">
          <button
            onClick={() => setAuthMode('sign-in')}
            className={`flex-1 py-2 rounded ${authMode === 'sign-in' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600 hover:text-white`}
          >
            Sign In
          </button>
          <button
            onClick={() => setAuthMode('sign-up')}
            className={`flex-1 py-2 rounded ${authMode === 'sign-up' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} hover:bg-blue-600 hover:text-white`}
          >
            Sign Up
          </button>
        </div>
        <div className="min-h-[400px] overflow-auto">
          {authMode === 'sign-in' ? (
            <SignIn
              afterSignInUrl="/"
              afterSignUpUrl="/"
            />
          ) : (
            <SignUp
              afterSignInUrl="/"
              afterSignUpUrl="/"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;