import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({isLogged, setIsLogged}) {
    
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [errorMessege, setErrorMessage] = useState([]);
    const navigate = useNavigate();

    function onChange(event) {

        if (event.target.name == "username") {
            setUsername(event.target.value)
        } else if (event.target.name == "password") {
            setPassword(event.target.value)
        }
    }

    async function onSubmit(event) {
        event.preventDefault();

        const newErrorMessages = [];
        if (username === "") {
            newErrorMessages.push("아이디를 입력하세요.");
        }
        if (password === "") {
            newErrorMessages.push("비밀번호를 입력하세요");
        }

        setErrorMessage(newErrorMessages);

        if (newErrorMessages.length === 0) {

            try {

                const result = await axios.post("http://localhost:8080/login", {
                    username: username,
                    password: password
                })
                if (result.status === 200) {
                    console.log(result.data);
                    setIsLogged(true); // true로 설정을 하면 navbar의 로그인버튼이 로그아웃으로 바뀜.
                    window.localStorage.setItem("userId", result.data);
                    navigate("/")
                }
    
            } catch(error) {
                if (error.response && error.response.data) {
                    setErrorMessage([error.response.data]);
                    setUsername("");
                    setPassword("");
                } else {
                    console.log(error);
                }
            }

        }

    }

    return (
        <div className="container my-3">
            <form onSubmit={onSubmit}>
                {errorMessege.length > 0 && 
                    (<div className="alert alert-danger" role="alert">
                        {errorMessege.map((message, index) => (<div key={index}>{message}</div>))}
                    </div>
                    )
                }
                <div className="mb-2">
                    <label className="form-label" htmlFor="username"> 사용자 ID </label>
                    <input 
                        onChange={onChange}
                        className="form-control" id="username" name="username" type="text" />
                </div>
                <div className="mb-2">
                    <label className="form-label" htmlFor="password"> 비밀번호 </label>
                    <input
                        onChange={onChange} 
                        className="form-control" id="password" name="password" type="password" />
                </div>
                <button className="btn btn-dark" type="submit">로그인</button>
            </form>
        </div>

        
    )
}

export default Login;