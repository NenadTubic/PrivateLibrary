import { Error } from "@mui/icons-material";
import { Container, Icon, Stack, Typography, Box } from "@mui/material";
import { Navigate, useRouteError } from "react-router-dom"

const ErrorDisplay = ({entity}) => {
    const error = useRouteError();
    if(error.cause === 'login'){
        return <Navigate to="/"/>;
    }else if(error.cause === 'security'){
        return (
            <Container>
                <Stack direction={'row'}>
                    <Icon><Error/></Icon>
                    <Typography variant="h4">ACCESS DENIED</Typography>
                    <Icon><Error/></Icon>
                </Stack>
            </Container>
        )
    }
    return (
        <Container>
            <Stack>
                <Typography>Desila se greska u ucitavanju {entity}</Typography>
                <Typography>
                    Jako nam je žao. Da li ste pokrenuli back-end server, možda?
                </Typography>
                <Typography variant='h6'>Interna greška je: </Typography>
                    <Box>
                        <pre>
                        {error.message}          
                        </pre>
                    </Box>
            </Stack>
        </Container>
    )
}

export default ErrorDisplay;