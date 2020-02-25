import React  from 'react';
import classes from './Input.module.css';

const Input = props => {

    const htmlFor = props.type + Math.random()

    return(
        <div className={classes.Inputcont}>
            <label htmlFor={htmlFor}>{props.label}</label>
            <input
                id={htmlFor}
                value={props.value}
                placeholder={props.type}
                onChange={props.onChange}
            />
            {
              (!props.isValid && props.isTouched) ? <p>Incorrect {props.label}</p> : null
            }
        </div>
    )      
}
export default Input;