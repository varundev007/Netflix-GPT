import React from 'react'
import { useEffect } from 'react';
import { auth } from '../utils/firebase';
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {addUser, removeUser} from '../utils/userSlice';
import { LOGO, userIcon } from '../utils/constants';

const Header = () => {
  const dispatch = useDispatch();
  const navigate =  useNavigate();
  const user = useSelector((store) => store.user)
  

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
       // navigate("/")
      })
      .catch((error) => {
        // An error happened.
        navigate("/error")
      });
  };

   useEffect(() => {
    const unsubscribe =  onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user

        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate("/browse");
        // ...
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
      }
    });
    //Unsubscribe when components unmounts
    return () => unsubscribe();
  }, []);
  return (
  <div className='absolute flex justify-between w-screen px-8 py-2 bg-gradient-to-b from-black z-10'>
    <img
      className='w-44'
      src={LOGO}
      alt="logo"
    />

    <div className='flex p-2'>
      {user && (
        <>
          <img
            className='w-10 h-10 my-7'
            alt="userIcon"
            src={userIcon}
          />
          <button
            onClick={handleSignOut}
            className='font-bold text-white'
          >
            (Sign Out)
          </button>
        </>
      )}
    </div>
  </div>
);
};

export default Header;