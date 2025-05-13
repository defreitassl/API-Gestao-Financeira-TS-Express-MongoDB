import { ITransaction } from "../models"

interface UserSummary {
    balance: number
    income: number
    expenses: number
    transactions: ITransaction[] | null
}


export default UserSummary