export default process.env.NODE_ENV === 'development' ?
    'http://localhost:8000/api' : '/api'