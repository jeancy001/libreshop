import React from "react";
import { Pubs } from "../../constants/Pub";

interface PubProps {
  pub: Pubs[];
  onDelete:(id:string)=>void
}

const PubCard: React.FC<PubProps> = ({ pub,onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 shadow-md rounded-lg">
        <thead className="bg-gray-700 text-white">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Image</th>
            <th className="px-4 py-2 text-left">Price</th>
            <th className="px-4 py-2 text-left">Created Date</th>
            <th className="px-4 py-2 text-left">Delete</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {pub.map((p) => (
            <tr key={p._id} className="hover:bg-gray-50">
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2">
                <img src={p.imageUrl} alt={p.name} className="w-20 h-20 object-cover rounded" />
              </td>
              <td className="px-4 py-2">${p.price}</td>
              <td className="px-4 py-2">{new Date(p.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-2">
                <button onClick={()=>onDelete(p._id)}className="px-3 py-1 border text-pink-600 border-pink-600 rounded hover:bg-pink-600 hover:text-white transition">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PubCard;
