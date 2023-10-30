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

export const takeLengthStatusProjects = (arr: any[]) => {
    let lengthDone = 0;
    let lengthTodo = 0;

    arr?.forEach((item) => {
        if(item?.status === ''){
            lengthTodo += 1;
        } 
        if(item?.status === 'Done'){
            lengthDone += 1;
        } 
    })
    return {
        lengthTodo,
        lengthDone
    }
}


export const configData = (arr: any[]) => {

    const lenthData = takeLengthStatusProjects(arr)

    let mapData = arr?.map((item) => {
        const newDate = new Date(item?.completionTime)
        const month = newDate?.getMonth() + 1;

        const recentlyDate = new Date();
        const recentlyDateMonth = recentlyDate?.getMonth() + 1;

        return ({
            month: month ? month : recentlyDateMonth,
            value: month ? lenthData.lengthDone : lenthData.lengthTodo,
            type: month ? 'Done' : 'Todo'
        })
    }) ?? []

    let cachedObject: any = {};
    mapData?.map((item) => (cachedObject[item?.value] = item));
    mapData = Object.values(cachedObject);

    const monthTypes = [
        {
            text: 'Jan',
            number: 1,
        },
        {
            text: 'Feb',
            number: 2,
        },
        {
            text: 'Mar',
            number: 3,
        },
        {
            text: 'Apr',
            number: 4,
        },
        {
            text: 'May',
            number: 5,
        },
        {
            text: 'Jun',
            number: 6,
        },
        {
            text: 'Jul',
            number: 7,
        },
        {
            text: 'Aug',
            number: 8,
        },
        {
            text: 'Seb',
            number: 9,
        },
        {
            text: 'Oct',
            number: 10,
        },
        {
            text: 'Nov',
            number: 11,
        },
        {
            text: 'Dec',
            number: 12,
        },
    ]

    var data: any[] = [];

    for(let i = 1; i <= 12; i++) {
        mapData.map((item) => {
            if(i === item?.month){
                return data?.push({
                    month: item?.month,
                    value: item?.value,
                    type: item?.type,
                })
            }else{
                return data?.push({
                    month: i,
                    value: 0,
                    type: item?.type,
                })
            }
        })
    }

    var dataEnd: any[] = [];

    for(let j in monthTypes){
        data?.map((item) => {
            if(monthTypes[j]?.number === item.month){
                return dataEnd?.push({
                    month: monthTypes[j]?.text,
                    value: item.value,
                    type: item.type,
                })
            }
        })
    }

    return dataEnd;
}