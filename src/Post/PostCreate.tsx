
//import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import {  styled,  } from '@mui/material/styles';
import Logo from '../Logo';
import Checkbox from '@mui/material/Checkbox';
import { useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import FormControlLabel from '@mui/material/FormControlLabel';
import React, { useRef } from 'react';
import Select from 'react-select'
import { Navigate,useNavigate } from 'react-router-dom';
import { postProps } from './ViewPost';
import { UploadPicture } from './UploadPicture';

const token= localStorage.getItem('token');
const LogedInId= localStorage.getItem('id');
type categoryProps={
    id: number,
    type: string,
}
type CreatePostProps={
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
async function PostPosts(postInfo:CreatePostProps){
  
  const response= await fetch(`https://borro.azurewebsites.net/api/Post`,{method: 'POST', headers: {'Content-Type': 'application/json','Authorization': `Bearer ${token}`}, body:JSON.stringify(postInfo)});
  const responseJson:postProps= await response.json();
  return responseJson;
  }

async function GetCategories(){
  
const response= await fetch(`https://borro.azurewebsites.net/api/Category`,{method: 'GET', headers: {'Content-Type': 'application/json'}});
const responseJson:categoryProps[]= await response.json();
if (!response.ok) {
  console.error("annonse ble ikke laget");
  return[]
  
}
else return responseJson;
}
export default function PostCreate() { 
  const navigate=useNavigate();
  const userId= localStorage.getItem('id')??"";
  const[categories,setCategories]=useState<categoryProps[]>([])
  useEffect(()=>{
    GetCategories().then(categories=>setCategories(categories))
  },[])
  const[hasCategory,setHasCategory]=useState<boolean>(false);
  const[title,setTitle]=useState<string>("");
  const[description,setDescription]=useState<string>("");
  const[address,setAddress]=useState<string>("");
  //const [postnumber,setPostnumber]=useState<string>("");
  const[zipCode,setZipCode]=useState<string>("");
  const[city,setCity]=useState<string>("");
  const[img, setImg] = useState<string>("");
  const [price,setPrice]=useState<string>("");
  const [isFree,setIsFree]=useState<boolean>(false);
  const[categoryId,setCategoryId]=useState<number>(0);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleCutsomClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
    const [selectedStartDate, setSelectedStartDate] = useState<string>("");
    const [selectedEndDate, setSelectedEndDate] = useState<string>("");
   const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const Post:CreatePostProps={
      categoryId:categoryId,
      image:img,
      dateFrom: new Date(selectedStartDate),
      dateTo:new Date(selectedEndDate),
      location:`${address} ${zipCode} ${city}`,
      description:description,
      price:parseInt(price??0),
      title:title,
      userId:parseInt(userId),
    }
    PostPosts(Post).then(respons=>(navigate(`/posts/${LogedInId}`)))

   }
  
  const options = categories.map(category => ({
    value: category.type,
    label: category.type,
    id:category.id
  }));
  return (
    <form style={{display:'flex',flexDirection:'column', alignItems:'center', overflowX:'hidden' }}  onSubmit={e=>handleSubmit(e)}>

    
      <Typography variant="h6" gutterBottom style={{ paddingBottom:'10p',fontSize:'30px', height:'15vh'}}>
        Lag en ny annonse
      </Typography>
      <Grid container spacing={3} style={{display: 'flex',flexDirection: 'row',justifyContent: 'center', alignContent: "center",width: '70vw'}}>
        <div style={{display:'flex', flexWrap:'wrap' ,justifyContent:'space-around',flexDirection:'row', width:'100vw'}}>
        <div style={{display:'flex', flexDirection:'column'}}>
        <Grid >
          <div style={{display:'flex', flexDirection:'column', paddingTop:'7px'}}></div>
        </Grid>
        </div>
        </div>
        <Grid item xs={12} sm={6}>

          <TextField
          style={{width:'300px', marginLeft:'5px', alignSelf:'start'}}
            required
            id="Title"
            name="title" 
            label="Skriv inn Tittel:"
            fullWidth
            autoComplete="title"
            variant="standard"
            value={title}
            onChange={e=>setTitle(e.currentTarget.value)}
          />
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginTop: "15px", alignSelf:'end'}}>
        { hasCategory&&<Select onChange={e=>e?setCategoryId(e.id):setCategoryId(0)} options={options}/>}
          <FormControlLabel
            control={<Checkbox  onChange={e=>setHasCategory(e.target.checked?true:false)} color="secondary" name="saveAddress" value="yes"  />}
            label="Kryss av for å angi kategori"
          />
        </Grid>
        
          <TextField
            required
            id="description"
            name="description"
            label="Beskrivelse av produkt"
            fullWidth
            autoComplete="description"
            variant="standard"
            value={description}
            onChange={e=>setDescription(e.currentTarget.value)}
          />
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="addresse"
            name="addresse"
            label="Addresse"
            fullWidth
            autoComplete='Addresse'
            variant="standard"
            value={address}
            onChange={e=>setAddress(e.currentTarget.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="post-sted"
            name="post-sted"
            label="Post-sted"
            autoComplete='Post-sted'
            fullWidth
            variant="standard"
            value={city}
            onChange={e=>setCity(e.currentTarget.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Postnummer"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
            value={zipCode}
            onChange={e=>setZipCode(e.currentTarget.value)}
          />
        </Grid>
       <Grid item xs={12} sm={6} style={{alignSelf:'end'}}>
       { isFree&&<TextField
            required
            id="price"
            name="price"
            label="Pris per dag"
            fullWidth
            autoComplete="price"
            variant="standard"
            value={price}
            onChange={e=>setPrice(e.currentTarget.value)}
          />}
          <Grid item xs={12} style={{marginTop: "15px"}}>
          <FormControlLabel
            control={<Checkbox  onChange={e=>setIsFree(e.target.checked?true:false)} color="secondary" name="saveAddress" value="yes"  />}
            label="Kryss av for å angi pris"
          />
        </Grid>
        </Grid>
          <Grid item xs={12} sm={6} style={{gap:'5px'}}>
          <div>
            <label htmlFor="stratDate" >StartsDato:</label>
            <input type="date" name="stratDate" form='yyyy-MM-dd' value={selectedStartDate} onChange={e=>setSelectedStartDate(e.currentTarget.value)}/>
            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
          <div>
          <label htmlFor="endDate">SluttsDato:</label>
          <input type="date" name="endDate"  value={selectedEndDate} onChange={e=>setSelectedEndDate(e.currentTarget.value)}/>
            </div>
          </Grid>
      </Grid>
      <Button variant='outlined' type='submit' style={{width:'200px', height:'50px',marginTop:'30px', marginRight:'21px', marginBottom:'20px'}}>Lagre endringer</Button>
      </form>
    
  );
}




            