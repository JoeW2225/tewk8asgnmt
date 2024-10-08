import { connect } from "@/app/utils/connect"
import UserMessStyle from "/src/app/styling/submissionsStyling.module.css"
import PostStyle from "/src/app/styling/submissionsStyling.module.css"
import CommentBoxStyle from "/src/app/styling/submissionsStyling.module.css"
import HomeLink from "/src/app/styling/submissionsStyling.module.css"
import Link from "next/link"
import CommentComp from "@/app/components/CommentComponent"
import ListLink from "@/app/styling/commentsStyling.module.css"


export default async function tapTalk( {params} ) {
    'use server'
//! GETTING data from DB:
    const id = params.id
    const db = connect()
    const comments = (await db.query(`SELECT
    comments.speaker,
    comments.message,
    comments.likes,
    comments.dislikes,
    submissions.venue,
    submissions.name,
    submissions.ownership,
    submissions.location
    FROM
    comments
    INNER JOIN submissions ON comments.venue_id = submissions.id
    AND comments.name_id = submissions.id
    AND comments.ownership_id = submissions.id
    AND comments.location_id = submissions.id
    WHERE
    name_id = $1;`,[id])).rows
//!____________________________________________________
//! POSTING the new formData to the DB:
    async function postServerAction(commentData) {
        'use server'
        console.log(commentData)
        const db = connect()
        const { speaker, message } = commentData
        try {
            await db.query(`INSERT INTO comments (speaker, message) VALUES ($1, $2)`,
            [speaker, message])

        console.log("datas logged")
        }   catch(error) {
            console.error("Inserting data failed",error)
            
        }
    }
//!__________________________________________________________
//! POSTING a like to the DB:
async function likeComment(id) {
    'use server'    
    const db = connect()
    try {
        await db.query(`UPDATE comments SET likes = likes + 1 WHERE id =$1`,
            [id])
            
        }   catch(error) {
            console.error("Failed to like comment",error)
            // ^by using cons.error over the normal cons.log is that it will highlight red in console, and the ',error' will...
            //  give you an actual error object, making it easier for debugging.
        }   
    }
    
//!__________________________________________________________
//! POSTING a dislike to the DB:
async function dislikeComment(id) {
    'use server'    
    const db = connect()
    try {
        await db.query(`UPDATE comments SET dislikes = dislikes + 1 WHERE id =$1`,
            [id])
            
        }   catch(error) {
            console.error("Failed to dislike comment",error)
            // ^by using cons.error over the normal cons.log is that it will highlight red in console, and the ',error' will...
            //  give you an actual error object, making it easier for debugging.
        }   
    }


//!__________________________________________________________
//! DELETING a row from the DB:
async function deleteComment(id) {
    'use server'    
    const db = connect()
    try {
        (await db.query(`DELETE FROM submissions WHERE id= $1`,[id])).rows
        console.log("Post deleted")
        }   catch(error) {
            console.error("Deleting post failed",error)
            // ^by using cons.error over the normal cons.log is that it will highlight red in console, and the ',error' will...
            //  give you an actual error object, making it easier for debugging.
        }   
    }
//!________________________________________________________


        return (
            <>
                <div>
                {comments.map((comment) => (
                    <div key={comment.commentid} className={CommentBoxStyle.commentBoxStyle}>
                        <h3 className={UserMessStyle.userMessStyle}>{comment.speaker} | {comment.message}</h3>
                        <p className={PostStyle.postStyle}>{comment.venue} | {comment.name} | {comment.ownership} | {comment.location}</p>
                        <CommentComp 
                        postServerAction={postServerAction} 
                        deleteComment={deleteComment}  
                        comment={comment} 
                        likeComment={likeComment}
                        dislikeComment={dislikeComment}
                        />
                    </div>
                ))}
            </div>
            <Link className={HomeLink.homeLink} href="/">Home</Link>
            <Link className={ListLink.listLink} href="/submissions">Back to list</Link>
            <footer>
                <CommentComp postServerAction={postServerAction}/>
            </footer>
            </>
        )
}