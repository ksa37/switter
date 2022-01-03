import { dbService } from "fbase";
import React, { useEffect, useState } from "react"; 
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import Sweet from "components/Sweet";
import CreateSweet from "components/CreateSweet";

export default function Home({userObj}){
    const [sweets, setSweets] = useState([]);

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

    return(
        <div>
            <CreateSweet userObj={userObj}/>
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