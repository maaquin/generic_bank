import toast from "react-hot-toast";
export const validateIngresos = (nu) => {
    const ingresos = Number(nu);
    if (isNaN(ingresos) || ingresos < 100) {
        toast('Solo número, mínimo 100', {
            icon: '❌',
            style: {
                borderRadius: '10px',
                background: '#fff',
                color: '#333',
            },
        });
        return false;
    }
    return true;
}