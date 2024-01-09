import React, {useEffect, useState} from "react";
import {useParams, Link, useNavigate} from "react-router-dom";
import './css/AddChangeFilm.css'
import { GiSharpSmile } from "react-icons/gi";
import ListFilms from './ListFilms';

function AddChangeFilm(props) {
    const params = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [year, setYear] = useState("");
    const [runtime, setRuntime] = useState("");
    const [genres, setGenres] = useState("");
    const [director, setDirector] = useState("");
    const [actors, setActors] = useState("");
    const [plot, setPlot] = useState("");
    const [posterUrl, setPosterUrl] = useState("");
    const [rating, setRating] = useState("");

    useEffect(() => {
        console.log(props.type);
        if (props.type === "create") {
            setTitle("");
            setYear("");
            setRuntime("");
            setGenres("");
            setDirector("");
            setActors("");
            setPlot("");
            setPosterUrl("");
            setRating("");
        } else {
            (async () => {
                await fetchFilm();
            })().catch(e => alert(e));
        }
    }, [params]);
    //////////////////////////////////////
    async function fetchFilm() {
        try {
            await fetch(`http://localhost:3000/movies/${params.id}`).then((res) => res.json()).then(
                data => {
                    setTitle(data.title);
                    setYear(data.year);
                    setRuntime(data.runtime);
                    setGenres(data.genres);
                    setDirector(data.director);
                    setActors(data.actors);
                    setPlot(data.plot);
                    setPosterUrl(data.posterUrl);
                    setRating(data.rating === undefined ? "" : data.rating);
                    console.log("aaaaaaaaaaaaaaaa");
                    console.log(data);
                }
            );
        } catch (e) {
            alert(e);
        }
    }
    /////////////////////////////////////////////

    function validateData() {
        if (year < 0) {
            alert("Пожалуйста введите неотрицательный год!");
        }
        else if (runtime < 0) {
            alert("Пожалуйста введите неотрицательную продолжительность фильма!");
        }
        else if (rating < 0) {
            alert("Пожалуйста введите неотрицательный рейтинг!");
        }
        else if (!title || !year || !runtime || !genres || !director || !actors || !plot || !posterUrl || !rating) {
            console.log(!title || !year || !runtime || !genres || !director || !actors || !plot || !posterUrl || !rating);
            alert("Пожалуйста заполните все поля!");
        }
        else {
            saveMovie();
        }
    }

    async function saveMovie() {
        let savedFilm = {
            title: title,
            year: year,
            runtime: runtime,
            genres: genres.split("; "),
            director: director,
            actors: actors.replaceAll(";", ","),
            plot: plot,
            posterUrl: posterUrl,
            rating: rating
        }
        try {
            if (props.type === "create") {
                await fetch(`http://localhost:3000/movies`).then((res) => res.json()).then(
                    data => {
                        savedFilm.id = data.length + 1;
                    }
                );
                await fetch(`http://localhost:3000/movies`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(savedFilm)
                });
            } else {
                savedFilm.id = params.id;
                await fetch(`http://localhost:3000/movies/${params.id}`, {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(savedFilm)
                });
            }
            navigate(`/movie/${savedFilm.id}`);
        } catch (e) {
            alert(e);
        }
    }

    return (
    <>
        <ListFilms />
        <div className="form-block">
            <div className='form-block_inputs'>
                <div className='form-block__title'>Редактирование / Создание</div>
                <div className="two-column-inputs">
                    <div>
                        <div className='form-block__label'>Название фильма</div>
                        <input className="form-block__input" name="title_film" type="text" placeholder="Введите название фильма" onChange={(e) => {setTitle(e.target.value)}}></input>
                        <div className='form-block__label'>Год выпуска</div>
                        <input className="form-block__input" name="year_film" type="number" placeholder="Введите год выпуска" onChange={(e) => {setYear(e.target.value)}}></input>
                    </div>
                    <div className="margin-right">
                        <div className='form-block__label'>Жанры фильма</div>
                        <input className="form-block__input" name="genres_film" type="text" placeholder="Введите жанры фильма" onChange={(e) => {setGenres(e.target.value)}}></input>
                        <div className='form-block__label'>Продолжительность фильма</div>
                        <input className="form-block__input" name="runtime_film" type="number" placeholder="Введите продолжительность фильма" onChange={(e) => {setRuntime(e.target.value)}}></input>
                    </div>
                </div>
                <div className='form-block__label'>Описание</div>
                <textarea className="form-block__textarea" name="desc_film" placeholder="Введите описание фильма" onChange={(e) => {setPlot(e.target.value)}}></textarea>
                <div className='form-block__label'>Ссылка на обложку</div>
                <input className="form-block__input" name="link_film" type="url" placeholder="Вставьте ссылку на обложку фильма" onChange={(e) => {setPosterUrl(e.target.value)}}></input>
                <div className='form-block_rating'>
                    <div className='form-block__label'>Рейтинг</div>
                    <GiSharpSmile className='form-block_rating__icon'/>
                </div>
                <input className="form-block__input" name="rating_film" type="number" placeholder="Задайте рейтинг фильма" onChange={(e) => {setRating(e.target.value)}}></input>
                <div className='form-block__label'>Список актеров</div>
                <input className="form-block__input" name="actors_film" type="text" placeholder="Укажите список актеров (через ;)" onChange={(e) => {setActors(e.target.value)}}></input>
                <div className='form-block__label'>Режиссер</div>
                <input className="form-block__input" name="director_film" type="text" placeholder="Введите режиссера фильма" onChange={(e) => {setDirector(e.target.value)}}></input>
            </div>
            <div className='form-block_buttons'>
                <Link to={params.id ? `/movie/${params.id}` : "/"} style={{ textDecoration: 'none' }} >
                    <button className="primary-button">Отменить</button>
                </Link>
                <button className="primary-button" onClick={() => {validateData()}}>Сохранить</button>
            </div>
        </div>
    </>
    )
}

export default AddChangeFilm