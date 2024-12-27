import React, { useEffect, useState } from 'react'
import css from './Homepage2.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { setFiltered, setIssuingCountries, setMetals, setQualities } from '../../features/coinSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Homepage2() {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const issuingCountries = useSelector((state) => state.coins.issuingCountries);
    const metals = useSelector((state) => state.coins.metals);
    const qualities = useSelector((state) => state.coins.qualities);

    const [filterData, setFilterData] = useState({
        country: '',
        metal: '',
        quality: '',
        priceFrom: '',
        priceTo: '',
        yearFrom: '',
        yearTo: ''
    });

    useEffect(() => {
        fetch('http://localhost:3000/coins')
            .then((response) => response.json())
            .then((data) => {
                console.log("Gələn data:", data);
                const countrySet = new Set(data.map((coin) => coin.issuingCountry));
                const countries = [...countrySet];
                dispatch(setIssuingCountries(countries));
                const metalSet = new Set(data.map((coin) => coin.composition));
                const metals = [...metalSet];
                dispatch(setMetals(metals));
                const qualitySet = new Set(data.map((coin) => coin.quality));
                const qualities = [...qualitySet];
                dispatch(setQualities(qualities));
            })
            .catch((error) => console.error('Xəta:', error));
    }, [dispatch]);

    const handleFilter = () => {
        navigate('/lists');
        if (location.pathname === '/lists') {
            navigate('/');
        }
        fetch('http://localhost:3000/coins')
            .then((response) => response.json())
            .then((data) => {
                const filteredData = data.filter((coin) => {
                    const matchCountry = !filterData.country || coin.issuingCountry === filterData.country;
                    const matchMetal = !filterData.metal || coin.composition === filterData.metal;
                    const matchQuality = !filterData.quality || coin.quality === filterData.quality;
                    const matchPrice = (!filterData.priceFrom || coin.price >= Number(filterData.priceFrom)) &&
                        (!filterData.priceTo || coin.price <= Number(filterData.priceTo));
                    const matchYear = (!filterData.yearFrom || coin.year >= Number(filterData.yearFrom)) &&
                        (!filterData.yearTo || coin.year <= Number(filterData.yearTo));
                    return matchCountry && matchMetal && matchQuality && matchPrice && matchYear;
                });
                dispatch(setFiltered(filteredData));
            })
            .catch((error) => console.log('Xəta:', error));
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilterData((prevState) => ({ ...prevState, [name]: value }));
    };

    const routing = () => {
        navigate('/homepage2');
        if (location.pathname === '/homepage2') {
            navigate('/');
        }
    };

    return (
        <div className={css.wrapper}>
            <h1 className={css.title}>Homepage</h1>
            <div className={css.container}>
                <div className={css.head}>
                    <label htmlFor="searchInput" className={css.inputTitle}>Input field</label>
                    <div>
                        <input id="searchInput" type="text" />
                        <button onClick={handleFilter} >Search</button>
                    </div>
                </div>
            </div>
            <div className={css.filter}>
                <div className={css.advanced} onClick={routing}>Advanced filter</div>
                <span>˄</span>
            </div>
            <div className={css.container}>
                <div className={css.inputs}>
                    <label >Issuing country</label>
                    <select name="country" value={filterData.country} onChange={handleFilterChange}>
                        <option value="">Country</option>
                        {issuingCountries.map((country, index) => (
                            <option key={index} value={country}>{country}</option>
                        ))}
                    </select>
                    <label >Metal</label>
                    <select name="metal" value={filterData.metal} onChange={handleFilterChange}>
                        <option value="">Metal</option>
                        {metals.map((metal, index) => (
                            <option key={index} value={metal}>{metal}</option>
                        ))}
                    </select>
                    <label > Quality of the coin</label>
                    <select name="quality" value={filterData.quality} onChange={handleFilterChange}>
                        <option value="">Quality</option>
                        {qualities.map((quality, index) => (
                            <option key={index} value={quality}>{quality}</option>
                        ))}
                    </select>
                </div>
                <div className={css.rightSide}>
                    <div className={css.first}>
                        <label>Price</label>
                        <div className={css.right}>
                            <span>from</span>
                            <input name="priceFrom" type="number" value={filterData.priceFrom} onChange={handleFilterChange} />
                            <span>to</span>
                            <input name="priceTo" type="number" value={filterData.priceTo} onChange={handleFilterChange} />
                        </div>
                    </div>
                    <div className={css.first}>
                        <label>Year of issue</label>
                        <div className={css.right}>
                            <span>from</span>
                            <input name="yearFrom" type="number" value={filterData.yearFrom} onChange={handleFilterChange} />
                            <span>to</span>
                            <input name="yearTo" type="number" value={filterData.yearTo} onChange={handleFilterChange} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
