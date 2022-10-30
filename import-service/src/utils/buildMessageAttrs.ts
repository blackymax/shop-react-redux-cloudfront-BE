export const buildMessageAttributes = (title: string, description: string, price: string, count: string) => {
    return {
        "title": {
            DataType: 'String',
            StringValue: title
        },
        "description": {
            DataType: 'String',
            StringValue: description
        },
        "price": {
            DataType: 'Number',
            StringValue: price
        },
        "count": {
            DataType: 'Number',
            StringValue: count
        },
    };
}