import axios from 'axios'

export function setItemParam(config, urlPar){
   
    return dispatch => {
        const configItem = {
            name: config[0],
            money: 0,
            type: config[1],
            value: '',
            baseColor: config[2],
            borderColor: config[3]
        }
        const items = 'items'
        const url = 'https://money-app-f9b14.firebaseio.com/user/' + urlPar[0] + '/' + items + '.json' 
        // eslint-disable-next-line 
        const response =  axios.post(url, configItem )
        
    
    }
    
}