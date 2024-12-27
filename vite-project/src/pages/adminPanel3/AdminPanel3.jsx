import React, { useEffect, useState } from 'react'
import css from './AdminPanel3.module.css';
import { useLocation, useNavigate } from 'react-router-dom';

export default function AdminPanel3() {
  const { state } = useLocation();
  const navigate=useNavigate();
  const [coin, setCoin] = useState({
    coin_name: '',
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
    image2: '',
  });

  useEffect(() => {
    if (state?.coin) {
      setCoin(state.coin);
    }
  }, [state]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCoin((prev) => ({ ...prev, [name]: name === 'typeID' ? parseInt(value, 10) : value, }));
  };
  const handleSave = () => {
    fetch(`http://localhost:3000/coins/${coin.coin_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(coin),
    })
      .then(response => response.json())
      .then(data => {
        console.log("Yenilənmiş coin:", data);
        navigate('/adminpanel1')
      })
      .catch(error => console.error('Xəta:', error));
  };

  return (
    <div className={css.admin3}>
      <h1>Admin Panel</h1>
      <form>
        <div className={css.leftColumn}>
          <div className={css.formGroup}>
            <label>Coin name</label>
            <input name="coin_name" value={coin.coin_name} onChange={handleInputChange} type="text" placeholder="Enter coin name" />
          </div>
          <div className={css.formGroup}>
            <label>Face value</label>
            <input name="denomination" value={coin.denomination} onChange={handleInputChange} type="text" placeholder="Enter face value" />
          </div>
          <div className={css.formGroup}>
            <label>Year of issue</label>
            <input name="year" value={coin.year} onChange={handleInputChange} type="text" placeholder="Enter year of issue" />
          </div>
          <div className={css.formGroup}>
            <label>Price</label>
            <input name="price" value={coin.price} onChange={handleInputChange} type="text" placeholder="Enter price" />
          </div>
          <div className={css.formGroup}>
            <label>Country</label>
            <input name="issuingCountry" value={coin.issuingCountry} onChange={handleInputChange} type="text" placeholder="Enter country" />
          </div>
          <div className={css.formGroup}>
            <label>Metal</label>
            <input name="composition" value={coin.composition} onChange={handleInputChange} type="text" placeholder="Enter metal" />
          </div>
        </div>
        <div className={css.middleColumn}>
          <div className={css.formGroup}>
            <label>Short description</label>
            <textarea name="description" value={coin.description} onChange={handleInputChange} placeholder="Enter short description"></textarea>
          </div>
          <div className={css.formGroup}>
            <label>First part of long description</label>
            <textarea name="obverseInfo" value={coin.obverseInfo} onChange={handleInputChange} placeholder="Enter long description"></textarea>
          </div>
          <div className={css.formGroup}>
            <label>Second part of long description</label>
            <textarea name="reverseInfo" value={coin.reverseInfo} onChange={handleInputChange} placeholder="Enter long description"></textarea>
          </div>
          <div className={css.formGroup}>
            <label>Quality of the coin</label>
            <input name="quality" value={coin.quality} onChange={handleInputChange} type="text" placeholder="Enter quality" />
          </div>
          <div className={css.formGroup}>
            <label>Weight</label>
            <input name="weight" value={coin.weight} onChange={handleInputChange} type="text" placeholder="Enter weight" />
          </div>
        </div>
        <div className={css.rightColumn}>
          <div className={css.formGroup}>
            <label>Link to obverse image</label>
            <input name="image" value={coin.image} onChange={handleInputChange} type="text" placeholder="Enter link to obverse image" />
          </div>
          <div className={css.formGroup}>
            <label>Link to reverse image</label>
            <input name="image2" value={coin.image2} onChange={handleInputChange} type="text" placeholder="Enter link to reverse image" />
          </div>
        </div>
        <div className={css.buttons}>
          <button type="button" className={css.save} onClick={handleSave}>Save</button>
          <button type="button" className={css.cancel}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
