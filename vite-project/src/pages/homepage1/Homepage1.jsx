import React, { useEffect, useState } from 'react';
import css from "./Homepage1.module.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCoins, setFiltered } from '../../features/coinSlice';

export default function Homepage1() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const allCoins = useSelector((state) => state.coins.allCoins);
  const filtered = useSelector((state) => state.coins.filtered);

  useEffect(() => {
    fetch('http://localhost:3000/coins')
      .then((response) => response.json())
      .then((data) => {
        const array = [];
        const filteredData = data.filter((element) => {
          if (!array.includes(element.coin_type)) {
            array.push(element.coin_type);
            return true;
          }
          return false;
        });
        dispatch(setCoins(data));
        dispatch(setFiltered(filteredData));
      })
      .catch((error) => {
        console.log('Xəta:', error);
      });
  }, []);

  const routing = () => {
    navigate('/homepage2');
    if (location.pathname === '/homepage2') {
      navigate('/');
    }
  };

  const showAllByType = (type) => {
    navigate('/lists');
    const filteredCoins = allCoins.filter(element => element.coin_type === type);
    dispatch(setFiltered(filteredCoins));
  };

  const [searchState, setSearchState] = useState({ searchLine: '' });
  const { searchLine } = searchState;

  const handleInputChange = (event) => {
    setSearchState({ searchLine: event.target.value });
  };

  const handleSearch = () => {
    navigate('/lists');
    fetch(`http://localhost:3000/coins/?s=${searchLine}`)
      .then((response) => response.json())
      .then((data) => {
        const filteredCoins = data.filter((element) =>
          element.coin_name.toLowerCase().includes(searchLine.toLowerCase()) ||
        element.description.toLowerCase().includes(searchLine.toLowerCase())

        );
        dispatch(setFiltered(filteredCoins));
      })
      .catch((error) => console.log('Search Error:', error));
  };

  return (
    <div className={css.wrapper}>
      <h1 className={css.title}>Homepage</h1>
      <div>
        <div className={css.container}>
          <div className={css.head}>
            <label htmlFor="searchInput">Input field</label>
            <div>
              <input id="searchInput" type="text" value={searchLine} onChange={handleInputChange}/>
              <button onClick={handleSearch}>Search</button>
            </div>
          </div>
        </div>
      </div>
      <div className={css.filter}>
        <div className={css.advanced} onClick={routing}>Advanced filter</div>
        <span>˅</span>
      </div>
      <div className={css.coins}>
        {filtered.length > 0 ? (
          filtered.map((element) => (
            <div className={css.coinContainer} key={element.coin_id}>
              <div className={css.right}>
                <h2 className={css.type}>{element.coin_type}</h2>
                <p className={css.showAll} onClick={() => showAllByType(element.coin_type)}> Show all ›</p>
              </div>
              <img className={css.img} src={element.image} alt={element.coin_type} />
            </div>
          ))
        ) : (
          <p>No coins match your search element</p>
        )}
      </div>
    </div>
  );
}
