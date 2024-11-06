import { useState, useEffect } from "react";
import { useFetchUsers } from "../lib/fetchUsers";

import ArrowBack from "../common/ArrowBack";


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
        }
        finally {
            setLoading(false);
        }
    }
    fetchUsers();
  }, [getData]);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section className="flex flex-col gap-4 px-4 py-8">
      <nav className="flex justify-between">
        <ArrowBack goBackTo="/" />
      </nav>
      <div className="flex flex-col gap-3">
        <h1 className="text-black font-mont text-[18px] font-extrabold leading-[150%]">
          Users
        </h1>
        {/* TODO - Add user Type and user Status */}
        <ul className="divide-y divide-gray-300 border-t border-b border-gray-300">
            { users.map((user) =>(
                <li key={user.id} className="py-3">
                    <div className="">
                        <h2 className="text-black font-mont text-[14px] font-semibold">Name: {user.username} Email: {user.email} Phone: {user.phoneNumber} City: {user.city}</h2>
                        <p className="text-[#666] font-mont font-semibold text-[11px]">Name {user.username}</p>                        
                    </div>

                </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default Users;