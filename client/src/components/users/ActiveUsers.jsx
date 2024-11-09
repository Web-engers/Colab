import { useEffect, useMemo, useState } from "react";
import { useSelf, useOthers } from "@liveblocks/react";
import { Avatar } from "./Avatar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useParams } from "react-router-dom";

const ActiveUsers = () => {
  const [allUsers, setAllUsers] = useState([])
  const currentUser = useSelf();
  const others = useOthers();
  const params = useParams()

  useEffect(() => {
    const boardID = params.id;

    const getUsers = async () => {
      try {
        const q = query(collection(db, "users"), where("boards", "array-contains", boardID));
        const querySnapshot = await getDocs(q);
        const userDocs = querySnapshot.docs;
        
        const arr = userDocs.map((user) => user.data().name); 
        setAllUsers(arr);
        console.log(allUsers)
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    if (boardID) {
      getUsers();
    }
  }, [params.id]);

  const memoizedUsers = useMemo(() => {
    const hasMoreUsers = others.length > 2;

    return (
      <div className='flex items-center justify-center gap-1'>
        {currentUser && (
          <Avatar name={currentUser.name} otherStyles='border-[3px] border-primary-green' />
        )}

        {allUsers.map(({ key, user }) => (
          <Avatar
            key={key}
            name={`User ${user}`} // Use their unique connection ID for differentiation
            otherStyles='-ml-3'
          />
        ))}

        {hasMoreUsers && (
          <div className='z-10 -ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary-black'>
            +{allUsers.length - 2}
          </div>
        )}
      </div>
    );
  }, [others.length]);

  return memoizedUsers;
};

export default ActiveUsers;