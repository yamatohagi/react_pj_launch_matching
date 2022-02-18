var API_LINK = 'http://127.0.0.1:8000'
if (process.env.NODE_ENV == 'production') {
  API_LINK = 'https://lunch-matching.ibjapan.jp:8000/'
}

export {API_LINK};