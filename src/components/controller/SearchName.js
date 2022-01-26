import React from 'react'

const SearchName = (props) => {
    const { handleNameSearch, onSearch, name } = props

    const onInputName = (e) => {
        handleNameSearch(e.target.value)
    }

    return (
        <div>
            <form onSubmit={onSearch}>
                <input
                    className='form-control me-2'
                    type='text'
                    value={name}
                    placeholder='Search...'
                    onChange={onInputName}
                />
                <button type='submit' className="bi bi-search"></button>
            </form>
        </div>
    )
}

export default SearchName
