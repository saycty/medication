import LoginForm from "@/components/LoginForm.jsx";
import SignupForm from "@/components/SignupForm.jsx";
import React, { useState } from "react";

const Index = () => {
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => setShowLogin(!showLogin);

  return (
    <div className="min-h-screen bg-gradient-to-br from-wellness-50 to-wellness-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8 mb-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-wellness-800">
            Acme Wellness
          </h1>
          <p className="text-xl text-wellness-600">
            Your personal weight-loss journey tracker
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 md:p-8">
          {showLogin ? (
            <LoginForm onToggleForm={toggleForm} />
          ) : (
            <SignupForm onToggleForm={toggleForm} />
          )}
        </div>
      </div>

      <p className="text-sm text-center text-wellness-700 max-w-md">
        Track your weight loss progress, monitor medication shipments, and
        manage your wellness journey all in one place.
      </p>
    </div>
  );
};

export default Index;
