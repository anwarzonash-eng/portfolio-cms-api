

export function errorMiddleware() {
    

    return (err, req, res, next) => {

        // console.log("Middleware Error Hadnling");
        const errStatus = err.status || 500;
        const errMsg = err.message || 'Something went wrong';
        res.status(errStatus).json({
            // success: 'error',
            status: 'Error',
            message: errMsg,

        })
      
    }


  }