import { arrayUnion, doc, updateDoc, getDocs, query, collection, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';
import { db } from '../firebase/config';

const AddUser = ({ user }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); // State to hold any error messages
    const params = useParams();

    const handleAddUser = async () => {
        if (!params.id) {
            console.error("No board ID provided.");
            setError("No board ID provided.");
            return;  // Early return if no board ID
        }

        console.log("Adding user...");
        setIsLoading(true);  // Set loading state to true while the update is happening
        setError(null);  // Reset error message on each attempt

        try {
            // Query Firestore to find the user by email
            const q = query(collection(db, "users"), where("email", "==", user.email));
            const querySnapshot = await getDocs(q);

            // Check if the user exists
            if (querySnapshot.empty) {
                console.error("User not found");
                setError("User not found");  // Set error state
                return;
            }

            const userDoc = querySnapshot.docs[0]; // The first document returned
            const userId = userDoc.id; // User's Firestore document ID

            console.log(userId);

            // Update the user's boards array
            const userRef = doc(db, 'users', userId);
            await updateDoc(userRef, {
                boards: arrayUnion(params.id),
            });

            // Update the board's users array
            const boardRef = doc(db, 'boards', params.id);
            await updateDoc(boardRef, {
                users: arrayUnion(userId),
            });

            console.log('User successfully added to the board');
        } catch (error) {
            console.error("Error adding user:", error);
            setError("An error occurred while adding the user.");  // Set error message
        } finally {
            setIsLoading(false);  // Set loading state back to false
        }
    };

    return (
        <div
            key={user.id}  // Use user.id as key for uniqueness
            className="flex items-center cursor-pointer"
            onClick={handleAddUser}
        >
            <img className="w-8 h-8" src={user?.photo || "https://avatar.iran.liara.run/public/16"} alt="User" />
            <span>{user.email}</span>
            {isLoading && <span>Loading...</span>}  {/* Optional: Display loading state */}
            {error && <div className="text-red-500">{error}</div>}  {/* Display error message */}
        </div>
    );
};

export default AddUser;
