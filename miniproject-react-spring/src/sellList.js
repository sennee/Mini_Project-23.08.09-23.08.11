function sellList (){

    return (
        <div className="container my-3">
            <section className="bg-light py-4 my-5">
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="mb-3 text-primary text-center">판매 상품들</h2>
                        </div>
                        <div className="col-md-6 col-lg-4">
                            <div className="card my-3">
                                <img src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg" className="card-image-top" alt="thumbnail" />
                                <div className="card-body">
                                    <h5 className="card-title text-center"><a href="#" className="text-secondary">제목이 들어감</a></h5>
                                    <p className="card-text text-center">가격</p>
                                </div>
                            </div>
                        </div>

                        {/* 나머지 카드들도 같은 방식으로 추가 */}
                    </div>
                </div>
            </section>
        </div>
    );
    
}

export default sellList;