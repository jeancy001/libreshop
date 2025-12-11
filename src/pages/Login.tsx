import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      if (!email || !password) {
        return setError('All fields are required!');
      }

      await login(email, password);
      setSuccess('Login successful!');
      setEmail('');
      setPassword('');
      navigate('/');
    } catch (error) {
      console.error(error);
      if (typeof error === 'object' && error !== null && 'response' in error) {
        const err = error as { response?: { data?: { message?: string } } };
        setError(err.response?.data?.message || 'An unexpected error occurred');
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen items-center justify-center px-6 bg-gray-100">

      {/* Left side */}
      <div className="md:w-1/2 p-8 md:border-r-4 border-pink-500 text-center">
        <h1 className="text-4xl font-extrabold text-pink-600 mb-4 tracking-wide">TTElectronics</h1>
        <p className="text-gray-600 leading-relaxed text-lg">
          Providing advanced engineered electronics and smart solutions for industrial & consumer applications.
        </p>

        <h3 className="mt-6 text-xl text-gray-600 border-b-2 border-gray-300 inline-block px-3 font-medium">
          Product Pub...
        </h3>
      </div>

      {/* Right side */}
      <div className="md:w-1/2 w-full max-w-md p-6">
        <h3 className="text-center text-3xl text-pink-600 font-bold mb-6">Login</h3>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-xl border border-gray-200 rounded-2xl p-8 space-y-5"
        >
          {error && <p className="text-red-600 text-center">{error}</p>}
          {success && <p className="text-green-600 text-center">{success}</p>}

          {/* Email */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Email</label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="yourname@example.com"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-700 mb-1 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-3 right-4 text-sm text-gray-500 hover:text-pink-600 transition"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 rounded-lg font-semibold shadow-md transition duration-300"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>

          {/* Links */}
          <div className="text-center text-sm text-gray-600 mt-4">
            <p>
              Forgot your password?{" "}
              <a href="/recovery" className="text-pink-600 hover:underline font-medium">
                Recover it now
              </a>
            </p>

            <p className="mt-3">Don’t have an account?</p>

            <a
              href="/register"
              className="inline-block mt-3 px-5 py-2 border border-pink-600 text-pink-600 rounded-lg hover:bg-pink-600 hover:text-white transition font-medium"
            >
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
