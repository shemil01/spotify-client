import React, { useState } from 'react';
import EmailSection from './EmailSection';
import PasswordSection from './PasswordSection';
import DOBSection from './DOBSection';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDOB] = useState('');

  const handleEmailSubmit = (email) => {
    setEmail(email);
    setCurrentPage(2);
  };

  const handlePasswordSubmit = (password) => {
    setPassword(password);
    setCurrentPage(3);
  };

  const handleDOBSubmit = (dob) => {
    setDOB(dob);
    // Here you would handle the final submission, e.g., API call to create account
    console.log('Signup complete:', { email, password, dob });
  };

  return (
    <div className="">
      <div className="">
        <div className="">
          {currentPage === 1 && <EmailSection onSubmit={handleEmailSubmit} />}
          {currentPage === 2 && (
            <PasswordSection
              email={email}
              onSubmit={handlePasswordSubmit}
              onBack={() => setCurrentPage(1)}
            />
          )}
          {currentPage === 3 && (
            <DOBSection
              email={email}
              password={password}
              onSubmit={handleDOBSubmit}
              onBack={() => setCurrentPage(2)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
