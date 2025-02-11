
const TimeFormatter = ({ time }) => {
    const firstValue = time.split(":")[0]
    const secondValue = time.split(":")[1]
 
    if (firstValue > 12) {
        const valueAfterModulre = firstValue % 12;
    
        if (valueAfterModulre >= 10) {
            return `${firstValue % 12}:${secondValue} PM`
        }else{
            return `0${firstValue % 12}:${secondValue} PM`
        }
    } else {
        return `${firstValue}:${secondValue} AM`
    }
}



export default TimeFormatter