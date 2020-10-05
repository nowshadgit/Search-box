import axios from 'axios'

function fetchSearchData(url){
    let headers= {
        'Access-Control-Allow-Origin': '*',
      }
    return axios.get(url,{headers} );
}


export {fetchSearchData}