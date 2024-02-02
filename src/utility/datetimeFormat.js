import format from 'date-fns/format';

export const Format = (date, pattern) => {
    const a = format(date, pattern)
    return a
}

export const ToDate = (date) => {
    const datetime = new Date(date ?? undefined)
    if(datetime === "Invalid Date" || isNaN(datetime)){
        return date
    }
    const dateString = Format(datetime, 'yyyy/MM/dd')
    return dateString
}