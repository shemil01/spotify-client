import React, { useState } from 'react';

function PasswordSection({ email, onSubmit, onBack }) {
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(password);
  };

  return (
   <div>

    
   </div>
  );
}

export default PasswordSection;
