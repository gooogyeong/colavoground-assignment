import React, { useEffect, useState } from "react";

function Clock(/*props: any*/) {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    var timerID = setInterval(() => tick(), 60000);
    return function cleanup() {
      clearInterval(timerID);
    };
  });

  function tick() {
    setDate(new Date());
  }

  function formatTimestamp(date: Date) {
    var yyyy = date.getFullYear();
    var month = date.getMonth();
    var dd = date.getDate();
    function formatDigit(num: number): string {
      let strNum: string = num + "";
      if (strNum.length === 1) {
        strNum = "0" + strNum;
      }
      return strNum;
    }
    var hour = date.getHours();
    let HH = formatHour(hour);
    function formatHour(hour: number): string {
      let HH;
      if (hour > 12) {
        HH = "오후" + (hour * 1 - 12);
      } else {
        let strHour: string = hour + "";
        if (strHour.length === 1) {
          strHour = "0" + strHour;
        }
        HH = "오전" + strHour;
      }
      return HH;
    }
    var mm = date.getMinutes();
    //var ss = date.getSeconds();

    var format =
      [yyyy, formatDigit(month), formatDigit(dd)].join(".") +
      " " +
      [HH, mm /*, ss*/].join(":");
    return format;
  }

  return <div>{formatTimestamp(date)}</div>;
}

export default Clock;

//2019.05.14 오후 5:30
//10:58:21 AM
