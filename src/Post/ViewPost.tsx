import {useEffect, useState} from "react";
import {Button, Card, CardContent, CardMedia, Typography} from "@mui/material";
import {useParams} from "react-router-dom";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';


export type postProps = {
  postId: number,
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

async function FetchPost(id: number) {
  const res = await fetch(`https://borro.azurewebsites.net/api/Post/${id}`);
  try {
    if (!res.ok) {
      throw new Error(`Http error status code ${res.status}`);
    }

    const resObject = await res.json();
    return resObject;
  } catch (error) {
    console.log(error);
    return Error("Could not find find this post.");
  }
}


type ViewPostParams = {
  postId: string;
}

export function ViewPost() {
  const [post, setPost] = useState<postProps>();
  const {postId} = useParams<keyof ViewPostParams>() as ViewPostParams;
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (postId) {
      FetchPost(parseInt(postId))
        .then(p => setPost(p))
    }
  }, []);


  if (!post) {
    return <>Loading...</>
  }

  return (
    <div className="viewPostContainer">
      <Card sx={{maxWidth: 1000, maxHeight: 1000}} className={"PostMui"}>
        <CardMedia
          component="img"
          height="300"
          image={`${post.image}`}
          src={post.image}
          alt="Placeholder"
        />
        <CardContent className={"CardMuiContent"}>
          <Typography gutterBottom variant="h4" component="div" marginLeft={2}>
            {post?.title}
          </Typography>
          <Typography variant="body1" color="text.secondary" marginLeft={2}>
            {post?.description}
          </Typography>
          <Typography variant="h5" color="text.secondary" textAlign={"right"} marginRight={7}>
            Pris: {post?.price},-
          </Typography>
          <div className="button-spacing">
            <Button variant="contained">Reserver</Button>
            
            <Button onClick={handleOpen} variant="contained">Kontakt</Button>
          <dialog open={open} onClose={handleClose}>
          <DialogContent>   
            {post.userId}
          "kontakt detaljer"
          <Button onClick={handleClose} color="primary">
            lukk vindu
          </Button>
          </DialogContent>

          </dialog>

          </div>
        </CardContent>
      </Card>
    </div>
  )
}