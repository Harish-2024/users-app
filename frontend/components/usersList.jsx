"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { MdOutlineEdit, MdDeleteOutline } from "react-icons/md"
import { FaRegEye } from "react-icons/fa"

export default function UsersList() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)

    const fetchUsers = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/user/all-users", {
                cache: "no-store",
            })
            if (!res.ok) {
                throw new Error("Failed to fetch users")
            }
            const users = await res.json()
            setUsers(users)
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    const deleteUser = async (id) => {
        try {
            const res = await fetch(`http://localhost:5000/api/user/${id}`, {
                method: "DELETE",
            })
            if (!res.ok) {
                throw new Error("Failed to delete user")
            }
            fetchUsers()
        } catch (error) {
            console.error("Delete error:", error)
        }
    }

    if (loading) return <p>Loading users...</p>

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
                    {users.length === 0 ? (
                        <tr>
                            <td colSpan="3" className="px-6 py-4 text-center">No users found</td>
                        </tr>
                    ) : (
                        users.map((user, index) => (
                            <tr key={index} className="bg-white border-b border-gray-200 hover:bg-gray-50">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {user.userName}
                                </th>
                                <td className="px-6 py-4">{user.email}</td>
                                <td className="px-6 py-4 text-right flex gap-3">
                                    <Link title="Edit user" className="hover:text-blue-600" href={`/editUser/${user._id}`}>
                                        <MdOutlineEdit size={20} />
                                    </Link>
                                    <Link title="View user details" className="hover:text-green-600" href={`/viewUser/${user._id}`}>
                                        <FaRegEye size={20} />
                                    </Link>
                                    <button
                                        title="Delete user"
                                        onClick={() => deleteUser(user._id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        <MdDeleteOutline size={20} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}
