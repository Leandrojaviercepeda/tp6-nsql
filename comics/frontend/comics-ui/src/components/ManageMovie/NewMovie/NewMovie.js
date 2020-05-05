import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router'
import MovieSearcher from '../../Movie/MovieSearcher'

import {ProgressSpinner} from 'primereact/progressspinner'
import {Panel} from 'primereact/panel';
import {Message} from 'primereact/message';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import {Carousel} from 'react-responsive-carousel'

import axios from 'axios'
import {ApiUrlBase} from '../../../utils/constants'

export default function NewMovie() {
  
    const [status, setStatus] = useState({showMessage: false, type: '', message:''})
    const handleStatus = (showMessage, type='', message='') => setStatus({showMessage: showMessage, type: type, message: message})

    const handleMovieSearched = async movieSearch => {
        try {
            return await axios.post(`${ApiUrlBase}/movies`, movieSearch[0])
                .then(handleStatus(true, 'success', 'Pelicula guardada exitosamente! :)'))
                .then(setInterval(() => handleStatus(false), 5000))
        } catch (error) {
            handleStatus(true, 'error', '¡Ooops, ha ocurrido un error!')
        }
    }

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
                            <MovieSearcher handleMovieSearched={handleMovieSearched}/>
                        </Panel>
                    </div>
                </div>
        
            }
        </div>
    )
}