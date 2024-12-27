import React, { useState } from 'react';
import css from './AdminPanel2.module.css';
import { useNavigate } from 'react-router-dom';

export default function AdminPanel2() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    denomination: '',
    year: '',
    price: '',
    issuingCountry: '',
    composition: '',
    description: '',
    obverseInfo: '',
    reverseInfo: '',
    quality: '',
    weight: '',
    image: '',
    typeID: '',
    image2: '',
  });
  const [message, setMessage] = useState(''); 

  const handleSubmit = (e) => {
    const isFormValid = Object.values(formData).every(
      (value) => value !== null && value !== ""
    );

    if (!isFormValid) {
      setMessage('*Butun inputlari doldurun!'); 
      return;
    }
    console.log(formData)

    fetch('http://localhost:3000/coins', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        alert('Coin added successfully!');
        console.log(result);
        setFormData({
          name: '',
          denomination: '',
          year: '',
          price: '',
          issuingCountry: '',
          composition: '',
          description: '',
          obverseInfo: '',
          reverseInfo: '',
          quality: '',
          weight: '',
          image: '',
          typeID: '',
          image2: '',
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred while adding the coin.');
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'typeID' ? parseInt(value, 10) : value, });
  };
  return (
    <div className={css.admin2}>
      <h1 className={css.h1}>Admin Panel</h1>
      <form >
        <div className={css.leftColumn}>
          <div className={css.formGroup}>
            <label>Coin name</label>
            <input name="name" value={formData.name} onChange={handleChange} type="text"  placeholder="Enter coin name" />
          </div>
          <div className={css.formGroup}>
            <label>Face value</label>
            <input name="denomination" value={formData.denomination} onChange={handleChange} type="text" placeholder="Enter face value" />
          </div>
          <div className={css.formGroup}>
            <label>Year of issue</label>
            <input name="year" value={formData.year} onChange={handleChange} type="text" placeholder="Enter year of issue" />
          </div>
          <div className={css.formGroup}>
            <label>Price</label>
            <input name="price" value={formData.price} onChange={handleChange} type="text" placeholder="Enter price" />
          </div>
          <div className={css.formGroup}>
            <label>Country</label>
            <input name="issuingCountry" value={formData.issuingCountry} onChange={handleChange} type="text" placeholder="Enter country" />
          </div>
          <div className={css.formGroup}>
            <label>Metal</label>
            <input name="composition" value={formData.composition} onChange={handleChange} type="text" placeholder="Enter metal" />
          </div>
        </div>
        <div className={css.middleColumn}>
          <div className={css.formGroup}>
            <label>Short description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter short description"></textarea>
          </div>
          <div className={css.formGroup}>
            <label>First part of long description</label>
            <textarea name="obverseInfo" value={formData.obverseInfo} onChange={handleChange} placeholder="Enter long description"></textarea>
          </div>
          <div className={css.formGroup}>
            <label>Second part of long description</label>
            <textarea name="reverseInfo" value={formData.reverseInfo} onChange={handleChange} placeholder="Enter long description"></textarea>
          </div>
          <div className={css.formGroup}>
            <label>Quality of the coin</label>
            <input name="quality" value={formData.quality} onChange={handleChange} type="text" placeholder="Enter quality" />
          </div>
          <div className={css.formGroup}>
            <label>Weight</label>
            <input name="weight" value={formData.weight} onChange={handleChange} type="text" placeholder="Enter weight" />
          </div>
        </div>
        <div className={css.rightColumn}>
          <div className={css.formGroup}>
            <label>Link to obverse image</label>
            <input name="image" value={formData.image} onChange={handleChange} type="text" placeholder="Enter link to obverse image" />
          </div>
          <div className={css.formGroup}>
            <label>Link to reverse image</label>
            <input name="image2" value={formData.image2} onChange={handleChange} type="text" placeholder="Enter link to reverse image" />
          </div>
          <div className={css.formGroup}>
            <label>Type</label>
            <select name="typeID" onChange={handleChange}>
              <option value="">Select Type</option>
              <option value="1">Bullion coins</option>
              <option value="2">Exclusive coins</option>
              <option value="3">Commemorative coins</option>
            </select>
          </div>
          {message && <p className={css.message}>{message}</p>}
        </div>
        <div className={css.buttons}>
          <button type="button" className={css.save} onClick={handleSubmit}>Save</button>
          <button type="button" onClick={() => { navigate('/adminpanel1') }} className={css.cancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}
