import Image from "next/image";
import Link from "next/link"
import HomeLinks from "@/app/styling/submissionsStyling.module.css"
import PAndBStyle from "@/app/styling/submissionsStyling.module.css"
import PubsLink from "@/app/styling/submissionsStyling.module.css"
import BarsLinks from "@/app/styling/submissionsStyling.module.css"
import SubsLinks from "@/app/styling/submissionsStyling.module.css"

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <header>

      </header>
      <main>
        <h1 className={PAndBStyle.pAndBStyle}>Pubs & Bars</h1>
        <div className={HomeLinks.homeLinks}>
          <p>See our list of London <Link className={PubsLink.pubsLinks} href='/pubs'> Pubs</Link></p>
          <p>See our list of London <Link className={BarsLinks.barsLinks} href='/bars'> Bars</Link></p>
          <p>Or submit your<Link className={SubsLinks.subLinks} href='/submissions'> Own</Link></p>
        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        
      </footer>
    </div>
  );
}
