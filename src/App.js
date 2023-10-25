import React, { useState, useEffect } from 'react';
import './App.css';
import Picture from './Picture';
import { ethers } from 'ethers';

function App() {
  const [cart, setCart] = useState([]);
  const [picturesData, setPicturesData] = useState([
    { id: 1, name: 'Tulips', price: 0.025, image: '/images/tulip.jpg' },
    { id: 2, name: 'Hydrangea', price: 0.015, image: '/images/hydrangea.jpg' },
    { id: 3, name: 'Roses', price: 0.0006, image: '/images/roses.jpg' },
    { id: 4, name: 'Lily', price: 0.08, image: '/images/lily.jpg' },
    { id: 5, name: 'Daisy', price: 0.004, image: '/images/daisy.jpg' },
    { id: 6, name: 'Carnation', price: 0.01, image: '/images/carnation.jpg' },
    { id: 7, name: 'Orchid', price: 0.003, image: '/images/orchid.jpg' },
    { id: 8, name: 'Peony', price: 0.005, image: '/images/peonies.jpg' }
  ]);
  const [totalPrice, setTotalPrice] = useState(0);

  const contractAddress = '0xb3097F60E3CE874365A1EB481A7037Cf22DA80a2';
  const contractAbi = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "buyer",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "price",
          "type": "uint256"
        }
      ],
      "name": "PicturePurchased",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "picturePrice",
          "type": "uint256"
        }
      ],
      "name": "buyPicture",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "cart",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "pay",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "totalPrice",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }  ];
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(contractAddress, contractAbi, signer);

  const removeFromWebsite = (pictureId) => {
    setPicturesData((prevPicturesData) =>
      prevPicturesData.filter((picture) => picture.id !== pictureId)
    );
  };

  const addToCart = (picture) => {
    setCart([...cart, picture]);
    setTotalPrice(totalPrice + picture.price);
  };

  const pay = async () => {
    try {
      
      const totalPriceInWei = ethers.utils.parseEther(totalPrice.toString());

      const tx = await contract.pay({ value: totalPriceInWei });
      await tx.wait();

      alert(`Payment successful! Total Price:${totalPrice} ETH`);

      setCart([]);
      setTotalPrice(0);

      cart.forEach((item) => removeFromWebsite(item.id));
    } catch (error) {
      console.error('Error making payment:', error);
      alert('Payment failed. Please check your balance and try again.');
    }
  };

  useEffect(() => {
    async function connectToMetamask() {
      if (window.ethereum) {
        try {
          await window.ethereum.enable();
        } catch (error) {
          console.error('Error connecting to Metamask:', error);
        }
      }
    }
    connectToMetamask();
  }, []);

  return (
    <div className="App">
      <h1>Ferns and Petals</h1>
      <div className="pictures">
        {picturesData.map((picture) => (
          <Picture key={picture.id} picture={picture} onBuyClick={() => addToCart(picture)} />
        ))}
      </div>
      <div className="cart">
        <h2>Shopping Cart</h2>
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name} - {item.price} ETH
            </li>
          ))}
        </ul>
        <p>Total Price: {totalPrice} ETH</p>
        <button onClick={pay}>Pay</button>
      </div>
    </div>
  );
}

export default App;
