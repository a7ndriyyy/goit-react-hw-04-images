import { Component } from 'react';
import css from './Modal.module.css';

class Modal extends Component {
    render() {
        return (
            <div id="modal" onClick={this.props.onClickClose} className={css.Overlay}>
                <div className={css.Modal}>
                    <img className={css.Largeimg}
                        src={this.props.largeImageUrl}
                        alt={this.props.id} />
                </div>
            </div>
        )
    }
}
export default Modal;
