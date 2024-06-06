import { CanjearCard } from "../Canjear/CanjearCard";
import { useState } from "react";

export const Canjear = ({ canjear }) => {
    const [inputValue, setInputValue] = useState('');

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const filteredCanjear = canjear.filter(canje =>
        canje.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <>
            <div className="channels-container">
                <span className="title-supreme">Canjear</span>
                <div className="buscador-box">
                    <input
                        type="text"
                        name="buscador"
                        placeholder="Buscar..."
                        className="buscador"
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
                {filteredCanjear.map((canje, index) => (
                    <CanjearCard key={index} data={canje} />
                ))}
            </div>
        </>
    );
};
