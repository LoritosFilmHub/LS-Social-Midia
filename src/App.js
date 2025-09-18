import React, { useState } from 'react';
import Login from './Login';
import Feed from './Feed';

function App() {
  const [user, setUser] = useState(null);

  return (
    <div>
      {!user ? (
        <Login onLogin={setUser} />
      ) : (
        <Feed user={user} />
      )}
    </div>
  );
}

export default App;
