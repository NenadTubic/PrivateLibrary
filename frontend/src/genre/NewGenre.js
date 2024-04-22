import { useState } from 'react'
import { Container, Box, TextField, Button } from '@mui/material';
import { check_login } from '../login_logic';
const NewGenre = () => {
    const [txt, setTxt] = useState("");
    const user = check_login(['admin']);
    const addNewGenre = async () => {
            let response = await fetch("http://localhost:8080/api/v1/genre", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("token")
                },
                body: JSON.stringify({
                    name: txt
                }),
            });
            if(response.ok){
                let d = await response.json();
                console.log(JSON.stringify(d, null, 4));
            }else{
                console.log("Neuspeh slanja!");
            }
    }
    return <Container sx={{display:"flex", justifyContent:"center", alignContent:"center", flexWrap:"wrap", width:"40%"}}>
        <Box sx={{display:"flex", width:"100%", flexDirection:"column", alignItems:"end"}}>       
        <TextField sx={{width:"100%", marginBottom:4}} id="outlined-basic" label="Genre name" variant="outlined" value={txt} onChange={(e) => {
                            setTxt(e.target.value);
                        }}/>
            <Button variant="outlined" onClick={addNewGenre}>Save</Button>
        </Box>
    </Container>
}

export default NewGenre;