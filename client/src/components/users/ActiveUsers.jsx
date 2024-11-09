import { useEffect, useMemo, useState } from "react";
import { useSelf, useOthers } from "@liveblocks/react";
import { Avatar } from "./Avatar";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useParams } from "react-router-dom";

const ActiveUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const currentUser = useSelf();
  const others = useOthers();
  const params = useParams();

  useEffect(() => {
    const boardID = params.id;

    const getUsers = async () => {
      try {
        const q = query(collection(db, "users"), where("boards", "array-contains", boardID));
        const querySnapshot = await getDocs(q);
        const userDocs = querySnapshot.docs;
        
        const arr = userDocs.map((user) => user.data().name);
        setAllUsers(arr);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    if (boardID) {
      getUsers();
    }
  }, [params.id]);

  // Memoize the avatar index for the current user to ensure consistency
  const currentUserAvatarIndex = useMemo(() => {
    return currentUser?.name ? currentUser.name.length % 30 : Math.floor(Math.random() * 30);
  }, [currentUser?.name]);

  const memoizedUsers = useMemo(() => {
    const hasMoreUsers = others.length > 2;

    return (
      <div className="flex items-center justify-center gap-1">
        {currentUser && (
          <Avatar
            name={currentUser.name}
            avatarIndex={currentUserAvatarIndex}
            otherStyles="border-[3px] border-primary-green"
          />
        )}

        {allUsers.map((user, index) => (
          <Avatar
            key={user || index}
            name={user}
            avatarIndex={user.length % 30} // Ensure consistent avatar index for each user
            otherStyles="-ml-3"
          />
        ))}

        {hasMoreUsers && (
          <div className="z-10 -ml-3 flex h-9 w-9 items-center justify-center rounded-full bg-primary-black">
            +{others.length - 2}
          </div>
        )}
      </div>
    );
  }, [allUsers, currentUser, others, currentUserAvatarIndex]);

  return memoizedUsers;
};

export default ActiveUsers;