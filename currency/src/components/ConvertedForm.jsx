import React, { useEffect, useState } from "react";
import Currency from "./Currency";

const ConvertedForm = () => {
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [result, setResult] = useState("");
  const [amount, setAmount] = useState(100);
  const [isloading, setIsloading] = useState(false);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const getExchangeRate = async () => {
    const API_KEY = "b81e802ff496e699795026bf";
    const API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${fromCurrency}/${toCurrency}`;

    setIsloading(true)

    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw Error("something wrong");

      const data = await response.json();

      const rate = (data.conversion_rate * amount).toFixed(2);

      setResult(`${amount} ${fromCurrency} = ${rate} ${toCurrency}`)
      console.log(rate);
    } catch (error) {
      console.log(error);
    }finally{
      setIsloading(false);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    getExchangeRate();
  };

  useEffect(()=> getExchangeRate ,[]);
  return (
    <>
    <form className="converter-form" onSubmit={handleFormSubmit}>
      <div className="form-group">
        <label className="form-label">Enter Amount</label>
        <input type="number" className="form-input"  value={amount} onChange={e =>setAmount(e.target.value)}/>
      </div>

      <div className="form-group">
        <div className="form-section">
          {/* <label className="form-label">From</label> */}
          <Currency
            selectedCurrency={fromCurrency}
            handleCurrency={(e) => setFromCurrency(e.target.value)}
          />
        </div>

        <div className="swap-icon" onClick={handleSwap}>
          <img
            src="https://cdn-icons-png.flaticon.com/128/16698/16698147.png"
            alt=""
          />
        </div>

        <div className="form-section">
          {/* <label className="form-label">To</label> */}
          <Currency
            selectedCurrency={toCurrency}
            handleCurrency={(e) => setToCurrency(e.target.value)}
          />
        </div>
      </div>
      <div className="button-container">
        <button type="sumbit" className={`${isloading ? "loading": ""} submit-btn`}>
          Get Exchange Rate
        </button>
        <div className="result-box">
          <p className="exchange-rate-result">
            {isloading ? "Getting Exchange Rate ..." : result}
          </p>
        </div>
      </div>
    </form>
    </>
  );
};

export default ConvertedForm;
