import Link from "next/link";
import { AiOutlineUserAdd } from "react-icons/ai";

export default function NavBar() {
    return (
        <nav className="flex justify-between">
            <Link className="font-bold" href={"/"}>Users-List</Link>
            <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-1 me-2"><Link className="flex gap-2 items-center" href={"/addUser"}>Add User <AiOutlineUserAdd /> </Link></button>

        </nav>
    )
}