const handleWishlist = (state = [], action) => {
    switch (action.type) {
        case "ADD_WISHLIST":
            // Check if item already exists in wishlist
            if (state.find(item => String(item.id) === String(action.payload.id))) {
                return state;
            }
            return [...state, action.payload];
        
        case "REMOVE_WISHLIST":
            return state.filter(item => String(item.id) !== String(action.payload.id));
        
        default:
            return state;
    }
};

export default handleWishlist;
