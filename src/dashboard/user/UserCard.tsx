import React from 'react';
import { User } from '../../constants/User';
import { FaTrash, FaUsers } from 'react-icons/fa';

interface UserProps {
  user: User[];
  onDelete:(id:string)=>void
}

const UserCard: React.FC<UserProps> = ({ user, onDelete }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Users</h2>
      <div className="flex items-center gap-2 text-lg font-semibold text-gray-700 bg-gray-100 p-4 rounded-md shadow-sm">
      <FaUsers  className="text-blue-500 text-xl" />
      <span>Total Users:</span>
      <span className="text-blue-600">{user.length}</span>
    </div>

      <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200 bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Username</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Email</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Picture</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Address (City)</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">Tel</th>
              <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">Delete</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {user.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 text-sm text-gray-900">{user._id}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{user.username}</td>
                <td className="px-4 py-2 text-sm text-gray-900">{user.email}</td>
                <td className="px-4 py-2">
                  {user.profileUrl ? (
                    <img
                      src={user.profileUrl}
                      alt={`${user.username}'s profile`}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-gray-400 text-sm">No Image</span>
                  )}
                </td>
                <td className="px-4 py-2 text-sm text-gray-900">
                  {user.address.length > 0
                    ? user.address.map((ads) => (
                        <span key={ads._id} className="block">{ads.city}</span>
                      ))
                    : 'N/A'}
                </td>
                <td className="px-4 py-2 text-sm text-gray-900">{user.tel || 'N/A'}</td>
                <td className="px-4 py-2 text-center">
                  <button
                     onClick={()=>onDelete(user._id)}
                    className="text-red-600 hover:text-red-800"
                    aria-label={`Delete ${user.username}`}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserCard;
