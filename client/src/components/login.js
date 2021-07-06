import React , {useState} from 'react'
import LatexTextBox from './latexTextBox';
const Login = () => {
    const [uid, setUid] = useState("");
    const [pass, setPass] = useState(""); 
    const [auth, setAuth] = useState(false);

    const submitForm = (e) => {
        e.preventDefault();
        if(uid === 'abc' && pass === 'abc'){ // just using username: abc password: abc now will add DB later. 
            setAuth(true);
        }
    }
    return (
        <>
        {!auth? 
            <form action="" onSubmit={submitForm}>
                <div>
                <label>username</label>
                <input type="text" name="uid" id="uid" onChange={({target}) => setUid(target.value)} value={uid}></input>
                </div>
                <div>
                <label>password</label>
                <input type="password" name="pass" id="pass" onChange = {({target}) => setPass(target.value)} value={pass}></input>
                </div>
                <button type="submit">login</button>
            </form>
            :
            <LatexTextBox/>
        }
        </>
    );
}

export default Login;