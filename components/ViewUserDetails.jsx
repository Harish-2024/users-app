export default function ViewUserDetails({ user }) {
    return (
        <div className="max-w-sm mx-auto bg-white shadow-lg rounded-xl overflow-hidden border border-gray-200 mt-5">
            <h2 className="text-xl font-bold bg-slate-100 p-3 ">User Details</h2>
            <div className="px-6 py-6">
                <h2 className="text-2xl font-semibold text-gray-800 text-center">{user.user}</h2>
                <p className="text-gray-500 text-sm text-center">{user.email}</p>

                <div className="mt-4 space-y-2">
                    <p className="flex items-center text-gray-700 text-sm">
                        <span className="font-semibold w-20">Age:</span> {user.age}
                    </p>
                    <p className="flex items-center text-gray-700 text-sm">
                        <span className="font-semibold w-20">Mobile:</span> {user.mobile}
                    </p>
                    <p className="flex items-center text-gray-700 text-sm">
                        <span className="font-semibold w-20">Interests:</span>
                        <ul className="flex flex-wrap gap-2">
                            {user.interest.map((item, index) => (
                                <li key={index} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </p>
                </div>
            </div>
        </div>

    )
}