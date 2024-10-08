import Link from "next/link"
import { connect } from "@/app/utils/connect"
import Image from "next/image"

export default async function Pub( { params }) {
    'use server'
        const id = params.id
    
    const db = connect()
    const pubVenue = (await db.query(`
        SELECT pubsandbars.id, pubsandbars.name, pubsandbars.img_url, pubsandbars.ownership, pubsandbars.established, locations.location
        FROM pubsandbars
        INNER JOIN locations
        ON pubsandbars.location_id = locations.id
        WHERE pubsandbars.id = $1`,[id])).rows[0]
// ^^^because we are req single items with dynamic id we need to use $1.
// ,[id]- Is part of a safe database query where [id] is an array containing the value that will be substituted for $1 in the SQL query.
    
        return (
            <>
            <div>
                {/* We don't need .map() here as we are dealing with a single object, not an array (like the list of pubs). This...
                is dealt with via the query .rows[0] */}
                <h2>{pubVenue.name}</h2>
                <Image src={pubVenue.img_url} 
                alt={pubVenue.name} 
                height={100} 
                width={1000}/>
                {/* ^^^to get the Image src working see next.config.mjs file */}
                <h4>{pubVenue.ownership}</h4>
                <h4>{pubVenue.established}</h4>
                <h4>{pubVenue.location}</h4>
                
            </div>            
            </>
        )
}