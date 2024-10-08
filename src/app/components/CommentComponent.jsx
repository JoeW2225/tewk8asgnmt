'use client'
import { useState } from "react";
import ComsFormStyle from "@/app/styling/commentsStyling.module.css"
import SubCom from "@/app/styling/commentsStyling.module.css"
import CommentStyle from "@/app/styling/commentsStyling.module.css"
import NameInputStyle from "@/app/styling/commentsStyling.module.css"
import MessageInputStyle from "@/app/styling/commentsStyling.module.css"
import DeleteButtonStyle from "@/app/styling/commentsStyling.module.css"
import LikeButtonStyle from "@/app/styling/commentsStyling.module.css"

const startValues = {
    speaker: "",
    message: "",
};

export default function CommentComp( {postServerAction, deleteComment, likeComment, dislikeComment, comment} ) {

    const [values, setValues] = useState(startValues)
    const [likes, setLikes] = useState(comment?.likes || 0)
    const [dislikes, setDislikes] = useState(comment?.dislikes || 0)
    // ^here use the ? called optional chaining operator. it prevents erroring on null, so here when starting up
    // the likes & dislikes, if the comment is undefined, it will default to 0 rather than erroring

    function handleSubmit(event) {
        event.preventDefault();

        console.log(event)
        
        const formData = new FormData(event.target)
        const myData = Object.fromEntries(formData)
        console.log(myData)

        postServerAction(myData)
        setValues({
            speaker: "",
            message: ""
        })
        event.target.reset()
        window.location.reload(myData)
    }

    function handleInputChange(event) {
        const { name, value } = event.target
        
        setValues({
            ...values,
            [name]: value,
            
        })
    }

    async function handleLike() {
        await likeComment(comment.id)
        setLikes(likes + 1)
    }
        

    async function handleDislike() {
        await dislikeComment(comment.id)
        setDislikes(dislikes + 1)
    }


    async function handleDelete() {
        if (comment && comment.id) {
            //^ this checks if post exists & if it has an id, post represents the current submission
            const deletedComment = await deleteComment(comment.id);
            //^ now we call the serverside func 'deleteSubmission', passing through the id of the post we want to delete
            // although we don't have to assign it a variable, I did so i could use it on the reload below
            window.location.reload(deletedComment)
            //^ page refreshes after delete button is clicked
        }
    }
    return (
        <>
            {!comment && (
            <>
                <h3 className={CommentStyle.commentStyle}>Comment...</h3>
                <form className={ComsFormStyle.comsFormStyle} onSubmit= {handleSubmit}>
                    <input className={NameInputStyle.nameInputStyle}
                    value={values.speaker}
                    name="speaker" 
                    placeholder="Enter your name" 
                    onChange={handleInputChange}/>

                    <input className={MessageInputStyle.messageInputStyle}
                    value={values.message} 
                    name="message" 
                    placeholder="Enter your message" 
                    onChange={handleInputChange}/>

                    <button className={SubCom.subCom}>Submit</button>
                    
                </form>
            </>
            )}
            {comment && (
                <>
                    <button className={DeleteButtonStyle.deleteButtonStyle} onClick={handleDelete}>Delete</button>
                    <button className={LikeButtonStyle.likeButtonStyle} onClick={handleLike}>Likes {likes}</button>
                    <button onClick={handleDislike}>Dislikes {dislikes}</button>
                    
                </>
            )}
        </>
    )

}
