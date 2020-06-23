import React, { useState } from 'react'; 
import Card from '@material-ui/core/Card'; 
import Icon from '@material-ui/core/Icon'
import Button from '@material-ui/core/Button'
import Textarea from 'react-textarea-autosize'
import Typography from '@material-ui/core/Typography'; 
import CardContent from '@material-ui/core/CardContent';
import './TrelloCard.css';
import TodoModal from './TodoModal';
import Modal from './Modal';
import { editCard, deleteCard } from '../actions'
import { useDispatch } from 'react-redux';

const TrelloCard = ({ listID, cardID, text, body }) => {
    const [modal, setModal] = useState(false); 
    const [isEdit, setEdit] = useState(false); 
    const [cardText, setUpdate] = useState(text); 
    const dispatch = useDispatch()

    const handleModal = () => {
        setModal(!modal)
    }

    // 수정 모드  
    const editMode = () => {
        const titleText = text;
        
        const handleTitleUpdate = ({target}) => {
            setUpdate(target.value)
        }

        const handleEditCard = () => {
            console.log(cardText);
            if(cardText) {
                dispatch(editCard({listID, cardID, cardText}))
                setEdit(false)
            }
            return;
        }

        return ( 
            <div> 
                <Card style={styles.Card}> 
                    <Textarea style={styles.Textarea} placeholder={titleText} 
                    autoFocus value={cardText}
                    onChange={handleTitleUpdate}/> 
                </Card> 
                <div style={styles.formButtonGroup}> 
                    <Button style={styles.Button} variant="contained"
                    onClick={() => handleEditCard()}>
                        SAVE
                    </Button> 
                    <Icon onClick={() => {setEdit(false)}}>close</Icon> 
                </div> 
            </div>
        );
    } 
    // 읽기 모드 
    const readMode = () => {

        console.log(listID + " " + cardID + " " + text);

        const handleDeleteCard = () => {
            dispatch(deleteCard({listID, cardID}))
        }

        return (
            <Card style = {styles.CardContainer}>
                <div className="todo-item">
                    <div className="remove" onClick={() => handleDeleteCard()}>&times;</div>
                    <CardContent className="todo-text" onClick={() => handleModal()}>
                        <Typography gutterBottom>{text}</Typography>
                    </CardContent>
                    {
                        modal && (
                            <Modal>
                                <TodoModal handleModal={handleModal} title={text} body={body}></TodoModal>
                            </Modal>
                        )
                    }
                    <div className="update" onClick={() => {setEdit(true)}}>&#9998;</div> 
                </div>
            </Card>
        );
    }

    return (
        isEdit === false ? readMode() : editMode()
    )
}

const styles = { 
    CardContainer: {
        marginBottom: 10
    },

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

export default TrelloCard;