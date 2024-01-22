
//import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Logo from '../Logo';
import Checkbox from '@mui/material/Checkbox';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { Range, DateRange, DateRangeProps } from 'react-date-range';
import FormControlLabel from '@mui/material/FormControlLabel';
import Calendar from './PostCreateCalender';
import { RangeKeyDict } from 'react-date-range';
import React, { useRef } from 'react';
const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();





export default function PostCreate() { 
  const [isFree,setIsFree]=useState<boolean>(false);
  const[img,setImg]=useState<string>();
    const fileInputRef = useRef<HTMLInputElement>(null);
  
    const handleCutsomClick = () => {
      if (fileInputRef.current) {
        fileInputRef.current.click();
      }
    };
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: new Date(),
       key: 'selection'
     }
  ]);
  const handleDateChange = (item:RangeKeyDict) => {
    // Update the state when the date range changes
     setDateRange([item.selection]);
     console.log(item)
     console.log(dateRange)
     console.log(item.selection)
   };
   const handleSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    
   }
  const handleimgInput=(e:React.ChangeEvent<HTMLInputElement>)=>{
    const file= e.target.files?.[0]
    if (file) {
      // Convert the selected file to a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result?.toString();
        setImg(result);
        console.log(result);
      };
      reader.readAsDataURL(file);
    } else {
      setImg(undefined);
    }
  
  }
  return (
    <form style={{display:'flex',flexDirection:'column',width:'100vw', justifyContent:'center', alignItems:'center'}}  onSubmit={e=>handleSubmit(e)}>

    
      <Typography variant="h6" gutterBottom style={{paddingLeft:'10px', paddingBottom:'10p',fontSize:'30px', height:'15vh'}}>
        Lag en ny annonse
      </Typography>
      <Grid container spacing={3} style={{display: 'flex',flexDirection: 'row',justifyContent: 'center',width: '70vw'}}>
        <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100vw'}}>
        <div style={{display:'flex', flexDirection:'column', paddingLeft:'40px'}}>
        <Grid >
          <div style={{display:'flex', flexDirection:'column', paddingTop:'7px'}}>
          <img src={img} style={{height:'18rem',width:'18rem', borderRadius:'5px', border:'2px grey solid'}}></img>
          <Button onClick={handleCutsomClick} style={{width:'200px', height:'50px', border:'0.5px solid grey', marginTop:'10px', alignSelf:'center'}}>Velg et bilde:<input type='file' ref={fileInputRef} style={{display:'none'}} onChange={e=>handleimgInput(e)}/></Button>
          </div>
        </Grid>
        </div>
        <Grid item style={{ paddingTop:'10px', paddingLeft:'10px', paddingRight:'10px',border:'black solid 1px',borderRadius:'5px',backgroundColor:'white', height:'fit-content' }}>
        <Calendar state={dateRange} setState={setDateRange} handleDateChange={handleDateChange}/>
      </Grid>
        </div>
        <Grid item xs={12}>
        <Grid item xs={12} sm={6}>
          <TextField
          style={{width:'200px', marginLeft:'5px'}}
            required
            id="Title"
            name="title"
            label="Skriv inn Tittel:"
            fullWidth
            autoComplete="title"
            variant="standard"
          />
        </Grid>
          <TextField
            required
            id="description"
            name="description"
            label="Description"
            fullWidth
            autoComplete="description"
            variant="standard"
          />
        </Grid>
        
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="post-addresse"
            name="post-addresse"
            label="Post-addresse"
            fullWidth
            autoComplete="post-addresse"
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            id="addresse"
            name="addresse"
            label="Addresse"
            fullWidth
            variant="standard"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="zip"
            name="zip"
            label="Zip / Postal code"
            fullWidth
            autoComplete="shipping postal-code"
            variant="standard"
          />
        </Grid>
       <Grid item xs={12} sm={6}>
       { isFree&&<TextField
            required
            id="price"
            name="price"
            label="Price pr day"
            fullWidth
            autoComplete="price"
            variant="standard"
          />}
          <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox  onChange={e=>setIsFree(e.target.checked?true:false)} color="secondary" name="saveAddress" value="yes"  />}
            label="Kryss av for å angi pris"
          />
        </Grid>
        </Grid>
        <Button variant='contained' type='submit' style={{marginLeft:'30px', marginTop:'10px'}}>Lagre endringer</Button>
      </Grid>
      </form>
    
  );
}
/*export default function PostCreate() {
  const [openDialog, setOpenDialog] = useState(false);
  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      title: data.get('title'),
      description: data.get('description'),
    });
  };
return()}*/
  /*return (
    <>
    
      <Container component="main" maxWidth="xs">
      
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
        <Logo height={70}width={70}/>
          <Typography component="h1" variant="h5">
            Create an add
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 2 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              name="title"
              label="Title of your add"
              type="title"
              id="title"
              autoComplete="add title"
            />
          
            <TextField
              margin="normal"
              required
              fullWidth
              id="description"
              label="Describe the item you want to lend out"
              name="description"
              autoComplete="Description"
              autoFocus
            />
            If the Item is free please check the box
            <Checkbox></Checkbox>


            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" alignItems="center" style={{ flexGrow: 1 }}>
            <Button component="label" variant="contained" startIcon={<CloudUploadIcon/>}  >
            Upload a picture of your item
            <VisuallyHiddenInput type="file" />
            </Button>
            </Stack>
           
            
            <Stack spacing={{ xs: 1, sm: 2 }} direction="row" alignItems="center" style={{ flexGrow: 1 }}>
              <Button
                type="button"
                fullWidth
                variant="contained"
                onClick={handleDialogOpen}
                sx={{ mt: 4, mb: 2 }}
              >
                Choose dates
              </Button>
            </Stack>

            
          </Box>
        </Box>

         {/* Calendar Dialog *///}
       // <Dialog open={openDialog} onClose={handleDialogClose}>
      //  <DialogContent>
      //  </DialogContent>
      //</Dialog>
     // </Container>
     
   // </>
  //);
//}

//{/* <Stack spacing={{xs:1, sm: 2}} direction='row' alignItems="center">
           // <Link to={"/Calendar"} style={{ flexGrow: 1 }}>
           // <Button
            /*  type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, mb: 2}}
              >
              Choose dates 
            </Button>
            </Link>
            </Stack> *///}

           /*   function Calendar() {
              const [dateRange, setDateRange] = useState<Range[]>([
                {
                  startDate: new Date(),
                  endDate: new Date(),
                  key: 'selection'
                }
              ]);
            
              const handleDateChange = (item) => {
                // Update the state when the date range changes
                setDateRange([item.selection]);
              };
            
              return (
                  <div style={calendarContainerStyle}>
                <DateRange
                  editableDateInputs={true}
                  onChange={handleDateChange()}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  weekStartsOn={1}
          
                />
                </div>
              );
            }
            const calendarContainerStyle = {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: 'flex',
            };*/



            