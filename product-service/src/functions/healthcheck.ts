
export const healthcheck = async () => {
    return {
        body: 'OK',
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
          },
    };
}
