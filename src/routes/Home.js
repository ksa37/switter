import { dbService, storageService } from "fbase";
import React, { useEffect, useState } from "react"; 
import { collection, query, addDoc, onSnapshot, orderBy } from "firebase/firestore";
import Sweet from "components/Sweet";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

export default function Home({userObj}){
    const [sweet, setSweet] = useState("");
    const [sweets, setSweets] = useState([]);
    const [attachment, setAttachment] = useState("");

    useEffect(()=>{
        const queryDB = query(collection(dbService, "sweets"), orderBy("createdAt", "desc"));
        onSnapshot(queryDB, (snapshot)=>{
            const sweetArr = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setSweets(sweetArr);
        });
        
    },[]);

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
        <div>
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
            <div>
                {sweets.map((swt)=>{ 
                    return(
                    <Sweet key={swt.id} swtObj={swt} isOwner={swt.createId===userObj.uid}/>
                    )
                })}
            </div>
        </div>
    )
}