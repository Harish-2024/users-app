"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AddUser() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        userName: "",
        interests: "",
        age: "",
        mobile: "",
        email: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formattedData = {
            ...formData,
            interests: formData.interests.split(",").map((item) => item.trim()),
            age: parseInt(formData.age, 10),
            mobile: parseInt(formData.mobile, 10),
        };

        try {
            const res = await fetch("http://localhost:5000/api/user/addUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formattedData),
            });
            if (res.ok) {
                alert("User saved successfully!");
                setFormData({ userName: "", interests: "", age: "", mobile: "", email: "" });
                router.push("/");
            } else {
                alert("Error saving user.");
            }
        } catch (error) {
            console.error("Failed to save user:", error);
            alert("Something went wrong.");
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md mt-5">
            <h2 className="text-xl font-bold mb-4">User Form</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <label className="block">
                        Name
                        <input
                            type="text"
                            name="userName"
                            value={formData.userName}
                            onChange={handleChange}
                            placeholder="Name"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </label>
                    <label className="block">
                        Interests (comma-separated)
                        <input
                            type="text"
                            name="interests"
                            value={formData.interests}
                            onChange={handleChange}
                            placeholder="Interests"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </label>
                    <label className="block">
                        Age
                        <input
                            min="1"
                            max="100"
                            type="number"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            placeholder="Age"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </label>
                    <label className="block">
                        Mobile
                        <input
                            type="tel"
                            name="mobile"
                            maxLength={10}
                            value={formData.mobile}
                            onChange={handleChange}
                            placeholder="Mobile"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </label>
                    <label className="block">
                        Email
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email"
                            className="w-full p-2 border rounded"
                            required
                        />
                    </label>
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded hover:bg-gray-600"
                    >
                        Add User
                    </button>
                </form>
        </div>
    );
}
