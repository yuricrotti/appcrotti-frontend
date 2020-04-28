export default class timezone {
    

    static add_timezone_offset = (data) => {
        var date = data ;
        var targetTime = new Date(date);
        var tzDifference = targetTime.getTimezoneOffset();
        var offsetTime = new Date(targetTime.getTime() + tzDifference * 60 * 1000);
        return (offsetTime)
    };

    static sub_timezone_offset = (data) => {
        var date = data ;
        var targetTime = new Date(date);
        var tzDifference = targetTime.getTimezoneOffset();
        var offsetTime = new Date(targetTime.getTime() - tzDifference * 60 * 1000);
        return (offsetTime)
    };

   

}