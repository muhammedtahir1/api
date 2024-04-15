// 
const errorMiddleware = (err, req, res, next)=>{
    console.log('here is an error middleware');
    res.json({message: err.message, stack: process.env.NODE_ENV === 'development' ? err.stack : null})

    const statusCode = res.statusCode ? res.statusCode : 500;   //what is statusCode
    res.status(statusCode);
    
}

module.exports = errorMiddleware