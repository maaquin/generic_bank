import { Route, Routes } from "react-router-dom";
import { Settings } from '../pages/Settings';
import { Canjear } from '../pages/Canjear';
import { Favoritos } from '../pages/Favoritos';
import { Home } from '../pages/Home';
import { Transferencia } from '../pages/Transferencia';
import { Divisa } from '../pages/Divisa';

export const Content = ({ }) => {

    return (
        <div className="content-container">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/canjear" element={<Canjear/>}/>
                <Route path="/favoritos" element={<Favoritos/>}/>
                <Route path="/transferencia" element={<Transferencia/>}/>
                <Route path="/divisa" element={<Divisa/>}/>
            </Routes>
        </div>
    )
}