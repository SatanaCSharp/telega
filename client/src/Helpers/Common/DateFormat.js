export default function DateFormat (date) {
    date = new Date(date*1000);
    const todayDate = new Date();
    let difference = todayDate.getTime() - date.getTime();
    difference = Math.ceil(difference / (1000 * 3600 *24));
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} (${difference} days ago)`
}