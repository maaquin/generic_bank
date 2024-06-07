import { Route, Routes } from "react-router-dom";
import { Settings } from '../pages/Settings';
import { Canjear } from '../pages/Canjear';
import { Favoritos } from '../pages/Favoritos';
import { Home } from '../pages/Home';
import { Transferencia } from '../pages/Transferencia';
import { Divisa } from '../pages/Divisa';
import { CanjearView } from "../canjear/CanjearView.jsx";

export const Content = ({ canjear, fav, updateFav }) => {

    return (
        <div className="content-container">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/canjear" element={<Canjear canjear={canjear} />} />
                <Route path="/canjear/:id" element={<CanjearView/>}/>
                <Route path="/favoritos" element={<Favoritos fav={fav} onFavUpdate={updateFav} />}/>
                <Route path="/transferencia" element={<Transferencia/>}/>
                <Route path="/divisa" element={<Divisa/>}/>
            </Routes>
        </div>
    )
}   