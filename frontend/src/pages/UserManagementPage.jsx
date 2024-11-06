import React, { useState, useEffect } from 'react';

function UserManagementPage({ fetchUsers, onAddUser, onUpdateUser }) {
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('user'); // Default role is 'user'
    const [password, setPassword] = useState('');
    const [isUpdateMode, setIsUpdateMode] = useState(false); // Toggle between adding and updating
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Fetch users to display in the dropdown when updating a user
        const fetchUserList = async () => {
            try {
                const userList = await fetchUsers();
                setUsers(userList);
            } catch (error) {
                console.error("Error fetching users:", error);
                alert("Failed to fetch users. Please try again.");
            }
        };

        fetchUserList();
    }, []);

    useEffect(() => {
        // Pre-populate form when a user is selected for updating
        if (isUpdateMode && userId) {
            const userToUpdate = users.find(user => user.id === userId);
            if (userToUpdate) {
                setUsername(userToUpdate.username);
                setEmail(userToUpdate.email);
                setRole(userToUpdate.role);
                setPassword(''); // Don't pre-populate password for security reasons
            }
        } else {
            // Reset the form for adding a new user
            setUsername('');
            setEmail('');
            setRole('user');
            setPassword('');
        }
    }, [userId, isUpdateMode, users]);

    const handleRoleChange = (e) => {
        setRole(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = { username, email, role, password };
        try {
            if (isUpdateMode) {
                await onUpdateUser(userId, user); // Update existing user
                alert("User updated successfully!");
            } else {
                await onAddUser(user); // Add a new user
                alert("User added successfully!");
            }

            // Reset form fields after successful submission
            setUsername('');
            setEmail('');
            setPassword('');
            setRole('user');
            setUserId('');
            setIsUpdateMode(false);
        } catch (error) {
            console.error("Error submitting user data:", error);
            alert("Failed to submit the user data. Please try again.");
        }
    };

    return (
        <div className="user-management-page">
            <h2>{isUpdateMode ? 'Update User' : 'Add New User'}</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="userId">{isUpdateMode ? 'Select User to Update' : 'Username'}:</label>
                    {isUpdateMode ? (
                        <select
                            id="userId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            required
                        >
                            <option value="">--Select User--</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.username}
                                </option>
                            ))}
                        </select>
                    ) : (
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    )}
                </div>

                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="role">Role:</label>
                    <select
                        id="role"
                        value={role}
                        onChange={handleRoleChange}
                        required
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="password">{isUpdateMode ? 'Leave Blank to Keep Existing' : 'Password'}:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required={!isUpdateMode} // Password is required only when adding a new user
                    />
                </div>

                <button type="submit">{isUpdateMode ? 'Update User' : 'Add User'}</button>
            </form>

            <div>
                <button onClick={() => setIsUpdateMode((prev) => !prev)}>
                    {isUpdateMode ? 'Switch to Add User' : 'Switch to Update User'}
                </button>
            </div>
        </div>
    );
}

export default UserManagementPage;
