import { combineReducers } from 'redux';
import listReducer from './listReducer';


// 여러개의 리듀서를 합쳐주고, 합쳐진 리듀서를 루트리듀서 라고 부른다.

export default combineReducers({
    lists: listReducer
});