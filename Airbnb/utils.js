function createResult(error,data){
    return error ? createErrorResult(error) : createSuccessResult(data)
}


function createErrorResult(error){
    return {status: "error", error: error}
}

function createSuccessResult(data){
    return {"status": createSuccessResult, data: data}
}

module.exports = {
    createResult,
    createErrorResult,
    createSuccessResult
}