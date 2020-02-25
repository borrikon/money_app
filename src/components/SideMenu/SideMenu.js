import React from 'react';
import classes from './SideMenu.module.css';
import Backdrop from './Backdrop/Backdrop';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';


class SideMenu  extends React.Component{
    
    clickHandler=()=>{
        this.props.onClose()
    }

     renderLinks(links){
        
        return (
                links.map((item, index)=>{
                    return(
                    <li key={index}>
                         <Link
                            to={item.to}
                            exact={item.exact ? 'exact' : null}
                            onClick={this.clickHandler} 
                         >
                        {item.label}
                         </Link>
                    </li>
                    )
                })
        )
    }
render(){ 

        const cls = [classes.SideMenu]

        if(!this.props.isOpen){
            cls.push(classes.close)
        }

        const links = [
            {to: '/', label: 'Current day', exact: true}
        ];
        if(this.props.isAuthenticated){
            links.push({to: '/alldays', label: 'All Days', exact: false})
            links.push({to: '/creator', label: 'Creator', exact: false})
            links.push({to: '/logout', label: 'Logout', exact: false})
        }else{
            links.push({to: '/auth', label: 'logIn', exact: false})
        }

        return(
            <React.Fragment>
            <nav
                className={cls.join(' ')}
            >
                <ul>
                    {this.renderLinks(links)}
                </ul>
            </nav>
            {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </React.Fragment>
        )
    }
}
function mapStateToProps(state){
    return{
        isAuthenticated: !!state.auth.token
    }
}
export default connect(mapStateToProps)(SideMenu);