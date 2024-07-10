import { Route, Routes } from "react-router-dom";
import { Settings } from '../pages/Settings';
import { Canjear } from '../pages/Canjear';
import { Favoritos } from '../pages/Favoritos';
import { Home } from '../pages/Home';
import { Transferencia } from '../pages/Transferencia';
import { Divisa } from '../pages/Divisa';
import { CanjearView } from "../canjear/CanjearView.jsx";
import { Cuentas } from '../pages/Cuenta.jsx';

export const Content = ({ canjear, fav, updateFav, user }) => {

    return (
        <div className="content-container">
            <Routes>
                <Route path="/" element={<Home usuarios={user} onFavUpdate={updateFav} />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/canjear" element={<Canjear canjear={canjear} />} />
                <Route path="/canjear/:id" element={<CanjearView />} />
                <Route path="/favoritos" element={<Favoritos fav={fav} onFavUpdate={updateFav} />} />
                <Route path="/transferencia" element={<Transferencia fav={fav} />} />
                <Route path="/divisa" element={<Divisa />} />
                <Route path="/cuentas" element={<Cuentas />} />
            </Routes>
        </div>
    )
}   