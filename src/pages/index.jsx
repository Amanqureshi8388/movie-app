import HeroBanner from "@/components/home/herobanner/HeroBanner"
import Popular from "@/components/home/popular/Popular"
import Trending from "@/components/home/trending/Trending"
import TopRated from "@/components/home/toprated/TopRated"


export default function Home() {
 
 
  return (
   <>
   <HeroBanner/>
   <Trending/>
   <Popular/>
   <TopRated/>
   </>
  )
}
