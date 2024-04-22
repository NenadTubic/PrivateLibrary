import { useContext, useState } from "react";
import { TextField, Button, Container, Box, Alert } from "@mui/material";
import { UserContext } from "../App";

const NewAuthor = () => {
    const [txt, setTxt] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    //const {user, login, logout} = useContext(UserContext);

    const addNewAuthor = async () => {
            //logout();
            let response = await fetch("http://localhost:8080/api/v1/author", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: txt
                }),
            });
            if(response.ok){
                let d = await response.json();
                console.log(JSON.stringify(d, null, 4));
                setShowAlert(true);
            }else{
                console.log("Neuspeh slanja!");
            }
    }
    return <Container sx={{display:"flex", justifyContent:"center", alignContent:"center", flexWrap:"wrap", width:"40%"}}>
        <Box sx={{display:"flex", width:"100%", flexDirection:"column", alignItems:"end"}}>          
                {showAlert && <Alert sx={{width:"100%", marginBottom:4}} onClose={() => {setShowAlert(false)}}>Novi autor uspesno dodat!</Alert>}
                <TextField sx={{width:"100%", marginBottom:4}} id="outlined-basic" label="Author name" variant="outlined" value={txt} onChange={(e) => {
                            setTxt(e.target.value);
                        }}/>
            <Button variant="outlined" onClick={addNewAuthor}>Save</Button>
        </Box>
    </Container>
}

export default NewAuthor;