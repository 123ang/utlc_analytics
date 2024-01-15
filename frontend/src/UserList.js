import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserList() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/users'); // Adjust the URL based on your Flask API
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handlePromote = async (userId) => {
        // Logic to promote a user
        console.log('Promote user with ID:', userId);
        // After promotion logic, you may want to fetch the updated list of users
    };

    const handleDelete = async (userId) => {
        // Logic to delete a user
        console.log('Delete user with ID:', userId);
        // After deletion logic, you may want to fetch the updated list of users
    };

    return (
        <div>
            <h3>User List</h3>
            <table>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.username}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button onClick={() => handlePromote(user.id)}>Promote</button>
                                <button onClick={() => handleDelete(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default UserList;
