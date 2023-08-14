import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {

    const [username,setUsername] = useState("");
    const [fullName,setFullName] = useState("");
    const [password1,setPassword1] = useState("");
    const [password2,setPassword2] = useState("");
    const [email,setEmail] = useState("");
    const [errorMessege, setErrorMessage] = useState([]);
    const navigate = useNavigate();


    function onChange(event) {

        if (event.target.name === "username") {
            setUsername(event.target.value)
        } else if (event.target.name === "fullName") {
            setFullName(event.target.value)
        }else if (event.target.name === "password1") {
            setPassword1(event.target.value)
        }else if (event.target.name === "password2") {
            setPassword2(event.target.value)
        }else if (event.target.name === "email") {
            setEmail(event.target.value)
        }
    }

    async function onSubmit(event) {
        event.preventDefault();
        
        const newErrorMessages = [];
        if (username === "") {
        newErrorMessages.push("아이디는 필수항목입니다.");
        }
        if (fullName === "") {
        newErrorMessages.push("이름은 필수항목입니다.");
        }
        if (password1 === "") {
        newErrorMessages.push("비밀번호는 필수항목입니다.");
        }
        if (password2 === "") {
        newErrorMessages.push("비밀번호 재확인은 필수항목입니다.");
        }
        if (email === "") {
        newErrorMessages.push("이메일은 필수항목입니다.");
        }
        if (password1 !== password2) {
        newErrorMessages.push("비밀번호와 확인이 일치하지 않습니다.");
        }

        setErrorMessage(newErrorMessages);

        if (newErrorMessages.length === 0) {
            try {
                const result = await axios.post("http://localhost:8080/signup", {
                    username: username,
                    fullName: fullName,
                    password1: password1,
                    password2: password2,
                    email: email
                })
                if (result.status === 200) {
                    navigate("/login")
                }
            } catch(error) {
                // console.log(error.response.data);
                if (error.response && error.response.data) {
                    //서버에서 반환한 에러 메세지 출력
                    // alert(error.response.data);
                    setErrorMessage([error.response.data]);
                    setUsername("")
                    setFullName("")
                    setPassword1("")
                    setPassword2("")
                    setEmail("")
                } else {
                    console.log(error);
                }
            }
        } 
    }

    return (
        <div className = "container my-3">
            <div className="my-3 border-bottom">
                <h3>회원가입</h3>
            </div>
            <form onSubmit={onSubmit}>
                {errorMessege.length > 0 && 
                    (<div className="alert alert-danger" role="alert">
                        {errorMessege.map((message, index) => (<div key={index}>{message}</div>))}
                    </div>
                    )
                }          
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">아이디</label>
                    <input 
                        onChange={onChange} value={username}
                        type="text" name="username" id="username" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">이름</label>
                    <input 
                        onChange={onChange} value={fullName}
                        type="text" name="fullName" id="fullName" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password1" className="form-label">비밀번호</label>
                    <input 
                        onChange={onChange} value={password1}
                        type="password" name="password1" id="password1" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password2" className="form-label">비밀번호 확인</label>
                    <input 
                        onChange={onChange} value={password2}
                        type="password" name="password2" id="password2" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">이메일</label>
                    <input 
                        onChange={onChange} value={email}
                        type="email" name="email" id="email" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-dark">회원가입</button>
            </form>
        </div>
    )
}

export default Signup;