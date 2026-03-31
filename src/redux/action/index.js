// For Add Item to Cart
export const addCart = (product) =>{
    return {
        type:"ADDITEM",
        payload:product
    }
}

// For Delete Item to Cart
export const delCart = (product) =>{
    return {
        type:"DELITEM",
        payload:product
    }
}

// Clear cart after successful checkout
export const clearCart = () =>{
    return {
        type:"CLEARCART"
    }
}

// For Add Item to Wishlist
export const addWishlist = (product) =>{
    return {
        type:"ADD_WISHLIST",
        payload:product
    }
}

// For Remove Item from Wishlist
export const removeWishlist = (product) =>{
    return {
        type:"REMOVE_WISHLIST",
        payload:product
    }
}
