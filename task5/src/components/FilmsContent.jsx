import ListFilms from "./ListFilms"
import InfoFilm from "./InfoFilm"
import AddChangeFilm from "./AddChangeFilm";
import { Routes, Route } from 'react-router-dom'
import '../App.css'

function FilmsContent() {
    let create = false;
    return (
    <>
        <div className="films-content">
            <Routes>
                <Route path="/" element={<ListFilms />}/>
                <Route path="/movie/:id" element={<InfoFilm />}/>
                <Route path="/edit/:id" element={<AddChangeFilm type="edit" />}/>
                <Route path="/create" element={<AddChangeFilm type="create" />}/>
            </Routes>
        </div>
    </>
    )
}

export default FilmsContent