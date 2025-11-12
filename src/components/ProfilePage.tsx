import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { API_URL } from '../constants/API_URL';
import { toast, ToastContainer } from 'react-toastify';

const ProfilePage: React.FC = () => {
  const { user ,token} = useAuth(); 

  const defaultAddress = Array.isArray(user?.address) ? user.address[0] : {};

  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    tel: user?.tel || '',
    profile: null as File | null,
    address: {
      type: defaultAddress?.type || '',
      city: defaultAddress?.city || '',
      street: defaultAddress?.street || '',
      postalCode: defaultAddress?.postalCode || '',
      country: defaultAddress?.country || '',
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name in profileData.address) {
      setProfileData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setProfileData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfileData({ ...profileData, profile: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('username', profileData.username);
    formData.append('email', profileData.email);
    formData.append('tel', profileData.tel);
    formData.append('address', JSON.stringify([profileData.address]));
    if (profileData.profile) {
      formData.append('profileUrl', profileData.profile);
    }

    try {
    await axios.put(`${API_URL}/api/auth/update`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
       toast.success("Profile updated successfully")
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile")
    }
  };

  return (
    <div className='flex flex-col items-center justify-center mt-4 mx-4'>
      <h2 className='text-2xl font-bold text-gray-700 mb-4'>Profile</h2>

      <div className='flex items-center space-x-4 mb-4'>
        <img
          className='w-24 h-24 rounded-full object-cover border border-gray-300 shadow'
          src={user?.profileUrl || '/profile.png'}
          alt={user?.username}
        />
        <button className='text-blue-600 flex items-center gap-2 hover:text-blue-800 transition'>
          Edit <FaEdit />
        </button>
      </div>

      <div className='text-center text-gray-600 mb-4'>
        <p className='text-lg font-semibold'>{user?.username}</p>
        <p>{user?.email}</p>
      </div>

      <div className='w-full max-w-md bg-white p-6 rounded-xl shadow-md'>
        <h3 className='text-xl font-semibold text-gray-700 mb-4'>Edit Profile</h3>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type='file'
            name='profile'
            onChange={handleFileChange}
            className='w-full border p-2 rounded-lg'
          />
          <input
            type='text'
            name='username'
            value={profileData.username}
            onChange={handleChange}
            placeholder='Username'
            className='w-full border p-2 rounded-lg'
          />
          <input
            type='text'
            name='tel'
            value={profileData.tel}
            onChange={handleChange}
            placeholder='Phone Number'
            className='w-full border p-2 rounded-lg'
          />
          <input
            type='email'
            name='email'
            value={profileData.email}
            onChange={handleChange}
            placeholder='Email'
            className='w-full border p-2 rounded-lg'
          />
          {/* Address fields */}
          <input
            type='text'
            name='type'
            value={profileData.address.type}
            onChange={handleChange}
            placeholder='Address Type (e.g. Home)'
            className='w-full border p-2 rounded-lg'
          />
          <input
            type='text'
            name='city'
            value={profileData.address.city}
            onChange={handleChange}
            placeholder='City'
            className='w-full border p-2 rounded-lg'
          />
          <input
            type='text'
            name='street'
            value={profileData.address.street}
            onChange={handleChange}
            placeholder='Street'
            className='w-full border p-2 rounded-lg'
          />
          <input
            type='text'
            name='postalCode'
            value={profileData.address.postalCode}
            onChange={handleChange}
            placeholder='Postal Code'
            className='w-full border p-2 rounded-lg'
          />
          <input
            type='text'
            name='country'
            value={profileData.address.country}
            onChange={handleChange}
            placeholder='Country'
            className='w-full border p-2 rounded-lg'
          />

          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition'
          >
            Update
          </button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default ProfilePage;
