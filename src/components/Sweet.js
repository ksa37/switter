import { dbService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, {useState} from "react";

export default function Sweet({swtObj, isOwner}){
    const [editing, setEditing] = useState(false);
    const [newSweet, setNewSweet] = useState(swtObj.text);

    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want to delete this sweet?");
        if(ok){
            const docToDelete = doc(dbService, "sweets", `${swtObj.id}`);
            await deleteDoc(docToDelete);
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        const docToUpdate = doc(dbService, "sweets", `${swtObj.id}`);
        await updateDoc(docToUpdate, {text: newSweet});
        setEditing(false);
    }
    const onChange = (event) => {
        const {target: {value}} = event;
        setNewSweet(value);
    }
    return(
        <div>
            {editing
                ? <>
                    <form onSubmit={onSubmit}>
                        <input
                        type="text"
                        placeholder="Edit your sweet"
                        value={newSweet}
                        required
                        onChange={onChange}
                        />
                        <input type="submit" value="Update Sweet" />
                    </form>
                    <button onClick={toggleEditing}>Cancel</button>
                </>
                : <>
                    <h4> {swtObj.text} </h4>
                    {isOwner &&
                        <>
                            <button onClick={onDeleteClick}>Delete</button>
                            <button onClick={toggleEditing}>Edit</button>
                        </>
                    }
                </>
            }
        </div>
    )
}