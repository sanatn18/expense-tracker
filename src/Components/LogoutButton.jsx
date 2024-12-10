import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useQueryClient } from '@tanstack/react-query';
import { PowerOff } from 'lucide-react';
import '../Styles/LogoutButton.css'

const LogoutButton = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();

    const handleLogout = () => {
        //  confirmation dialogbix
        const isConfirmed = window.confirm('Are you sure you want to logout?');
        
        //  proceed with logout if user confirms logout
        if (isConfirmed) {
            localStorage.removeItem('authToken');// Clear authentication token from localStorage
            queryClient.clear(); // Clear all queries to remove cached data
            dispatch({ type: 'expenses/reset' });// Clear expenses state
            navigate('/login', { 
                replace: true,
                state: { preventBack: true }
            });// Prevent going back to dashboard after logout
            window.history.pushState(null, '', '/login');// Additional step to prevent browser back button access
        }
    };

    return (
        <button 
            className="logout-button" 
            onClick={handleLogout}
            title='Logout'
        >
                <PowerOff size={24} />
        </button>
    );
};

export default LogoutButton;