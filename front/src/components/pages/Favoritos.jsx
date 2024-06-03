import { useNavigate } from "react-router-dom";
import { FavoriteCard } from "./FavoritosCard.jsx";
import { useState } from "react";

export const Favoritos = ({ favorites = [] }) => {
    const navigate = useNavigate();
    const [inputValue, setInputValue] = useState('');

    const handleNavigateToFavorito = (id) => { // Cambio de nombre de función
        navigate(`/favorito/${id}`); // Cambio de ruta
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const filteredFavoritos = favorites.filter(favortie => // Cambio de variable
    favortie.name.toLowerCase().includes(inputValue.toLowerCase())
    );

    return (
        <div className="channels-container"> {/* Cambio de texto */}
            <span className="title-supreme">Favoritos</span> {/* Cambio de texto */}
            <div className="buscador-box">
                <input
                    type="text"
                    name="buscador"
                    placeholder="Buscar..."
                    className="buscar"
                    value={inputValue}
                    onChange={handleInputChange}
                />
                <i className="fa-solid fa-magnifying-glass"></i>
            </div>
            {filteredFavoritos.length > 0 ? (
                filteredFavoritos.map((s) => (
                    <FavoriteCard
                        key={s.id}
                        _id={s._id}
                        name={s.name}
                        direction={s.direction}
                        score={s.score}
                        imgUrl={s.imgUrl}
                        handleNavigateToStore={handleNavigateToFavorito} // Cambio de función
                    />
                ))
            ) : (
                <div className='nono'>No favorties for this name :(</div>
            )}
        </div>
    );
}
