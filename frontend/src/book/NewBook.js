import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './new_book.css'
const NewBook = () => {
    const [title, setTitle] = useState("");
    const [isbn, setIsbn] = useState("");
    const [year, setYear] = useState("");
    const [rating, setRating] = useState("");
    const [genre, setGenre] = useState("");
    const [author, setAuthor] = useState("");

    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);

    const navigate = useNavigate();


    useEffect(() => { //A
        let ignore = false; 
        const ff = async () => { //B
            let r = await fetch("http://localhost:8080/api/v1/genre");
            let rr = await r.json();
            if(!ignore){
                setGenres(rr);
            }
        };
        ff();
        return () => { //C
            ignore = true;
        };
    }, []);

    useEffect(() => { //A
        let ignore = false; 
        const ff = async () => { //B
            let r = await fetch("http://localhost:8080/api/v1/author");
            let rr = await r.json();
            if(!ignore){
                setAuthors(rr);
            }
        };
        ff();
        return () => { //C
            ignore = true;
        };
    }, []);

    const addNewAuthor = async () => {
            let response = await fetch("http://localhost:8080/api/v1/book", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    isbn: isbn,
                    year: year,
                    rating: rating,
                    genre: genre,
                    author: author
                }),
            });
            if(response.ok){
                let d = await response.json();
                console.log(JSON.stringify(d, null, 4));
            }else{
                console.log("Neuspeh slanja!");
            }
    }

    const handleCancel = () => {
        navigate("../books");
    };
    return <div className='new-book-container' >
        <div className='form-container'>
            <div className="input-container">            
                    <div className="search_button">Book title</div> 
                    <input className='input-field' type="text" value={title} onChange={(e) => {
                        setTitle(e.target.value);
                    }}/> 
            </div>
            <div className="input-container">  
                    <div className="search_button">ISBN</div> 
                    <input className='input-field' type="text" value={isbn} onChange={(e) => {
                        setIsbn(e.target.value);
                    }}/> 
            </div>
            <div className="input-container">  
                    <div className="search_button">Year</div> 
                    <input className='input-field' type="text" value={year} onChange={(e) => {
                        setYear(e.target.value);
                    }}/> 
            </div>
            <div className="input-container">  
                    <div className="search_button">Rating</div> 
                    <input className='input-field' type="text" value={rating} onChange={(e) => {
                        setRating(e.target.value);
                    }}/> 
            </div>
            <div className="input-container">  
            <select className='select_genre' onChange={(e) => setGenre(e.target.value)}> 
                    {console.log(genres)}
                        {genres.map((g)=><option value={g.name}>{g.name}</option>)}
                     </select>
            </div>
            <div className="input-container">  
            <select className='select_genre' onChange={(e) => setAuthor(e.target.value)}> 
                    {console.log(genres)}
                        {authors.map((a)=><option value={a.name}>{a.name}</option>)}
                     </select>
            </div>
            <button className='save_btn' onClick={addNewAuthor}>Save</button>
            <button className="'save_btn" onClick={handleCancel}>Cancel</button>
        </div>
    </div>
}

export default NewBook;