# Reflection:
Found this pretty challenging, and seems to be taking me quite some time trying to figure out how to implement things. In addition to external factors, limiting my time on this project, I was unable to do the following:
-	Do any VP styling beyond desktop view
-	Correctly link the likes and dislikes on comments to the db table
-	Sort out my comments table to allow for new entries to be rendered, even though they are submitted to the table (this due to the way I tried to link them to the relevant post. The only reason why there are comments on there currently was due to be inserting directly via Supabase). See my screenshot of the table 
-	Getting to grips with Tailwind and using motion framer stuff in general

Overall, quite frustrating and borderline overwhelming if I’m honest. There were more things I would have liked to have done and added, but I spent so much of my time trying to work out what kind of SQL tables and queries I would need, and wrapping my head around that aspect. Then there’s getting my head around Next and React in general, and tying the two together. 
In conclusion, many work on points, and metaphorically speaking barely keeping my head above water but I'm sure I'll get there.







Sources:
https://nextjs.org/docs/app/building-your-application/data-fetching/fetching#reusing-data-across-multiple-functions
https://dev.to/deboragaleano/how-to-handle-multiple-inputs-in-react-55el
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
https://www.w3schools.com/mysql/mysql_delete.asp
https://www.w3schools.com/jsref/met_loc_reload.asp
https://upmostly.com/tutorials/how-to-refresh-a-page-or-component-in-react
https://stackoverflow.com/questions/9696571/can-a-table-have-two-foreign-keys
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining
SC13 GitHub demos & previous projects/lessons

### Further explainations

#### Controlled Components in React:

**handleChange or handleInputChange etc**

Allows us to use live tracking on each key stroke of the keyboard when the user is filling in a input field (like on a form). Purpose of this is so we can give real-time feedback to the user if they type something wrong, aka form validation or dynamic changes on input.
Examples of this would be:

- showing an error message because the user entered an invalid email address or that the user left a field empty.
- Auto formaing for phone numbers or dates

#### Conditional rendering in JSX React:

**{post! && ()} and {post && ()}**

If we didn't use this method, and we did it like this:

return (
    
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
    <button onClick={handleDelete}>Delete</button>
    </>
    )

There would be a number of issues:
If we didn't have the delete option and it was just the form and submission this would be fine.
But the problem comes when you want to implement the deletion functionality.

The Delete button will always be rendered, regardless of whether a post exists or not.
If the user clicks 'Delete' when there is no post, the handleDelete function will try to run, but it will fail because there is no post.id to pass to the deleteSubmission function.

basically the delete button won't work when clicked.
