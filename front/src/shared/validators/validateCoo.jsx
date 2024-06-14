export const validateCoo = (coordenadas) => {
    const parts = coordenadas.split(',');
    
    if (parts.length !== 2) {
        return false;
    }
    
    const lat = parseFloat(parts[0].trim());
    const lon = parseFloat(parts[1].trim());
    
    if (isNaN(lat) || isNaN(lon)) {
        return false;
    }

    if (lat < -90 || lat > 90) {
        return false;
    }

    if (lon < -180 || lon > 180) {
        return false;
    }
    
    if (coordenadas.length < 3 || coordenadas.length > 50) {
        return false;
    }
    
    return true;
};

export const validateCooMessage = 'Las coordenadas deben estar en el formato correcto y tener entre 3 y 50 caracteres. Ejemplo: -22.96423284379043, -43.17325377521141';
