import {useEffect, useState} from "react";
import {postProps} from "./ViewPost";
import {useAuth} from "../App";
import ActionAreaCard from "../home/Card";
import {Box, Typography} from "@mui/material";


export function MyPosts() {
  const {sessionInfo} = useAuth();
  const [posts, setPosts] = useState<postProps[]>([])
  useEffect(() => {
    GetAllUserPosts().then(posts => (setPosts(posts)))
  }, [])

  async function GetAllUserPosts() {
    if (!sessionInfo) {
      return []
    }
    const response = await fetch(`https://borro.azurewebsites.net/api/Post/posts/${sessionInfo?.id}?userId=${sessionInfo?.id}`, {
      method: 'GET',
      headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${sessionInfo?.accessToken}`}
    });
    const responseJson: postProps[] = await response.json();
    return responseJson;
  }

  return (<>
      <Typography variant={"h3"} sx={{
        textAlign: 'center',
      }}>
        Dine annonser
      </Typography>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        margin: '0 auto',
        maxWidth: {
          xs: '95%',
          sm: '80%',
          md: '70%',
        },
        boxSizing: 'border-box',
      }}>
        {posts?.map((post, index) => (
          <ActionAreaCard location={post.location}
                          key={index}
                          description={post.description}
                          title={post.title}
                          id={post.id}
                          img={post.image}/>))}
      </Box>
    </>

  );
}