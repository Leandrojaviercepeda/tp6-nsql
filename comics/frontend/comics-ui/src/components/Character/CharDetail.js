import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {ApiUrlBase} from '../../utils/constants'
import {useParams} from 'react-router'
import {Carousel} from 'primereact/carousel'
import {ProgressSpinner} from 'primereact/progressspinner'

export default function CharDetail() {

    let {id} = useParams()
    const [error, setError] = useState({isError: false, message: ''})
    const handleErrorMessage = message => setError({message: message, isError: true})

    const [character, setCharacter] = useState(null)
    const handleCharacter = character => setCharacter(character)

    useEffect(() => {
        console.log('Rendering 1° CharDetail...');
        
        const fetchCharacter = async charId => {
            try {
                const characterFetched = await axios.get(`${ApiUrlBase}/characters?id=${charId}`)
                return characterFetched.data[0]
                    ? handleCharacter(characterFetched.data[0])
                    : handleErrorMessage('No hay personaje para mostrar')
            } catch (error) {
                handleErrorMessage('Ooops! Ha ocurrido un error al cargar la lista de Personajes')
            }
        }
        fetchCharacter(id)
    }, [id]);
    

    // charTemplate(char) {
    //     return (
    //         <div className="char-details">
    //             <div className="p-grid p-nogutter">
    //                 <div className="p-col-12">
    //                     <img src={require(`../../utils/images/${character.house}/1.png`)} />
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // };

    return (
        <div className="charDetail">
        {
            character !== null
            ?
                <div className="p-grid p-justify-center m5">
                    <div className="p-col"> 
                    {/* <Carousel value={character} itemTemplate={this.charTemplate} orientation="vertical" style={{width: '400px', marginTop: '2em'}}
                        numVisible={1} numScroll={1} responsive={this.responsiveSettings} verticalViewPortHeight="330px"></Carousel> */}
                    </div>
                    <div className="p-col">
                        <div class="fancy">
                            <div className="col-md-8 mx-auto ">
                                <div className="p-col">
                                    <h2 className="charName" style={{textAlign: 'center'}}>{character.character_name}</h2>
                                    <hr class="style-three"/>
                                    <h4 className="charNameH2">Nombre: {character.name}</h4>
                                    <hr class="style-one"/>
                                    <img height="50" width="65" src={require(`../../utils/images/Logos/${character.house}.png`)}/> 
                                    <hr class="style-one"/>
                                    <p className="charNameP">{`Equipamiento: ${character.equipment}`}</p>
                                    <hr class="style-one"/>
                                    <p className="charNameP">{character.biography}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        
            : <ProgressSpinner 
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                />
        }
        </div>
    )
}