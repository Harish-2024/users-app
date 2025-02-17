"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditUserForm({ user }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        user: user.user || "",
        interest: user.interest.join(", ") || "",
        age: user.age || "",
        mobile: user.mobile || "",
        email: user.email || "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            ...formData,
            id: user._id,
            interest: formData.interest.split(",").map((item) => item.trim()),
            age: parseInt(formData.age, 10),
            mobile: parseInt(formData.mobile, 10),
        };

        const res = await fetch(`http://localhost:3000/api/users`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formattedData),
        });

        if (res.ok) {
            alert("User updated successfully!");
            router.push("/")

        } else {
            alert("Error saving user.");
        }
    };
    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-5">
            <h2 className="text-xl font-bold mb-4">Edit User Details</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label className="block">Name
                    <input
                        type="text"
                        name="user"
                        value={formData.user}
                        onChange={handleChange}
                        placeholder="Name"
                        className="w-full p-2 border rounded"
                        required />
                </label>
                <label className="block">Interests (comma-separated)
                    <input
                        type="text"
                        name="interest"
                        value={formData.interest}
                        onChange={handleChange}
                        placeholder="Interests"
                        className="w-full p-2 border rounded"
                        required />
                </label>
                <label className="block">Age
                    <input
                        min="1"
                        max="100"
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        placeholder="Age"
                        className="w-full p-2 border rounded"
                        required />
                </label>
                <label className="block">Mobile
                    <input
                        maxLength={10}
                        type="tel"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="Mobile"
                        className="w-full p-2 border rounded"
                        required />
                </label>
                <label className="block">Email
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="w-full p-2 border rounded"
                        required />
                </label>
                <button
                    type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-600">Update User</button>
            </form>
        </div>
    )
}