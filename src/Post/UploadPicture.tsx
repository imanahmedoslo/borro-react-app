import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
type uploadPictureProps = {
	file: File | string,
	setFile: React.Dispatch<React.SetStateAction<File | string>>,
	currentImage: string,
	userId:number
}

export function UploadPicture({ file, setFile, currentImage,userId }: uploadPictureProps) {
	const [fileName, setFileName] = useState<string>("");
	const [img, setImg] = useState<string>(currentImage);
	
	const saveFile = (e: any) => {
		setFile(e.target.files[0]);
		setFileName(`${e.target.files[0].name} ${userId}`);
		handleimgInput(e);
	}
	const handleimgInput = (e: React.ChangeEvent<HTMLInputElement> | any) => {
		const filetoSimulate = e?.target?.files[0];
		if (e.target.files[0]) {
			const reader = new FileReader();
			reader.onloadend = () => {
				const result = reader.result?.toString() ?? "";
				setImg(result);
			};
			reader.readAsDataURL(filetoSimulate);
		} else {
			setImg(currentImage);
		}

	}
	useEffect(() => { setImg(currentImage) }, [currentImage])
	return (
		<>
			<Box component="img" src={img} sx={{ height: '50px', width: 'auto' }} />
			<input type="file" onChange={saveFile} />
			<Typography>{fileName}</Typography>

		</>
	)
}
