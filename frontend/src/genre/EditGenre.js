import { useEffect, useState } from 'react'
import { Container, Box, TextField, Button, Alert } from '@mui/material';
import { useFetcher, useLoaderData } from 'react-router-dom';

const EditGenre = () => {
    const currentGenre = useLoaderData();
    const fetcher = useFetcher();

    const [newGenreName, setNewGenreName] = useState(currentGenre.name);
    const [showAlert, setShowAlert] = useState(false);
    const [showError, setShowError] = useState(false);
    const [helperText, setHelperText] = useState("");
    const [severity, setSeverity] = useState("");
    const [message, setMessage] = useState("");

    useEffect(()=>{
        if(fetcher.data){
            setSeverity("success");
            setMessage("Uspesno izmenjen naziv.")
            setShowAlert(true);
        }else if(fetcher.state !== 'idle'){
            console.log("Neuspeh slanja!");
            setSeverity("error");
            setMessage("Naziv zauzet.")
            setShowAlert(true);
        }
        console.log(fetcher);
    },[fetcher]);

    return <Container sx={{display:"flex", justifyContent:"center", alignContent:"center", flexWrap:"wrap", width:"40%"}}>
        <Box sx={{display:"flex", width:"100%", flexDirection:"column", alignItems:"end"}}>       
        {showAlert && <Alert sx={{width:"100%", marginBottom:4}} onClose={() => {setShowAlert(false)}} severity={severity}>{message}</Alert>}
        <TextField sx={{width:"100%", marginBottom:4}} id="outlined-basic" label="Genre name" variant="outlined" value={newGenreName} 
        onChange={(e)=>{
            if(e.target.value.includes(1)){
                setShowError(true);
                setHelperText("Zanr ne sme da sadrzi brojeve.");
                setNewGenreName(e.target.value);
            }else{
                setShowError(false);
                setHelperText("");
                setNewGenreName(e.target.value);
            }
        }}
        required
        error={showError}   
        helperText={helperText} 
        />
            <Button variant="outlined" onClick={()=>{
                if(newGenreName !== ""){
                    let o = {name:newGenreName};
                    fetcher.submit(o,{
                        method:'put',
                        action:`/genres/update/${currentGenre.id}`
                    })
                }else{
                    setShowError(true);
                    setHelperText("Polje ne moze biti prazno.");
                }
            }}>Save</Button>
        </Box>
    </Container>
}

export default EditGenre;