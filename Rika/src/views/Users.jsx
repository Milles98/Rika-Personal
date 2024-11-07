import { useState, useEffect } from "react";
import { useFetchUsers } from "../lib/fetchUsers";
import ArrowBack from "../common/ArrowBack";
import { FaEnvelope, FaPhone, FaCity, FaExclamationTriangle } from 'react-icons/fa'; 

const Users = () => {
  const { getData } = useFetchUsers();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getData();
        console.log(userData);
        setUsers(userData);
      } catch (err) {
        setError("Failed to load users.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [getData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-4 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-mont text-[16px] font-semibold">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-100 border border-red-400 px-4 py-3 rounded-lg max-w-md mx-auto shadow-md flex items-center gap-2">
          <FaExclamationTriangle />
          <div className="font-mont">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="flex flex-col gap-4 px-4 py-8 bg-gray-50 font-mont">
      <ArrowBack goBackTo="/" className="mb-4" /> 
      <h1 className="text-3xl font-mont font-bold mb-4">User List</h1>
      <ul className="divide-y divide-gray-300">
        {users.map((user) => (
          <li key={user.id} className="p-4 bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow mb-4">
            <div className="flex flex-col gap-2">
              <h2 className="text-lg font-mont font-semibold text-black">{user.username}</h2>
              <p className="text-gray-500 text-sm flex items-center gap-2 font-mont">
                <FaEnvelope className="text-gray-600" /> {user.email}
              </p>
              <p className="text-gray-500 text-sm flex items-center gap-2 font-mont">
                <FaPhone className="text-gray-600" /> {user.phoneNumber}
              </p>
              <p className="text-gray-500 text-sm flex items-center gap-2 font-mont">
                <FaCity className="text-gray-600" /> {user.city}
              </p>
            </div>
            <button className="mt-2 font-mont font-medium hover:underline">View Details</button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Users;
