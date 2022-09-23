import { DynamoDB } from "aws-sdk"

export const connectToDynamoDB = () => {
    const db = new DynamoDB.DocumentClient()
    return db
}
