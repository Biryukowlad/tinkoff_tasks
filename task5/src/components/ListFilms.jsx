import React, { useState, useEffect } from "react";
import './css/ListFilms.css'
import RowFilm from './RowFilm'
import { Link } from "react-router-dom";

function ListFilms() {
    const [allFilms, setAllFilms] = useState([]);
    const [likedFilms, setLikedFilms] = useState([]);
    const [foundFilms, setFoundFilms] = useState([]);
    const [searchString, setSearchString] = useState('');

    useEffect(() => {
        (async () => {
            await fetchFilms();
            await fetchLikedFilms();
        })().catch(e => alert(e));
    }, [])

    async function fetchFilms() { 
        try {
            await fetch('http://localhost:3000/movies').then((res) => res.json()).then(data => {setAllFilms(data) ; setFoundFilms(data)});
        } catch (e) {alert(e)}
    }

    async function fetchLikedFilms() { 
        try {
            await fetch(`http://localhost:3000/favorites`).then((res) => res.json()).then(data => setLikedFilms(data));
        } catch (e) {alert(e)}
    }

    function searchFilms() {
        if (searchString !== "") {
            setFoundFilms(allFilms.filter(film => film.title.includes(searchString)));
        }
        else {
            setFoundFilms(allFilms);
        }
    }

    // function checkLike(number) {
    //     //return likedFilms.includes(id);
    //     return !!likedFilms.find(elem => elem.id === number);
    // }

    function checkLike(value){
        if (likedFilms) {
            for (let i = 0; i < likedFilms.length; ++i){
                if (value === likedFilms[i].id) 
                    return true;
            }
        }
        return false;
    }

    return (
        <>
            <div className="list-films">
                <div className="search-field">
                    <input className="search-field__input" name="search" type="text" placeholder="Введите название фильма" onChange={(e) => setSearchString(e.target.value)}></input>
                    <button className="primary-button" onClick={(e) => searchFilms()}>Искать</button>
                </div>
                <div className='list-films_films'>
                    {foundFilms.map((film) => (
                    <Link to={`/movie/${film.id}`} style={{ textDecoration: 'none' }} key={film.id} >
                        <RowFilm id={film.id} title={film.title} year={film.year} genres={film.genres.join(", ")} like={checkLike(film.id)} />
                    </Link>
                    ))}
                </div>
                <div className='count-and-add'>
                    <div className='count-and-add__count'>Найдено {foundFilms.length} элементов</div>
                    <Link to={'/create'} style={{ textDecoration: 'none' }} >
                        <button className="primary-button">+ Добавить</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default ListFilms