import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/config';

const AddUser = ({ user }) => {
    const [isLoading, setIsLoading] = useState(false);
    const params = useParams();

    const handleAddUser = async () => {

        if (!user?.id || !params.id) return;  // Early return if no user or board ID
        console.log("adding user")
        setIsLoading(true);  // Set loading state to true while the update is happening

        try {
            const userRef = doc(db, 'users', user.id);
            await updateDoc(userRef, {
                boards: arrayUnion(params.id)
            });

            const boardRef = doc(db, 'boards', params.id);
            await updateDoc(boardRef, {
                users: arrayUnion(user.id)
            });

            // Optionally, handle success (e.g., show a success message)
            console.log('User successfully added to the board');
        } catch (error) {
            console.error("Error adding user:", error);
            // Optionally, handle error (e.g., show an error message)
        } finally {
            setIsLoading(false);  // Set loading state back to false
        }
    };

    return (
        <div
            key={user.id}
            className="flex items-center cursor-pointer"
            onClick={handleAddUser}
        >
            <img className="w-8 h-8" src={user.photo || "https://avatar.iran.liara.run/public/16"} alt="User" />
            <span>{user.email}</span>
            {isLoading && <span>Loading...</span>}  {/* Optional: Display loading state */}
        </div>
    );
};

export default AddUser;
