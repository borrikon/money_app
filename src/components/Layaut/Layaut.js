import React from 'react';
import classes from './Layaut.module.css';
import ToggleMenu from '../ToggleMenu/ToggleMenu';
import SideMenu from '../SideMenu/SideMenu';



class Layaut extends React.Component{

    state={
        isOpenMenu: false
    }

    toggleMenuHandler=()=>{
        this.setState({
            isOpenMenu: !this.state.isOpenMenu
        })
    }
    onCloseToggle=()=>{
        this.setState({
            isOpenMenu: !this.state.isOpenMenu
        })
    }

    render(){
        return(
            <div className={classes.Layaut}>

                <ToggleMenu 
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.isOpenMenu}
                    
                />
                <SideMenu 
                    isOpen={this.state.isOpenMenu}
                    onClose={this.onCloseToggle}
                />

                <main>
                    {this.props.children}
                </main>
            </div>    
        )
    }
}



export default Layaut;