import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reservation from "./Reservation";
import ViewPostCss from "./ViewPost.module.css";

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
type ownerContacts = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  eMail: string;
  profilePicture: string;
};
type Category = {
  type: string;
};

async function fetchCategory(id: number): Promise<Category> {
  const res = await fetch(
    `https://borro.azurewebsites.net/api/Category/${id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  );
  const resJson: Category = await res.json();
  return resJson;
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

async function FetchUserByPostId(id: number) {
  const res = await fetch(
    `https://borro.azurewebsites.net/api/UserInfo/postOwner/${id}?postId=${id}`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  );
  const responseJson: ownerContacts = await res.json();
  return responseJson;
}

type ViewPostParams = {
  postId: string;
};

export function ViewPost() {
  const [post, setPost] = useState<postProps>();
  const { postId } = useParams<keyof ViewPostParams>() as ViewPostParams;
  const [contacts, setContacts] = useState<ownerContacts | null>(null);
  const [category, setCategory] = useState<Category>({ type: "" });
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (post != null || post != undefined) {
      FetchUserByPostId(post?.id).then((result) => setContacts(result));
    }
  }, [post]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (postId) {
      FetchPost(parseInt(postId)).then((p) => setPost(p));
    }
  }, []);
  useEffect(() => {
    if (post) {
      fetchCategory(post.categoryId).then((category) => setCategory(category));
    }
  }, [post]);

  const customTheme = {
    display: "flex",
    padding: "10px 0 10px 10px",
    flexDirection: "row",

    justifyContent: "left",
  };
  const customTheme3 = {
    display: "flex",
    padding: "10px 0 10px 10px",
    flexDirection: "column",
    justifyContent: "",
    height: "100px",
  };
  const customTheme1 = {
    display: "flex",
    padding: "10px 0 10px 10px",
    flexDirection: "row",

    justifyContent: "left",
  };
  const customTheme2 = {
    display: "flex",
    padding: "10px 0 10px 10px",
    flexDirection: "row",
    justifyContent: "end",
    marginRight: "30px",
    height: "30px",
  };

  if (!post) {
    return <>Loading...</>;
  }
  return (
    <div className={ViewPostCss.container}>
      <div className={ViewPostCss.innerContainer}>
        <img
          className={ViewPostCss.postImage}
          src={
            post.image == "" || post.image == undefined || post.image == null
              ? "https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
              : post.image
          }
          alt="My Image"
        />
        <div className={ViewPostCss.titleContainer}>
          <p className={ViewPostCss.headerText}>{post.title}</p>
          <p className={ViewPostCss.label}>
            {post.price == 0 || post.price == null
              ? "Gratis"
              : post.price + ",-"}
          </p>
          <div>
            <div className={ViewPostCss.userInfo}>
              <img
                className={ViewPostCss.profilImage}
                src={
                  contacts?.profilePicture ??
                  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0TBg4PEBENEBAQDRARDw4QDg8NDQ0QFRUWFhYRFhMYHSggGBolJxUTJDEhJSkrLi8uFx8zODMsNygtLisBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYCAwQBB//EADcQAQACAAMFBAgEBgMAAAAAAAABAgMEEQUhMUFREmFxwTJicoGRobHhEyJS0TM0QpLw8SMkQ//EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD6SAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD2tZmdIiZnpG+QeDqw9n40/06eMxDfGyb87V+EyCOEjOyb8rV+Ew04mzcaOUW8JjzByD29JidJiYnpMaPAAAAAAAAAAAAAAAAAAAAACOL2sTNoiI1meEdU1kMlFK9qd9+vKvdAObK7MmY1xN3qxx98pPCwq1rpWIiO5mAAAAAxxMOs10tETHfGqNzWy+eH/AGz5SlAFYtWYtMTumOMTyeJ7O5Ot69LRwt5Sg8Sk1vNZjSY4gxAAAAAAAAAAAAAAAABuyeD28xWvLjPhAJDZWV0p+JbjPo90dfeknkRuegAAAAAAAAOLaWV7WH2oj81Y+MdHaAq46to4HZzM6cLb47usOUAAAAAAAAAAAAAABK7Gw/y3t1nSPrPkik9syumSr36z85B1AAAAAAAAAAAA4Nr4euWi36bfKd37IZYs5XXKXj1Z+W9XQAAAAAAAAAAAAAAFg2f/ACdPZV9O7Ltrk690zHz+4OsAAAAAAAAAAAGvMfwL+zb6K2sOetpk7z6sx8dyvAAAAAAAAAAAAAAAJPYuLvtT3x5+SMbMvizXGraOU/GOYLIMaWiaxMb4mNYZAAAAAAAAAATII7bOLphVr1nWfCEQ353H7eYm3LhXwhoAAAAAAAAAAAAAAAABJbKzek/h24T6M9J6JZV0rkNoboped/K3Ke6QSYAAAAAAACN2rm9K/h14z6U9I6M8/n4rE1pvtznlX7oaZ3gAAAAAAAAAAAAAAAAAAM8LBta2lYmZ+UeMuvJ7OtbffWten9U/sl8LCrWmlYiIBpyWBemHpa3a6Ryr73SAAAAADTmsK1sLStprPXr3NwCuY+XvS2lo8J41n3tSzXpE1mJiJieU74Rec2ZMfmw9/q8/cCNCeIAAAAAAAAAAAAAD2tZm0RG+Z4R1ArWZtERvmeEJfI7Piulr6TblHGK/dsyOTildZ0m88Z6d0OwAAAAAAAAAAAAHHncjW8axpFuvKfFC4mHat5raNJhZnPm8rW9N+6Y4W6fYFfGeLh2riTW26YYAAAAAAAAAAAJnZuU7NO1b0pj+2Oni5NlZbtYvbnhXh32TQAAAAAAAAAAAAAAAAOXP5WL4frR6M+SCmJidJ3TG6Y6LOitrZb/0jwt5SCMAAAAAAAAIjfp1HXsvC7WbieVY7X7AmMthRXAivSN/fPOW0AAAAAAAAAAAAAAAAAGOJSJw5ieExpLIBWcXDmuJNZ4xOn3YpDbGFpjVt+qNJ8Y/z5I8AAAAAABLbFp/xWt1tp7o/wBolP7Pppk6d8a/HeDpAAAAAAAAAAAAAAAAAAABx7Vw9cpM/pmJ8vNBrJj01wbV61mFbAAAAAAAWXCrphVjpWI+St0j88eMfVZwAAAAAAAAAAAAAAAAAAAAFZxa6Yto6WmPmsyu52P+3ie1INIAAAAAMsH+NX2o+qzAAAAAAAAAAAAAAAAAAAAAAr2f/nL+15QANAAAAP/Z"
                }
                alt=""
              />
              <div>
                {/* TODO: fiks sånn at labels blir bold */}
                <p className={ViewPostCss.labelLg}>
                  Navn:{" "}
                  <span>
                    {contacts?.firstName} {contacts?.lastName}
                  </span>
                </p>
                <p className={ViewPostCss.labelLg}>
                  Epost: <span>{contacts?.eMail}</span>
                </p>
                <p className={ViewPostCss.labelLg}>
                  Tlf: <span>{contacts?.phoneNumber}</span>
                </p>
                <p className={ViewPostCss.labelLg}>
                  Adresse: <span>{post.location}</span>
                </p>
              </div>
            </div>
          </div>
          <Reservation postId={post.id} price={post.price} />
          {/*<button className={ViewPostCss.btn}>Reserver</button>*/}
        </div>
      </div>
      <div className={ViewPostCss.detailInfo}>
        <div>
          <p className={ViewPostCss.label}>Kategori</p>
          <p className={ViewPostCss.labelLg}>{category.type}</p>
        </div>
        <div>
          <p className={ViewPostCss.label}>Beskrivelse</p>
          <p className={ViewPostCss.labelLg}>{post.description}</p>
        </div>
      </div>
    </div>
  );
}
