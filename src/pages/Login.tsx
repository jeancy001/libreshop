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
    <div className="flex flex-col md:flex-row min-h-screen items-center justify-center px-4 bg-gray-100">
      {/* Left Side */}
      <div className="md:w-1/2 p-6 md:border-r-4 border-indigo-500 text-center">
        <h1 className="text-3xl font-bold text-pink-600 mb-4">TTElectronics</h1>
        <p className="text-gray-600">
          TTElectronics is a global provider of engineered electronics that designs and manufactures advanced electronic components and custom solutions for industrial applications.
        </p>
        <h3 className="mt-6 text-xl text-gray-500 border-b-2 inline-block">Product Pub...</h3>
      </div>

      {/* Right Side - Form */}
      <div className="md:w-1/2 w-full max-w-md p-6">
        <h3 className="text-center text-2xl text-pink-500 mb-4">Login</h3>

        <form onSubmit={handleSubmit} className="bg-gray-800 shadow-md rounded-lg p-6 space-y-4">
          {error && <p className="text-red-600 text-center">{error}</p>}
          {success && <p className="text-green-600 text-center">{success}</p>}

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Type your Email"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Type your Password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-3 right-4 text-sm text-blue-500 hover:underline"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 hover:bg-pink-700 text-white py-2 rounded transition duration-300"
          >
            {loading ? 'Fetching...' : 'Login'}
          </button>

          <div className="text-center text-sm text-gray-600">
            <p>
              Forgot your password?{' '}
              <a href="/recovery" className="text-blue-600 hover:underline">
                Recover it now
              </a>
            </p>
            <p className="mt-2">Don’t have an account?</p>
            <a
              href="/register"
              className="inline-block mt-2 px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
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
