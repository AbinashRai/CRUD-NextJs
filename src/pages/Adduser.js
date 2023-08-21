import axios from "axios";
import React, { useState } from "react";

export default function Adduser() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      name.length <= 0 ||
      phone.length <= 0 ||
      address.length <= 0 ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)
    ) {
      alert("Invalid or incomplete information");
      return;
    }

    try {
      const response = await axios.post("http://localhost:1337/api/companies", {
        data: {
          name: name,
          phone: phone,
          email: email,
          address: address,
        },
      });
      console.log(response);
      alert("User has been added successfully");
    } catch (error) {
      console.log(error);
      alert("An error occurred while adding the user");
    }
  };

  return (
    <div>
      <div className="h-80 text-center flex justify-center items-center ">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label className="">Name:</label>
          <input
            type="text"
            value={name}
            className="border-black border-2 mb-3"
            onChange={(e) => setName(e.target.value)}
          />
          <label className="">Phone</label>
          <input
            type="number"
            value={phone}
            className="border-black border-2 mb-3"
            onChange={(e) => setPhone(e.target.value)}
          />
          <label className="">Email</label>
          <input
            type="text"
            value={email}
            className="border-black border-2 mb-3"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="">Address</label>
          <input
            type="text"
            value={address}
            className="border-black border-2 mb-3"
            onChange={(e) => setAddress(e.target.value)}
          />
          <button
            className="border-black btn text-black font-semibold border-2 bg-green-400"
            type="submit"
            value="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
