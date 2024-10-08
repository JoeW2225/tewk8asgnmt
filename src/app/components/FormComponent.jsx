//! This component allows us to create a form in the React client-side which means we can reset it...
//! Then we can pass it through to the server-side on the 'submissions' page. 
'use client'
import { useState } from "react";
import SubHeading from "../styling/submissionsStyling.module.css"
import SubsFormStyle from "../styling/submissionsStyling.module.css"
import VenueStyle from "../styling/submissionsStyling.module.css"
import NameStyle from "../styling/submissionsStyling.module.css"
import OwnStyle from "../styling/submissionsStyling.module.css"
import LocStyle from "../styling/submissionsStyling.module.css"
import DeletePostStyle from "../styling/submissionsStyling.module.css"

//^ Next runs all pages as server as default, use this to change to client

const startValues = {
    venue: "",
    name: "",
    ownership: "",
    location: "",
};

export default function SubFormComp( {myServerAction, deleteSubmission, post} ) {
//^ having made the prop 'myServerAction' in the 'submissions' page, we pass it through here

    const [values, setValues] = useState(startValues)
    

    function handleSubmit(event) {
        event.preventDefault();
        // ^prevents form data appearing in URL
        console.log(event)
        

        const formData = new FormData(event.target)
        const myData = Object.fromEntries(formData)
        console.log(myData)
        // ^ 'formData' & 'myData' lines give us the form output in a nice JSON format {key1: 'value1', key2: 'value2', etc}...
        // see console in devtools
        
        myServerAction(myData)
        // ^ We now pass the new form data through to the server-side
        setValues({
            venue: "",
            name: "",
            ownership: "",
            location: ""
        })
        //^ we now reset the input fields after the form is submitted

        event.target.reset()
        // ^resets the form after submit click
        window.location.reload(myData)
        // ^we refresh the page once submitted
        
    }
    function handleInputChange(event) {
        const { name, value } = event.target
        //^ name refers to the name of the input field,aka location or venue (not name of pub/bar). value refers...
        // to the current value of what the user has typed into, aka 'Chelsea' or 'Red Lion'. 
        // event.target triggers event
        setValues({
            //^ we update the values by changing setValues
            ...values,
            //^ spread op has all the existing values
            [name]: value,
            //^ live updates the specific field, aka venue, location etc. With the new value just entered by the user.
        })
    }
    //^ this function is known as a Controlled Component in React. Please see README for explanation.
    console.log(values)
    
    async function handleDelete() {
        if (post && post.id) {
            //^ this checks if post exists & if it has an id, post represents the current submission
            const deletedPost = await deleteSubmission(post.id);
            //^ now we call the serverside func 'deleteSubmission', passing through the id of the post we want to delete
            // although we don't have to assign it a variable, I did so i could use it on the reload below
            window.location.reload(deletedPost)
            //^ page refreshes after delete button is clicked
        }
    }

    //! Conditional rendering in the JSX below:
    //? Here !post && block:
    // the !post means 'if theres no post'. The form should appear to the user, allowing a user to submit a new entry
    //? if a post exists && block:
    // here we put in the delete button. here we are dealing with an existing post that can be deleted.
    // see README for further explanation
    return (
        <>
            {!post && (
            <>
                <h3 className={SubHeading.subHeading}>Submit your own...</h3>
                <form className={SubsFormStyle.subFormStyle} onSubmit= {handleSubmit}>
                    <input className={VenueStyle.venueStyle}
                    value={values.venue}
                    name="venue" 
                    placeholder="Pub or Bar?" 
                    onChange={handleInputChange}/>

                    <input className={NameStyle.nameStyle}
                    value={values.name} 
                    name="name" 
                    placeholder="Exclude 'The'" 
                    onChange={handleInputChange}/>

                    <input className={OwnStyle.ownStyle}
                    value={values.ownership} 
                    name="ownership" 
                    placeholder="Freehouse, Greenking, Independent..." 
                    onChange={handleInputChange}/>

                    <input className={LocStyle.locStyle}
                    value={values.location}
                    name="location" 
                    placeholder="Hammersmith, Blackfriars..." 
                    onChange={handleInputChange}/>

                    <button>Submit</button>

                    
                </form>
            </>
            )}
            {post && (
                <>
                    <button className={DeletePostStyle.deletePostStyle} onClick={handleDelete}>Delete</button>
                    
                </>
            )}
        </>
    )
}
