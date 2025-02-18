// src/components/CurrencyBlock.js
import React from 'react';
import '../fetch/fetch.css';

const CurrencyBlock = ({ currency }) => {
  return (
    <div className='block'>
      <h3>{currency.CharCode}</h3>
      <p>{currency.Name}</p>
      <p>Курс: {currency.Value} RUB</p>
    </div>
  );
};

export default CurrencyBlock;