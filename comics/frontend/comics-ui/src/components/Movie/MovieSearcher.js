import React, {useState, useEffect} from 'react';

import {Button} from 'primereact/button';
import {AutoComplete} from 'primereact/autocomplete';

import axios from 'axios'
import {TheMovieDBUrlBase} from '../../utils/constants'
import {TheMovieDB} from '../../utils/credentials'

export default function MovieSearcher(props) {
    
    const [status, setStatus] = useState({showMessage: false, type: '', message:''})
    const handleStatus = (showMessage, type='', message='') => setStatus({showMessage: showMessage, type: type, message: message})

    const [movies, setMovies] = useState([])
    const handleMovies = list => setMovies(list)

    const [searchMovie, setSearchMovie] = useState('')
    const handleMovie = searchMovie => setSearchMovie(searchMovie)

    const [moviesSugestions, setMoviesSuggestions] = useState([])
    const handleMoviesSugestions = movies => setMoviesSuggestions(movies)

    const [moviesSugestionsFilter, setMoviesSuggestionsFilter] = useState([])
    const handleMoviesSugestionsFilter = movies => setMoviesSuggestionsFilter(movies)

    const handleSubmit = async e => {
        try {
            e.preventDefault()
            const moviesFetched = await axios.get(`${TheMovieDBUrlBase}/search/movie?api_key=${TheMovieDB}&query=${searchMovie}`)
            const moviesList = moviesFetched.data.results
            handleMovies(moviesList)
            handleMoviesSugestions(moviesList.map(movie => movie.title))
        } catch (error) {
            handleStatus(true, 'error', '¡Ooops, ha ocurrido un error!')
        }
    }

    const sendMovie = async e => {
        e.preventDefault()
        return props.handleMovieSearched(movies.filter(movie => movie.title===searchMovie))
    }

    const suggestMovies = event => {
        if (event.query !== '')
            return handleMoviesSugestionsFilter([...moviesSugestions].filter(movie => movie.toLowerCase().includes(event.query.toLowerCase())))
        return handleMoviesSugestionsFilter(moviesSugestions)
    }

    return (
        <div className="movieSearcher">

            <div>
                <h3>Ingrese una pelicula</h3>
                    <div>
                        <Button icon="pi pi-search" className="p-button-secondary" onClick={handleSubmit}/>
                        <AutoComplete 
                            value={searchMovie} 
                            suggestions={moviesSugestionsFilter}
                            size={30} 
                            minLength={1}
                            placeholder="Buscar..." 
                            dropdown={true} 
                            onChange={e => handleMovie(e.target.value)}
                            completeMethod={e => suggestMovies(e)}
                        />
                    </div>  
                    <div style={{marginTop: '15px'}}>
                        <Button icon="pi pi-save" label="Añadir" className="p-button-secondary" onClick={sendMovie}/>
                    </div>
            </div>
        </div>
    )
}