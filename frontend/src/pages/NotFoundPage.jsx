import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to the homepage after 5 seconds
        const timer = setTimeout(() => {
            navigate('/');
        }, 5000);

        // Clean up the timer on component unmount
        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="not-found-page">
            <h2>404 - Page Not Found</h2>
            <p>Sorry, the page you are looking for does not exist or has been moved.</p>
            <p>You will be redirected to the homepage shortly, or you can click the button below to go there manually.</p>
            <button onClick={() => navigate('/')}>Go to Homepage</button>
        </div>
    );
}

export default NotFoundPage;
