
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'https://m05rdouf8d.execute-api.us-east-1.amazonaws.com/dev/products';

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ id: '', name: '', price: '', category: '' });
  const [isEdit, setIsEdit] = useState(false);

  const fetchProducts = async () => {
    const res = await axios.get(API_URL);
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await axios.put(`${API_URL}/${form.id}`, form);
    } else {
      await axios.post(API_URL, form);
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
    await axios.delete(`${API_URL}/${id}`);
    fetchProducts();
  };

  return (
    <div>
      <h1>Product Manager</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="ID" value={form.id} onChange={(e) => setForm({ ...form, id: e.target.value })} required disabled={isEdit} />
        <input placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input placeholder="Price" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
        <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} required />
        <button 
  type="submit" 
  style={{ backgroundColor: isEdit ? '#ffc107' : '#28a745', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', marginTop: '10px' }}
>
  {isEdit ? 'Update' : 'Add'} Product
</button> 
      </form>

      <h2>Products</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th><th>Name</th><th>Price</th><th>Category</th><th>Actions</th>
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
                  style={{ backgroundColor: '#007bff', color: 'white', marginRight: '8px', padding: '5px 10px', border: 'none', borderRadius: '4px' }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(p.id)}
                  style={{ backgroundColor: '#dc3545', color: 'white', padding: '5px 10px', border: 'none', borderRadius: '4px' }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
