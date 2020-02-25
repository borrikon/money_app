import React from 'react';
import {CirclePicker   } from 'react-color'
import WasteItem from '../WasteItem/WasteItem';
import classes from './WICreator.module.css'
import { connect } from 'react-redux';
import { setItemParam } from '../../store/actions/creatorItem';

class WICreator extends React.Component {

    state={
        name: '',
        money: 0,
        type: 'cost',
        value: '',
        baseColor: '',
        borderColor: ''
    }

    handleSelect = (event) => {
        this.setState({
            type: event.target.value
        })
        
    }
    handleChangeBase = (color) =>{
        this.setState({
            baseColor: color.hex
        })
    }
    handleChangeBorder = (color) =>{
        this.setState({
            borderColor: color.hex
        })
    }
    onChangeName = (event) => {
        this.setState({
            value: event.target.value,
            name: event.target.value
        })
    }
    onSubmitForm =(event)=>{
        const componentProps = [this.state.name, this.state.type, this.state.baseColor, this.state.borderColor];
        const userProps = [this.props.userKey, this.props.login];
        event.preventDefault();
        this.props.setItemParam(componentProps, userProps )
        this.setState({
            value: ''
        })
    }
    
    render(){
        
        
        return(
            <div className='text-center text-white'>
                <h1>Item creator</h1>
                <form className='form-group' onSubmit={(event)=> this.onSubmitForm(event)}>
                    <div className={classes.Inputcont}>
                        <label htmlFor='Item_name:'>Choose name:</label>
                        <input 
                            id='Item_name:'
                            type='text'
                            value={this.state.value}
                            onChange={(event)=>this.onChangeName(event)}    
                        />
                    </div>
                    <div className={classes.Select}>
                        <label htmlFor='selectType'>Choose type of item:</label>
                        <select 
                            value={this.state.type}
                            onChange={(event)=>this.handleSelect(event)}
                            id="selectType"
                        >
                            <option value='costs'>Costs</option>
                            <option value='income' >Income</option>
                        </select>
                        <div className={classes.Colors}>
                                <h2>Base color:</h2>
                            <div>    
                                <CirclePicker  onChangeComplete={ this.handleChangeBase }  />
                            </div>
                                <h2>Border color:</h2>
                            <div>
                                <CirclePicker  onChangeComplete={ this.handleChangeBorder }   />
                            </div>
                        </div>    
                    </div>
                    
                    <button 
                        className={classes.Btn}
                       
                    >Create!</button>
                </form>
                
                <div className={classes.Example}>
                <h4>Your item will be like:</h4>
                    <div>
                        <WasteItem
                            baseColor={this.state.baseColor}
                            borderColor={this.state.borderColor}
                            name={this.state.name}
                            money={this.state.money}
                            type={this.state.type}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
function mapStateToProps(state){
    return{
        userKey: state.auth.userKey,
        login: state.auth.login
    }
}
function mapDispatchToProps(dispatch){
    return{
        setItemParam:(conf, urlPar) => dispatch(setItemParam(conf, urlPar))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(WICreator);