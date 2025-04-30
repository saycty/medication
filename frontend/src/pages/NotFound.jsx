import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.jsx";

const NotFound = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-wellness-50 to-wellness-100 p-4">
      <div className="text-center space-y-6 max-w-md mx-auto">
        <h1 className="text-6xl font-bold text-wellness-800">404</h1>
        <h2 className="text-2xl text-wellness-700">Page Not Found</h2>
        <p className="text-wellness-600">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <Button className="mt-4" onClick={goBack}>
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
