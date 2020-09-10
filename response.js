class response {

    constructor(data=null,errors=null) {
        this.errors = errors;
        this.data = data;
    }

    success(res) {
       return res.status(200).json({
           status:"success",
           data: this.data // const. dan gelen data
       })
    }

    created(res) {
        return res.status(201).json({
            status:"created",
            data:this.data
        })
    }

    //server tarafında hata 500
    error500(res) {
    return res.status(500).json({
        status:"error",
        errors:this.errors // birden fazla hata olabilir.
    })
    }

    // client tarafında hata 400
    error400(res) {
        return res.status(400).json({
            status:"error",
            errors:this.errors
        })
    }

    notFound(res) {
        return res.status(404).json({
            status:"not found",
            data: ""
        })
    }


}

module.exports = response;