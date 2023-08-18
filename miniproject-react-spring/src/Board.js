import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import moment from "moment";

function Board() {
    
    const [sellList, setSellList] = useState([]);

    useEffect(() => {
        async function getSellList() {
            try {
                const result = await axios.get("http://localhost:8080/board");
                console.log(result.data);
                setSellList(result.data);
            } catch(error) {
                console.log(error);
            }
        }
        getSellList();
    }, [])


    // return (
    //     <div>
    //         <Link to={"/sell-create"} className="btn btn-primary mb-2">판매글 작성</Link>
    //         <table className="table text-center">
    //             <thead className="table-dark">
    //                 <tr>
    //                     <th>번호</th>
    //                     <th>제목</th>
    //                     <th>날짜</th>
    //                     <th>작성자</th>
    //                 </tr>
    //             </thead>

    //             <tbody>
    //                 {sellList.map((sell, index) => {
    //                     return(
    //                         <tr key={index}>
    //                             <td>{index+1}</td>
    //                             <td>
    //                                 <Link 
    //                                     className="text-decoration-none"
    //                                     to={`/board/${sell.id}`}>
    //                                     {sell.subject}
    //                                     <span className="text-danger ms-2">
    //                                         <sup>[{sell.buylist.length}]</sup>
    //                                     </span>
    //                                 </Link>
    //                             </td>
    //                             <td>{moment(sell.createDate).format("YYYY-MM-DD HH:mm:ss")}</td>
    //                             <td>{sell.sellerUsername}</td>
    //                         </tr>
    //                     )
    //                 })}                   
    //             </tbody>
    //         </table>
    //     </div>
    // )

    return (
        <div>
        <Link to={"/sell-create"} className="btn btn-dark mb-2">판매글 작성</Link>
        <section className="bg-light py-4 my-5">
            
            <div className="container">
                <h2 className="mb-3 text-dark text-center">판매 상품들</h2>
                <div className="row">
                    {sellList.map((sell, index) => (
                        <div key={index} className="col-md-4">
                            <div className="card mb-4">
                                <img
                                    src = {sell.imgPath}
                                    className="card-img-top"
                                    alt="판매글 이미지"
                                    style={{ height: "200px", objectFit: "cover" }}
                                />
                                <div className="card-body">
                                    <h6 className="card-title">{sell.subject}
                                        <span className="text-danger ms-2">
                                            <sup>[{sell.buylist.length}]</sup>
                                        </span>
                                    </h6>
                                    <p className="card-text">
                                        작성자: {sell.sellerUsername}
                                        <br />
                                        날짜: {moment(sell.createDate).format("YYYY-MM-DD HH:mm:ss")}
                                        <br />
                                        가격: {sell.price}원
                                    </p>
                                    <Link
                                        to={`/board/${sell.id}`}
                                        className="btn btn-dark"
                                    >
                                        상세 보기
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
        </div>
    )
    
}

export default Board;