import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import './css/InfoFilm.css'
import { IoCopyOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import ListFilms from './ListFilms';
import toast, { Toaster } from 'react-hot-toast';

function InfoFilm() {
    const params = useParams();
    const [film, setFilm] = useState({});

    useEffect(() => {
        (async () => {
            await fetchFilm();
        })().catch(e => {alert(e);});
    }, [params]);
    
    async function fetchFilm() {
        try {
            console.log(params.id);
            const fetchedMovie = await fetch(`http://localhost:3000/movies/${params.id}`).then((res) => res.json());
            setFilm(fetchedMovie);
        } catch (e) {
            alert(e);
        }
    }

    function randomRating() {
        return Math.floor(Math.random() * 100) / 10;
    }

    function copyId() {
        navigator.clipboard.writeText(film.id).then(() => {
            toast.success("id успешно скопирован");
        })
        .catch(() => {
            toast.error("Не получилось скопировать id")
        });
    }

    return (
    <>
        <div><Toaster/></div>
        <ListFilms />
        <div className='info-film'>
            <div className='info-film_header'>
                <div className='info-film_header_item cursor' onClick={() => {copyId();}}>
                    <div className='info-film_header_id__text'>{`id: ${film.id}`}</div>
                    <IoCopyOutline />
                </div>
                <div className='info-film_header_item'>
                    <FaRegEdit />
                    <Link to={`/edit/${film.id}`} style={{ textDecoration: 'none' }}>
                        <div className='info-film_header_edit__text'>Редактировать</div>
                    </Link>
                </div>
            </div>
            <div className='info-film_top'>
                <img src={film.posterUrl} alt="Картинка" className='info-film_top__img'/>
                <div className='info-film_top_text'>
                    <div className='info-film_top__title'>{film.title}</div>
                    <div className='info-film_top__gray-text'>{film.director}</div>
                    <div className='flDirRow-jusConSpBet'>
                        <div>
                            <div className='info-film_top__blue-text'>Параметры</div>
                            <div className='info-film_top_item'>
                                <div className='info-film_top__gray-text'>Год производства</div>
                                <div className='info-film_top__blue-text'>{film.year}</div>
                            </div>
                            <div className='info-film_top_item'>
                                <div className='info-film_top__gray-text'>Продолжительность</div>
                                <div className='info-film_top__blue-text'>{film.runtime} минут</div>
                            </div>
                            <div className='info-film_top_item'>
                                <div className='info-film_top__gray-text'>Жанры</div>
                                <div className='info-film_top__blue-text'>{film.genres}</div>
                            </div>
                        </div>
                        <div className='info-film_top_actors'>
                            <div className='info-film_top__blue-text'>В главных ролях</div>
                            <div className='info-film_top__blue-text'>{film.actors}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='info-film_bottom'>
                <div className='info-film_bottom_plot__label'>Описание</div>
                <div className='info-film_bottom_plot__text'>{film.plot}</div>
                <div className='info-film_bottom_rating-block'>
                    <div className='info-film_bottom_rating-block__label'>Текущий рейтинг</div>
                    <div className='info-film_bottom_rating-block__value'>{randomRating()}</div>
                </div>
            </div>
        </div>
    </>
  )
}

export default InfoFilm