import { useEffect } from "react";

function Home({isLogged, setIsLogged}) {

    // const userId = window.localStorage.getItem("userId");

    // useEffect(() => {
    //     if (!isLogged) {
    //         window.localStorage.clear("userId");
    //         // setIsLogged(false);
    //     } else {

    //     }
    // }, [isLogged]);

    return (
        <div>여긴 홈</div>
    )
}

export default Home;