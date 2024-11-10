import { arrayUnion, doc, updateDoc, getDocs, query, collection, where } from 'firebase/firestore';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../../context/Firebase';
import { db } from '../../firebase/config';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const AddUser = ({user}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null); 
    const params = useParams();

    const handleAddUser = async () => {
        if (!params.id) {
            console.error("No board ID provided.");
            setError("No board ID provided.");
            return;  
        }

        console.log("Adding user...");
        setIsLoading(true);  
        setError(null); 

        try {
            const q = query(collection(db, "users"), where("email", "==", user.email));
            const querySnapshot = await getDocs(q);
            const notify = () => toast("User added to project");


            if (querySnapshot.empty) {
                console.error("User not found");
                setError("User not found");  
                return;
            }

            const userDoc = querySnapshot.docs[0]; 
            const userId = userDoc.id; 

            console.log(userId);

            const userRef = doc(db, 'users', userId);
            await updateDoc(userRef, {
                boards: arrayUnion(params.id),
            });

            const boardRef = doc(db, 'boards', params.id);
            await updateDoc(boardRef, {
                users: arrayUnion(userId),
            });

            console.log('User successfully added to the board');
            notify()

        } catch (error) {
            console.error("Error adding user:", error);
            setError("An error occurred while adding the user.");  
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div
            key={user.id} 
            className="flex items-center cursor-pointer"
            onClick={handleAddUser}
        >
            <ToastContainer />
            <img className="w-8 h-8" src={user?.photo || "https://avatar.iran.liara.run/public/16"} alt="User" />
            <span>{user.email}</span>
            {error && <div className="text-red-500">{error}</div>}  {/* Display error message */}
        </div>
    );
};

export default AddUser;
