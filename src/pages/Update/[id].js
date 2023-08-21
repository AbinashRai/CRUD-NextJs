import axios from "axios";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Update() {
  const router = useRouter();
  const { id } = router.query;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:1337/api/companies/${id}`)
        .then((response) => {
          const data = response.data;
          setName(data.name);
          setPhone(data.phone);
          setEmail(data.email);
          setAddress(data.address);
        });
    }
  }, [id]);

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:1337/api/companies/${id}`, {
        data: { name: name, phone: phone, email: email, address: address },
      })
      .then(() => {
        alert("User detailed has been updated sucessfully!");
      })
      .catch((error) => {
        console.error(error);
        alert("An error occurred while adding the user");
      });
  };

  return (
    <div>
      <div className="h-80 bg-slate-600 text-center flex justify-center items-center ">
        <form className="flex flex-col">
          <label className="">Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border-black border-2 mb-3"
          />
          <label className="">Phone</label>
          <input
            type="number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border-black border-2 mb-3"
          />
          <label className="">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-black border-2 mb-3"
          />
          <label className="">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border-black border-2 mb-3"
          />
          <button className="btn mr-4 bg-green-700" onClick={handleUpdate}>
            Update
          </button>
        </form>
      </div>
    </div>
  );
}
