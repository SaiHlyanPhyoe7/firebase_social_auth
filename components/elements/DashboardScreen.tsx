"use client";

import React, { useEffect, useState } from "react";
import { getAuth, signOut, onAuthStateChanged, User } from "firebase/auth";
import { useRouter } from "next/navigation";
import { app } from "@/config";

const DashboardScreen = () => {
  const auth = getAuth(app);
  const router = useRouter();
  const [userDetails, setUserDetails] = useState<User | null>(null);
  console.log("user", userDetails);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
      if (user) {
        setUserDetails(user);
      } else {
        router.push("/");
        setUserDetails(null);
      }
    });

    return () => unsubscribe();
  });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div>
      Welcome to the dashboard,{" "}
      {userDetails ? userDetails.displayName : "Guest"}
      <button
        className="bg-orange-400 rounded-md px-4 py-2 text-white"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardScreen;
