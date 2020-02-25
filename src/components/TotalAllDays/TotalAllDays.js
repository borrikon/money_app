import React from 'react';
import classes from './TotalAllDays.module.css';
import Loader from '../UI/Loader/Loader'
import { connect } from 'react-redux';
import { fetchDays, deleteOneDay } from '../../store/actions/totalAllDays';

class TotalAllDays extends React.Component {

    componentDidMount(){
        this.props.fetchDays(this.props.userKey, this.props.userId)
    }

    deleteDay(index){
        this.props.deleteOneDay(index, this.props.allDays, this.props.userKey, this.props.userId)
    }
    
    render(){ 
        return(
            <div className={classes.TotalAllDays}>
                <h1>All days money</h1>
                <div className={classes.allDaysContainer}>
                    { 
                        this.props.loading 
                        ? <Loader/> 
                        :   this.props.allDays.map( (item, index) =>{
                                return(
                                <div key={index} className={classes.dayElement}>
                                    <div>{item[2]}</div>
                                    <div>Costs: {item[0]}</div>
                                    <div>Income: {item[1]}</div>
                                    <button onClick={() => this.deleteDay(index)}>Delete</button>
                                </div>
                                )
                            })      
                    }
                </div>
                <div>
                <h2>Total</h2>
                <div>
                    <div>Total Income: {this.props.totalIncome}</div>
                    <div>Total Costs: {this.props.totalCosts}</div>
                    <div>Total balance: {this.props.totalBalace}</div>
                </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        allDays: state.allDaysTotal.allDays,
        totalIncome: state.allDaysTotal.totalIncome,
        totalCosts: state.allDaysTotal.totalCosts,
        totalBalace: state.allDaysTotal.totalBalace,
        loading: state.allDaysTotal.loading,
        userKey: state.auth.userKey,
        userId: state.auth.login
    }
}
function mapDispatchToProps(dispatch){
    return{
        fetchDays: (key, id)=> dispatch(fetchDays(key, id)),
        deleteOneDay: (i, allDaysArr, key, id) => dispatch(deleteOneDay(i, allDaysArr, key, id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TotalAllDays);