const tmdb_api = "https://api.themoviedb.org/3/";
const api_key = "7070e2fe1f83238edc3ada49acb2cb25";
const yts_api = "https://yts.mx/api/v2/movie_details.json?imdb_id=";
const popcorntime = "https://popcorn-time.ga/";
const poster_api = [
    {
        "size": 92,
        "url": "https://image.tmdb.org/t/p/w92"
    },
    {
        "size": 154,
        "url": "https://image.tmdb.org/t/p/w154"
    },
    {
        "size": 185,
        "url": "https://image.tmdb.org/t/p/w185"
    },
    {
        "size": 342,
        "url": "https://image.tmdb.org/t/p/w342"
    },
    {
        "size": 500,
        "url": "https://image.tmdb.org/t/p/w500"
    },
    {
        "size": 780,
        "url": "https://image.tmdb.org/t/p/w780"
    },
    {
        "size": "original",
        "url": "https://image.tmdb.org/t/p/original"
    }
];
const backdrop_api = [
    {
        "size": 300,
        "url": "https://image.tmdb.org/t/p/w300"
    },
    {
        "size": 780,
        "url": "https://image.tmdb.org/t/p/w780"
    },
    {
        "size": 1280,
        "url": "https://image.tmdb.org/t/p/w1280"
    },
    {
        "size": "original",
        "url": "https://image.tmdb.org/t/p/original"
    }
];
const movie_api = [
    {
        name : "1337x",
        url: 'http://buhay-pirata-ryukme.glitch.me/api/1337x/',
        is_free: true
    },
    {
        name : "YTS",
        url: 'http://buhay-pirata-ryukme.glitch.me/api/yts/',
        is_free: true
    },
    {
        name : "Eztv",
        url: 'http://buhay-pirata-ryukme.glitch.me/api/eztv/',
        is_free: true
    },
    {
        name : "Torrent Galaxy",
        url: 'http://buhay-pirata-ryukme.glitch.me/api/tgx/',
        is_free: false
    },
    {
        name : "Torlock",
        url: 'http://buhay-pirata-ryukme.glitch.me/api/torlock/',
        is_free: false
    },
    {
        name : "PirateBay",
        url: 'http://buhay-pirata-ryukme.glitch.me/api/piratebay/',
        is_free: false
    },
    {
        name : "Nyaa.si",
        url: 'http://buhay-pirata-ryukme.glitch.me/api/nyaasi/',
        is_free: false
    },
    {
        name : "Rarbg",
        url: 'http://buhay-pirata-ryukme.glitch.me/api/rarbg/',
        is_free: false
    },
    {
        name : "Ettv",
        url: 'http://buhay-pirata-ryukme.glitch.me/api/ettv/',
        is_free: false
    },
    {
        name : "Zooqle",
        url: 'http://buhay-pirata-ryukme.glitch.me/api/zooqle/',
        is_free: false
    },
    {
        name : "KickAss",
        url: 'http://buhay-pirata-ryukme.glitch.me/api/kickass/',
        is_free: false
    },

]

export default {
    tmdb_api,
    movie_api,
    api_key,
    poster_api,
    backdrop_api,
    yts_api,
    popcorntime
}