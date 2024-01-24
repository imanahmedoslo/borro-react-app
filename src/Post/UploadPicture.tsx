import { useState } from "react";
import axios from "axios";

export function UploadPicture({Type, Id, onPictureUploaded}) {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();

    const saveFile = (e) => {
        console.log(e.target.files[0]);
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const uploadFile = async () => {
        console.log(file);
        const formData = new FormData();
        formData.append("Picture", file!);
        formData.append("Type", Type!);
        formData.append("Id", Id);

        try{
            const res = await axios.post("https://borro.azurewebsites.net/api/FileUpload", formData);
            onPictureUploaded();
        } catch(ex) {
            console.log(ex);
        }
    };

    return(
        <>
        <input type="file" onChange={saveFile} />
        <input type="button" value="upload" onClick={uploadFile} />
        </>
    )
}