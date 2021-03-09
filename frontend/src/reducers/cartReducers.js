
//creating reducer. first paraemeter is how our state will look like. what is initial state of cartReducer
//reducer will take care of all Actions related to cartReducer. //and second is action that was dispatched
export const cartReducer = (state = { cartItems: [] }, action) => {//initial state is empty array of cartItems
    switch (action.type) {//switching type/name of action
        case 'CART_ADD_ITEM':
            //if we add to cart and its already there
            const item = action.payload;
            //find if it exist in cart. for each items in current state cartItems
            const existItem = state.cartItems.find(x => x.product === item.product);
            //x.product(id) is equal to item.product(id) then

            if (existItem) {
                return {//return whatever is already in state. and for cartItems. map through cartItems
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }//if x.product(id) is equal to existItem.product(id). than just return item for thsi iteration else return x(what was)
            } else {//if it doesnt exist
                return {//return whatever is already in state. and for cartItems. add curent items and new item
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case 'CART_REMOVE_ITEM':
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product != action.payload),
            }//set cartItems to, filter through cartItems array. if x.product(id) is equal to action.payload
        //dispatched action data as payload, that send data is item id
        default:
            return state;

    }

}
