import React from 'react';
import classes from './ToggleMenu.module.css';

const ToggleMenu = (props) =>{

    const cls=[
        classes.ToggleMenu,
        'fa'
    ]

    if(props.isOpen){
        cls.push('fa-times')
        cls.push(classes.open)
    }else{
        cls.push('fa-bars')
    }
    return(
        <i 
            className={cls.join(' ')}
            onClick={props.onToggle}
        >
        </i>
    )
        
    
}
export default ToggleMenu;