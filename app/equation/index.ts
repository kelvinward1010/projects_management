import _  from "lodash"

export const workCompletionRateFormula = (array: any) => {
     
    const arrResult: any[] = []

    array?.forEach((item: any) => {
        if (item.status === "Done") {
            return arrResult.push(item)
        }
    } )

    const lengthArray = array?.length;
    const lengthResult = arrResult?.length

    const comparingArray = arrResult ? Number((lengthResult/lengthArray) * 100) : Number(0);
    
    return comparingArray
}