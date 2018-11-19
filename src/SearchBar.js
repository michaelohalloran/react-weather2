import React from 'react';

const SearchBar = (props) => {

    const {searchTerm, onChange, onSubmit} = props;

    return (
        <form onSubmit={onSubmit}>
            <input 
                value={searchTerm}
                onChange={onChange}
                placeholder='City'
            />
            <button>Search</button>
        </form>
    );
}

export default SearchBar;