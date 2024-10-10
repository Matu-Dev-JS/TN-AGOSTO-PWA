class ResponseBuilder {
    response = {
        ok: false,
        status: 0,
        message: '',
        payload: {}
    }
    setOk(ok){
        this.response.ok = ok
        return this
    }
    setStatus(status){
        this.response.status = status
        return this
    }
    setMessage(message){
        this.response.message = message
        return this
    }
    setPayload(payload){
        this.response.payload = payload
        return this
    }
    build(){
        return this.response
    }
}

export default ResponseBuilder