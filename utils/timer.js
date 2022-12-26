
let minutes = 0;
let seconds  = 0;
let order = 0;
const slotCount = 5;

const timer = (props) => {
  const { initialMinute = 0, initialSeconds = 0, callback } = props;
  minutes = initialMinute;
  seconds = initialSeconds;

  let myInterval = setInterval(
    () => {
      callback?.();
      if (seconds > 0) {
        seconds -= 1;
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
          if (order < slotCount) {
            order += 1;
          } else {
            order = 0;
          }
          minutes = initialMinute;
          seconds = initialSeconds;        
        } else {
          minutes -=  1;
          seconds = 59;
        }
      } 
    },
  1000);

  return () => {
    clearInterval(myInterval);
  };
};

const getOrderMark = () => ({ order, minutes, seconds });

module.exports = { timer, getOrderMark };
