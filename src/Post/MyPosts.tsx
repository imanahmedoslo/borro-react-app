import { useEffect } from "react";
import { postProps } from "./ViewPost";
import { useState } from "react";
import { useAuth } from "../App";
import ActionAreaCard from "../home/Card";



export function MyPosts(){
  const { sessionInfo } = useAuth();
    const [posts,setPosts]=useState<postProps[]>([])
    useEffect(()=>{
        GetAllUserPosts().then(posts=>(setPosts(posts)))
    },[])

    async function GetAllUserPosts(){
      if (!sessionInfo) {
        return []
      }
      const response= await fetch(`https://borro.azurewebsites.net/api/Post/posts/${sessionInfo?.id}?userId=${sessionInfo?.id}`,{method: 'GET', headers: {'Content-Type': 'application/json','Authorization': `Bearer ${sessionInfo?.accessToken}`}});
      const responseJson:postProps[]= await response.json();
      return responseJson;
  }

    return(<>
        <h3   style={{ paddingBottom:'10p',fontSize:'30px', height:'15vh'}}>
      Dine Annonser:
    </h3>
    <div style={{display:'flex',flexDirection:'row', flexWrap:'wrap', alignItems:'center', overflowX:'hidden' }}>
    {posts?.map((post, index)=>(<ActionAreaCard location={post.location} key={index} description={post.description} title={post.title} id={post.id} img={post.image}/>))}
    </div>
    </>
  
);
}