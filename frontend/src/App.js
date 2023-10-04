import { BrowserRouter, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';

// Import pages and components
import Home from './pages/Home';
import Pantry from './pages/Pantry';
import Navbar from './components/Navbar';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Landing from './pages/Landing';

function App() {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <div className="App">
      <BrowserRouter>
        {loggedIn && <Navbar />}
        <Routes>
          {loggedIn ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/pantry" element={<Pantry />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </>
          ) : (
            <Route path="/" element={<Landing />} />
          )}
        </Routes>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
