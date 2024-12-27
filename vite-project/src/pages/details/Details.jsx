import React, { useEffect, useState } from 'react'
import css from "./Details.module.css"
import { useNavigate, useParams } from 'react-router-dom';
export default function Details() {
    const navigate = useNavigate();
    const { coinId } = useParams();
    console.log('coinId:', coinId);
    const [coin, setCoin] = useState({});

    useEffect(() => {
        console.log(` ID ${coinId}`);
        fetch(`http://localhost:3000/coins/${coinId}`)
            .then((response) => response.json())
            .then((data) => setCoin(data))
            .catch((error) => console.log('Xəta:', error));
    }, []);

    return (
        <div className={css.container}>
            <div className={css.coinDetails}>
                <img src={coin.image} className={css.coinImage} />
                <img src={coin.image2} className={css.coinImage} />
            </div>
            <div className={css.info}>
                <h1 className={css.title}>{coin.coin_name}</h1>
                <p>{coin.description}</p>
                <p>{coin.obverseInfo}</p>
                <p>{coin.reverseInfo}</p>
                <table className={css.coinTable}>
                    <tbody>
                        <tr>
                            <td>Issuing Country</td>
                            <td>{coin.issuingCountry}</td>
                        </tr>
                        <tr>
                            <td>Composition</td>
                            <td>{coin.composition}</td>
                        </tr>
                        <tr>
                            <td>Quality</td>
                            <td>{coin.quality}</td>
                        </tr>
                        <tr>
                            <td>Denomination</td>
                            <td>{coin.donimination}</td>
                        </tr>
                        <tr>
                            <td>Year</td>
                            <td>{coin.year}</td>
                        </tr>
                        <tr>
                            <td>Weight</td>
                            <td>{coin.weight}</td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td>{coin.price}</td>
                        </tr>
                    </tbody>
                </table>
                <span className={css.span} onClick={() => { navigate('/lists') }}>Back to the list</span>
            </div>
        </div>
    )
}
