import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
    const { user, isAuthenticated } = useAuth0()
    const navigate = useNavigate()

    return (
        isAuthenticated &&
        <div className="max-w-screen-xl mx-auto p-4">
            <div className="bg-blue-500 text-white p-4 mb-4 items-center rounded-md flex ">
                <button onClick={() => navigate(-1)} className='mr-2'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                    </svg>
                </button>

                Profile Page
            </div>
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">User Profile</h2>
                    <div className="flex items-center space-x-4">
                        {user && <img
                            src={user.picture}
                            alt={user.name}
                            className="w-16 h-16 rounded-full"
                        />}
                        <div>
                            <h3 className="text-lg font-semibold">{user && user.name}</h3>
                            <p className="text-gray-500">{user && user.email}</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    );
}

export default ProfilePage;
