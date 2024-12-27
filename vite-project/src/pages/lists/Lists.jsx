import React, { useState } from 'react';
import css from "./Lists.module.css";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFiltered } from '../../features/coinSlice';

export default function Lists() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const filteredCoins = useSelector((state) => state.coins.filtered);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    const filtered = filteredCoins.filter((coin) => {
      return coin.coin_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.description.toLowerCase().includes(searchQuery.toLowerCase());
    });
    dispatch(setFiltered(filtered));
    setSearchQuery('');
  };
  const routing = () => {
    navigate('/homepage2');
  };
  const handleRoute = (coinId) => {
    navigate(`/details/${coinId}`);
  };
  return (
    <div className={css.container}>
      <h1 className={css.title}>List of the coins</h1>
      <p className={css.gray}>
        <span className={css.span} onClick={routing}>Homepage</span> — List of the coins
      </p>
      <div className={css.wrapper}>
        <div className={css.head}>
          <label htmlFor="searchInput">Input field</label>
        </div>
        <input id="searchInput" type="text" className={css.searchInput} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        <button className={css.btn} onClick={handleSearch}>Search</button>
      </div>
      <div className={css.filter}>
        <div className={css.advanced} onClick={routing}>Advanced filter</div>
        <span>˅</span>
      </div>
      <div className={css.coins}>
        {filteredCoins && filteredCoins.length > 0 ? (
          filteredCoins.map((coin) => (
            <div className={css.coin} key={coin.coin_id}>
              <img className={css.img} onClick={() => { handleRoute(coin.coin_id); }} src={coin.image} alt={coin.coin_type} />
              <div className={css.right}>
                <h2 className={css.name}>{coin.coin_name}</h2>
                <p>{coin.description}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No coins to display</p>
        )}
      </div>
    </div>

  );
}
