 import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import axios from "axios";
import { API_URL } from "../constants/API_URL";

interface User {
  id: string;
  username: string;
  email: string;
  profileUrl?: string;
  address?: string;
  tel?: string;
  role?: string;
}

interface Subscription {
  _id: string;
  userId: string;
  planType: "Free" | "Standard" | "Premium";
  price: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  subscription: Subscription | null;
  login: (email: string, password: string) => Promise<string | undefined>;
  register: (username: string, email: string, tel: string, password: string) => Promise<string | undefined>;
  logout: () => Promise<void>;
  updateProfile: (data: FormData) => Promise<string | undefined>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  fetchUser: () => Promise<void>;
  fetchSubscription: () => Promise<void>;
  createOrRenewSubscription: (planType: string) => Promise<string | undefined>;
  renewSubscription: (planType: string) => Promise<string | undefined>;
  cancelSubscription: () => Promise<string | undefined>;
  upgradeSubscription: (newPlan: string) => Promise<string | undefined>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    } else {
      delete axios.defaults.headers.common["Authorization"];
      localStorage.removeItem("token");
    }
  }, [token]);

  // Auth functions
  const login = async (email: string, password: string) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, { email, password });
      setToken(res.data.token);
      setUser(res.data.user);
      await fetchSubscription();
      return res.data.message;
    } catch (err) {
      console.error("Login error:", err);
      return "Login failed. Please check your credentials.";
    }
  };

  const register = async (username: string, email: string, tel: string, password: string) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/register`, { username, email, tel, password });
      setToken(res.data.token);
      setUser(res.data.user);
      await fetchSubscription();
      return res.data.message;
    } catch (err) {
      console.error("Registration error:", err);
      return "Registration failed. Please try again.";
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_URL}/api/auth/logout`);
      setUser(null);
      setToken(null);
      setSubscription(null);
      localStorage.removeItem("token");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const updateProfile = async (formData: FormData) => {
    try {
      const res = await axios.put(`${API_URL}/api/auth/update`, formData, { headers: { "Content-Type": "multipart/form-data" } });
      setUser(res.data.user);
      return res.data.message;
    } catch (err) {
      console.error("Update Profile error:", err);
      return "Failed to update profile. Please try again.";
    }
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    try {
      await axios.put(`${API_URL}/api/auth/update-password`, { currentPassword, newPassword });
    } catch (err) {
      console.error("Update Password error:", err);
    }
  };

  const fetchUser = async () => {
    try {
      if (!token) return;
      const res = await axios.get(`${API_URL}/api/auth/me`);
      setUser(res.data.user);
    } catch (err) {
      console.error("Fetch user error:", err);
      setUser(null);
    }
  };

  // Subscription functions
// Subscription functions
const fetchSubscription = async () => {
  try {
    if (!token) return; // skip if no token
    const res = await axios.get(`${API_URL}/api/subscription/my-subscription`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setSubscription(res.data);
  } catch (err) {
    console.error("Fetch subscription error:", err);
    setSubscription(null);
  }
};


  const createOrRenewSubscription = async (planType: string) => {
    try {
      const res = await axios.post(`${API_URL}/api/subscription/subscribe`, { planType });
      setSubscription(res.data.subscription);
      return res.data.message;
    } catch (err) {
      console.error("Create/Renew subscription error:", err);
      return "Failed to subscribe. Please try again.";
    }
  };

  const renewSubscription = async (planType: string) => {
    try {
      const res = await axios.post(`${API_URL}/api/subscription/renew`, { planType });
      setSubscription(res.data.subscription);
      return res.data.message;
    } catch (err) {
      console.error("Renew subscription error:", err);
      return "Failed to renew subscription. Please try again.";
    }
  };

  const cancelSubscription = async () => {
    try {
      const res = await axios.post(`${API_URL}/api/subscription/cancel`);
      setSubscription(res.data.subscription);
      return res.data.message;
    } catch (err) {
      console.error("Cancel subscription error:", err);
      return "Failed to cancel subscription.";
    }
  };

  const upgradeSubscription = async (newPlan: string) => {
    try {
      const res = await axios.put(`${API_URL}/api/subscription/upgrade`, { newPlan });
      setSubscription(res.data.subscription);
      return res.data.message;
    } catch (err) {
      console.error("Upgrade subscription error:", err);
      return "Failed to upgrade subscription.";
    }
  };

  useEffect(() => {
    fetchUser();
    fetchSubscription();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        subscription,
        login,
        register,
        logout,
        updateProfile,
        updatePassword,
        fetchUser,
        fetchSubscription,
        createOrRenewSubscription,
        renewSubscription,
        cancelSubscription,
        upgradeSubscription,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};  