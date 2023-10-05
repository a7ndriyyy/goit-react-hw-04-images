import { Component } from 'react';
import css from './Button.module.css';


class button extends Component{
    render(){
        return (
            <button onClick={this.props.getMoreImage} className={css.Button}>
                Load More
            </button>
        );
  }
}

export default button;