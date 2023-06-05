import { ElNotification } from "element-plus";

export function notice(
  type: "success" | "warning" | "info" | "error",
  title: string,
  msg: string
) {
  ElNotification({
    type: type,
    title: title,
    message: msg,
    offset: 100,
  });
}

interface O {
  "M+": number;
  "d+": number;
  "h+": number;
  "m+": number;
  "s+": number;
  "q+": number;
  S: number;
}
export const dateFormat = (date: string, format?: string) => {
  let dateObj = new Date(Date.parse(date));
  let fmt = format || "yyyy-MM-dd hh:mm:ss";
  //author: meizz
  var o: O = {
    "M+": dateObj.getMonth() + 1, //月份
    "d+": dateObj.getDate(), //日
    "h+": dateObj.getHours(), //小时
    "m+": dateObj.getMinutes(), //分
    "s+": dateObj.getSeconds(), //秒
    "q+": Math.floor((dateObj.getMonth() + 3) / 3), //季度
    S: dateObj.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1
          ? o[k as keyof O].toString()
          : ("00" + o[k as keyof O].toString()).substr(
              ("" + o[k as keyof O].toString()).length
            )
      );
  return fmt;
};

export const timestamp2time = (value: number) => {
  var date = new Date(value);
  var y = date.getFullYear(),
    m: number | string = date.getMonth() + 1,
    d: number | string = date.getDate(),
    h: number | string = date.getHours(),
    i: number | string = date.getMinutes(),
    s: number | string = date.getSeconds();
  if (m < 10) {
    m = "0" + m;
  }
  if (d < 10) {
    d = "0" + d;
  }
  if (h < 10) {
    h = "0" + h;
  }
  if (i < 10) {
    i = "0" + i;
  }
  if (s < 10) {
    s = "0" + s;
  }
  var t = y + "-" + m + "-" + d + " " + h + ":" + i + ":" + s;
  return t;
};
