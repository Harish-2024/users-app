import ViewUserDetails from "@/components/ViewUserDetails";

const getUserById = async (id) => {
    try {
        const res = await fetch(`http://backend-dev:5000/api/user/${id}`, {
            cache: "no-store"
        })
        if (!res.ok) {
            throw new Error("Failed to fetch user");
        }
        const user = await res.json();
        return user
    } catch (error) {
        console.error(error);
    }
}

export default async function EditUser({ params }) {
    const { id } = params;
    const user = await getUserById(id)
    return (
        <ViewUserDetails user={user} />
    )
}