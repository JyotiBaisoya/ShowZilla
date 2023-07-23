import React from "react";
import MovieCarousel from "./movieCarousel";
import PopularMovies from "./popularMovies";
import PopularEvents from "./popularevents";

const HomePage=()=>{
    return (
         <div>
           <MovieCarousel/>
           <PopularMovies/>
           <PopularEvents/>
         </div>
    )
}

export default HomePage