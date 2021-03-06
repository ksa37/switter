import React, { useState } from "react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { dbService, storageService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function CreateSweet({userObj}){
    const [sweet, setSweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async(event) => {
        if(sweet===""){
            return;
        }
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
        <form onSubmit={onSubmit} className="factoryForm">
            <div className="factoryInput__container">
                <input 
                    className="factoryInput__input" 
                    type="text" 
                    value={sweet} 
                    onChange={onChange} 
                    placeholder="What's going on?" 
                    maxLength={120}
                />
                <input type="submit"  value="&rarr;" className="factoryInput__arrow"/>
            </div>
            <label for="attach-file" className="factoryInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input id="attach-file" type="file" accept="image/*" onChange={onFileChange} style={{opacity:0}}/>
            
            {attachment&& 
                <div className="factoryForm__attachment">
                    <img src={attachment} style={{
                        backgroundImage: attachment}}
                    />
                    <div className="factoryForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>}
        </form>
    )
}