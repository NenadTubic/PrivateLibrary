import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@mui/material';
import { useContext, useState } from 'react';
import { UserContext } from './App';

const LoginModal = ({onCloseModal}) => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const {user, login, logout} = useContext(UserContext);

    const userLogin = () => {
       const user = login(username, password);
        onCloseModal();
    }
    return (
        <div>
          <Dialog
            open={true}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Login"}
            </DialogTitle>
            <DialogContent sx={{display:"flex", flexDirection:"column"}}>
              <TextField label="Username" variant="outlined" required sx={{marginBottom:"10px"}} onChange={(e)=>{setUsername(e.target.value)}}/>
              <TextField label="Password" variant="outlined" required onChange={(e)=>{setPassword(e.target.value)}}/>
            </DialogContent>
            <DialogActions>
              <Button onClick={userLogin}>Login</Button>
              <Button onClick={()=>{onCloseModal()}}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
}

export default LoginModal;