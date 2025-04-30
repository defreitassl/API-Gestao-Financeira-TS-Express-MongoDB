import { AppError, BadRequestError } from "../errors"

const formatDate = (date: string | undefined): string | BadRequestError => {
    let transactionDate: Date
    
    if (date) {
        const d = new Date(date)
        if (isNaN(d.getTime())) {
            return new BadRequestError("Invalid date provided")
        }
        transactionDate = d
    } else {
        transactionDate = new Date()
    }

    const formattedDate: string = new Intl.DateTimeFormat("pt-BR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(transactionDate)

    return formattedDate
}

export default formatDate