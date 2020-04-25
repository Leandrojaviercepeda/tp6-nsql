import React from 'react';

import Navbar from './Navbar/Navbar'

export default function index(props) {
    return (
        <div>
            <Navbar 
                handleListSelected={props.handleListSelected} 
                handleCharSearched={props.handleCharSearched} 
            />
        </div>
    )
}