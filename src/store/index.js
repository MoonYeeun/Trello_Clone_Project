import { createStore } from 'redux'; 
import rootReducer from '../reducers' 

/*
리덕스에서 createStore 를 가져와서 그안에 리듀서를 넣어준다.
스토어에는 프로젝트의 상태들이 담겨있고 리듀서를 통해 상태를 업데이트 시킨다.
*/
const store = createStore(rootReducer); 

export default store;