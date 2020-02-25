import React from 'react';
import classes from './Button.module.css';

const Button =props=>{
    
    const cls = [classes.button];

    return(
        <button 
            className={cls.join(' ')}
            onClick={()=>props.addDayHandler()}
        >
            Add day
        </button>
    )
}

export default Button;