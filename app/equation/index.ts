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

    return {
        days,
        hours,
        minutes,
        seconds,
    }
}


export const totalWorkTime = (arr: any[]) => {

    const total = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    }

    const listTimeAIssue: any[] = []

    arr?.forEach((item) => {
        const time = item?.timework
        const timeInAIssue = daysdifference(time?.[0],time?.[1])
        listTimeAIssue?.push(timeInAIssue)
    })

    listTimeAIssue?.forEach((item) => {
        total.days += item?.days;
        let hours = total.hours += item?.hours;
        let minutes = total.minutes += item?.minutes;
        let seconds = total.seconds += item?.seconds;

        const configHours = Math.floor(hours / 24)
        const configMinutes = Math.floor(minutes / 60)
        const configSeconds = Math.floor(seconds / 60)
        if(configHours !== 0){
            total.days += configHours
            total.hours -= configHours*24
        }
        if(configMinutes !== 0){
            total.hours += configMinutes;
            total.minutes -= configMinutes*60
        }
        if(configSeconds !== 0){
            total.minutes += configSeconds;
            total.seconds -= configSeconds*60
        }
    })
    return total;
}


export const takeLengthStatus = (arr: any[]) => {
    let lengthDone = 0;
    let lengthImprogress = 0;
    let lengthTodo = 0;

    arr?.forEach((item) => {
        if(item?.status === 'Todo'){
            lengthTodo += 1;
        } 
        if(item?.status === 'Improgress'){
            lengthImprogress += 1;
        } 
        if(item?.status === 'Done'){
            lengthDone += 1;
        } 
    })
    return {
        lengthTodo,
        lengthImprogress,
        lengthDone
    }
}