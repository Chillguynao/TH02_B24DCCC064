import React, { useState } from "react";
import axios from "axios";

type Rates = { [key: string]: number };

const CurrencyApp: React.FC = () => {
  const [base, setBase] = useState("USD");
  const [rates, setRates] = useState<Rates>({});
  const [amount, setAmount] = useState(1);

  const fetchRates = async () => {
    try {
      const res = await axios.get(`https://open.er-api.com/v6/latest/${base}`);
      setRates(res.data.rates);
    } catch {
      setRates({});
    }
  };

  return (
    <div style={{ color: "green" }}>
      <h2>Quy đổi tỉ giá tiền tệ</h2>
      <input
        value={base}
        onChange={(e) => setBase(e.target.value.toUpperCase())}
        placeholder="Đơn vị tiền tệ gốc (VD: USD)"
        style={{ marginRight: 8, color: "green", borderColor: "green" }}
      />
      <input
        type="number"
        value={amount}
        min={1}
        onChange={(e) => setAmount(Number(e.target.value))}
        style={{ marginRight: 8, color: "green", borderColor: "green" }}
      />
      <button onClick={fetchRates} style={{ color: "green", borderColor: "green" }}>
        Lấy tỉ giá
      </button>
      <ul>
        {Object.entries(rates).map(([currency, rate]) => (
          <li key={currency}>
            {amount} {base} = {(rate * amount).toFixed(2)} {currency}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CurrencyApp;

