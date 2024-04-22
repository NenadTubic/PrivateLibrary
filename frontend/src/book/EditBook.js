import { produce } from "immer";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const EditBook = () => {
    const book = useLoaderData();
    console.log(book);
    const [knjiga, setKnjiga] = useState(book);
    //const [title, setTitle] = useState(book.title);
    //const [isbn, setIsbn] = useState(book.isbn);
    //const [year, setYear] = useState(book.year);
    //const [rating, setRating] = useState(book.rating);
    //const [genre, setGenre] = useState(book.genre);
    //const [author, setAuthor] = useState(book.authors[0]);

    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);


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

    const changeBook = (e) => {
        setKnjiga(
            produce((draftState)=>{
                draftState[e.target.name] = e.target.value;
            })
        )           
    }

    const updateBook = async () => {
            let response = await fetch(`http://localhost:8080/api/v1/book/${book.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(knjiga),
            });
            if(response.ok){
                let d = await response.json();
                console.log(JSON.stringify(d, null, 4));
            }else{
                console.log("Neuspeh slanja!");
            }
    }
    return <div className='new-book-container' >
        <div className='form-container'>
            <div className="input-container">            
                    <div className="search_button">Book title</div> 
                    <input className='input-field' type="text" name="title" value={knjiga.title} 
                    onChange={(e) => { changeBook(e)
                    }}/> 
            </div>
            <div className="input-container">  
                    <div className="search_button">ISBN</div> 
                    <input className='input-field' type="text" name="isbn" value={knjiga.isbn} 
                    onChange={(e) => {
                        changeBook(e)
                    }}/> 
            </div>
            <div className="input-container">  
                    <div className="search_button">Year</div> 
                    <input className='input-field' type="text" name="year" value={knjiga.year} onChange={(e) => {
                         changeBook(e)
                    }}/> 
            </div>
            <div className="input-container">  
                    <div className="search_button">Rating</div> 
                    <input className='input-field' type="text" name="rating" value={knjiga.rating} onChange={(e) => {
                         changeBook(e)
                    }}/> 
            </div>
            <div className="input-container">  
                <select className='select_genre' value={knjiga.genre} name="genre" onChange={(e) =>  changeBook(e)}> 
                    {genres.map((g)=><option value={g.name}>{g.name}</option>)}
                </select>
            </div>
            <div className="input-container">  
                <select className='select_genre' value={knjiga.authors[0]} name="authors" 
                onChange={(e) =>{
                    setKnjiga(
                        produce((draftState => {
                        draftState.authors[0] = e.target.value;
                    })))}
                }> 
                    
                    {authors.map((a)=><option value={a.name}>{a.name}</option>)}
                </select>
            </div>
            <button className='save_btn' onClick={updateBook}>Update</button>
        </div>
    </div>
}

export default EditBook;