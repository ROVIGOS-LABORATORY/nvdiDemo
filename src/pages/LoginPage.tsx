import { Lock, User } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import background from "../assets/images/background.png";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    if (!username || !password) {
      setError("Username and password are required");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // if (!validateForm()) return;
    // setLoading(true);

    // const formDetails = new URLSearchParams();
    // formDetails.append("username", username);
    // formDetails.append("password", password);

    // try {
    //   const response = await AuthService.signIn(formDetails);
    //   setLoading(false);
    //   if (response.msg === "success") {
    //     localStorage.setItem("accessToken", response.access_token);
    //     localStorage.setItem("refreshToken", response.refresh_token);
    //     setLoading(false);
    //     navigate("/home");
    //     window.location.reload();
    //   } else {
    //     setError(response.detail || "Authentication failed!");
    //   }
    // } catch (error) {
    //   setLoading(false);
    //   setError("An error occurred. Please try again later.");
    // }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <img
        src={background}
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />
      {/* Login Form */}
      <div className="relative z-10 h-full flex items-center justify-end">
        <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-2xl w-full max-w-md mx-4">
          <h1 className="text-3xl font-bold text-white text-center mb-8">
            RoviNDVI
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                  size={20}
                />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-white/10 text-white border border-gray-300/20 rounded-lg py-2 px-10 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Username"
                  required
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="space-y-2">
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300"
                  size={20}
                />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/30 text-white border border-gray-300/20 rounded-lg py-2 px-10 placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Password"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <button
                type="submit"
                className="w-full bg-white/10 text-white border border-gray-300/20 rounded-lg py-2 px-10 hover:bg-white/50 focus:outline-none transition-colors duration-200"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              <button
                onClick={() => navigate("/register")}
                type="button"
                className="w-full bg-white/10 text-white border border-gray-300/20 rounded-lg py-2 px-10 hover:bg-white/50 focus:outline-none transition-colors duration-200"
              >
                Sign Up
              </button>
              {error && <p className="text-red-500">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
