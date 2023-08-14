import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BoardModify() {

    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [price, setPrice] = useState("");
    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        async function getSell() {
            try {
                const result = await axios.get(`http://localhost:8080/board/${params.id}`)
                setSubject(result.data.subject);
                setContent(result.data.content);
                setPrice(result.data.price);
            } catch(error) {
                console.log(error);
            }
        }
        getSell();
    }, [params.id])


    function onChange (event) {
        if(event.target.name === "subject") {
            setSubject(event.target.value);
        } else if (event.target.name === "content") {
            setContent(event.target.value);
        } else if (event.target.name === "price") {
            setPrice(event.target.value);
        }
    }


    async function onUpdate(event){
        event.preventDefault();
        if (subject === "" || content === "") {
            alert("수정할 제목과 내용을 입력하세요.")
        } else {
            try{
                const updatePrice = price === "" ? 0 : price;
                const result = await axios.put(`http://localhost:8080/sell-modify/${params.id}`, {
                    subject: subject,
                    content: content,
                    price: updatePrice
                })
                //console.log(result);
                if (result.status === 200) {
                    navigate(`/board/${params.id}`);
                }
            } catch (error) {
                alert("서버 문제로 질문을 수정할 수 없습니다.")
            }
        }
    }

    return (
        <div>
            <h5 className="border-bottom pb-2">판매글 수정</h5>
            <form onSubmit={onUpdate}>
                <div className="mb-3">
                    <label htmlFor="subject" className="form-label">제목</label>
                    <input onChange={onChange} value={subject} 
                        type="text" name="subject" id="subject" className="form-control"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="price" className="form-label">가격</label>
                    <input onChange={onChange} value={price} 
                        type="number" name="price" id="price" className="form-control"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="content" className="form-label">내용</label>
                    <textarea onChange={onChange} value={content} 
                        name="content" id="content" className="form-control" rows="10">

                    </textarea>
                </div>
                <input type="submit" value="수정하기" className="btn btn-primary"/>
            </form>
        </div>
    )
}

export default BoardModify;