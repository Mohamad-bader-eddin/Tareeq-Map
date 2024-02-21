/* eslint-disable @typescript-eslint/no-unused-vars */
export const errorMessage = (error) => {
    return error.response.data.message as string
}