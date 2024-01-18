"use client";

import React from "react";
import { useState, useEffect } from "react";
import {
  signInWithRedirect,
  GoogleAuthProvider,
  FacebookAuthProvider,
  getAuth,
  signInWithPopup,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { app } from "@/config";

const HomeScreen = () => {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user.uid);
        router.push("/dashboard");
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const signInWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    try {
      await signInWithRedirect(auth, provider);
      router.push("/dashboard");
    } catch (e) {
      console.error(e);
    }
  };

  const facebookAuth = async () => {
    const auth = getAuth();
    const provider = new FacebookAuthProvider();
    const fbAuth = signInWithPopup(auth, provider);
    return fbAuth;
  };

  const signInWithFacebookAwait = async () => {
    const user = await facebookAuth();
    console.log("facebook user", user);
    return user;
  };

  return (
    <div>
      {user ? (
        <div>User login success</div>
      ) : (
        <div>
          User is not loggin
          <button
            onClick={signInWithGoogle}
            className="bg-indigo-400 text-white rounded-md px-4 py-2"
          >
            Sign in with google
          </button>
          <button
            onClick={signInWithFacebookAwait}
            className="bg-indigo-400 text-white rounded-md px-4 py-2"
          >
            Sign in with facebook
          </button>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
