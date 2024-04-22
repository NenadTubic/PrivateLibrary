import { useState } from "react";

export const get_login = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log(user);
    return user;
} 

export const check_login = (roles) => {
    const user = get_login();
    if(user === null){
        const err = {
            cause:"login",
            message: "Korisnik nije ulogovan"
        };
        throw err;
    }else if(roles){
        if(!roles.includes(user.role)){
            const err = {
                cause:"security",
                message: "Korisnik nema pravo pristupa"
            };
            throw err;
        }
    }
    
    return user;

}


export const valid_login = (roles) => {
    const user = get_login();
    if(user === null){
        return false;
    }else if(roles){
        if(!roles.includes(user.role)){
            return false;
        }
    }
    console.log("23456789");
    return true;
    
}

export const useLogin = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
    return [
        user,

        (username, password)=>{
            if(username === 'test' && password === 'test'){
                const nuser = {
                  username: 'test',
                  name: 'Test Test',
                  token: 'abcd',
                  role: 'admin'
                }
                setUser(nuser);
                localStorage.setItem("user", JSON.stringify(nuser));
                return nuser;
            }else if(username === 'user' && password === 'user') {
                const nuser = {
                  username: 'user',
                  name: 'User User',
                  token: '1234',
                  role: 'user'
                }
                setUser(nuser);
                localStorage.setItem("user", JSON.stringify(nuser));
                return nuser;
          }else{
            return null;
          }
        },

        ()=>{
            setUser(null);
            localStorage.removeItem('user');
        }
    ]
}