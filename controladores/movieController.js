const db = require ('../database/models')
const movie = db.Movie 

const movieController={
    index:(req,res) => {
        movie.findAll()
        .then(data=>{
            return res.send(data)
        })
        .catch(error=>{
            return res.send(error)
        })
    }
}
module.exports = movieController