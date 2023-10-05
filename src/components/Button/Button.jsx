
import css from './Button.module.css';


const button =({getMoreImage}) => {
        return (
            <button onClick={getMoreImage} className={css.Button}>
                Load More
            </button>
        );
  }


export default button;