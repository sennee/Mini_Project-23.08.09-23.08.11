import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import moment from "moment";

function BoardDetail() {

    const userId = window.localStorage.getItem("userId")

    const [sell, setSell] = useState({});
    const [buy, setBuy] = useState([]);
    const [buyText, setBuyText] = useState("");
    const params = useParams();
    const navigate = useNavigate();
    // console.log(params);

    useEffect(() => {
        async function getSell() {
            try {
                const result = await axios.get(`http://localhost:8080/board/${params.id}`);
                console.log(result.data);
                setSell(result.data);
                setBuy(result.data.buylist);
            } catch (error) {
                console.log(error);
            }
        }
        getSell();
    }, [params.id])

    function onChange(event) {
        setBuyText(event.target.value)
    }

    async function onSubmit(event) {
        if (buyText === "") {
            alert("댓글 내용을 입력해주세요.")
        } else {
            event.preventDefault();
            try {
                const result = await axios.post(`http://localhost:8080/buy-create/${params.id}`,{
                    buyText: buyText,
                    currentUser: userId
                });
                
                if (result.status === 200) {
                    navigate(0);
                }
            } catch (error) {
                console.log(error);
            }
        }    
    }

    async function onDelete() {
        try {
            const result = await axios.get(`http://localhost:8080/board/${params.id}`);

            if (result.data.sellerUsername != userId) {
                alert("삭제 권한이 없습니다.");
            } else {
                if (window.confirm("정말 삭제하시겠습니까?")) {
                    try {
                        await axios.delete(`http://localhost:8080/sell-delete/${params.id}`);
                        alert("삭제되었습니다."); 
                        navigate("/board")
                    } catch (error) {
                        alert("서버 문제로 삭제할 수 없습니다.");
                    }
                } else {
                    alert("삭제 취소합니다.")
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function onUpadte(event) {
        try {
            const result = await axios.get(`http://localhost:8080/board/${params.id}`);
            console.log(result.data);
            if (result.data.sellerUsername != userId) {
                alert("수정 권한이 없습니다.")
            } else {
                navigate(`/sell-modify/${params.id}`)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // return (
    //     <div>
    //         <h2 className="border-bottom py-2">{sell.subject}</h2>
    //         <div className="me-3 bg-highlight">가격: {sell.price}원</div>
    //         <div className="card my-3">
    //             <div className="card-body">
    //                 <div className="card-text" style={{whileSpace: "pre-line"}}>{sell.content}</div>
    //                 <div className="d-flex justify-content-end">
    //                     <div className="badge bg-light text-dark p-2 text-start">
    //                     <div>작성: {moment(sell.createDate).format("YYYY-MM-DD HH:mm:ss")}</div>
    //                         {sell.modifyDate && <div className="mt-3">수정: {moment(sell.modifyDate).format("YYYY-MM-DD HH:mm:ss")}</div>}
    //                     </div>
    //                 </div>
    //                 <div className="mt-3">
    //                     <button
    //                         onClick={onUpadte}
    //                         className="btn btn-sm btn-outline-secondary"
    //                     >
    //                         수정
    //                     </button>
    //                     <button
    //                         onClick={onDelete}
    //                         className="btn btn-sm btn-outline-danger ms-2"
    //                     >
    //                         삭제
    //                     </button>
    //                 </div>
    //             </div>
    //         </div>

    //         <h5 className="border-bottom my-3 py-2">{buy.length}개의 댓글</h5>
    //         {buy.map((buy, index) => {
    //             return (
    //                 <div className="card my-3" key={index}>
    //                 <div className="card-body">
    //                     <div className="card-text" style={{whiteSpace: "pre-line"}}>{buy.content}</div>
    //                     <div className="d-flex justify-content-end">
    //                         <div className="badge bg-light text-dark p-2 text-start">
    //                             <div>작성: {moment(buy.createDate).format("YYYY-MM-DD HH:mm:ss")}</div>
    //                         </div>
    //                     </div>
    //                     <div className="mt-3">                  
    //                     </div>
    //                 </div>
    //             </div> 
    //             )
    //         })}
    //         <form
    //             onSubmit={onSubmit} className="my-3">
    //             <textarea
    //                 onChange={onChange} value={buyText} 
    //                 name="content" id="content" rows="10" className="form-control"></textarea>
    //             <input type="submit" value="댓글 작성" className="btn btn-dark my-2"/>
            
    //         </form>
    //     </div>
    // )

    return (
        <div>
            <h2 className="border-bottom py-2">{sell.subject}</h2>
                <div className="text-center">
                    <img
                        // src = {`http://localhost:8080${sell.imgPath}`} // 판매글 이미지 경로
                        src = {sell.imgPath}
                        className="card-img-top"
                        alt="판매글 이미지"
                        style={{maxWidth: '50%', height: 'auto'}}
                    />
                </div>
            <div className="card my-3">
                <div className="card-body">
                    <div className="me-3 bg-highlight">가격: {sell.price}원</div>
                    <div className="card-text" style={{ whiteSpace: 'pre-line' }}>{sell.content}</div>
                    <div className="d-flex justify-content-end">
                        <div className="badge bg-light text-dark p-2 text-start">
                            <div>작성: {moment(sell.createDate).format('YYYY-MM-DD HH:mm:ss')}</div>
                            {sell.modifyDate && (
                                <div className="mt-3">수정: {moment(sell.modifyDate).format('YYYY-MM-DD HH:mm:ss')}</div>
                            )}
                        </div>
                    </div>
                    <div className="mt-3">
                        <button onClick={onUpadte} className="btn btn-sm btn-outline-secondary">
                            수정
                        </button>
                        <button onClick={onDelete} className="btn btn-sm btn-outline-danger ms-2">
                            삭제
                        </button>
                    </div>
                </div>
            </div>

            <h5 className="border-bottom my-3 py-2">{buy.length}개의 댓글</h5>
            {buy.map((buy, index) => (
                <div className="card my-3" key={index}>
                    <div className="card-body">
                        <div className="card-text" style={{ whiteSpace: 'pre-line' }}>
                            {buy.content}
                        </div>
                        <div className="d-flex justify-content-end">
                            <div className="badge bg-light text-dark p-2 text-start">
                                <div>작성: {moment(buy.createDate).format('YYYY-MM-DD HH:mm:ss')}</div>
                            </div>
                        </div>
                        <div className="mt-3"></div>
                    </div>
                </div>
            ))}
            <form onSubmit={onSubmit} className="my-3">
                <textarea
                    onChange={onChange}
                    value={buyText}
                    name="content"
                    id="content"
                    rows="3"
                    className="form-control"
                ></textarea>
                <input type="submit" value="댓글 작성" className="btn btn-primary my-2" />
            </form>
        </div>
    )
}

export default BoardDetail;