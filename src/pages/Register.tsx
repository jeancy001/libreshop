import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      if (!username || !email || !tel || !password) {
        return setError("All fields are required.");
      }

      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(tel)) {
        return setError("Phone number must be exactly 10 digits.");
      }

      await register(username, email, tel, password);
      setSuccess("Registered Successfully!");
      setUsername("");
      setEmail("");
      setPassword("");
      navigate("/");

    } catch (error: unknown) {
      if (typeof error === "object" && error !== null && "response" in error) {
        const err = error as { response?: { data?: { message?: string } } };
        setError(err.response?.data?.message || "An unexpected error occurred");
      } else {
        setError("An unexpected error occurred");
      }
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center px-6 py-10 bg-gray-100 min-h-screen">

      {/* Left Section */}
      <div className="md:w-1/2 p-6 text-center">
        <h2 className="text-4xl font-extrabold text-pink-600 mb-4 tracking-wide">
          TTElectronics
        </h2>
        <p className="text-gray-600 leading-relaxed mb-4 text-lg">
          We design and manufacture advanced engineered electronics for industrial and commercial applications.
        </p>

        <img
          className="w-full h-[55vh] md:h-[60vh] object-cover rounded-xl shadow-lg opacity-90"
          src="/electronics.jpg"
          alt="electronics"
        />
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 w-full max-w-lg p-6">
        <h2 className="text-3xl text-center font-bold text-pink-600 mb-6">
          Register
        </h2>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl border border-gray-200 rounded-2xl p-8 space-y-5"
        >
          {error && <p className="text-center text-red-600 font-medium">{error}</p>}
          {success && <p className="text-center text-green-600 font-medium">{success}</p>}

          {/* Username */}
          <div>
            <label className="text-gray-700 font-medium mb-1 block">Username</label>
            <input
              type="text"
              value={username}
              autoComplete="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Type your Username"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-gray-700 font-medium mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourname@example.com"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-gray-700 font-medium mb-1 block">Phone Number</label>
            <input
              type="text"
              value={tel}
              autoComplete="tel"
              onChange={(e) => setTel(e.target.value)}
              placeholder="10-digit phone number"
              className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-700 font-medium mb-1 block">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-pink-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-4 text-sm text-gray-500 hover:text-pink-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold shadow-md transition"
            type="submit"
          >
            {loading ? "Loading..." : "Register"}
          </button>

          {/* Login Link */}
          <div className="text-center mt-4">
            <p className="text-gray-600">Already have an account?</p>
            <a
              href="/login"
              className="inline-block mt-2 px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white font-medium transition"
            >
              Login
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
