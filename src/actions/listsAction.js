import { CONSTANTS } from "../actions";
/*
입력폼에 뭔가의 말을 쓴다음에 add버튼을 누르게되면
dispatch로 addList 라는 액션을 발생시킬꺼고 
addList의 파라미터에 쓴 텍스트가 들어오게 될 것
*/
export const addList = title => {
    return {
        type: CONSTANTS.ADD_LIST,
        payload: title
    };
};