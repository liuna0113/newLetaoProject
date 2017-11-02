var tools = {
  getObj: function () {
    var str = location.search;
    str = str.substring(1);
    var arr = [];
    var obj = {};
    arr = str.split('&');
    arr.forEach(function (v, i) {
      obj[v.split('=')[0]] = decodeURI(v.split('=')[1]);
    });
    return obj;
  },
  getObjContent: function (key) {
    return this.getObj()[key];
  }
};