import { useEffect } from "react";
import { postProps } from "./ViewPost";
import { useState } from "react";
import ActionAreaCard from "../home/Card";
const userId=localStorage.getItem('id');
const token=localStorage.getItem('token');


async function GetAllUserPosts(){
    const response= await fetch(`https://borro.azurewebsites.net/api/Post/posts/${userId}?userId=${userId}`,{method: 'GET', headers: {'Content-Type': 'application/json','Authorization': `Bearer ${token}`}});
  const responseJson:postProps[]= await response.json();
  console.log(responseJson);
  return responseJson;
  
}
export function MyPosts(){
    const [posts,setPosts]=useState<postProps[]>([])
    useEffect(()=>{
        GetAllUserPosts().then(posts=>(setPosts(posts)))
    },[])
    return(<>
        <h3   style={{ paddingBottom:'10p',fontSize:'30px', height:'15vh'}}>
      Dine Annonser:
    </h3>
    <div style={{display:'flex',flexDirection:'row', flexWrap:'wrap', alignItems:'center', overflowX:'hidden' }}>
    {posts?.map((post, index)=>(<ActionAreaCard location={post.location} key={index} description={post.description} title={post.title} id={post.postId} img={post.image}/>))}
    </div>
    </>
  
);
}