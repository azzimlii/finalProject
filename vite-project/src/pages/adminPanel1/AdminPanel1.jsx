import React, { useEffect, useState } from 'react'
import css from "./AdminPanel1.module.css"
import { useDispatch, useSelector } from 'react-redux';
import { setCoins } from '../../features/coinSlice';
import { useNavigate } from 'react-router-dom';
export default function AdminPanel1() {
    const allCoins = useSelector((state) => state.coins.allCoins);
    const [editData, setEditData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCoins, setFilteredCoins] = useState(allCoins);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        fetch('http://localhost:3000/coins')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                dispatch(setCoins(data));
                setFilteredCoins(data.slice(0, 2));

            })
            .catch((error) => {
                console.log('Xəta:', error);
            });
    }, []);
    const handleDelete = (id) => {
        fetch(`http://localhost:3000/coins/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                console.log(`silinen ${id}`);
                dispatch(setCoins(allCoins.filter((coin) => coin.coin_id !== id)));
            })
            .catch((error) => {
                console.log('xəta:', error);
            });
    };

    const handleSearch = () => {
        const filtered = allCoins.filter((coin) => {
            return coin.coin_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                coin.description.toLowerCase().includes(searchQuery.toLowerCase());
        });
        setFilteredCoins(filtered);
        setSearchQuery('')
    };
    const handleEdit = (coin) => {
        setEditData(coin);
        navigate('/adminpanel3', { state: { coin } });
    };
    const handleRoute = (coinId) => {
        navigate(`/details/${coinId}`)
    }
    return (
        <div className={css.container}>
            <h2 className={css.title}>Admin panel</h2>
            <input className={css.searchInput} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} type="text" />
            <button className={css.searchBtn} onClick={handleSearch}>Search</button>
            {filteredCoins.map((element) => (
                <div className={css.coins} key={element.coin_id}>
                    <img className={css.img} onClick={() => { handleRoute(element.coin_id) }} src={element.image} alt={element.coin_type} />
                    <div className={css.right}>
                        <h2 className={css.name}>{element.coin_name}</h2>
                        <p>{element.description}</p>
                    </div>
                    <div className={css.buttons}>
                        <button className={css.btn} onClick={() => handleEdit(element)}>Edit</button>
                        <button className={css.btn} onClick={() => handleDelete(element.coin_id)}>Delete</button>
                    </div>
                </div>
            ))}
            <div className={css.adding}>
                <img className={css.img} src="https://i.postimg.cc/vBx5xfyh/Добавить_монету.png" alt="Add coin" />
                <p className={css.add} onClick={() => navigate('/adminpanel2')}>Add a new coin</p>
            </div>
        </div>
    );
}
