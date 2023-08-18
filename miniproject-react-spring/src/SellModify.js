import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function BoardModify() {

    const [subject, setSubject] = useState("");
    const [content, setContent] = useState("");
    const [price, setPrice] = useState("");
    const [imageFile, setImageFile] = useState(null);
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

    // function onChange (event) {
    //     if(event.target.name === "subject") {
    //         setSubject(event.target.value);
    //     } else if (event.target.name === "content") {
    //         setContent(event.target.value);
    //     } else if (event.target.name === "price") {
    //         setPrice(event.target.value);
    //     }
    // }

    function onChange(event) {
        const { name, value, files } = event.target;

        if (name === "subject") {
            setSubject(value);
        } else if (name === "content") {
            setContent(value);
        } else if (name === "price") {
            setPrice(value);
        } else if (name === "image") {
            setImageFile(files[0]);   
        }

    }


    // async function onUpdate(event){
    //     event.preventDefault();
    //     if (subject === "" || content === "") {
    //         alert("수정할 제목과 내용을 입력하세요.")
    //     } else {
    //         try{
    //             const updatePrice = price === "" ? 0 : price;
    //             const result = await axios.put(`http://localhost:8080/sell-modify/${params.id}`, {
    //                 subject: subject,
    //                 content: content,
    //                 price: updatePrice
    //             })
    //             //console.log(result);
    //             if (result.status === 200) {
    //                 navigate(`/board/${params.id}`);
    //             }
    //         } catch (error) {
    //             alert("서버 문제로 질문을 수정할 수 없습니다.")
    //         }
    //     }
    // }

    async function onUpdate(event) {
        event.preventDefault();

        if (subject === "" || content === ""){
            alert("수정할 제목과 내용을 입력하세요.")
        } else {

            try {
                console.log(subject)
                console.log(imageFile)

                const updatePrice = price === "" ? 0 : price;
                const formData = new FormData();
                formData.append("subject", subject);
                formData.append("content", content);
                formData.append("price", updatePrice);
                if (imageFile) {
                    formData.append("image", imageFile);
                }
                const result = await axios.put(`http://localhost:8080/sell-modify/${params.id}`, formData);
                console.log(result.data)
                if (result.status === 200) {
                    navigate(`/board/${params.id}`);
                }
            } catch (error) {
                alert("서버 문제로 판매글을 작성할 수 없습니다.");
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
                    <label htmlFor="image" className="form-label">
                        이미지 업로드
                    </label>
                    <input
                        onChange={onChange}
                        // value={image}
                        type="file"
                        name="image"
                        id="image"
                        accept="image/*"
                        className="form-control"
                    />
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