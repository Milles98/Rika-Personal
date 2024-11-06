import { useState, useEffect } from "react";
import { useFetchUsers } from "../lib/fetchUsers";

import ArrowBack from "../common/ArrowBack";
import UserList from "./sections/users/UserList";

const Users = () => {
  const { getData } = useFetchUsers();
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const data = await getData();
    setUsers(data);
  };

  useEffect(() => {
    getUsers();
  }, [getData]);

  return (
    <section className="flex flex-col gap-4 px-4 py-8">
      <nav className="flex justify-between">
        <ArrowBack goBackTo="/" />
      </nav>
      <div className="flex flex-col gap-3">
        <h1 className="text-black font-mont text-[18px] font-extrabold leading-[150%]">
          Users
        </h1>
        {users.length === 0 ? (
          <div className="flex flex-col justify-center gap-4 items-center h-40">
            <p className="font-mont">No users are available</p>
            <button onClick={getUsers} className="font-mont px-4 py-2 bg-black text-white rounded">
              Retry to load users
            </button>
          </div>
        ) : (
          <div className="flex gap-[15px] flex-wrap justify-center mb-[9px]">
            {users.map((user) => (
              <UserList />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Users;