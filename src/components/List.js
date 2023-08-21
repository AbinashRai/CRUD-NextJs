import { useEffect, useState } from "react";
import { MdAddBox } from "react-icons/md";
import axios from "axios";
import Link from "next/link";

export default function List() {
  const [users, setUsers] = useState([]);

  const loadUsers = () => {
    axios.get("http://localhost:1337/api/companies").then((response) => {
      console.log(response.data.data);
      setUsers(response.data.data);
    });
  };
  useEffect(() => {
    loadUsers();
  }, []);

  function handleDelete(id) {
    axios.delete(`http://localhost:1337/api/companies/${id}`).then(() => {
      loadUsers();
    });
  }

  console.log(users);
  function setDataToStorage(id, name, phone, email, address) {
    localStorage.setItem("id", id);
    localStorage.setItem("name", name);
    localStorage.setItem("phone", phone);
    localStorage.setItem("email", email);
    localStorage.setItem("address", address);
  }

  console.log(users);
  return (
    <div className="bg-white text-black h-screen">
      <div className="text-3xl ml-7 pt-16">
        <h1>List</h1>
      </div>
      <div className="text-2xl ml-7 mt-5">
        <h1>Company</h1>
      </div>
      <div className="flex flex-row justify-end mr-9">
        <Link href="/Adduser" className="btn text-lg bg-blue-600">
          Addnew
          <span className="text-2xl">
            <MdAddBox />
          </span>
        </Link>
      </div>
      <div className="flex flex-col">
        <div className="">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-left text-sm font-light">
                <thead className="border-b bg-slate-300 font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Phone
                    </th>
                    <th scope="col" className="px-6 py-4">
                      E-mail
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Address
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((data) => {
                    const { id, attributes } = data;
                    return (
                      <tr key={id}>
                        <td className="text-black font-semibold pl-5">{id}</td>
                        <td className="text-black font-semibold">
                          {attributes.name}
                        </td>
                        <td className="text-black font-semibold">
                          {attributes.phone}
                        </td>
                        <td className="text-black font-semibold">
                          {attributes.email}
                        </td>
                        <td className="text-black font-semibold">
                          {attributes.address}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4 text-white">
                          <Link
                            href={`/Update/${id}`}
                            className="btn mr-4 bg-green-700"
                            Update>
                            Update
                          </Link>
                          <button
                            className="btn bg-red-700"
                            onClick={() => handleDelete(data.id)}>
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
