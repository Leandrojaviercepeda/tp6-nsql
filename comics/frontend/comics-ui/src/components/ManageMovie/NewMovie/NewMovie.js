import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router'

import {ProgressSpinner} from 'primereact/progressspinner'
import {Panel} from 'primereact/panel';
import {Message} from 'primereact/message';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel'
import {InputText} from 'primereact/inputtext';
import {Button} from "primereact/button";

import {ApiUrlBase} from '../../../utils/constants'
import {TheMovieDBUrlBase} from '../../../utils/constants'
import {TheMovieDB} from '../../../utils/credentials'
import capitalize from '../../../utils/capitalize'

export default function NewMovie() {
  
    const [status, setStatus] = useState({showMessage: false, type: '', message:''})
    const handleStatus = (showMessage, type='', message='') => setStatus({showMessage: showMessage, type: type, message: message})

    const [movieSearched, setMovieSearched] = useState('')
    const handleMovieSearched = list => setMovieSearched(list)

    return (
        <div className="newMovie">

            <div className="p-grid p-justify-center m10">
                {
                    status.showMessage
                    ? <Message severity={status.type} text={status.message}/>
                    : null
                }
            </div>
            {
                // movie !== null
                // ?
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
                                // movie.poster_path !== ''
                                // ?   
                                //     <img 
                                //         src={`${TheMovieDBImagesUrlBase}${movie.poster_path}`} 
                                //         key={movie.id} 
                                //         alt={`img`} 
                                //         style={{background: 'white'}}
                                //     />
                                // :
                                    <img 
                                        src={require(`../../../utils/images/Logos/Cinema.png`)} 
                                        key="1"
                                        alt="img-1"
                                        style={{ background: 'white' }}
                                    />
                            }
                            </Carousel>
                        </div>
                    </div>
                
                    <div className="p-col">
                        <Panel header={'Buscador de peliculas'} style={{textAlign: 'center'}}>
                            {/* <p className="charName">Año de lanzamiento: {movie.release_date}</p>
                            <hr/>
                            <p className="charBiography" align="justify">{movie.overview}</p>
                            <hr/> */}
                        </Panel>
                    </div>
                </div>
            
                // : <ProgressSpinner 
                //         style={{
                //             position: 'absolute',
                //             top: '50%',
                //             left: '50%',
                //             marginRight: '-50%',
                //             transform: 'translate(-50%, -50%)',
                //         }}
                //     />
            }
        </div>
    )
}