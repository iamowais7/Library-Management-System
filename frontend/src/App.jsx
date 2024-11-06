import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import RouteGuard from './components/RouteGuard';
import MaintenancePage from './pages/MaintenancePage';
import UserManagementPage from './pages/UserManagementPage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/login" element={<LoginPage />} />
                    <Route element={<RouteGuard allowedRoles={['admin']} />}>
                        <Route path="/maintenance" element={<MaintenancePage />} />
                    </Route>
                    <Route path="/users" element={<UserManagementPage />} />
                    <Route path="/notfound" element={<NotFoundPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;