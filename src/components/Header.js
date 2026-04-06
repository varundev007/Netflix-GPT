import React from "react";
import { useEffect } from "react";
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES, userIcon } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        // navigate("/")
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
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

  const handleGptSearchClick = () => {
    //Toggle Gpt Search
    dispatch(toggleGptSearchView());
  };
  const handleLanguageChange = (e) => {
    // console.log(e.target.value);
    dispatch(changeLanguage(e.target.value));
  };

  return (
    <div className="absolute flex justify-between w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex-col md:flex-row">
      <img className="w-44 mx-auto md:mx-0" src={LOGO} alt="logo" />

      {user && (
        <div className="flex items-center justify-between p-2">
          {showGptSearch && (
            <select
              className="px-3 py-2 mx-2 bg-gray-900 text-white rounded-md"
              onChange={handleLanguageChange}
            >
              {SUPPORTED_LANGUAGES.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}

          <button
            className="px-4 mx-4 bg-purple-800 text-white rounded-lg h-10"
            onClick={handleGptSearchClick}
          >
            {showGptSearch?"Homepage":"GPT Search"}
          </button>

          <img className="hidden md:block w-10 h-10 mx-2" alt="userIcon" src={userIcon} />

          <button onClick={handleSignOut} className="font-bold text-white   mx-2">
            (Sign Out)
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
