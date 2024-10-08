import pg from "pg"
import Link from "next/link"
import { connect } from "../utils/connect"

export default async function BarsList() {
    'use server'
    const db = connect()

    const pubList = (await db.query(`
        SELECT pubsandbars.id, pubsandbars.name, pubsandbars.ispub, locations.location
        FROM pubsandbars
        INNER JOIN locations
        ON pubsandbars.location_id = locations.id
        WHERE pubsandbars.ispub = false`)).rows
        //^^^ here we don't need to sanitise ($1 eg) as we aren't doing dynamic routes
    
    return (
        <div>
            
            {pubList.map((venue) => (
                <div key={venue.id}>
                    <Link href={`bars/${venue.id}`}>{venue.name}</Link>
                </div>
            ))}
        </div>
    )

}