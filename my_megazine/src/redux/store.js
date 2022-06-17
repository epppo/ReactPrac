import { createStore, combineReducers, applyMiddleware } from "redux";   //legacy_createStore 문법 변경되었다고 함, 찾아보기

import user from "./modules/userRedux";
import board from "./modules/boardRedux";
import like from "./modules/likeReducer";
import comment from "./modules/commentRedux";

import thunk from "redux-thunk"


const middlewares = [thunk]; 
const rootReducer = combineReducers({ user, board, like , comment}); 
const enhancer = applyMiddleware(...middlewares); 
const store = createStore(rootReducer, enhancer); 

export default store; 