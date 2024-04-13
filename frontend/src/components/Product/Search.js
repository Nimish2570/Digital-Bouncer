import React, { Fragment, useState } from 'react'
import "./Search.css"
import MetaData from '../layout/MetaData'

const Search = () => {

    const [keyword, setKeyword] = useState('')
    const searchSubmitHandler = (e) =>{
        e.preventDefault()
        if(keyword.trim()){
            window.location.href = `/products/${keyword}`
        }else{
            window.location.href = '/products'
        }
    }

  return (
    <Fragment>
        <MetaData title={'Search'}/>
        <form className ="searchBox" onSubmit={searchSubmitHandler}>
            <input
                type="text"
                id="search_field"
                className="search_field"
                placeholder="Enter Product Name"
                onChange={(e) => setKeyword(e.target.value)}
            />
           <input type='submit' value="Search" />
         </form>
    </Fragment>
  )
}

export default Search