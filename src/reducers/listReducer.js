import { CONSTANTS } from "../actions";

let listID = 2;
let cardID = 3;

const initialState = [
     { 
         title: 'TO DO', 
         id: 0, 
         cards: [ 
             { id: 0, text: 'we created a static list and a static card', body: 'hi card description'}, 
             { id: 1, text: 'we used a mix between material', body: 'dddd'} 
        ] 
    }, 
    { 
        title: 'DOING', 
        id: 1, 
        cards: [ 
            { id: 0, text: 'Hi', body: ''}, 
            { id: 1, text: 'we used a mix between material', body: ''}, 
            { id: 2, text: 'what?', body: ''} 
        ] 
    } 
];

const listReducer = (state = initialState, action) => {
    switch(action.type) {
        // 새로운 리스트 생성
        case CONSTANTS.ADD_LIST:
            const newList = {
                id: listID,
                title: action.payload,
                cards: []
            };
            listID += 1;
            return [...state, newList];

        // 새로운 카드 생성 
        case CONSTANTS.ADD_CARD:
            const newCard = {
                id: cardID,
                text: action.payload.text,
                body: ''
            };
            cardID += 1;

            const newState = state.map(list => {
                // 해당 list 일 때
                if(list.id === action.payload.listID) {
                    return {
                        ...list,
                        cards: [...list.cards, newCard]
                    }
                } else {
                    // 해당 list 아닐 떄, 기존값 반환
                    return list
                }
            })
            return newState;
        
        // card 수정
        case CONSTANTS.EDIT_CARD:
            const editCard = state.map(list => 
            list.id !== action.payload.listID ? list : {
                ...list,
                cards: list.cards.map(item => 
                    item.id !== action.payload.cardID ? item : {
                    ...item,
                    text: action.payload.cardText
                })
            })
            return editCard;
        
        // card 삭제
        case CONSTANTS.DELETE_CARD:
            const deleteCard = state.map(list => 
                list.id !== action.payload.listID ? list : {
                    ...list,
                    cards: list.cards.filter(item => item.id !== action.payload.cardID)
                })
            return deleteCard;
            

        default: return state;
    }
};

export default listReducer;