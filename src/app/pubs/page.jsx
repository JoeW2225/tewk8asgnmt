import pg from "pg"
import Link from "next/link"
import { connect } from "../utils/connect"
import SortStyle from "@/app/styling/submissionsStyling.module.css"
import PubListStyle from "@/app/styling/submissionsStyling.module.css"

export default async function PubsList({ searchParams }) {
    'use server'
    const db = connect()

    const pubList = (await db.query(`
        SELECT pubsandbars.id, pubsandbars.name, pubsandbars.ispub, locations.location
        FROM pubsandbars
        INNER JOIN locations
        ON pubsandbars.location_id = locations.id
        WHERE ispub = true`)).rows
        //^^^ here we don't need to sanitise ($1 eg) as we aren't doing dynamic routes

        const sorted = pubList.sort((a, b) => {
            if (searchParams.sortBy == 'asc') {
                return a.name.localeCompare(b.name)
            }
        })
    
    return (
        <>
            <div>
                <Link className={SortStyle.sortStyle} href='/pubs?sortBy=asc'>Sort by Ascending</Link>
                <Link href='/pubs'>Undo Sort</Link>
            </div>
            <div>
                
                {pubList.map((venue) => (
                    <div key={venue.id}>
                        <Link className={PubListStyle.pubListStyle} href={`pubs/${venue.id}`}>{venue.name}</Link>
                    </div>
                ))}
            </div>
        </>
    )

}