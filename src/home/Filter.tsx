import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SyntheticEvent, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grow,
  Slider,
} from "@mui/material";
import { getPosts } from "../A/contextPage.tsx";
import { postProps } from "./Home.tsx";
import { useAuth } from "../App.tsx";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {GetCategories} from "../Post/PostCreate.tsx"
import { categoryProps } from "../Post/PostCreate.tsx";
import { set } from "date-fns";
import { ca } from "date-fns/locale";
import { all } from "axios";


type FilterProps = {
  setPosts: (posts: postProps[]) => void;
};

export function Filter({setPosts }: FilterProps) {
  const { sessionInfo } = useAuth();
  const [vis, setVis] = useState(false);
  const [categories,setCategories] = useState<categoryProps[]>([])
  const [value, setValue] = useState<number[]>([50]);

  const handleChange = (event: Event, newValue: number | number[]) => {
    const value = newValue as number[];
    setValue(value);
  };

  function handleChangeCommited(
    event: Event | SyntheticEvent<Element, Event>,
    newValue: number | number[],
  ): void {
    const value = newValue as number[];
    setValue(value);
  }

  const onClick = () => {
    setVis(!vis);
  };
  useEffect(()=>{
    async function fetchCategories(){
     const categoryList= await GetCategories();
   setCategories(categoryList);
   }
   fetchCategories();
   console.log(categories)
   
   },[])
const updatepostsByCategory=(id:number)=>{
  async function getPostsByCategory(){
    const Allposts:postProps[] = await getPosts();
    const category = id;
    
      const categoryPosts = Allposts.filter((post)=>post.categoryId === category)
      if(categoryPosts.length===0){
        return Allposts;
      }
      else {
        return categoryPosts};
    
  }
  getPostsByCategory().then((posts) => (posts?setPosts(posts):null));

}
const resetPosts=()=>{
  getPosts().then((Allposts) => (
  setPosts(Allposts)
  ));
}
  return (
    <Box onBlur={() => setVis(false)}
      sx={{
        objectFit: "contain",
        width: "310px",
        position: "absolute",
        left: "2em",
        zIndex: 1,
      }}
    >
      <Button
        onClick={onClick}
        variant="contained"
        sx={{
          padding: "8px",
          backgroundColor: "#2f374a",
          boxShadow: 1,
          "&:hover": {
            boxShadow: 1,
            backgroundColor: "#293040",
          },
          "&:focus": {
            outline: "none",
          },
          transition: "border-radius 0.2s ease",
          borderRadius: vis ? "0px 0px 0px 0px" : "0px 0px 5px 5px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            width: "100%",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              marginLeft: "5px",
            }}
          >
            Filter
          </Typography>
          <ExpandMoreIcon
            sx={{
              color: "#c9c9c9",
              transform: vis ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s ease-in-out",
            }}
          />
        </Box>
      </Button>

      <Grow
        in={vis}
        style={{ transformOrigin: "0 0 0" }}
        mountOnEnter
        unmountOnExit
      >
        <Box
          sx={{
            backgroundColor: "#f6f6f6",
            border: "1px solid #c9c9c9",
            padding: "10px",
            borderRadius: "0px 5px 5px 5px",
            display: "block",
            transition: "display 1s ease",
          }}
        >
          <Box sx={{}}>
      <Typography id="range-slider" gutterBottom>
        Distance {value} km
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        onChangeCommitted={handleChangeCommited}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
      />
    </Box>
          <Box mt={1} mb={2}>
            <Divider />
          </Box>
          <Typography>Kategori</Typography>
          <Box ml={3}>
            <FormGroup>
              {categories.map((category) => {
                if (category.type !== "Velg...") {
                  return (
                    <FormControlLabel
                      control={<Checkbox />}
                      checked={false}
                      key={category.id}
                      id={category.id.toString()}
                      label={category.type}
                      onClick={(e) => updatepostsByCategory(category.id)}
                    />
                  );
                } else {
                  return <p key={"velg"}>Velg...</p>;
                }
              })}
            </FormGroup>
            <Button
              variant="contained"
              sx={{ mt: 4, mb: 2 }}
              style={{ backgroundColor: "#293040" }}
              onClick={resetPosts}
            >
              Vis alle
            </Button>
          </Box>
        </Box>
      </Grow>
    </Box>
  );
}

