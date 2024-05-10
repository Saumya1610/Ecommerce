import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";


const ProfileScreen = () => {
  const user = useSelector((state) => state?.user?.user);
  console.log(user);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[url('https://img.freepik.com/free-vector/pastel-ombre-background-pink-purple_53876-120750.jpg')] bg-cover	">
      <div className="mb-4">
        {/* Profile picture logo */}
        {user && user?.profilePic ? (
          <img
            src={user.profilePic} // Assuming user.profilePic contains the path to the profile picture
            alt="Profile"
            className="h-16 w-16 rounded-full border border-gray-300"
          />
        ) : (
          // If profile picture is not available, show default user icon
          <FaUserCircle size={60}/>
        )}

      </div>
      <div className="bg-white overflow-hidden shadow rounded-lg border w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900 text-center">
            User Profile
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500 text-center">
            This is information about the user.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            {/* Profile details */}
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Full name
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user?.name}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user?.email}
              </dd>
            </div>
          
            
            {/* Add more profile details here */}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
