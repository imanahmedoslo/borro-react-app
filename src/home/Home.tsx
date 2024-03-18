import React, { useContext, useEffect, useState } from "react";
import ActionAreaCard from "./Card.tsx";
import { SearchContext, useAuth } from "../App.tsx";
import { Filter } from "./Filter.tsx";
import { Box, Typography } from "@mui/material";

export type postProps = {
  id: number;
  title: string;
  image: string;
  price: number;
  dateFrom: Date;
  dateTo: Date;
  description: string;
  location: string;
  categoryId: number;
  userId: number;
};



export function Home() {
  const [filteredPosts, setFilteredPosts] = useState<postProps[]>([]);
  const [posts, setPosts] = useState<postProps[]>([]);
  const [sliderValue, setSliderValue] = useState(50);
  const [userAddress, setUserAddress] = useState("");
  const { searchText } = useContext(SearchContext);
  const { sessionInfo } = useAuth();
  async function filterPosts() {
    var searchFilteredPosts: postProps[] = [];

    if (searchText.trim()) {
    searchFilteredPosts= posts.filter((post) =>
        post.title.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredPosts(searchFilteredPosts);
    }
    
     
   
      
else {
    setFilteredPosts(posts);}
  }
  useEffect(() => {
    async function getPosts(): Promise<postProps[]> {
      const response = await fetch("https://borroapp.azurewebsites.net/api/Post");
      return await response.json();
    }
    getPosts().then((posts: postProps[]) => setPosts(posts));
  }, []);

  useEffect(() => {
    const fetchUserAddress=()=> {
      setUserAddress(sessionInfo?.address ?? "");
    }
     fetchUserAddress();
  }, [sessionInfo]);

  useEffect(() => {
    
    filterPosts();
  }, [posts, searchText, userAddress]);

  return (
    <>
      <Box
        sx={{
          gridArea: "main",
        }}
      >
        <Box>
          <Filter setPosts={setFilteredPosts}/>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            margin: "2rem auto",
            marginBottom: "1rem",
            maxWidth: {
              xs: "95%",
              sm: "80%",
              md: "70%",
            },
            boxSizing: "border-box",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              width: "100%",
              marginBottom: "1rem",
            }}
            variant="h3"
          >
            Annonser
          </Typography>
          {filteredPosts.length === 0 && <div style={{alignSelf:"center"}}>Ingen Annonser matcher søket</div>}
          {filteredPosts.map((post) => (
            <ActionAreaCard
              key={post.id}
              id={post.id}
              img={post.image}
              title={post.title}
              description={post.description}
              location={post.location}
              price={post.price}
            />
          ))}
        </Box>
      </Box>
    </>
  );
}
