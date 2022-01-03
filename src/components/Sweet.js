import { dbService, storageService } from "fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
 import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";
 
export default function Sweet({swtObj, isOwner}){
    const [editing, setEditing] = useState(false);
    const [newSweet, setNewSweet] = useState(swtObj.text);

    const onDeleteClick = async() => {
        const ok = window.confirm("Are you sure you want to delete this sweet?");
        if(ok){
            const docToDelete = doc(dbService, "sweets", `${swtObj.id}`);
            await deleteDoc(docToDelete);
            const deleteRef = ref(storageService, swtObj.attachmentUrl);
            await deleteObject(deleteRef);
            
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
        <div className="nweet">
            {editing
                ? <>
                    <form onSubmit={onSubmit} className="container nweetEdit">
                        <input
                        type="text"
                        placeholder="Edit your sweet"
                        value={newSweet}
                        required
                        onChange={onChange}
                        />
                        <input type="submit" value="Update Sweet" lassName="formBtn" />
                    </form>
                    <button onClick={toggleEditing} className="formBtn cancelBtn">Cancel</button>
                </>
                : <>
                    <h4> {swtObj.text} </h4>
                    {swtObj.attachmentUrl && <img src={swtObj.attachmentUrl}/>}
                    {isOwner &&
                        <div className="nweet__actions">
                            <span onClick={onDeleteClick}>
                            <FontAwesomeIcon icon={faTrash} />
                            </span>
                            <span onClick={toggleEditing}>
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </span>
                        </div>
                    }
                </>
            }
        </div>
    )
}