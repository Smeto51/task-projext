import '../fetch/fetch.css';
import React from 'react';

const CurrencyBlock = ({ currency }) => {
  console.log ("re-render CurrencyBlock");
  return (
    <div className='block'>
      <h1>{currency.CharCode}</h1>
      <p>{currency.Name}</p>
      <p>Курс: {currency.Value} RUB</p>
    </div>
  );
};

export default React.memo(CurrencyBlock);