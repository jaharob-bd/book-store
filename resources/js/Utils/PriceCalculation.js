
export const calculateSubTotal = (items) => {
    return items.reduce((total, item) => total + item.quantity * item.price, 0);
};

export const calculateGrandTotal = (subTotal, discount, vat) => {
    return parseInt(subTotal) - parseInt(discount) + parseInt(vat);
};

export const calculateDiscount = (subTotal, discountType, discount) => {
    if (discountType === 2) {
        return discount || 0;
    }
    return discount ? (subTotal * discount) / 100 : 0;
};

export const calculateVAT = (subTotal, discount, vatType, vat) => {
    if (vatType === 2) {
        return vat || 0;
    }
    return vat ? ((subTotal - discount) * vat) / 100 : 0;
};