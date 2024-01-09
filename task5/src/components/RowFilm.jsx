import './css/ListFilms.css'
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {AiFillHeart, AiOutlineHeart} from 'react-icons/ai'

function RowFilm(props) {
    const params = useParams();
    let checkSelect = params.id === props.id;
    const [liked, setLiked] = useState(props.like);

    async function likeFilm() {
        try {
            await fetch('http://localhost:3000/favorites', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({id: props.id})
            });
            setLiked(true);
        } catch (e) {
            alert(e);
        }
    }
    
    async function unlikeFilm() {
        try {
            await fetch(`http://localhost:3000/favorites/${props.id}`, {
                method: 'DELETE'
            });
            setLiked(false);
        } catch (e) {
            alert(e);
        }
    }

    return (
    <>
        {!checkSelect && <div className="row-film"> 
            <div className='row-film_info'>
                <div className='row-film__big-text'>{props.title}</div>
                {!liked && <AiOutlineHeart className='heart_icon' onClick={(e) => {likeFilm()}} />}
                {liked && <AiFillHeart className='heart_icon' onClick={(e) => {unlikeFilm()}} />}
            </div>
            <div className='row-film_info'>
                <div className='row-film__little-text'>{props.year}</div>
                <div className='row-film__little-text'>|</div>
                <div className='row-film__little-text'>{props.genres}</div>
            </div>
        </div> }
         {checkSelect && <div className="row-film-select"> 
            <div className='row-film_info'>
                <div className='row-film__big-text'>{props.title}</div>
                {!liked && <AiOutlineHeart className='heart_icon' onClick={(e) => {likeFilm()}} />}
                {liked && <AiFillHeart className='heart_icon' onClick={(e) => {unlikeFilm()}} />}
            </div>
            <div className='row-film_info'>
                <div className='row-film__little-text'>{props.year}</div>
                <div className='row-film__little-text'>|</div>
                <div className='row-film__little-text'>{props.genres}</div>
            </div>
        </div> }
    </>
    )
}

export default RowFilm