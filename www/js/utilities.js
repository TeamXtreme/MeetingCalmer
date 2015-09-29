var pad = function (val, len) {
    val = String(val);
    len = len || 2;
    while (val.length < len) val = "0" + val;
    return val;
  };

  Date.prototype.toDisplayTime = function () {
    var a = this;
    var dayNames = [
       "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"
    ]
    var monthNames = [
     "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    var d = a.getDate(),
    D = dayNames[a.getDay()],
    m = monthNames[a.getMonth()],
    y = a.getFullYear(),
    h = a.getHours(), min = a.getMinutes();

    return D + " " + m + " " + d + " " + y + ", " + pad(h, 2) + ":" + pad(min, 2);
  }