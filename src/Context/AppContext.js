import { createContext } from "react";
import { useState } from "react";
import { baseUrl } from "../baseUrl";

//step 1: Context creation
export const AppContext= createContext(); //export=>we want to use it in another file

export default function AppContextProvider({children}){ //children=>app
    const [loading, setLoading]=useState(false);
    const [posts,setPosts]=useState([]);
    const [page, setPage]= useState(1);
    const [totalPages , setTotalPages] = useState(null);

    async function fetchBlogPosts(page = 1) {
        setLoading(true);
        let url= `${baseUrl}?page=${page}`;   
        try{
            const result= await fetch(url);
            const data= await result.json();
            console.log(data);

            setPage(data.page);
            setPosts(data.posts);
            setTotalPages(data.totalPages);

        }
        catch(error){
            console.log("error in fetching data", error);
            setPage(1);
            setPosts([]);
            setTotalPages(null);
        }
        setLoading(false);
    }

    function handlePageChange(page){
        setPage(page);
        fetchBlogPosts(page);
     }

    const value= { //generic
        posts,
        setPosts,
        loading,
        setLoading,
        page,
        setPage,
        totalPages ,
        setTotalPages,
        fetchBlogPosts,
        handlePageChange
    };

    //step 2: Provide ...app ko value send
    return  <AppContext.Provider value={value}>
        {children}
    </AppContext.Provider>;
}