import React, {useState} from 'react'

import Header from '../Header'
import CharsList from '../Characters/CharsList'

export default function Home() {

    const [listSelected, setListSelected] = useState('all')
    const handleListSelected = list => setListSelected(list)
    
    const [charSearched, setCharSearched] = useState('')
    const handleCharSearched = list => setCharSearched(list)

    return (
        <div>
            <Header 
                handleListSelected={handleListSelected} 
                handleCharSearched={handleCharSearched}
            />
            <CharsList 
                listSelected={listSelected} 
                charSearched={charSearched}
            />
        </div>
    )
}