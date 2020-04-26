import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router'

import {Message} from 'primereact/message';
import {InputText} from "primereact/inputtext";
import {InputMask} from 'primereact/inputmask';
import {InputTextarea} from 'primereact/inputtextarea';
import {InputNumber} from 'primereact/inputnumber';
import {Carousel} from 'primereact/carousel';
import {Button} from 'primereact/button';

import axios from 'axios'
import capitalize from '../../../utils/capitalize'

export default function NewChar(props) {
    
    let {house} = useParams()
    const [error, setError] = useState({isError: false, message: ''})
    const handleIsError = bool => setError({message: '', isError: bool})
    const handleErrorMessage = message => setError({message: message, isError: true})
    
    const [equipmentTemp, setEquipmentTemp]= useState('')
    const handleEquipmentTemp = equipment => setEquipmentTemp(equipment)
    const [imageTemp, setImageTemp]= useState('')
    const handleImageTemp = image => setImageTemp(image)
    
    const [character, setCharacter] = useState(
        {
            name: '',
            character_name: '',
            year: '',
            house: house === 'dc' ? house.toUpperCase() : capitalize(house),
            biography: '',
            equipment: [],
            images: [],
            amount_images: 0,
        }
    )
    const handleName = name => setCharacter({...character, name:name})
    const handleCharacterName = charName => setCharacter({...character, character_name: charName})
    const handleYear = year => setCharacter({...character, year: year})
    const handleBiography = biography => setCharacter({...character, biography: biography})
    const handleEquipment = equipment => setCharacter({...character, equipment: [...character.equipment, equipment]})
    const handleImages = image => setCharacter({...character, images: [...character.images, image]})
    const handleAmountImages = amountImages => setCharacter({...character, amount_images: amountImages})
    
    const handleSubmit = e => {
        e.preventDefault()
        

    }

    const charTemplate = char => (
        <img 
            src={`${char}`}
            alt={character.name}
        />
    )


    return (
        <div className="newChar">
            <div className="p-grid p-justify-center m5">
                {
                    error.isError 
                    ? <Message severity='info' text={error.message}/>
                    : null
                }
            </div>

            <form className="p-grid p-justify-center" onSubmit={handleSubmit}>
                    
                <div className="p-grid p-dir-col">

                    <Carousel 
                        className="m5"
                        value={character.images} 
                        itemTemplate={charTemplate} 
                        page={1}
                        style={{width: '330px', marginTop: '2em', textAlign: 'center'}}
                    />

                    <div className="p-col">
                        {/* Nombre de personaje */}
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-user"></i>
                            </span>
                            <InputText 
                                value={character.character_name}
                                placeholder="Nombre de personaje"
                                onChange={e => handleCharacterName(capitalize(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="p-col">
                        {/* Nombre */}
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-star"></i>
                            </span>
                            <InputText
                                value={character.name}
                                placeholder="Nombre" 
                                onChange={e => handleName(capitalize(e.target.value))}
                            />
                        </div>
                    </div>

                    <div className="p-col">
                        {/* Año de aparicion */}
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-calendar"></i>
                            </span>
                            <InputMask 
                                mask="9999" 
                                value={character.year}
                                placeholder="Año de aparicion"
                                slotChar="yyyy" 
                                onChange={e => handleYear(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="p-col">
                        {/* Casa */}
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-home"></i>
                            </span>
                            <span 
                                className={`fa fa-${house} m4`}
                                style={{textAlign: 'center'}}
                            />
                        </div>
                    </div>

                    <div className="p-col">
                        {/* Equipamiento */}
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-cog"></i>
                            </span>
                            <InputText 
                                placeholder="Equipamiento" 
                                onChange={e => handleEquipmentTemp(e.target.value)}
                            />
                            <Button 
                                label="Agregar"
                                onClick={() => handleEquipment(equipmentTemp)}
                            />
                        </div>
                    </div>

                    <div className="p-col">
                        {/* Imagenes */}
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-image"></i>
                            </span>
                            <InputText 
                                placeholder="Imagen" 
                                onChange={e => handleImageTemp(e.currentTarget.value)}
                            />
                            <Button 
                                label="Agregar"
                                onClick={() => handleImages(imageTemp)}
                            />
                        </div>
                    </div>

                    <div className="p-col">
                        {/* Cantidad de imagenes*/}
                        <div className="p-inputgroup">
                            <span className="p-inputgroup-addon">
                                <i className="pi pi-images"></i>
                            </span>
                            <InputNumber 
                                value={character.amount_images} 
                                onChange={e => handleAmountImages(e.target.value)}
                                min={0} 
                                max={100}
                            />
                        </div>
                    </div>

                    <div className="p-col">
                        {/* Biografia */}
                        <div className="p-inputgroup">
                            <InputTextarea 
                                rows={5} 
                                cols={30} 
                                value={character.biography}
                                onChange={e => handleBiography(e.target.value)} 
                                autoResize={true}
                            />
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}