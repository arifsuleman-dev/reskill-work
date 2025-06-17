import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import { signOut, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import LoginPage from './LoginPage';

Amplify.configure(awsconfig);

const API_URL = 'https://m05rdouf8d.execute-api.us-east-1.amazonaws.com/dev/products';

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', price: '', category: '' });
  const [isEdit, setIsEdit] = useState(false);
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const session = await fetchAuthSession();
      const token = session.tokens?.idToken?.toString();

      const res = await axios.get(API_URL, {
        headers: { Authorization: token },
      });
      setProducts(res.data);
    } catch (err) {
      console.error('Fetch products failed:', err);
      signOut();
      navigate('/login');
    }
  };

  useEffect(() => {
    getCurrentUser()
      .then(fetchProducts)
      .catch(() => navigate('/login'));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();

    if (isEdit) {
      await axios.put(`${API_URL}/${form.id}`, form, {
        headers: { Authorization: token },
      });
    } else {
      await axios.post(API_URL, form, {
        headers: { Authorization: token },
      });
    }
    setForm({ id: '', name: '', price: '', category: '' });
    setIsEdit(false);
    fetchProducts();
  };

  const handleEdit = (product) => {
    setForm(product);
    setIsEdit(true);
  };

  const handleDelete = async (id) => {
    const session = await fetchAuthSession();
    const token = session.tokens?.idToken?.toString();

    await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: token },
    });
    fetchProducts();
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div style={{ backgroundColor: '#121212', color: '#f0f0f0', minHeight: '100vh', fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#1f1f1f',
        color: 'white',
        padding: '15px',
        borderRadius: '6px',
      }}>
        <h1 style={{ margin: 0 }}>Mobile Zone Portal</h1>
        <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#ff6d00',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            padding: '8px 14px',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ marginTop: '30px', background: '#1e1e1e', padding: '20px', borderRadius: '6px' }}>
        <h2 style={{ fontSize: '24px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>
          {isEdit ? '✏️ Edit Device' : '➕ Add to Catalog'}
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <input style={inputStyle} placeholder="ID" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} required disabled={isEdit} />
          <input style={inputStyle} placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          <input style={inputStyle} placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
          <input style={inputStyle} placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
          <div style={{ gridColumn: 'span 2' }}>
            <button
              type="submit"
              style={{
                backgroundColor: isEdit ? '#ffc107' : '#00c853',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
            >
              {isEdit ? 'Update' : 'Add'} Device
            </button>
          </div>
        </form>
      </div>

      <div style={{ marginTop: '30px' }}>
        <h2 style={{ fontSize: '24px', borderBottom: '2px solid #333', paddingBottom: '10px' }}>📱 Mobile Catalogs</h2>
        <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#1a1a1a', color: '#f0f0f0' }}>
          <thead style={{ backgroundColor: '#2c2c2c' }}>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.name}</td>
                <td>{p.price}</td>
                <td>{p.category}</td>
                <td>
                  <button
                    onClick={() => handleEdit(p)}
                    title="Edit"
                    style={iconBtn('#2979ff')}
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    title="Delete"
                    style={iconBtn('#d32f2f')}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const inputStyle = {
  backgroundColor: '#2c2c2c',
  color: '#ffffff',
  border: '1px solid #555',
  padding: '10px',
  borderRadius: '4px',
};

const iconBtn = (bgColor) => ({
  backgroundColor: bgColor,
  color: 'white',
  padding: '5px 10px',
  border: 'none',
  borderRadius: '4px',
  marginRight: '6px',
  cursor: 'pointer',
});

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products" element={<ProductPage />} />
        <Route path="*" element={<Navigate to="/products" />} />
      </Routes>
    </Router>
  );
}

export default App;
