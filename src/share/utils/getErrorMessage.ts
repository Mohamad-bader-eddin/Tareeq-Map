/* eslint-disable @typescript-eslint/no-explicit-any */

export const errorMessage = (error: any) => {
    return error.response.data.message as string
}