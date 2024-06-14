export const validatePrice = (price) => {
    const priceNumber = Number(price);
    return Number.isInteger(priceNumber) && priceNumber >= 1 && priceNumber <= 1000000;
};

export const validatePriceMessage = 'El precio debe ser un número entero entre 1 y 1,000,000';
