interface ServiceResponse<D>{
    statusCode: number,
    content: {
        data?: D,
        error?: Error,
        message?: string
    }
}

export default ServiceResponse