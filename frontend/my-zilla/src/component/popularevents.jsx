import React from 'react';
import '../css/PopularMovies.css';

const PopularEvents = () => {
  return (
    <div className="popular-movies">
      <h2>Popular Events</h2>
      <div className="movie-grid">
        {/* Replace the URLs with actual movie posters */}
        <img src="https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-VGh1LCAzIEF1Zw%3D%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00359503-kjsjfumebw-portrait.jpg" alt="Movie 1" />
        <img src="https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-U2F0LCAyMiBKdWwgb253YXJkcw%3D%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00138467-ascuhztfyk-portrait.jpg" alt="Movie 2" />
        <img src="https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-U3VuLCAyMCBBdWc%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00321882-mkazcxcdwt-portrait.jpg" alt="Movie 3" />
        <img src="https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-V2VkLCAyNiBKdWwgb253YXJkcw%3D%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00319088-kmszandhlz-portrait.jpg" alt="Movie 4" />
        <img src="https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-U3VuLCAyMCBBdWcgb253YXJkcw%3D%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00346737-wjquymzvjy-portrait.jpg" alt="Movie 5" />
        {/* <img src="https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:ote-U2F0LCAzMCBTZXA%3D,ots-29,otc-FFFFFF,oy-612,ox-24:q-80/et00361501-zhsqjatmkp-portrait.jpg" alt="Movie 6" /> */}
      </div>
      <button className='movies-catchup'>More Events</button>
    </div>
  );
};

export default PopularEvents;
