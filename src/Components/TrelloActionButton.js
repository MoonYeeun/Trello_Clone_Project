import React, { useState } from 'react' 
import Card from '@material-ui/core/Card'
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Textarea from 'react-textarea-autosize'
import { addList, addCard } from '../actions'
import { useDispatch } from 'react-redux';


/*
Hook은 함수 컴포넌트에서 React state와 생명주기 기능(lifecycle features)을 
“연동(hook into)“할 수 있게 해주는 함수

Hook은 계층 변화 없이 상태 관련 로직을 재사용할 수 있도록 도와준다.
Hook을 통해 로직에 기반을 둔 작은 함수로 컴포넌트를 나눌 수 있다. 
(구독 설정 및 데이터를 불러오는 것과 같은 로직)
*/
const TrelloActionButton = ({list, listID}) => {

    const [state, setState] = useState(false); // 현재 state, 이 값을 업데이트 하는 함수
    const [text, setText] = useState(''); // card 에 입력한 text
    const dispatch = useDispatch()

    // 새로운 trello list 만들기
    const renderForm = () => {
        const placeholder = list ? "Enter list title..." : "Enter a title for this card..." 
        const buttonTitle = list ? "Add List" : "Add Card"

        const handleInputChange = ({target}) => {
            setText(target.value)
        }
        const handleAddList = () => {
            if(text) {
                dispatch(addList(text))
                setText('')
                setState(false) // 입력창 닫기 
            }
            return;
        }
        
        const handleAddCard = () => {
            if(text) {
                dispatch(addCard({listID, text}))
                setText('')
                setState(false) // 입력창 닫기 
            }
            return;
        }

        return (
            <div> 
                <Card style={styles.Card}> 
                    <Textarea style={styles.Textarea} placeholder={placeholder} 
                    autoFocus value={text}
                    onChange={handleInputChange}/> 
                </Card> 
                <div style={styles.formButtonGroup}> 
                    <Button style={styles.Button} variant="contained"
                    onClick={list ? handleAddList : handleAddCard}>
                        {buttonTitle}
                    </Button> 
                    <Icon onClick={() => {setState(false)}}>close</Icon>
                </div> 
            </div>
        )
    }
    // 새로운 trello card 만들기 
    const renderAddbutton = () => {
        const buttonText = list ? 'Add another list' : 'Add another Card';
        const buttonTextOpacity = list ? 1 : 0.5 
        const buttonTextColor = list ? "white" : "inherit" 
        const buttonTextBackgroud = list ? "rgba(0,0,0,.15)" : "inherit"

        return ( 
            <div onClick={() => {setState(true)}} style={{ 
                ...styles.openFormButtonGroup, 
                opacity:buttonTextOpacity, 
                color:buttonTextColor, 
                backgroundColor:buttonTextBackgroud}}> 
                <Icon>add</Icon> 
                <p>{buttonText}</p> </div> 
        );
    } 

    return (
        // true 이면 카드 생성 false 이면 list 생성
        state ? renderForm() : renderAddbutton()
    )
}
const styles = { 
    openFormButtonGroup:{ 
        display:"flex", 
        alignItems:"center", 
        cursor:"pointer", 
        borderRadius:3, 
        height:36, 
        width:272, 
        paddingLeft:10 
    }, 
    Card: {
        overflow:"visible", 
        minHeight:80, 
        minWidth:272, 
        padding:"6px 8px 2px"
    },
    Textarea: { 
        resize:"none", 
        overflow:"hidden", 
        outline:"none", 
        border:"none", 
        width:"100%" 
    }, 
    Button: {
        color:"white", 
        backgroundColor: "#5aac44",
        marginBottom: 10
    },
    Icon: {
        marginLeft:8, 
        cursor:"pointer"
    },
    formButtonGroup:{ 
        marginTop:8, 
        display:"flex", 
        alignItems:"center" 
    }
}

export default TrelloActionButton;