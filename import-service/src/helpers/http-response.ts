import { headers } from "../constants";

export const HttpResponse = {
    badRequest: <T>(data: T = {} as T): any => ({
      statusCode: 400,
      body: JSON.stringify(data),
      headers,
    }),
    notFound: (): any => ({
      statusCode: 404,
      body: JSON.stringify({}),
      headers,
    }),
    success: <T>(data: T = {} as T): any => ({
      statusCode: 200,
      body: JSON.stringify(data),
      headers,
    }),
    serverError: <T>(data: T = {} as T): any => ({
      statusCode: 500,
      body: JSON.stringify(data),
      headers,
    }),
  };