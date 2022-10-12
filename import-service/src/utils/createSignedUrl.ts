import { S3 } from "aws-sdk";
import { BUCKET_NAME, BUCKET_URL } from "../constants"
import { HttpResponse } from "../helpers/http-response";

export const createSignedUrl = async (name: string) => {
    const s3 = new S3({region: "eu-west-1"})
    const url = await s3.getSignedUrl('putObject', {
        "Bucket": BUCKET_NAME,
        "Key": `uploaded/${name}`,
        "ContentType": "text/csv",
        "ACL": "public-read-write"
      })
    return url
}