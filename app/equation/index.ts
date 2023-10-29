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


export function daysdifference(firstDate: any, secondDate: any) {
    let startDay = new Date(firstDate);
    let endDay = new Date(secondDate);

    let millisBetween = endDay.getTime() - startDay.getTime();

    let days = Math.floor(millisBetween / 1000 / 60 / 60 / 24);
    millisBetween -= days * 1000 * 60 * 60 * 24;

    let hours = Math.floor(millisBetween / 1000 / 60 / 60);
    millisBetween -= hours * 1000 * 60 * 60;

    let minutes = Math.floor(millisBetween / 1000 / 60);
    millisBetween -= minutes * 1000 * 60;

    let seconds = Math.floor(millisBetween / 1000);

    const timestep = days + " ngày " + hours + " giờ " + minutes + " phút " + seconds + " giây"

    return timestep
}