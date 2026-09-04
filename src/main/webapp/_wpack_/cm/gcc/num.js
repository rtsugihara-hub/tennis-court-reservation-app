/*amd /cm/gcc/num.xml 7670 d9059adcaa8949f110f4d9e1fd009d852d58a12ee4057704b1b99180adf66f79 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',A:{},E:[{T:1,N:'w2:type',E:[{T:3,text:'COMMON'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'}},{T:1,N:'w2:workflowCollection'}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:'scwin.round,scwin.floor,scwin.ceil,scwin.formatMoney,scwin.formatNumber,scwin.isNumber,scwin.isOdd,scwin.parseInt,scwin.parseFloat,scwin.formatByte'}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.onpageload = function ($p) {};

/**
 * @method
 * @name round
* @description 四捨五入処理を行う。
* @param {String|Number} value  四捨五入処理を行う値
* @param {Number} point 四捨五入する小数点以下の桁数（デフォルト：0、整数値に四捨五入）
* @returns {Number} 四捨五入処理を行った数値
 * @example
$c.num.round(23.4567); // 戻り値の例) 23
$c.num.round(23.5567); // 戻り値の例) 24
$c.num.round(23.5567, 2); // 戻り値の例) 23.56
$c.num.round(23.5564, 3); // 戻り値の例) 23.556

 * @hidden N
 * @exception 
 */
scwin.round = function ($p, value, point) {
  let num = 1;
  if (typeof point !== "undefined") {
    num = Math.pow(10, point);
  }
  return Math.round(Number(value) * num) / num;
};

/**
 * @method
 * @name floor
* @description 切り捨て処理を行います。
* @param {String|Number} value 切り捨て処理を行う値
* @param {Number} point 切り捨てを行う小数点以下の桁数（デフォルト：0、整数値に切り捨て）
* @returns {Number} 切り捨て処理をした数値
 * @example
$c.num.round(23.4567); // 戻り値の例) 23
$c.num.round(23.5567); // 戻り値の例) 24
$c.num.round(23.5567, 2); // 戻り値の例) 23.56
$c.num.round(23.5564, 3); // 戻り値の例) 23.556
 * @hidden N
 * @exception 
 */
scwin.floor = function ($p, value, point) {
  let num = 1;
  if (typeof point !== "undefined") {
    num = Math.pow(10, point);
  }
  return Math.floor(Number(value) * num) / num;
};

/**
 * @method
 * @name ceil
* @description 切り上げ処理を行います。
* @param {String} value 切り上げ処理を行う値（String型またはNumber型をサポート）
* @param {Integer} point 切り上げを行う小数点以下の桁数（デフォルト：0、整数値に切り上げ）
* @returns {Number} 切り上げ処理をした数値
 * @example
$c.num.ceil(23.5567); // 戻り値の例) 24
$c.num.ceil(23.5567, 2); // 戻り値の例) 23.56
 * @hidden N
 * @exception 
 */
scwin.ceil = function ($p, value, point) {
  let num = 1;
  if (typeof point !== "undefined") {
    num = Math.pow(10, point);
  }
  return Math.ceil(Number(value) * num) / num;
};

/**
 * @method
 * @name formatMoney
* @description 3桁ごとにカンマを表示、金額、setDisplayFormat("#,###&#46##0", "fn_userFormatter2") - 入力されたstrにフォーマットを適用して返却
* @param {String|Number} value フォーマッタを適用する値
* @param {String} type 適用するフォーマッターの形式(Default:null,dollar,plusZero,won)
* @returns {String} フォーマッターが適用された文字列
 * @example
$c.num.formatMoney("12345"); // 12,345
$c.num.formatMoney("12345", "dollar"); // $12,345
$c.num.formatMoney("12345", "plusZero"); // 123,450
$c.num.formatMoney("12345", "won"); // 12,345ウォン
 * @hidden N
 * @exception 
 */
scwin.formatMoney = function ($p, value, type) {
  let amount;
  if (type == "plusZero") {
    amount = new String(value) + "0";
  } else {
    amount = new String(value);
  }
  amount = amount.split(".");
  const amount1 = amount[0].split("").reverse();
  const amount2 = amount[1];
  let output = "";
  for (let i = 0; i <= amount1.length - 1; i++) {
    output = amount1[i] + output;
    if ((i + 1) % 3 == 0 && amount1.length - 1 !== i) output = ',' + output;
  }
  if (type == "dollar") {
    if (!amount2) {
      output = "$ " + output;
    } else {
      output = "$ " + output + "." + amount2;
    }
  } else if (type == "won") {
    if (!amount2) {
      output = output + "円";
    } else {
      output = output + "." + amount2 + "円";
    }
  } else {
    if (!amount2) {
      output = output;
    } else {
      output = output + "." + amount2;
    }
  }
  return output;
};

/**
 * @method
 * @name formatNumber
* @description 3桁ごとにカンマを追加して返します。
* @param {String|Number} value フォーマッタを適用する値
* @returns {String} フォーマッターが適用された文字列
 * @example
$c.num.formatNumber("12345677"); // "12,345,677"
$c.num.formatNumber(12345677); // "12,345,677"
$c.num.formatNumber(-12345677); // "-12,345,677"
 * @hidden N
 * @exception 
 */
scwin.formatNumber = function ($p, value) {
  if (typeof $p == 'string') {
    value = $p;
    return WebSquare.util.setNumber(value);
  }
  ;
  return WebSquare.util.setNumber(value);
};

/**
 * @method
 * @name isNumber
* @description 数字が正しいかどうかを検査する。
* @param {String|Number} value チェックする数値
* @returns {Boolean} 数値の場合はtrue、そうでない場合はfalseを返す
 * @example
$c.num.formatNumber("12345677"); // "12,345,677"
$c.num.formatNumber(12345677); // "12,345,677"
$c.num.formatNumber(-12345677); // "-12,345,677"
 * @hidden N
 * @exception 
 */
scwin.isNumber = function ($p, value) {
  return !isNaN(value);
};

/**
 * @method
 * @name isOdd
* @description 奇数かどうかを検査する。
* @param {String|Number} value 検査する値
* @returns {Boolean} 奇数の場合はtrue、そうでない場合はfalseを返す
 * @example
$c.num.isOdd("123"); // true;
$c.num.isOdd(123); // true;
$c.num.isOdd("122"); // false;
$c.num.isOdd(122); // false;
 * @hidden N
 * @exception 
 */
scwin.isOdd = function ($p, value) {
  return WebSquare.util.isOdd(value);
};

/**
 * @method
 * @name parseInt
* @description 文字列を整数型に変換します。
* @param {String} value 整数文字列
* @param {Number} parseFloatの結果がNaNの場合に返すデフォルト値
* @return {Number} 変換された整数値
 * @hidden N
 * @exception 
 * @example
$c.num.parseInt("5231"); // 5231;
 */
scwin.parseInt = function ($p, value, defaultValue) {
  return WebSquare.util.parseInt(value, defaultValue);
};

/**
 * @method
 * @name parseFloat
* @description 文字列を実数型に変換します。
* @param {String} 実数文字列
* @param {Number} parseFloatの結果がNaNの場合に返すデフォルト値
* @returns {Number} 変換された実数型の値
 * @example
$c.num.parseFloat("5231.22"); // 5231.22;
 * @hidden N
 * @exception 
 */
scwin.parseFloat = function ($p, value, defaultValue) {
  return WebSquare.util.parseFloat(value, defaultValue);
};

/**
 * @method
 * @name formatByte
* @description バイト値を適切な単位（KB、MB、GB）に変換して返します。
* @param {String} value 変換する値
 * @example
$c.num.formatByte(32132);
 * @hidden N
 * @exception 
 */
scwin.formatByte = function ($p, value) {
  const unitType = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
  if (value == 0 || value == "0" || isNaN(value)) {
    return 0 + " " + unitType[0];
  }
  const index = Math.floor(Math.log(value) / Math.log(1024));
  return (value / Math.pow(1024, index)).toFixed(1) + " " + unitType[index];
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'}}]}]})