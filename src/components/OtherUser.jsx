import React from 'react'
import { useDispatch,useSelector } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';

const OtherUser = ({ user }) => {
    const dispatch = useDispatch();
    const {selectedUser, onlineUsers} = useSelector(store=>store.user);
    const isOnline = onlineUsers?.includes(user._id);
    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    }
    return (
        <div className="px-2">
            <div 
                onClick={() => selectedUserHandler(user)} 
                className={`${
                    selectedUser?._id === user?._id 
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                    : 'bg-white hover:bg-gray-50 text-gray-700'
                } flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-300 ease-in-out my-2 border border-gray-100 hover:shadow-md`}
            >
                <div className="relative">
                    <div className={`avatar ${isOnline ? 'online' : ''}`}>
                        <div className='w-14 h-14 rounded-full ring-2 ring-offset-2 ring-blue-500'>
                            <img 
                                src={user?.profilePhoto} 
                                alt="user-profile" 
                                className="rounded-full object-cover w-full h-full"
                            />
                        </div>
                    </div>
                    {isOnline && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                </div>
                <div className='flex flex-col flex-1'>
                    <div className='flex justify-between items-center'>
                        <p className="font-semibold text-lg">{user?.fullName}</p>
                        {selectedUser?._id === user?._id && (
                            <span className="text-xs bg-white text-blue-600 px-2 py-1 rounded-full">Active</span>
                        )}
                    </div>
                    <p className="text-sm text-gray-500">Click to chat</p>
                </div>
            </div>
        </div>
    )
}

export default OtherUser