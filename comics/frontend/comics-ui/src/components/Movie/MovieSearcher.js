import React from 'react';

import {InputText} from 'primereact/inputtext';
import capitalize from '../../utils/capitalize'

export default function MovieSearcher(props) {
    
    const [searchMovie, setSearchMovie] = useState('')
    const handleMovie = searchMovie => setSearchMovie(searchMovie)

    const handleSubmit = async e => {
        try {
            e.preventDefault()
            console.log(searchMovie)
            console.log('se envio')      
        } catch (error) {
            handleStatus(true, 'error', '¡Ooops, ha ocurrido un error!')
        }
    }

    return (
        <div className="movieSearcher">

            <div className="p-col-12 p-md-4">
                <h3>Ingrese una pelicula</h3>
                    <div className="p-inputgroup">
                        <InputText value={searchMovie} onChange={(e) => handleMovie(capitalize(e.target.value))} />
                        <Button label="Buscar" onClick={handleSubmit}/>
                    </div>
            </div>
        </div>
    )
}