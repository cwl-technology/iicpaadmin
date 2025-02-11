const months = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];


const DateFormatter = ({ date }) => {
    const data = date.split("-");
    return `${data[2]} ${months[data[1] - 1]} ${data[0]}`
}

export default DateFormatter