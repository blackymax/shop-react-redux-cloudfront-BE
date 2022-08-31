import { S3 } from "aws-sdk"
import { BUCKET_NAME } from "../constants"

export const fileParser = () => {
    const s3 = new S3()

    const params = {
        Bucket: BUCKET_NAME
    }
}