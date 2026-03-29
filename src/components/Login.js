import React, {useState } from "react";
import Header from "./Header";
//rafce => react arrow function component export
const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };
  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/8cc08720-ac1c-4364-bcbd-9495bf0308cd/web/IN-en-20260323-TRIFECTA-perspective_0b8c8e4e-71ee-48bd-8e16-da74f083a838_large.jpg"
          alt="logo"
        />
      </div>
      <form className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
        <h1 className="font-bold text-3xl py-4">{isSignInForm?"Sign In" : "Sign Out"}</h1>
         {
          !isSignInForm && (
          <input
          type="text"
          placeholder="Full Name"
          className="p-2 my-4 w-full bg-gray-700 rounded-lg"
          />
          )
         }
        <input
          type="text"
          placeholder="Email address"
          className="p-2 my-4 w-full bg-gray-700 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 my-4 w-full bg-gray-700 rounded-lg"
        />
        <button className="p-4 my-6 bg-red-700 w-full rounded-lg">
          {" "}
          {isSignInForm?"Sign In" : "Sign Out"}{" "}
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm?"New to Netflix? Sign Up Now" : "Already registered? Sign In now"}
        </p>
      </form>
    </div>
  );
};

export default Login;
