export const convertToTime = (time: string) => {
    const from = "13:15:10";
    const TimeDate = new Date();
    // Split the time string into hours, minutes, and seconds
    const [hours, minutes, seconds] = time
        ? time.split(":").map(Number)
        : from.split(":").map(Number);

    // Set the time components to the current date
    TimeDate.setHours(hours);
    TimeDate.setMinutes(minutes);
    TimeDate.setSeconds(seconds);
    return TimeDate
}