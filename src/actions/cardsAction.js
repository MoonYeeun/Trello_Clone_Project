import { CONSTANTS } from "../actions";
/*
listID 값을 통해 어느 TrelloList에 Card 추가할 지 확인
*/
export const addCard = ({listID, text}) => {
    return {
        type: CONSTANTS.ADD_CARD,
        payload: {listID, text}
    };
}
