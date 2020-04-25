import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {ApiUrlBase} from '../../utils/constants'

export default function CharDetail(props) {

    const [error, setError] = useState({isError: false, message: ''})
    const handleErrorMessage = message => setError({message: message, isError: true})

    const [character, setCharacter] = useState([])
    const handleCharacter = character => setCharacter(character)

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                var char = null
                const characterFetched = await axios.get(`${ApiUrlBase}/1`)
                if (characterFetched.data){
                    char = [...characterFetched.data]
                }
                return char
                    ? handleCharacter(char) 
                    : handleErrorMessage('No hay personaje para mostrar')
            } catch (error) {
                handleErrorMessage('Ooops! Ha ocurrido un error al cargar la lista de Personajes')
            }
        }
        fetchCharacter()
    });

    return (
        <div className="p-grid">
            <div className="p-col"> 
                <div className="box">1</div>
            </div>
            <div className="p-col">
                <div class="fancy">
                    <div className="col-md-8 mx-auto ">
                        <div className="p-col">
                            <h2 className="charName" style={{textAlign: 'center'}}>{character.name}</h2>
                            <hr class="style-three"/>
                            <h4 className="charName">Nombre personal</h4>
                            <hr class="style-one"/>
                            <h5 className="charName">Marvel</h5>
                            <hr class="style-one"/>
                            <p>Biografia</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}