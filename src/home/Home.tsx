import React, {useContext, useEffect, useState} from "react";
import ActionAreaCard from "./Card.tsx";
import {SearchContext} from "../App.tsx";
import {Filter} from "./Filter.tsx";
import {calculateDistance} from "../GoogleAPI/CalculateDistance.tsx";
import {getUser} from "../A/contextPage.tsx";
import { Box } from "@mui/material";

export type postProps = {
  id: number,
  title: string,
  image: string,
  price: number,
  dateFrom: Date,
  dateTo: Date,
  description: string,
  location: string,
  categoryId: number,
  userId: number
}

type postState = {
  posts: postProps[]
}

export function Home() {
  const [filteredPosts, setFilteredPosts] = useState<postProps[]>([]);
  const [posts, setPosts] = useState<postProps[]>([]);
  const [sliderValue, setSliderValue] = useState(50);
  const [userAddress, setUserAddress] = useState("");
  const {searchText} = useContext(SearchContext);


  console.log(sliderValue);

  async function getPosts(): Promise<postProps[]> {
    const response = await fetch("https://borro.azurewebsites.net/api/Post");
    return await response.json();
  }

  useEffect(() => {
    getPosts().then((posts: postProps[]) => setPosts(posts));
  }, []);

  useEffect(() => {
    async function fetchUserAddress() {
      const userData = await getUser();
      setUserAddress(userData.address);
    }

    fetchUserAddress();
  }, []);

  useEffect(() => {
    async function filterPosts() {
      let searchFilteredPosts = posts;

      if (searchText.trim()) {
        searchFilteredPosts = searchFilteredPosts.filter(post =>
          post.title.toLowerCase().includes(searchText.toLowerCase()));
      }

      let finalFilteredPosts = [];

      // Only proceed if userAddress is non-empty
      if (userAddress.trim()) {
        for (let post of searchFilteredPosts) {
          // Try-catch block around distance calculation
          try {
            const distance = await calculateDistance(userAddress, post.location);
            //console.log({distance, sliderValue}); // additional log for debugging

            if (distance <= sliderValue) {
              finalFilteredPosts.push(post);
              //console.log(post); // additional log for debugging
            }
          } catch (err) {
            console.error(`Failed to calculate distance for post with id ${post.id}, error: ${err}`);
          }
        }
      } else {
        console.warn('User address is empty, can not filter by distance.');
        finalFilteredPosts = searchFilteredPosts; // No filtering by distance if no userAddress provided
      }

      setFilteredPosts(finalFilteredPosts);
    }

    filterPosts();
  }, [posts, searchText, sliderValue, userAddress]);

  return (
    <>
      <Box>
        <Box>
          <Filter sliderValue={sliderValue}
                  setSliderValue={setSliderValue}/>
        </Box>
        <Box style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'flex-start',
          margin: '0 auto',
          maxWidth: '96%',
          boxSizing: 'border-box',
        }}>
          {filteredPosts.map(post =>
            <ActionAreaCard
              key={post.id}
              id={post.id}
              img={post.image}
              title={post.title}
              description={post.description}
              location={post.location}
            />)}
        </Box>
      </Box>
    </>)
}