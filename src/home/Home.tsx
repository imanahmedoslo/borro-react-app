import React, {useContext, useEffect} from "react";
import ActionAreaCard from "./Card.tsx";
import {SearchContext} from "../App.tsx";
import {Filter} from "./Filter.tsx";

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
  const [filteredPosts, setFilteredPosts] = React.useState<postProps[]>([]);
  const [posts, setPosts] = React.useState<postProps[]>([]);

  const {searchText} = useContext(SearchContext);

  useEffect(() => {
    setFilteredPosts(
      posts.filter(post =>
        post.title.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [posts, searchText]);

  async function getPosts(): Promise<postProps[]> {
    const response = await fetch("https://borro.azurewebsites.net/api/Post");
    return await response.json();
  }

  useEffect(() => {
    getPosts().then((posts: postProps[]) => setPosts(posts));
  }, []);

  useEffect(() => {
    setFilteredPosts(
      posts.filter(post =>
        post.title.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [posts, searchText]);


  return (
    <>
      <div>
        <div>
          <Filter/>
        </div>
        <div style={{
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
              title={post.title}
              description={post.description}
              location={post.location}
            />)}
        </div>
      </div>
    </>)


}
								
    
   


	

	





