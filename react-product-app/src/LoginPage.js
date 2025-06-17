import React, { useState } from 'react';
import { signIn } from 'aws-amplify/auth';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signIn({ username, password });
      navigate('/products');
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to right, #dbe9ff, #f0f8ff)',
      fontFamily: 'Segoe UI, sans-serif'
    }}>
      <form
        onSubmit={handleLogin}
        style={{
          backgroundColor: '#ffffff',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          width: '320px',
        }}
      >
        <h2 style={{ marginBottom: '20px', textAlign: 'center', color: '#004080' }}>
          Mobile Zone Login
        </h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '14px',
          }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '20px',
            borderRadius: '6px',
            border: '1px solid #ccc',
            fontSize: '14px',
          }}
        />
        <button
          type="submit"
          style={{
            width: '100%',
            backgroundColor: '#007bff',
            color: 'white',
            padding: '10px',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
        {error && (
          <p style={{ color: 'red', marginTop: '15px', textAlign: 'center' }}>
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
