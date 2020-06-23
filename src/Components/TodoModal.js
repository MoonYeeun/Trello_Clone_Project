import React, { Component} from 'react';
import './TodoModal.css';

class TodoModal extends Component {
    state = {
        title: this.props.title,
        body: this.props.body
    }

    handleChange = (e) => {
        const { name, value } = e.target;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = () => {
        const { onCreate } = this.props;

        const data = {
            title: this.state.title,
            body: this.state.body
        }
        onCreate(data);
    }

    render() {
        const {handleModal} = this.props;

        return (
            <div className="TodoModal">
                <form className="wrapper">
                    <div className="header">
                        <h3>할 일 목록</h3>
                        <button className="button" onClick={() => {handleModal()}}>&times;</button>
                    </div>
                    <div className="content">
                        <p>Title</p>
                        <input className="title" name="title" value = {this.state.title} onChange = {this.handleChange}></input>
                        <p>Description</p>
                        <textarea className="body" name="body" value = {this.state.body} onChange = {this.handleChange}></textarea>
                    </div>
                    <button className="submit" type="submit">ok</button>  
                </form>
            </div>
        )
    }
}

export default TodoModal;