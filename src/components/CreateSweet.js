import React, { useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { dbService, storageService } from "fbase";

export default function CreateSweet({userObj}){
    const [sweet, setSweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async(event) => {
        event.preventDefault();
        let attachmentUrl = ""
        if(attachment!==""){
            const fileRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const res = await uploadString(fileRef, attachment, "data_url");
            attachmentUrl = await getDownloadURL(res.ref);
        }
        const sweetObj = {
            text: sweet,
            createdAt: Date.now(),
            createId: userObj.uid,
            attachmentUrl
        }
        const addRes = await addDoc(collection(dbService, "sweets"), sweetObj);

        setSweet("");
        setAttachment("");
    };

    const onChange = (event) => {
        const {target:{value}} = event;
        setSweet(value);
    }

    const onFileChange = (event) => {
        const {target:{files}} = event;
        const theFile = files[0];
        const reader  = new FileReader();
        reader.onloadend = (finishedEvent) => {
            console.log(finishedEvent);
            const {currentTarget: {result}} = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    }

    const onClearAttachment = () => setAttachment("");

    return(
        <form onSubmit={onSubmit}>
            <input type="text" onChange={onChange} placeholder="What's going on?" maxLength={120} />
            <input type="file" accept="image/*" onChange={onFileChange} />
            <input type="submit" value="Sweet"/>
            {attachment&& 
                <div>
                    <img src={attachment} width={50} height={50}/>
                    <button onClick={onClearAttachment}>Clear</button>
                </div>}
        </form>
    )
}