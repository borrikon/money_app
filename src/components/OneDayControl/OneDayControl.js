import React from 'react';
import classes from './OneDayControl.module.css';
import WasteItem from '../WasteItem/WasteItem'
import Button from '../UI/Select/Button/Button';
import axios from 'axios';
import { connect } from 'react-redux';
import { setItemsCollection, newMoneyMove, setTotalBalance, setCurrentDate, preventInvalidValue, deleteItem} from '../../store/actions/oneDayControl';

class OneDayControl extends React.Component{

    componentDidMount(){
        this.props.setCurrentDate()
        if(this.props.userKey){
            this.props.setItemsCollection(this.props.userKey, this.props)
        }
    }
    componentWillUnmount(){
        if(this.props.userKey){
            this.props.setItemsCollection(this.props.userKey, this.props)
        }
    }
    componentDidUpdate(prevState){
       this.props.setTotalBalance(this.props)     
     }

    renderCatItemElements(typeOfIem, type){
        return(typeOfIem.map((item, index)=>{
            if(type === typeOfIem[index].type){ 
            return(
                <WasteItem 
                    baseColor={typeOfIem[index].baseColor}
                    borderColor={typeOfIem[index].borderColor}
                    id={index}
                    value={typeOfIem[index].value}
                    name={typeOfIem[index].name}
                    money={typeOfIem[index].money}
                    type={typeOfIem[index].type}
                    key={typeOfIem[index].name + index}
                    onChangeValue={this.props.preventInvalidValue}
                    onNewMoneyMove={this.props.newMoneyMove}
                    catItem={this.props.catItem}
                    deleteItem={this.props.deleteItem}
                    userKey={this.props.userKey}
                    firebaseKey={item.firebaseKey}
                />
            )}else{
                return null
                }
            })
        )
    }

    addDayClick=()=>{
            const dataToSave = [this.props.sumCosts, this.props.sumIncome, this.props.date]
            axios.post(`https://money-app-f9b14.firebaseio.com/user/${this.props.userKey}/${this.props.userId}.json`, dataToSave); 
    }
    getCurrentDate(){
        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const currentDate= day+'. '+(month+1)+'. '+year;
        return(
            currentDate
        )
    }
    
    render(){
        return(
            <div className={classes.OneDayControl}>
               
                <h1>One day</h1>
                <p>{this.props.date}</p>
                <h2>Costs</h2>
                <div className={classes.container}>
                    { 
                        this.renderCatItemElements(this.props.catItem, 'costs')
                    }
                </div>
                <h2>Income</h2>
                <div className={classes.container}>
                { 
                      this.renderCatItemElements(this.props.catItem, 'income')
                }
                </div>

                    <h2>Total for day</h2>
                    <div className={classes.TotalForDay}>
                        <div>Costs: <br/>
                            { this.props.sumCosts }
                        </div>
                        <div>Income: <br/>
                            { this.props.sumIncome}
                        </div>
                        <div>Balans: <br/>
                            {
                                +this.props.sumIncome - +this.props.sumCosts
                            }
                        </div>
                        <Button
                           // currentStateDate={this.getCurrentDate()}
                            addDayHandler={this.addDayClick}
                         />
                    </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        userId: state.auth.login,
        userKey: state.auth.userKey,
        catItem: state.oneDay.catItem,
        sumCosts: state.oneDay.sumCosts, 
        sumIncome: state.oneDay.sumIncome,
        date: state.oneDay.date
    }
}
function mapDispatchToProps(dispatch){
    return{
        setItemsCollection: (key, props) => dispatch(setItemsCollection(key, props)),
        newMoneyMove: (event, value, id, catItem) => dispatch(newMoneyMove(event, value, id, catItem)),
        setTotalBalance: (props) => dispatch(setTotalBalance(props)),
        setCurrentDate: () => dispatch(setCurrentDate()),
        preventInvalidValue: (e, id, catItem) => dispatch(preventInvalidValue(e, id, catItem)),
        deleteItem: (id, firebaseKey, catItem, key) => dispatch(deleteItem(id, firebaseKey, catItem, key))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OneDayControl);