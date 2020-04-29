import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router'


import {ProgressSpinner} from 'primereact/progressspinner'
import {Panel} from 'primereact/panel';
import {Message} from 'primereact/message';

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel'

import axios from 'axios'
import {ApiUrlBase} from '../../utils/constants'

export default function CharDetail(props) {

    let {_id} = useParams()
    const [status, setStatus] = useState({showMessage: false, type: '', message:''})
    const handleStatus = (showMessage, type='', message='') => setStatus({showMessage: showMessage, type: type, message: message})

    const [character, setCharacter] = useState(null)
    const handleCharacter = character => setCharacter(character)

    useEffect(() => {
        console.log('Rendering 1° CharDetail...');
        
        const fetchCharacter = async charId => {
            try {
                const characterFetched = await axios.get(`${ApiUrlBase}/characters?_id=${charId}`)
                return characterFetched.data[0]
                    ? handleCharacter(characterFetched.data[0])
                    : handleStatus(true, 'error', 'No hay personaje para mostrar :(')
            } catch (error) {
                handleStatus(true, 'error' ,'Ooops! Ha ocurrido un error :(')
            }
        }       
        fetchCharacter(_id ? _id : props._id)
    }, [_id, props]);

    return (
        <div className="charDetail">

            <div className="p-grid p-justify-center m10">
                {
                    status.showMessage
                    ? <Message severity={status.type} text={status.message}/>
                    : null
                }
            </div>

            {
                character !== null
                ?
                    <div className="p-grid p-align-stretch vertical-container m10">

                    <div className="p-col">
                        <div className="box box-stretched">
                            {/* Carousel of images */}
                            <Carousel 
                                showArrows={true}
                                showThumbs={false}
                                showIndicators={false}
                                showStatus={false}
                            >
                            {
                                character.images.length === 0
                                ? 
                                    <img 
                                        src={require(`../../utils/images/Logos/${character.house}.png`)} 
                                        key="1"
                                        alt="img-1"
                                        style={{ background: 'white' }}
                                    />
                                : 
                                    character.images.map((img, i) => 
                                        <img 
                                            src={img} 
                                            key={i+1} 
                                            alt={`img-${i+1}`} 
                                            style={{background: 'white'}}
                                        />
                                    )
                            }
                            </Carousel>
                        </div>
                    </div>
                
                    <div className="p-col">
                        <Panel header={character.character_name} style={{textAlign: 'center'}}>
                            <h4 className="charName">Nombre: {character.name}</h4>
                            <hr/>
                            <p>Casa: <span className={`fa fa-${character.house.toLowerCase()} m5`}style={{textAlign: 'center'}}/> </p>
                            <hr/>
                            <p className="charEquip">Equipamiento: { `${character.equipment.map(e => e)}`}</p>
                            <hr/>
                            <p className="charBiography" align="justify">{character.biography}</p>
                        </Panel>
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