import Link from "next/link";
import SubsStyle from "../styling/submissionsStyling.module.css"
import OneSubStyle from "../styling/submissionsStyling.module.css"
import AddSubStyle from "../styling/submissionsStyling.module.css"
import TapTalkStyle from "../styling/submissionsStyling.module.css"
import SubFormComp from "../components/FormComponent";
import { connect } from "../utils/connect";

export default async function fetchSubmissions() {
    'use server'
//! GETTING data from DB:
    const db = connect()
    //^connecting to db Pool in utils folder (saves typing out the whole 'new pg.Pool' everytime)
    const submissionsList = (await db.query(`SELECT id, venue, name, ownership, location FROM submissions`)).rows
    //^ this renders each submission on the page

    //!____________________________________________________
    //! POSTING the new formData to the DB:
    async function myServerAction(formData){
        'use server'
        console.log(formData)
        // ^ now we have the new form data passed through from client side. see terminal for JSON
        const db = connect()
        const { venue, name, ownership, location } = formData;

        try {
            await db.query(`INSERT INTO submissions (venue, name, ownership, location) VALUES ($1, $2, $3, $4)`,
            //^ this inserts data into the DB, we sanitise the inputs by representing each input as $1, $2 etc. prevents SQL injection 
            [venue, name, ownership, location]
        //^ $1 represents venue, $2 represents name and so on
            )
        console.log("datas logged")
        }   catch(error) {
            console.error("Inserting data failed",error)
            // ^by using cons.error over the normal cons.log is that it will highlight red in console, and the ',error' will...
            //  give you an actual error object, making it easier for debugging.
        }
    }
//!__________________________________________________________

//! DELETING a row from the DB:
async function deleteSubmission(id) {
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
//! SubFormComp in the JSX:
// *1- here we use it to render the existing submissions from the DB. Basically connecting the submission page to this page 
// & passing the function reason for this is so we can reset the form, as this is a client side React action, easier to do it in a separate file.
// The SubFormComp is tied to the individual post from the list. The deleteSubmission function allows the user to delete the post.
// The post={post} prop ensures that the form is aware of which submission (post) it is tied to.

// *2- This is handling the creation of new submissions. This form is for adding new posts, not tied to any existing post.
// Hence why there is no post={post}.
    return (
        <>
            <div className={SubsStyle.subsStyle}>
                {submissionsList.map((post) => (
                    <div key={post.id}>
                        <h5 className={OneSubStyle.oneSubStyle}>{post.venue} | {post.name} | {post.ownership} | {post.location}</h5>
                        <SubFormComp myServerAction={myServerAction} deleteSubmission={deleteSubmission} post={post} />
                        <Link className={TapTalkStyle.tapTalkStyle} href={`/submissions/${post.id}`}>Tap Talk...</Link>
                        {/* ^ *1 */}
                    </div>
                ))}
            </div>
            <footer>
                <div className={AddSubStyle.addSubStyle}>
                    <SubFormComp myServerAction={myServerAction}/>
                    {/* ^ *2 */}
                </div>
            </footer>
        </>
    )
}