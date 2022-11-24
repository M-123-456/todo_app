export const getErrorArrays = (errors: any) => {
    const errorsArray:string[] = []
    for(const error of errors) {
        for (const key in error) {
            errors.push(error[key])
        }
    } 
    return errorsArray
}