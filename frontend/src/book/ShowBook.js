import { Card, CardContent, CardHeader, Typography, Button, Grid, Rating } from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';

const ShowBook = ({book, onDelete}) => {
    const navigation = useNavigate();
    const [user, setUser] = useState(null)
    const [isLogin, setIsLogin] = useState(false);

    const deleteBook = async () => {
        let response = await fetch(`http://localhost:8080/api/v1/book/${book.id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if(response.ok){
            let d = await response.json();
            console.log(JSON.stringify(d, null, 4));
            onDelete(book.id);
        }else{
            console.log("Neuspeh slanja!");
        }
    }

    useEffect(() => {
        const u = localStorage.getItem("user");
        console.log(u);
        if (u) {
            setUser(JSON.parse(u));
            setIsLogin(true);
        }
    }, [isLogin])

    return  <Grid item xs={4}>    
            <Card key={book.id} variant="outlined">
                <CardHeader subheader={book.title} sx={{border:"1px solid gray", borderRadius: "3px 3px 0px 0px", textAlign:"center"}} subheaderTypographyProps={{fontWeight:"bold"}}/> 
                <CardContent sx={{display:"flex", flexDirection:"column", alignContent:"center", flexWrap:"wrap"}}>
                    <Typography >{book.authors}</Typography>
                    <Typography >Year: {book.year}</Typography>
                    <Typography >ISBN: {book.isbn}</Typography>
                    <Typography >Genre: {book.genre}</Typography>
                    <Rating value={book.rating} readOnly precision={0.5}/>
                    <div>
                        
                        <Button onClick={()=>navigation(`book/${book.id}`)}>Details</Button>
                        {isLogin && user.role === 'user' ? <></> : <Button onClick={deleteBook}>Delete</Button> }
                        {isLogin && user.role === 'user' ? <></> : <Button onClick={()=>navigation(`update/${book.id}`)}>Edit</Button> }
                        
                    </div>
                </CardContent>
            </Card> 
            </Grid> 
}

export default ShowBook;