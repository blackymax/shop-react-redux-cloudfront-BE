export const parsePathParameterString = (parameter: string) => {
    return parameter.split('=')[1]
}