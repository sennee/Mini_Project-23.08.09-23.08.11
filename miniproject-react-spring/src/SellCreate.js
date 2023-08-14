import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

function BoardCreate () {

    const userId = window.localStorage.getItem("userId")

    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [price, setPrice] = useState("");

    const navigate = useNavigate();

    async function onSubmit(event) {
        event.preventDefault();

        if (subject === "" || content === ""){
            alert("제목과 내용을 입력해주세요.")
        } else {
            try {
                const result = await axios.post("http://localhost:8080/sell-create",{
                    subject: subject,
                    content: content,
                    price: price,
                    currentUser: userId
                })
                if (result.status === 200) {
                    navigate("/board");
                }
            } catch (error) {
                alert("서버 문제로 판매글을 작성할 수 없습니다.")
            }
        }
    }

    function onChange(event) {
        if (event.target.name === "subject") {
            setSubject(event.target.value);
        } else if (event.target.name === "content"){
            setContent(event.target.value);
        } else if (event.target.name === "price") {
            setPrice(event.target.value);
        }
    }

    return (
        <div>
            <h5 className="border-bottom pb-2">판매글 작성</h5>
            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="subject" className="form-label">제목</label>
                    <input onChange={onChange} value={subject} 
                        type="text" name="subject" id="subject" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">제목</label>
                    <input onChange={onChange} value={price} 
                        type="number" name="price" id="price" className="form-control"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">내용</label>
                    <textarea onChange={onChange} value={content} 
                        name="content" id="content" className="form-control" row="5">

                    </textarea>
                </div>
                <input type="submit" value="저장하기" className="btn btn-primary"/>
            </form>
        </div>
    )
}

export default BoardCreate;