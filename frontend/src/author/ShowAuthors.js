import { useLoaderData, useNavigate } from "react-router-dom";
import ShowAuthor from "./ShowAuthor";
import { Container, Box, Button } from "@mui/material";
import { useEffect, useState } from 'react';
const ShowAuthors = () => {
    const authors = useLoaderData();
    const navigation = useNavigate();
    const [user, setUser] = useState(null)
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const u = localStorage.getItem("user");
        console.log(u);
        if (u) {
            setUser(JSON.parse(u));
            setIsLogin(true);
        }
    }, [isLogin])

    return <Container> 
        <Box sx={{display:"flex", justifyContent:"end", marginBottom:3}}>
        {isLogin && user.role === 'user' ? <></> : <Button variant="outlined" onClick={()=>{navigation('add_new')}}>Add New Author</Button> }
            
        </Box>
        <Box>
                {authors.map((a) => <ShowAuthor author={a}/>)}
        </Box>
     </Container>
}

export default ShowAuthors;