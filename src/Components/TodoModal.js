import React, { Component} from 'react';
import '../css/TodoModal.css';

class TodoModal extends Component {
    state = {
        text: this.props.cardTitle,
        body: this.props.cardBody
    }

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = () => {
        const { text, body } = this.state;
        const { cardTitle, cardBody, handleEditCard, handleModal } = this.props;

        // 변경 사항 있을 경우 
        if(text !== cardTitle || body !== cardBody ) {
            handleEditCard(text, body);
        }
        handleModal();
    }

    render() {
        const { text, body } = this.state;

        return (
            <div className="TodoModal">
                <form className="wrapper">
                    <div className="header">
                        <div className="icon">&#x214F;</div>
                        <input className="title" name="text" value={text} onChange = {this.handleChange}></input>
                        <div className="button" onClick={this.handleSubmit}>&#10005;</div>
                    </div>
                    <div className="content">
                        <div className="bodyTitle">&#9776; Description</div>
                        <textarea className="body" name="body" value={body} onChange = {this.handleChange}></textarea>
                    </div>
                    <div className="content">
                        <div className="bodyTitle">&#9776; Activity</div>
                    </div>
                </form>
            </div>
        )
    }
}

export default TodoModal;