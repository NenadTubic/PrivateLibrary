import { Card, CardContent, CardHeader, Typography, Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
const ShowAuthor = ({author}) => {
    const navigation = useNavigate();

    return  <Card key={author.id} variant="outlined" sx={{marginBottom:3}}>
            <CardHeader subheader={author.name} sx={{border:"1px solid gray", borderRadius: "3px 3px 0px 0px", textAlign:"center"}}/> 
            <CardContent>
                {author.books.map((a)=>
                <Chip label={a.title} 
                      clickable 
                      onClick={()=>navigation(`/books/book/${a.id}`)}
                      sx={{marginRight:2}}
                />)}
                <a href="https"/>
            </CardContent>
            </Card>  


}

export default ShowAuthor;