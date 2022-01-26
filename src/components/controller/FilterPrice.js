import React from 'react'

const FilterPrice = (props) => {

    const { handlePriceMin, handlePriceMax, onSearch, minPrice, maxPrice } = props

    const onChangePriceMin = (e) => {
        handlePriceMin(e.target.value)
    }

    const onChangePriceMax = (e) => {
        handlePriceMax(e.target.value)
    }

    return (
        <>
            <form onSubmit={onSearch}>
                <div className="form-group row">
                    <label for="minimumPrice" className="col-sm-2 col-form-label">Minimum Price</label>
                    <div className="col-sm-10">
                        <input type="number" className="form-control" value={minPrice} onChange={onChangePriceMin} />
                    </div>
                </div>
                <div className="form-group row">
                    <label for="maximumPrice" className="col-sm-2 col-form-label">Maximum Price</label>
                    <div className="col-sm-10">
                        <input type="number" className="form-control" value={maxPrice} onChange={onChangePriceMax} />
                    </div>
                </div>
                <div className="form-group row">
                    <div className="col-sm-10">
                        <button type="submit" className="btn btn-primary">Search</button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default FilterPrice
