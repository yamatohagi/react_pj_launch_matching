var API_LINK = 'http://127.0.0.1:8000'
if (process.env.NODE_ENV == 'production') {
  API_LINK = 'https://lunch-matching.ibjapan.jp:8000/'
}

var FRONT_LINK = 'http://localhost:3000/'
if (process.env.NODE_ENV == 'production') {
  FRONT_LINK = 'https://lunch-matching.ibjapan.jp'
}


export { API_LINK, FRONT_LINK };