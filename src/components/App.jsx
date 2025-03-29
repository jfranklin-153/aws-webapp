// filepath: /my-react-app/my-react-app/src/components/App.jsx
import React from 'react';
import './App.css'; // Assuming you have some styles for this component
import MainPage from '../pages/index';

const App = () => {
    return (
        <div className="App">
            <MainPage />
        </div>
    );
};

export default App;