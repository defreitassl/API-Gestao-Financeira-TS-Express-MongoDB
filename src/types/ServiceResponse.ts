interface ServiceResponse<D>{
    statusCode: number,
    content?: {
        data?: D,
        error?: string | unknown,
        message?: string
    }
}

export default ServiceResponse