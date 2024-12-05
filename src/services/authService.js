import axios from 'axios';

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
        const token = response.data.token;

        if (token) {
            localStorage.setItem('authToken', token); // Save the token
        } else {
            console.error('Login failed: No token received.');
        }

        return token; // Return the token for immediate use, if needed
    } catch (error) {
        console.error('Login error:', error.message);
        throw error; // Re-throw to handle in the calling component
    }
};

export const logoutUser = () => {
    localStorage.removeItem("authToken");
};

