import React from 'react';
import classes from './Auth.module.css'
import Input from '../UI/Input/Input'
import { connect } from 'react-redux';
import {auth} from '../../store/actions/auth'



function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Auth extends React.Component{

    state={
       formControl: 
        {   
        email: {
            valid: false,
            type: 'email',
            touched: false,
            errorMessage: 'Write correct Email',
            label: 'Email',
            value: ''
            },
        password:{
            valid: false,
            type: 'password',
            touched: false,
            errorMessage: 'Write correct Password. Min.length = 6 symbols',
            label: 'Password',
            value: ''
            }
        }
    }


    validControl(value, control){
       let isValid = true

       if(value.length <6 && control === "password"){
           isValid = false
       }
       if(value.trim() === ''){
           isValid = false
       }
       if(control === 'email'){
            isValid = validateEmail(value)
       }

       return isValid
    }

    onChangeValue=(event, controlName)=>{

        const newState = { ...this.state.formControl}
        const control = { ...newState[controlName]}

        control.value = event.target.value
        control.touched = true 
        control.valid = this.validControl(control.value, controlName)  

        newState[controlName] = control
        
        this.setState({
            formControl: newState
        })
    }

    renderInputs(){
        return Object.keys(this.state.formControl).map((inputName, index)=>{
            const control = this.state.formControl[inputName];
            return(
                <Input
                    key={index}
                    type={control.type}
                    label={control.label}
                    errorM={control.errorMessage}
                    isTouched={control.touched}
                    value={control.value}
                    isValid={control.valid}
                    onChange={event => this.onChangeValue(event, control.type)}
                />
            )
        })

    }

    loginHandler = async () => {
        this.props.auth(this.state.formControl.email.value, this.state.formControl.password.value, true)
    }

    registrHandler = async () =>{
        this.props.auth(this.state.formControl.email.value, this.state.formControl.password.value, false)
    }

    preventDef = (event) => {
        event.preventDefault()
    }
    render(){
        
        return(
            <div className={classes.Auth} > 
                <div className='container-sm'>
                    <form onSubmit = {(event) => this.preventDef(event)} >
                        <h1 className='h3 mb-3 font-weight-normal'>Auth</h1>
                        {this.renderInputs()}
                        <button onClick={() => this.loginHandler()} >Sing in</button>
                        <button onClick={() => this.registrHandler()}>Registration</button>
                    </form>
                </div>
            </div>
        )
    }
}

function mapDispatchToProps(dispatch){
    return{
        auth: (email, password, isLogin)=> dispatch(auth(email, password, isLogin))
    }
}

export default connect(null, mapDispatchToProps)(Auth);
