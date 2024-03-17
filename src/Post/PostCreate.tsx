import React, { useEffect, useState } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { useNavigate } from "react-router-dom";
import { postProps } from "./ViewPost";
import { UploadPicture } from "./UploadPicture";
import { useAuth } from "../App";
import PostStyle from "./PostStyle.module.css";
import axios from "axios";

type categoryProps = {
  id: number;
  type: string;
};
type CreatePostProps = {
  title: string;
  image?: string;
  price: number;
  dateFrom: Date;
  dateTo: Date;
  description: string;
  location: string;
  categoryId: number;
  userId: number;
};

async function GetCategories() {
  const response = await fetch(
    `https://borroapp.azurewebsites.net/api/Category`,
    {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    },
  );
  const responseJson: categoryProps[] = await response.json();
  if (!response.ok) {
    console.error("annonse ble ikke laget");
    return [];
  } else {
    console.log(responseJson);
    return responseJson;
   
  }
}

export default function PostCreate() {
  const navigate = useNavigate();
  const { sessionInfo } = useAuth();
  const [categories, setCategories] = useState<categoryProps[]>([]);
  useEffect(() => {
    GetCategories().then((categories) => setCategories(categories));
    
  }, []);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [zipCode, setZipCode] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [price, setPrice] = useState<string>("");
  const [categoryId, setCategoryId] = useState<number>(0);
  const uploadFile = async (id: number) => {
    if (!file) {
      // Handle the case when no file is selected
      console.log("No file selected for upload.");
      return null; // Or handle this scenario appropriately
    }
    const formData = new FormData();
    formData.append("Picture", file);
    formData.append("Type", "post");
    formData.append("Id", `${id}`);

    try {
      const res = await axios.post(
        `https://borroapp.azurewebsites.net/api/FileUpload/`,
        formData,
      );
      return res.status;
    } catch (ex) {
      console.log(ex);
      alert("File upload failed");
      return 500;
    }
  };

  async function PostPosts(postInfo: CreatePostProps): Promise<postProps> {
    const response = await fetch(
      `https://borroapp.azurewebsites.net/api/Post`,
      {
        method: "POST",
        headers: {
          Accept: 'application/json',
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postInfo),
      },
    );
    const responseJson: postProps = await response.json();
    return responseJson;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      title===null ||
      description===null ||
      address===null ||
      zipCode===null ||
      city===null ||
      categoryId===null
    ) {
      console.log(title, description, address, zipCode, city, categoryId);
      alert("Please fill in all required fields.");
      return;
    }
    const Post: CreatePostProps = {
      categoryId: categoryId,
      dateFrom: new Date(),
      dateTo: new Date(),
      location: `${address} ${zipCode} ${city}`,
      description: description,
      price: parseInt(price ?? 0),
      title: title,
      userId: sessionInfo?.id!,
    };
    PostPosts(Post)
      .then((response) => {
        console.log("hererproblemet");
        console.log(file)
        if (file) {
          uploadFile(response.id)
            .then((uploadResponse) => {
              if (uploadResponse && uploadResponse < 300) {
                navigate(`/posts/${sessionInfo?.id}`);
              }
            })
            .catch((error) => {
              console.log("Error in file upload", error);
            });
        } else {
          navigate(`/error`);
        }
      })
      .catch((error) => {
        console.log("Error in creating post", error);
      });
  };

  const options = categories.map((category) => ({
    value: category.type,
    label: category.type,
    id: category.id,
  }));
  return (
    <form onSubmit={handleSubmit} className={PostStyle.container}>
      <p className={PostStyle.headerText}>Lag en ny annonse</p>
      <div className={PostStyle.inputContainer}>
        <div>
          <UploadPicture
            userId={sessionInfo?.id ?? 0}
            file={file}
            setFile={setFile}
            currentImage="https://www.svgrepo.com/show/508699/landscape-placeholder.svg"
          />
        </div>
        <div></div>
        <div>
          <label className={PostStyle.inputLabel}>Tittel</label>
          <input
            className={PostStyle.inputText}
            type="text"
            placeholder="Skriv en tittel*"
            name="title"
            id=""
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label className={PostStyle.inputLabel}>Pris pr dag</label>
          <input
            className={PostStyle.inputText}
            type="number"
            placeholder="0kr"
            name="price"
            id=""
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div>
          <label className={PostStyle.inputLabel}>Addresse</label>
          <input
            className={PostStyle.inputText}
            type="text"
            placeholder="Addresse*"
            name="address"
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
        <div>
          <label className={PostStyle.inputLabel}>Postnummer</label>
          <input
            className={PostStyle.inputText}
            type="text"
            placeholder="Postnummer*"
            name="zipcode"
            id=""
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
          />
        </div>
        <div>
          <label className={PostStyle.inputLabel}>Poststed</label>
          <input
            className={PostStyle.inputText}
            type="text"
            placeholder="Poststed*"
            name="city"
            id=""
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div>
          <label className={PostStyle.inputLabel}>Kategori:</label>
          <select
            className={PostStyle.inputText}
            onChange={(e) => setCategoryId(parseInt(e.currentTarget.value))}
          >
            {categories.map((category) => (
              <option value={1} key={category.id}>
                {category.type}
              </option>
            ))}
          </select>
        </div>
        <div></div>
        <div>
          <label className={PostStyle.inputLabel}>
            Beskrivelse av Produktet
          </label>
          <textarea
            className={PostStyle.inputText}
            placeholder="skriv inn her"
            name="city"
            id=""
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div></div>
        <button type="submit" className={PostStyle.btn}>
          Opprett annonse
        </button>
      </div>
    </form>
  );
}
