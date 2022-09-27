const BASE_URL = "https://api.themoviedb.org/3/";
module.exports = {
  URL: {
    BASE_URL: "https://api.themoviedb.org/3/",
    IMAGE_URL_ORIGINAL: "https://image.tmdb.org/t/p/original",
    IMAGE_URL_W185: "http://image.tmdb.org/t/p/w185",
    IMAGE_URL_W300: "http://image.tmdb.org/t/p/w300",
    IMAGE_URL_W500: "http://image.tmdb.org/t/p/w500",
    IMAGE_URL_W780: "http://image.tmdb.org/t/p/w780",
    TRENDING_URL: "https://api.themoviedb.org/3/trending/all/week",
    TRENDING_MOVIES_URL: "https://api.themoviedb.org/3/trending/movie/day",
    TRENDING_TV_URL: "https://api.themoviedb.org/3/trending/tv/day",
    API_KEY: "?api_key=8306b37ff19c022b5e8e6c06ece35407",
    SEARCH_QUERY: "search/movie?query=",
    PLACEHOLDER_IMAGE: "https://s3-ap-southeast-1.amazonaws.com/popcornsg/placeholder-movieimage.png",
    LANGUAGE: "&language=pt-BR&",
    NOW_PLAYING_URL: "https://api-content.ingresso.com/v0/templates/nowplaying/44",
    MOVIE_DETAILS_URL: "https://api.themoviedb.org/3/movie/",
    TV_DETAILS_URL: "https://api.themoviedb.org/3/tv/",
    CREDITS_URL: "/credits",
    RELEASE_DATES_URL: "/release_dates",
    CONTENT_RATINGS_URL: "/content_ratings",
    VIDEOS_URL: "/videos",
    MOVIE_GENRES_URL: "https://api.themoviedb.org/3/genre/movie/list",
    TV_GENRES_URL: "https://api.themoviedb.org/3/genre/tv/list",
    TRANDING_MOVIES_URL: "https://api.themoviedb.org/3/discover/movie",
    DISCOVER_MOVIE_URL: "https://api.themoviedb.org/3/discover/movie",
    DISCOVER_TV_URL: "https://api.themoviedb.org/3/discover/tv",
    SORT_BY_POPULARITY_URL: "sort_by=popularity.desc&include_adult=false&include_video=false",
    SORT_BY_RELEASE_DATE: "sort_by=primary_release_date.desc&include_adult=false&include_video=false",
    SORT_BY_VOTE_COUNT: "sort_by=vote_count.desc&include_adult=false&include_video=false",
    WITH_GENRES_URL: "&with_genres=",
    LIMIT_RELEASE_DATE: "&primary_release_date.lte=",
    LIMIT_VOTE_COUNT: "&vote_count.gte=",
    WATCH_PROVIDERS_URL: "/watch/providers",
    PAGE_URL: "&page=",
    MULTISEARCH_URL: "https://api.themoviedb.org/3/search/multi",
    QUERY_URL: "query="
  },
  Strings: {
    MAIN_TITLE: "Movie Database App",
    SECONDARY_TITLE: "Movie Details",
    PLACEHOLDER: "Enter search text",
    SEARCH_BUTTON: "Search",
    RELEASE_DATE: "Relase Date: ",
    LANGUAGE: "Language: ",
    POPULARITY: "Popularity: ",
    STATUS: "Status: ",
    RATINGS: "Ratings: ",
    POPULARITY : "Popularity: ",
    BUDGET: "Budget: ",
    REVENUE: "Revenue: ",
    RUNTIME: "Runtime: ",
    OVERVIEW: "Overview: ",
    MSG: "This field is required."
  },
  Colors: {
    Cyan: "#02ADAD",
    Grey: "#EDEDED",
    Transparent: "transparent"
  }
};
