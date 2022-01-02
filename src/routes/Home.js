import { dbService } from "fbase";
import React, { useEffect, useState } from "react"; 
import { collection, query, addDoc, onSnapshot, orderBy } from "firebase/firestore";
import Sweet from "components/Sweet";

export default function Home({userObj}){
    const [sweet, setSweet] = useState("");
    const [sweets, setSweets] = useState([]);

    // const getSweets = async () => {
    //     const queryDB = query(collection(dbService, "sweets"));
    //     const dbSweets = await getDocs(queryDB);
    //     dbSweets.forEach(doc => {
    //         // console.log(doc.data());
    //         const sweetObject = {...doc.data(), id: doc.id};
    //         console.log(sweetObject);
    //         setSweets((prev) => ["hello"]); 
    //         console.log(sweets);  
    //     });
        
    // };
    useEffect(()=>{
        // getSweets();
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
        await addDoc(collection(dbService, "sweets"),{
            text: sweet,
            createdAt: Date.now(),
            createId: userObj.uid
        });

        setSweet("");
    };

    const onChange = (event) => {
        const {target:{value}} = event;
        setSweet(value);
    }

    // const onFileChange = (event) => {
    //     const {target:{files}} = event;
    //     const theFile = files[0];
    //     const reader  = new FileReader();
    //     reader.onloadend = (finishedEvent) => {
    //         console.log(finishedEvent);
    //     };
    //     reader.readAsDataURL(theFile);

    // }
    return(
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" onChange={onChange} placeholder="What's going on?" maxLength={120} />
                {/* <input type="file" accept="image/*" onChange={onFileChange} /> */}
                <input type="submit" value="Sweet"/>
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