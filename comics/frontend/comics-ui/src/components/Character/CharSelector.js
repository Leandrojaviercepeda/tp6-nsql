import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router'

import {AutoComplete} from 'primereact/autocomplete';

import axios from 'axios'
import {ApiUrlBase} from '../../utils/constants'

export default function CharSelector(props) {
    
    let {house} = useParams()
    const [error, setError] = useState({isError: false, message: ''})
    const handleErrorMessage = message => setError({message: message, isError: true})

    const [characters, setCharacters] = useState([])
    const handleCharacters = list => setCharacters(list)

    const [charSugestions, setCharSuggestions] = useState([])
    const handleCharSugestions = chars => setCharSuggestions(chars)

    useEffect(() => {
        console.log('Characters Render 1°');
        const fetchCharacters = async list => {
            try {
                const charactersFetched = await axios.get(`${ApiUrlBase}/${list}`)
                return charactersFetched.data 
                    ? handleCharacters(charactersFetched.data.map(char => char.name))
                    : handleErrorMessage('No hay personajes para mostrar')
            } catch (error) {
                handleErrorMessage('Ooops! Ha ocurrido un error al cargar la lista de Personajes')
            }
        }
        console.log(house)
        fetchCharacters(house)
    }, [house]);

    const suggestChars = event => {        
        if (event.query !== '')
            return handleCharSugestions([...characters].filter(char => char.toLowerCase().includes(event.query.toLowerCase())))
        return handleCharSugestions(characters)
    }
    
    return (
        <div>
            {
                characters.lenght !== 0
                ? 
                    <AutoComplete 
                        value={props.characterSearched} 
                        suggestions={charSugestions}
                        size={30} minLength={1}
                        placeholder="Buscar..." 
                        dropdown={true} 
                        onChange={e => props.handleCharacterSearched(e.target.value)}
                        completeMethod={e => suggestChars(e)}
                    />
                : null
            }
        </div>
    )
}