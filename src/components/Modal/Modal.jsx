import { useEffect } from 'react';
import css from './Modal.module.css';

const Modal = props => {
    useEffect(() => {
        const handleKeyPress = event => {
            if (event.keyCode === 27) {
                props.onClose();
            }
        };

        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.addEventListener('keydown', handleKeyPress);
        };
    }, [props]);

    return (
        <div id="modal" onClick={props.onClickClose} className={css.Overlay}>
            <div className={css.Modal}>
                <img className={css.Largeimg}
                    src={props.largeImageUrl}
                    alt={props.id} />
            </div>
        </div>
    );
};

export default Modal;
