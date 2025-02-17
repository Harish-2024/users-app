"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";

export default function UsersList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/users", {
                    cache: "no-store",
                });
                if (!res.ok) {
                    throw new Error("Failed to fetch users");
                }
                const { users } = await res.json();
                setUsers(users);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) return <p>Loading users...</p>;

    return (
        <div className="relative w-1/2 overflow-x-auto shadow-md sm:rounded-lg m-5">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                    <tr>
                        <th scope="col" className="px-6 py-3">User name</th>
                        <th scope="col" className="px-6 py-3">Email</th>
                        <th scope="col" className="px-6 py-3">
                            <span className="sr-only">Action</span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {user.user}
                            </th>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4 text-right flex gap-2">
                                <Link title="Edit user" className="hover:underline" href={`/editUser/${user._id}`}>
                                    <MdOutlineEdit size={24} />
                                </Link>
                                <Link title="View user details" className="hover:underline" href={`/viewUser/${user._id}`}>
                                    <FaRegEye size={24} />
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
