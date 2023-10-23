import React from 'react';

const Picture = ({ picture, onBuyClick }) => {
  return (
    <div className="picture">
      <img src={picture.image} alt={picture.name} />
      <h3>{picture.name}</h3>
      <p>{picture.price} ETH</p>
      <button onClick={() => onBuyClick(picture)}>Buy</button>
    </div>
  );
};

export default Picture;
