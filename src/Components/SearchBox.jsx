import React,{useState, useEffect} from 'react'
import {constants, popular_cities} from '../constants'
import {fetchSearchData} from './actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import './SearchBox.css'

function SearchBox(){
    let [searchStr, setSearchStr] = useState('')
    let [popularCities, setPopularCities] = useState([constants.LONDON])
    let [recentSearch, setRecentSearch] = useState([])
    let [searchData, setSearchData] = useState([])
    let [isError, setError] = useState(false)
    let [isLoading, setLoading] = useState(false)
    let [showComponent, setShowComponent] = useState(false)
    let search =()=>{
        if(searchStr && searchStr.length >= 3){
            const url = `https://base.amberstudent.com/api/v0/regions?sort_key=search_name&sort_order=desc&states=active&search_
            name=${searchStr}`
            setLoading(true)
            let data = fetchSearchData(url)
            data.then((res)=>{
                    setLoading(false)
                    if(res && res.status == 200 && res.data && res.data.data){
                        setSearchData(res.data.data)
                    }else{
                        setSearchData([])
                    }
                }
            ).catch((err)=>{
                setError(true)
                setLoading(false)
            })
        }
    }
    
    useEffect(()=>{
        search()
    }, [searchStr]);

    const setRecent=(value)=>{
        if(value && value.length >=3){
            let newArray = [...recentSearch, value].filter((each, index, arr)=> arr.indexOf(each)===index)
            setRecentSearch([...newArray])
            setSearchStr(value)
        }
    }

    let isSearched = searchStr.length ? true: false 
    let displayElement = []
    let itemsData = searchData && searchData.result && searchData.result.slice(0,5)
    console.log(searchStr)

    if(isSearched){
        if(searchStr.length < 3){
            displayElement.push(
            <div className="item-nod p-3"> Please type at least 3 letters to get sujestions
            </div>)
        }else{
        
            if(isLoading){
                displayElement.push(<div className="item p-3">Loading ...</div>)
            }else{
                displayElement.push(
                    itemsData && itemsData.length && itemsData ? itemsData.map((each, index)=>(
                    <div className="item" key={index} onClick={()=>setRecent(each.name)}>
                        <div className="item-icon" key={"icon"+index}>
                            <FontAwesomeIcon icon={faMapMarkerAlt} />  
                        </div>
                        <div className="item-text" key={"item-text"+index}>
                            <span className="item-name" key={"item1-text"+index}>{each.name}</span>
                            <span className="item-s-name" key={"item2-text"+index}>{each.secondary_name}</span>
                        </div>
                    </div>)):<div className="item-nod p-3">No data is available</div>
                )
            }
        }
           
    }else{
        let popularData = popular_cities
        displayElement.push(
            <>
                <div className="recent-header">
                    Recent Searches
                </div>
                <div className="recent-items">
                    {recentSearch && recentSearch.length > 0 ?
                    recentSearch.map((each, index)=>
                    (<span id={index} onClick={()=>setRecent(each)} className="r-item"> {each}</span>)):"No recent search"}
                </div>
            </>)
        displayElement.push(
            <>
                <div className="recent-header">
                    Popular Cities
                </div>
                <div className="popular-items">
                    {popularData && Object.keys(popularData).length > 0 ? Object.keys(popularData).map((each,index)=>(
                    <div id={index} className="p-item" onClick={()=>setRecent(each)}> {each} 
                    <span className="p-s-item">{popularData[each]}</span></div>)
                    ): "No Popular Cities are available"}

                </div>
        </>)
    }

    return (
        <div className="search-box">
            <div className="search-comp">
                <input className="search-input" value={searchStr} placeholder={constants.SEARCH_BY} onClickCapture={()=>setShowComponent(true)} onChange={(event)=>setSearchStr(event.target.value)} />
                {searchStr && <FontAwesomeIcon className="clear-text" icon={faTimesCircle} onClick={()=>setSearchStr('')} />}
                <button className="search-button" onClick={()=>{setRecent(searchStr)}}> 
                <FontAwesomeIcon className="mr-2" icon={faSearch} />
                    Search 
                </button>
            </div>
            {showComponent && <div className="items-container">
                <div className="item-box">
                    {displayElement}
                </div>
            </div>}
        </div>
    )

}

export default SearchBox