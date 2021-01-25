import thunk from 'redux-thunk';
import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { productsReducer } from './ProductsReducer';
import { IProductsState } from './ProductsTypes';
import { basketReducer } from './BasketReducer';
import { IBasketState } from './BasketTypes';

export interface IApplicationState {
    basket: IBasketState;
    products: IProductsState;
}

export const rootReducer = combineReducers<IApplicationState>({
    basket: basketReducer,
    products: productsReducer
});

export default function configutreStore(): Store<IApplicationState> {
    return createStore(rootReducer, undefined, applyMiddleware(thunk));
}
