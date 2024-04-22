import { NavLink, useLoaderData, useNavigate } from 'react-router-dom';
import ShowBook from './ShowBook';
import './show_books.css'
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { FormControl, InputLabel, Select, MenuItem, Container, Box, Grid, TextField } from '@mui/material';

const ShowBooks = () => {
    const books = useLoaderData();
    const navigate = useNavigate();
    const [user, setUser] = useState(null)
    const [isLogin, setIsLogin] = useState(false);

    const [genres, setGenres] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState(books);
    const [searchedBooks, setSearchedBooks] = useState(books);


const search = (value) => {
    if (value === "") {
        setSearchedBooks(filteredBooks);
    } else {
        const filtered = filteredBooks.filter((book) =>
            book.title.toLowerCase().includes(value.toLowerCase())
        );
        setSearchedBooks(filtered);
    }
};


    useEffect(() => { //A
        let ignore = false;
        const ff = async () => { //B
            let r = await fetch("http://localhost:8080/api/v1/genre");
            let rr = await r.json();
            if (!ignore) {
                setGenres(rr);
            }
        };
        ff();
        return () => { //C
            ignore = true;
        };
    }, []);


    const handleDelete = (bookId) => {
        const updatedFilteredBooks = filteredBooks.filter((b) => b.id !== bookId);
        setFilteredBooks(updatedFilteredBooks);
    
        const updatedSearchedBooks = searchedBooks.filter((b) => b.id !== bookId);
        setSearchedBooks(updatedSearchedBooks);
    };
    
    

    useEffect(() => {
        const u = localStorage.getItem("user");
        console.log(u);
        if (u) {
            setUser(JSON.parse(u));
            setIsLogin(true);
        }
    }, [isLogin])


    return <Container>
        <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
            <FormControl sx={{ width: "30%" }}>
                <TextField
                    placeholder="Pretraga..."
                    label="Pretraga"
                    onChange={(e) => search(e.target.value)}
                />
            </FormControl>

            {isLogin && user.role === 'user' ? <></> : <Button variant="outlined" onClick={() => { navigate('add_new') }}>Add New Book</Button>}


        </Box>
        <Grid container spacing={3}>
                {searchedBooks.map((b) => (
                    <ShowBook onDelete={handleDelete} book={b} />
                ))}
            </Grid>
    </Container>
}

export default ShowBooks;