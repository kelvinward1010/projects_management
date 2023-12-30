import moment from "moment";
const dateFormat = 'YYYY/MM/DD HH:mm:ss';


export function disableDateRanges(configdate: any) {
    const { startDate, endDate } = configdate;
    return function disabledDate(current: any) {
        let startCheck = true;
        let endCheck = true;
        if (startDate) {
            startCheck = current && current < moment(startDate, dateFormat);
        }
        if (endDate) {
            endCheck = current && current > moment(endDate, dateFormat);
        }
        return (startDate && startCheck) || (endDate && endCheck);
    };
}