import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import React, { useRef } from 'react';
import { Button } from "@mui/base";

type uploadPictureProps = {
	file: File | null,
	setFile: React.Dispatch<React.SetStateAction<File | null>>,
	currentImage: string,
	userId: number
}

export function UploadPicture({ file, setFile, currentImage, userId }: uploadPictureProps) {
	const [fileName, setFileName] = useState<string>("");
	const [img, setImg] = useState<string>(currentImage);
	const fileInputRef = useRef<HTMLInputElement>(null);
	const handleCustomClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current?.click();
		}
	}

	const saveFile = (e: any) => {
		setFile(e.target.files[0]);
		setFileName(`${e.target.files[0].name} ${userId}`);
		handleimgInput(e);
	}
	const handleimgInput = (e: React.ChangeEvent<HTMLInputElement> | any) => {
		if (e.target.files && e.target.files[0]) {
			const filetoSimulate = e?.target?.files[0];
			setFile(filetoSimulate);
			updateImagePreview(filetoSimulate);
		}

	}
	const updateImagePreview = (file: File) => {
		const reader = new FileReader();
		reader.onloadend = () => {
			setImg(reader.result as string);
		};
		reader.readAsDataURL(file);
	}
	useEffect(() => {
		if (!file) {
			setImg(currentImage);
			setFileName("");
		}
	}, [currentImage, file]);
	return (
		<>	<Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
			<Box component="img" src={img} sx={{ height: '180px', width: 'auto ', borderRadius: '15px' }} style={{ display: "flex", justifyContent: "center" }} />
			<Typography>{fileName}</Typography>
			<Button onClick={handleCustomClick}
				style={{ width: 'auto', height: '35px', border: '0.5px solid grey', marginTop: '10px', alignSelf: 'center', backgroundColor: '#D5B263', color: 'white' }}>
				Velg et bilde:<input type="file" ref={fileInputRef} style={{ width: 'auto', height: '400', display: 'none', justifyContent: 'center' }} onChange={saveFile} />
			</Button>
		</Box>
			{/*<input type="file" onChange={saveFile} />*/}


		</>
	)
}

// <Button onClick={handleCutsomClick}
//style={{width:'200px', height:'50px', border:'0.5px solid grey', marginTop:'10px', alignSelf:'center'}}>
//Velg et bilde:<input type="file" onChange={saveFile} />
//</Button>
/*
<Button onClick={handleCutsomClick} style={{width:'200px', height:'50px', border:'0.5px solid grey', marginTop:'10px', alignSelf:'center'}}>Velg et bilde:
<input type='file' ref={fileInputRef} style={{display:'none'}} onChange={e=>handleimgInput(e)}/></Button>
*/
// 
