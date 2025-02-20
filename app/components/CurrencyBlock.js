// src/components/CurrencyBlock.js
import React from 'react';
import '../fetch/fetch.css';

const CurrencyBlock = ({ currency }) => {
  return (
    <div className='block'>
      <h1>{currency.CharCode}</h1>
      <p>{currency.Name}</p>
      <p>Курс: {currency.Value} RUB</p>
    </div>
  );
};

export default CurrencyBlock;