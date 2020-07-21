import { CONSTANTS } from "../actions";

let listID = 2;
let cardID = 5;

const initialState = [
     { 
         title: 'TO DO', 
         id: 0, 
         cards: [ 
             { id: `card-${0}`, cardTitle: 'we created a static list and a static card', cardBody: 'hi card description'}, 
             { id: `card-${1}`, cardTitle: 'we used a mix between material', cardBody: 'dddd'} 
        ] 
    }, 
    { 
        title: 'DOING', 
        id: 1, 
        cards: [ 
            { id: `card-${2}`, cardTitle: 'Hi', cardBody: ''}, 
            { id: `card-${3}`, cardTitle: 'card', cardBody: ''}, 
            { id: `card-${4}`, cardTitle: 'what?', cardBody: ''} 
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
        case CONSTANTS.ADD_CARD: {
            const newCard = {
                id: `card-${cardID}`,
                cardTitle: action.payload.text,
                cardBody: ''
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
        }
        
        // 드래그앤 드롭 결과
        case CONSTANTS.DRAG_HAPPENED:
            const {
                droppableIdStart, // 드래그앤드롭 시작한 리스트 id
                droppableIdEnd, // 드래그앤드롭 끝낸 리스트 id
                droppableIndexStart, // 드래그앤드롭 시행한 카드위치 idx
                droppableIndexEnd, // 드래그앤드롭 멈춘 카드위치 idx
            } = action.payload;

            const newState = [...state];

            // 같은 리스트 안에서 드래그앤드롭 이루어진 경우
            if(droppableIdStart === droppableIdEnd) {
                const list = state.find(list => droppableIdStart === String(list.id));
                const card = list.cards.splice(droppableIndexStart, 1); // 움직인 카드 추출
                
                // splice(start, count) : start 부터 count 개수 만큼 추출 (특정 범위 값 추출 후), 그 자리에 새로운 값 넣는 함수
                // 움직임 멈춘 인덱스에 추출한 카드 넣어줌
                list.cards.splice(droppableIndexEnd, 0, ...card);
            }
            // 다른 리스트에 드롭했을 경우 
            else {
                const listStart = state.find(list => droppableIdStart === String(list.id)); // 드래그 시작 리스트 
                const card = listStart.cards.splice(droppableIndexStart, 1); // 움직인 카드 추출
                const listEnd = state.find(list => droppableIdEnd === String(list.id)); // 드래그 멈춘 리스트 
                
                // 움직인 카드 새로운 리스트 안에 넣어주기 
                listEnd.cards.splice(droppableIndexEnd, 0, ...card);
            }
            return newState;

        // card 수정
        case CONSTANTS.EDIT_CARD:
            const editCard = state.map(list => 
            list.id !== action.payload.listID ? list : {
                ...list,
                cards: list.cards.map(item => 
                    item.id !== action.payload.cardID ? item : {
                    ...item,
                    cardTitle: action.payload.text,
                    cardBody: action.payload.body
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