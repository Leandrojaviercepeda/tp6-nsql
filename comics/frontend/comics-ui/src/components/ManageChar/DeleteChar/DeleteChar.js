import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {ApiUrlBase} from '../../../utils/constants'
import {useParams} from 'react-router'
import CharSelector from '../../Character/CharSelector'

export default function DeleteChar(props) {

    const [characterSearched, setCharacterSearched] = useState('')
    const handleCharacterSearched = char => setCharacterSearched(char)

    return (
        <div>
            <CharSelector 
                handleCharacterSearched={handleCharacterSearched} 
                characterSearched={characterSearched}
            />
        </div>
    )
}