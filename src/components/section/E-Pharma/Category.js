import React, { useState } from 'react'
import axios from 'axios'
import FilterPrice from '../../controller/FilterPrice'
import SearchName from '../../controller/SearchName'
import { API_URL } from '../../../constants/api'

const Category = ({ setFilteredData }) => {

    const [name, setName] = useState('')
    const [minimumPrice, setMinimumPrice] = useState()
    const [maximumPrice, setMaximumPrice] = useState()

    const params = new URLSearchParams({
        priceMin: minimumPrice,
        priceMax: maximumPrice,
    }).toString()

    const nameParams = new URLSearchParams({
        name: name
    })

    const url = `${API_URL}/inventory/medicines` + "?" + (nameParams ? nameParams : "") + "&" + params
    console.log(url)

    const handleNameSearch = (value) => {
        setName(value)
    }

    const handlePriceMin = (value) => {
        setMinimumPrice(value)
    }

    const handlePriceMax = (value) => {
        setMaximumPrice(value)
    }

    const querySearch = async () => {
        const response = await axios.get(url)
        console.log(response)
        setFilteredData(response.data)
    }

    const handleSearch = (e) => {
        e.preventDefault()
        querySearch()
    }

    return (
        <>
            <SearchName
                handleNameSearch={handleNameSearch}
                onSearch={handleSearch}
                name={name}
            />
            <FilterPrice
                handlePriceMin={handlePriceMin}
                handlePriceMax={handlePriceMax}
                onSearch={handleSearch}
                minPrice={minimumPrice}
                maxPrice={maximumPrice}
            />
        </>
    )
}

export default Category
