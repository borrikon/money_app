import React from 'react';
import classes from './WasteItem.module.css';

function WasteItem(props){
    const cls = [classes.WasteItem];
    if(props.type === 'costs'){
        cls.push(classes.costs)
    }else{
        cls.push(classes.income)
    }
    const del = [classes.delete, 'fa', 'fa-times']
        return(
            <div className={cls.join(' ')}>
                <i className={del.join(' ')}
                   onClick={()=>props.deleteItem(props.id, props.firebaseKey, props.catItem, props.userKey)}
                ></i>
                <div style={{background: `${props.baseColor}`, borderColor: `${props.borderColor}`}}></div>
                <p>{props.name}</p>

                <p><b>{props.money}</b></p>
                
                <form onSubmit={(event)=>props.onNewMoneyMove(event, props.value, props.id, props.catItem)}
                      
                >
                   
                    <input 
                        onChange={(event)=>props.onChangeValue(event, props.id, props.catItem)}
                        type='text' 
                        placeholder={`your ${props.type}`}
                        value={props.value}
                    >
                    </input>
                    <button>Add {`${props.type}`}</button>
                    
                </form>
            </div>
        )
    }    
export default WasteItem;