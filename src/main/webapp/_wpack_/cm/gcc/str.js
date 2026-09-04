/*amd /cm/gcc/str.xml 15605 dd47ca90af2e5efaadd3cf240ceecfcb4018e6e12ee2e5a2bd4e26a3efdda0f0 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',A:{},E:[{T:1,N:'w2:type',E:[{T:3,text:'COMMON'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'}},{T:1,N:'w2:workflowCollection'}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:'scwin.attachPostposition,scwin.existJapanese,scwin.existKorean,scwin.formatPhone,scwin.formatSSN,scwin.formatTime,scwin.getByteLength,scwin.getLocale,scwin.isEmail,scwin.isFinalConsonant,scwin.isJapanese,scwin.isKorean,scwin.isPhone,scwin.lpad,scwin.replaceAll,scwin.rpad,scwin.serialize,scwin.trim'}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){/**
 * @component
 * @componentName udc_str
 * @pluginName
 * @company
 * @developer
 * @category /cm/gcc
 * @notSupportBrowser
 * @version
 * @htmlRender
 * @icon
 * @disableIcon
 * @description
 * @width
 * @height
 * @license
 * @imagePath
 * @homepage
 */
// =============================================================================
/**
* 文字列関連の関数を作成します。
 *
 * @author Inswave Systems
 * @class str
 * @namespace $c.str
 */
// =============================================================================

scwin.onpageload = function ($p) {};

/**
 * @method
 * @name serialize
* @description XML、JSONオブジェクトをString型で返します。
* @param {Object} object 文字列に変換するJSONオブジェクト
* @param {String} replacer 置換する文字列
* @param {Number} space スペースの数
* @returns {String} 文字列に変換されたオブジェクト
 * @hidden N
 * @exception 
 */
scwin.serialize = function ($p, object, replacer, space) {
  if (typeof object === 'string') {
    return object;
  } else if ($c.util.isJSON($p, object)) {
    return JSON.stringify(object, replacer, space);
  } else if ($c.util.isXmlDoc($p, object)) {
    return WebSquare.xml.serialize(object);
  } else {
    return object;
  }
};

/**
 * @method
 * @name lpad
* @description 左側に文字列を埋める
* @param {String} str フォーマットを適用する文字列
* @param {Number} length 0で埋める長さ
* @param {String} char 埋めたい文字(char)
* @returns {String} 指定された長さまでcharで埋められた文字列
 * @hidden N
 * @exception
 * @example
$c.str.lpad("24", 4, "0"); // "0024"
$c.str.lpad("11321", 8, "A"); // "AAA11321" 
 */
scwin.lpad = function ($p, str, length, char) {
  if (typeof str === "number") {
    str = str.toString();
  }
  if (char.length > length) {
    console.warn("[$c.str.lpad] エラー：埋めようとする文字列が要求された長さより大きいです");
    return str + "";
  }
  while (str.length < length) {
    str = char + str;
  }
  str = str.length >= length ? str.substring(0, length) : str;
  return str;
};

/**
 * @method
 * @name rpad
* @description 右側に文字列を埋める
* @param {String} str フォーマットを適用する文字列
* @param {Number} length 0で埋める長さ
* @param {String} char 埋めたい文字(char)
* @returns {String} 指定された長さまでcharで埋められた文字列
 * @hidden N
 * @exception
 * @example
$c.str.rpad("24", 4, "0"); // "2400"
$c.str.rpad("11321", 8, "A"); // "11321AAA"
 */
scwin.rpad = function ($p, str, length, char) {
  if (char.length > length) {
    console.warn("[$c.str.rpad] エラー：埋めようとする文字列が要求された長さより大きいです");
    return str + "";
  }
  while (str.length < length) {
    str += char;
  }
  str = str.length >= length ? str.substring(0, length) : str;
  return str;
};

/**
 * @method
 * @name formatSSN
* @description 文字列にFormatter(######-#######)を適用して返します。
* @param {String} str 文字列
* @returns {String} フォーマットが適用された文字列
 * @hidden N
 * @exception
 * @example
$c.str.formatSSN("1234561234567");  // "123456-1234567"
 */
scwin.formatSSN = function ($p, str) {
  const front = String(str).substr(0, 6);
  const back = String(str).substr(6, 7);
  const output = front + "-" + back;
  return output;
};

/**
 * @method
 * @name formatPhone
* @description 文字列に電話番号形式のFormatterを適用して返す。
* @param {String} str フォーマットを適用する文字列
* @returns {String} フォーマットが適用された文字列
 * @hidden N
 * @exception
 * @example
$c.str.formatPhone("0212345678");  // "02-1234-5678"
$c.str.formatPhone("05051234567"); // "0505-123-4567"
$c.str.formatPhone("03112345678"); // "031-1234-5678"
$c.str.formatPhone("0311234567");  // "031-123-4567"
 */
scwin.formatPhone = function ($p, str) {
  if (typeof $p == 'string') {
    str = $p;
    return scwin.__formatPhone(str);
  } else {
    return scwin.__formatPhone(str);
  }
};

/**
 * @method
 * @name __formatPhone
* @description 文字列に電話番号形式のFormatterを適用し、返却
* @param {string} str 電話番号形式を適用する文字列
* @returns {String} 電話番号形式が適用された文字列
 * @hidden Y
 * @exception
 * @example
 */
scwin.__formatPhone = function (str) {
  try {
    str = str.replace(/\s+/g, "");
    const commCdList = ["0505"]; // 4桁の市外局番、例外となる市外局番の確認
    const commCdNum = str.substr(0, 4); // 局番4桁の確認

    if (commCdList.indexOf(commCdNum) > -1) {
      //局番が0505の場合
      return str.replace(/^(01[0136789]{1}|02|0[3-9]{1}[0-9]{1}[0-9]{1})-?([*0-9]{3,4})-?([0-9]{4})$/, "$1-$2-$3");
    } else if (str.length <= 11) {
      return str.replace(/^(01[0136789]{1}|02|0[3-9]{1}[0-9]{1})-?([*0-9]{3,4})-?([0-9]{4})$/, "$1-$2-$3");
    } else {
      return str;
    }
  } catch (ex) {
    console.error(ex);
  }
};

/**
 * @method
 * @name formatTime
* @description 文字列に時間形式のフォーマットを適用して返す。
* @param {String} str フォーマットを適用する文字列
* @returns {String} フォーマットが適用された文字列
 * @hidden N
 * @exception
 * @example
$c.str.formatTime("123402"); // 12:34:02
$c.str.formatTime("1234"); // 12:34:02
 */
scwin.formatTime = function ($p, str) {
  try {
    const hour = String(str).substr(0, 2);
    const minute = String(str).substr(2, 2);
    const second = String(str).substr(4, 2);
    if ($c.util.isEmpty($p, second)) {
      return hour + ":" + minute;
    } else {
      return hour + ":" + minute + ":" + second;
    }
  } catch (ex) {
    console.error(ex);
    return str;
  }
};

/**
 * @method
 * @name getLocale
* @param {String} str 文字列
* @returns {Number} ユニコード基準
* @description 文字(char)の種類を返します。
* ハングル音節[44032～55203] => 1
* ハングル字母[4352～4601] => 2
* 数字[ 48 ~ 57 ] => 4
* 特殊文字[ 32 ~ 47 || 58 ~ 64 || 91 ~ 96 || 123 ~ 126 ] => 8
* 英大文字[ 65 ~ 90 ] => 16
* 英小文字[97 〜 122] => 32
* その他[残りのもの] => 48
 * @hidden N
 * @exception
 * @example 
* $c.str.getLocale("가"); // 1
 * $c.str.getLocale("ㅏ"); // 2
 * $c.str.getLocale("1");  // 4
 * $c.str.getLocale("!");  // 8
 * $c.str.getLocale("A");  // 16
 * $c.str.getLocale("a");  // 32
 * $c.str.getLocale("?");  // 48
 */
scwin.getLocale = function ($p, str) {
  let locale = 0;
  if (str.length > 0) {
    const charCode = str.charCodeAt(0);
    if (charCode >= 0XAC00 && charCode <= 0XD7A3) {
      // ハングル音節.[ 44032 ~ 55203 ]
      locale = 0X1; // 1
    } else if (charCode >= 0X1100 && charCode <= 0X11F9 || charCode >= 0X3131 && charCode <= 0X318E) {
      // ハングル字母 [ 4352 ~ 4601 ]
      locale = 0X2; // 2
    } else if (charCode >= 0X30 && charCode <= 0X39) {
      // 数字 [ 48 ~ 57 ]
      locale = 0X4; // 4
    } else if (charCode >= 0X20 && charCode <= 0X2F || charCode >= 0X3A && charCode <= 0X40 || charCode >= 0X5B && charCode <= 0X60 || charCode >= 0X7B && charCode <= 0X7E) {
      // 特殊文字
      locale = 0X8; // 8
    } else if (charCode >= 0X41 && charCode <= 0X5A) {
      // アルファベット大文字 [ 65 ~ 90 ]
      locale = 0X10; // 16
    } else if (charCode >= 0X61 && charCode <= 0X7A) {
      // 英文小文字 [ 97 ~ 122 ]
      locale = 0X20; // 32
    } else {
      // その他
      locale = 0X30; // 48
    }
  }
  return locale;
};

/**
 * @method
 * @name existKorean
* @description 入力された文字列に韓国語が含まれているかどうかを検査する。
* @param {String} value 韓国語の文字種であるかを検証する文字列
* @returns {Boolean} 韓国語を含むかどうか
 * @example
$c.str.existKorean("abc"); // false
$c.str.existKorean("abc無窮花"); // true
$c.str.existKorean("무궁화꽃이"); // true
 * @hidden N
 * @exception 
 */
scwin.existKorean = function ($p, value) {
  const check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
  if (check.test(value)) {
    return true;
  } else {
    return false;
  }
};

/**
 * @method
 * @name existJapanese
* @description 入力された文字列に日本語が含まれているかどうかを検査する。
* @param {String} value 日本語の文字種であるかを検証する文字列
* @returns {Boolean} 日本語を含むかどうか
 * @example
$c.str.existKorean("abc"); // false
$c.str.existKorean("abcさくら"); // true
$c.str.existKorean("桜大好き"); // true
 * @hidden N
 * @exception 
 */
scwin.existJapanese = function ($p, value) {
  const check = /[ぁ-んァ-ヶｱ-ﾝﾞﾟ一-龠ー]/;
  if (check.test(value)) {
    return true;
  } else {
    return false;
  }
};

/**
 * @method
 * @name isKorean
* @description 入力された文字列全体が韓国語かどうかを検査します。
* @param {String} str 韓国語が含まれているか検証を受ける文字列
* @returns {Boolean} 検査結果
 * @example
$c.str.isKorean("abcd"); // false
$c.str.isKorean("abcd무궁화"); // false
$c.str.isKorean("무궁화"); // true
 * @hidden N
 * @exception 
 */
scwin.isKorean = function ($p, str) {
  let result = false;
  for (let i = 0; i < str.length; i++) {
    let c = str.charAt(i);
    if (!$c.str.existKorean($p, c)) {
      result = false;
      break;
    } else {
      result = true;
    }
  }
  return result;
};

/**
 * @method
 * @name isJapanese
* @description 入力された文字列全体が日本語かどうかを検査します。
* @param {String} str 日本語が含まれているか検証を受ける文字列
* @returns {Boolean} 検査結果
 * @example
$c.str.isJapanese("abcd"); // false
$c.str.isJapanese("abcさくら"); // false
$c.str.isJapanese("桜大好き"); // true
 * @hidden N
 * @exception 
 */
scwin.isJapanese = function ($p, str) {
  let result = false;
  for (let i = 0; i < str.length; i++) {
    let c = str.charAt(i);
    if (!$c.str.existJapanese($p, c)) {
      result = false;
      break;
    } else {
      result = true;
    }
  }
  return result;
};

/**
 * @method
 * @name isFinalConsonant
 * @description 最後の文字に終声（パッチム）が存在するかどうかを検査します。
 * @param {String} str 終声の有無を検査する文字列
 * @returns {Boolean} 検査結果
 * @example
 $c.str.isFinalConsonant("ジョンソ") // 戻り値の例） false
 $c.str.isFinalConsonant("ジョンソン") // 戻り値の例） true
 $c.str.isFinalConsonant("イムニダ") // 戻り値の例） false
 $c.str.isFinalConsonant("イムニダン") // 戻り値の例） true
 * @hidden N
 * @exception 
 */
scwin.isFinalConsonant = function ($p, str) {
  let code = str.charCodeAt(str.length - 1);
  if (code < 44032 || code > 55197) {
    return false;
  }
  if ((code - 16) % 28 == 0) {
    return false;
  }
  return true;
};

/**
 * @method
 * @name attachPostposition
 * @description 単語の後ろに「は」または「が」を付けて返します。
 * @param {String} str 「は」または「が」を付ける文字列
 * @returns {Boolean} 変換された文字列
 * @hidden N
 * @exception 
 * @example
$c.str.attachPostposition("私");
// 戻り値の例）"私は"
$c.str.attachPostposition("私と貴方");
// 戻り値の例）"私と貴方は"
$c.str.attachPostposition("だから");
// 戻り値の例）"だからは"
$c.str.attachPostposition("そうでしたが");
// 戻り値の例）"そうでしたがは"
*/
scwin.attachPostposition = function ($p, str) {
  if ($c.win.getLanguage($p) === "ja") {
    str = str + "は";
    return str;
  } else {
    return str;
  }
};

/**
 * @method
 * @name isEmail
* @description メールアドレスの有効性を検証する。
* @param {String} str メールアドレス
* @returns {Boolean} 検査結果 (正常の場合はtrue、異常の場合はfalseを返す)
 * @hidden N
 * @exception 
 * @example
$c.str.isEmail("emailTest@email.com");  // true
*/
scwin.isEmail = function ($p, str) {
  if (typeof str != "undefined" && str != "") {
    const format = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (format.test(str)) {
      return true;
    } else {
      return false;
    }
  }
  return true;
};

/**
 * @method
 * @name isPhone
* @description 電話番号の有効性を検証する。
* @param {String} str :: I :: Y :: :: 電話番号
* @returns {Boolean} 検査結果 (正常の場合はtrue、異常の場合はfalseを返す)
 * @hidden N
 * @exception 
 * @example
$c.str.isPhone("01094832134"); // true
$c.str.isPhone("02094832134"); // false
*/
scwin.isPhone = function ($p, str) {
  try {
    const phoneNum = $c.str.formatPhone($p, str);
    const isDash = phoneNum.indexOf("-") > 1;
    return isDash;
  } catch (ex) {
    console.error(ex);
    return false;
  }
};

/**
 * @method
 * @name replaceAll
* @description 文字列を置換します。
* @param	{String} str 文字列
* @param	{String} orgStr 検索する文字列
* @param	{String} repStr 置換する文字
 * @hidden N
 * @exception 
* @returns {String} 置換文字列
 * @example $c.str.replaceAll(obj.getValue(), "/", "");
*/
scwin.replaceAll = function ($p, str, orgStr, repStr) {
  try {
    str = "" + str;
    return str.split(orgStr).join(repStr);
  } catch (ex) {
    console.error(ex);
    return str;
  }
};

/**
 * @method
 * @name trim
* @description 入力された文字列の左右の空白を除去した文字列を取得する。
* @param {String} str 左右の空白文字を削除したい文字列
* @returns {String} 入力された文字列から左右の空白が除去された文字列
 * @hidden N
 * @exception 
 * @example $c.str.trim("   a   ");  // return "a"
*/
scwin.trim = function ($p, str) {
  try {
    if (typeof str == "undefined" || str == null) {
      str = "";
    }
    if (typeof str !== "string") {
      str = str + "";
    }
    return str.trim();
  } catch (ex) {
    console.error(ex);
  }
};

/**
 * @method
 * @name getByteLength
* @description 文字列のバイト基準の文字列長を返します。
* @param {String} str 文字列
* @param {String} ignoreChar 長さ測定時に無視する文字列
* @returns {Number} 文字列の長さ
 * @hidden N
 * @exception 
 * @example
$c.str.getByteLength("1231aABC");  // 8
$c.str.getByteLength("1231a한글");  // 9
*/
scwin.getByteLength = function ($p, str, ignoreChar) {
  return WebSquare.util.getStringByteSize(str, ignoreChar);
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'}}]}]})