/*amd /cm/gcc/data.xml 128490 69c3a54fc0a49b536b6a99feaee70448a03f8158a2c57bdb090d4b7b7aadd54b */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',A:{},E:[{T:1,N:'w2:type',E:[{T:3,text:'COMMON'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'}},{T:1,N:'w2:workflowCollection'}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:'scwin.getValResultMsg,scwin.setDownloadGridViewOption,scwin.loadMessage,scwin.initChangeCheckedDc,scwin.setChangeCheckedDc,scwin.getChangeCheckedMainFrame,scwin.setCommonCode,scwin.getCommonCodeDataList,scwin.executeCommonCode,scwin.getParameter,scwin.getColumnName,scwin.getDataCollection,scwin.getMessage,scwin.isModified,scwin.downloadMultipleDataList,scwin.downloadMultipleGridView,scwin.downloadGridViewExcel,scwin.downloadGridViewCSV,scwin.uploadGridViewExcel,scwin.uploadGridViewCSV,scwin.validateGroup,scwin.validateGridView,scwin.createDataList,scwin.createDataMap,scwin.undoAll,scwin.undoRow,scwin.undoGridView,scwin.deleteRow,scwin.insertRow,scwin.getMatchedJSON,scwin.setUserData,scwin.getUserData,scwin.createHolidayDataList,scwin.loadHoliday'}},{T:1,N:'script',A:{type:'text/javascript',lazy:'false'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){// データリストの共通コード保存のためのプロパティ情報
scwin.DATA_PREFIX = "dlt_commonCode";
scwin.COMMON_CODE_INFO = {
  LABEL: "CODE_NM",
  VALUE: "COM_CD",
  FILED_ARR: ["GRP_CD", "COM_CD", "CODE_NM"]
};

// 共通コードデータ
scwin.commonCodeList = [];
scwin.onpageload = function ($p) {};

/**
 * @method 
 * @name getValResultMsg
* @description 有効性検証結果のメッセージを返却します。
* @param {Object} valInfo バリデーションオプション
* @returns {Object} msgInfo 有効性検査結果のメッセージ情報
* msgInfo.msgType {String} メッセージタイプ("1": 基本検査項目、"2": ユーザー定義関数(valInfo)検査項目)
* msgInfo.message {String} 検査結果メッセージの内容
* @param {string} value 値
* @param {Object} dataCollectionObj DataCollectionオブジェクト
* @param {Number} rowIndex Row Index 値
 * @hidden N
 * @exception 
 * @example $c.data.getValResultMsg(valInfo, value);
 */
scwin.getValResultMsg = function ($p, valInfo, value, dataCollectionObj, rowIndex) {
  let msgInfo = {
    msgType: "1",
    message: ""
  };
  if (typeof valInfo.mandatory !== "undefined" && valInfo.mandatory === true && value.length === 0) {
    msgInfo.message = "必須入力項目です。";
  } else if (typeof valInfo.minLength !== "undefined" && valInfo.minLength > 0 && value.length < valInfo.minLength) {
    msgInfo.message = "最小長さ " + valInfo.minLength + "文字以上で入力する必要があります。";
  } else if (typeof valInfo.minByteLength !== "undefined" && valInfo.minByteLength > 0 && $c.str.getByteLength($p, value) < valInfo.minByteLength) {
    msgInfo.message = "最小長さ " + valInfo.minByteLength + "文字以上で入力する必要があります。";
  } else if (typeof valInfo.isEmail !== "undefined" && valInfo.isEmail && $c.util.isEmpty($p, value) === false && $c.str.isEmail($p, value) === false) {
    msgInfo.message = "有効なメールアドレスではありません。";
  } else if (typeof valInfo.isPhone !== "undefined" && valInfo.isPhone && $c.util.isEmpty($p, value) === false && $c.str.isPhone($p, value) === false) {
    msgInfo.message = "有効な電話番号ではありません。";
  } else if (typeof valInfo.valFunc === "function") {
    let resultMsg = valInfo.valFunc(value, dataCollectionObj, rowIndex);
    if ($c.util.isEmpty($p, resultMsg) === false) {
      msgInfo.msgType = "2";
      msgInfo.message = resultMsg;
    }
  }
  return msgInfo;
};

/**
 * @method
 * @name setDownloadGridViewOption
* @description エクセルダウンロードオプションを設定します。
 * @param {Object} grdObj GridView Object
* @param {Object} options JSONの形式で保存されたグリッドのExcelダウンロードオプション
* @param {Array} infoArr GridViewに関する内容を追加で他のセルに表現する場合に設定するオプション
 * @hidden N
 * @exception 
 * @example $c.data.setDownloadGridViewOption(grdObj, options);
 */
scwin.setDownloadGridViewOption = function ($p, grdObj, options) {
  if (typeof options === "undefined") {
    options = {
      hiddenVisible: false
    };
  }
  let fileName = options.fileName;
  if ($c.util.isEmpty($p, fileName)) {
    let dataCollectionId = $c.data.getDataCollection($p, grdObj).id;
    if ($c.util.isEmpty($p, dataCollectionId) === false) {
      fileName = dataCollectionId;
    } else {
      fileName = "excel_download";
    }
    if (options.fileType == undefined || options.fileType == "") {
      fileName = fileName + ".xlsx";
    } else {
      fileName = fileName + "." + options.fileType;
    }
    options.fileName = fileName;
  }
  fileName = fileName.toLowerCase();
  if (options.useProvider == true) {
    options.dataProvider = "com.inswave.wrm.provider.ExcelDown";
  }
  if (options.useSplitProvider == true) {
    options.splitProvider = "com.inswave.wrm.provider.ExcelSplitDown";
  }
  if (options.useProvider || options.useSplitProvider) {
    const colCnt = grdObj.getColumnCount();
    let columnsIDArr = new Array();
    for (let i = 0; i < colCnt; i++) {
      let isRemoveCol = false;
      if (typeof options.excludeColumns != "undefined" && options.excludeColumns != null && options.excludeColumns.length > 0) {
        for (let k = 0; k < options.excludeColumns.length; k++) {
          if (grdObj.getColumnID(i) == options.excludeColumns[k]) {
            isRemoveCol = true;
            break;
          }
        }
      }
      if (isRemoveCol) {
        continue;
      }
      columnsIDArr.push(grdObj.getColumnID(i));
    }
    const xmlDoc = WebSquare.xml.parse(options.providerRequestXml, false);
    WebSquare.xml.setValue(xmlDoc, "data/keyMap", columnsIDArr.join(","));
    options.providerRequestXml = WebSquare.xml.serialize(xmlDoc);
    delete options.useProvider;
    delete options.useSplitProvider;
  }

  // options.hiddenVisible=trueが設定されている場合、画面内のhidden列をremoveColumnsに含めて、エクセルダウンロードを行わないようにする。
  if (typeof options.hiddenVisible === "undefined" || options.hiddenVisible == false) {
    const grdCnt = grdObj.getColCnt();
    let hiddenColIndex = [];
    for (let idx = 0; idx < grdCnt; idx++) {
      if (!grdObj.getColumnVisible(idx)) {
        hiddenColIndex.push(idx);
      }
    }
    if (hiddenColIndex.length > 0) {
      if (typeof options.removeColumns !== "undefined" && options.removeColumns.length > 0) {
        options.removeColumns = options.removeColumns + "," + hiddenColIndex.join(',');
      } else {
        options.removeColumns = hiddenColIndex.join(',');
      }

      // 重複要素の削除
      let _removeColumnArr = options.removeColumns.split(",");
      options.removeColumns = _removeColumnArr.reduce(function (a, b) {
        if (a.indexOf(b) < 0) {
          a.push(b);
        }
        return a;
      }, []).join(',');
    }
  }

  // checkedColumnId、checkedDataオプションの処理（データフィルタリング後のExcelダウンロード機能実行）
  if ($c.util.isEmpty($p, options.dataHandler) == true && options.checkedData) {
    options.dataHandler = function (gridViewId) {
      return getDataHandlerData($c.util.getComponent($p, gridViewId), options);
    };
    function getDataHandlerData(grdObj, opts) {
      try {
        const type = parseInt(opts.type, 10); // exceldown のダウンタイプ設定

        const convertIdxList = opts.convertIndex.split(",") || []; // excelダウン時のconvertIndex設定
        const colmId = opts.checkedColumnId || 'chk'; // 対象カラムのIDで、デフォルト値を'chk'に設定

        const colInfo = grdObj.cellInfoHash[grdObj.getColumnID(colmId)]; // 該当columnの情報
        let arrIdx = [];
        if ("checkbox" == colInfo.options.inputType || "radio" == colInfo.options.inputType || "custom" == colInfo.options.inputType) {
          arrIdx = grdObj.getCheckedIndex(colmId);
        } else {
          const chkData = opts.checkedData || "";
          arrIdx = grdObj.getMatchedIndex(colmId, chkData);
        }
        return type == 0 || type == 1 || type == 2 ? getData(arrIdx, type, grdObj, convertIdxList) : grdObj.dataList.getAllData();
        function getData(arrIdx, type, grdObj, convertIdxList) {
          let rtnData = [];
          arrIdx.forEach(function (dataIdx) {
            let displayType = type == 0 ? "realData" : "displayData";
            let rowData = grdObj.getRowData(dataIdx, displayType);
            convertIdxList.forEach(function (convertIdx) {
              if (convertIdx != "") {
                displayType = type != 0 ? "displayData" : "realData";
                rowData[convertIdx] = grdObj.getRowData(dataIdx, displayType)[convertIdx];
              }
            });
            rtnData.push(rowData);
          });
          return rtnData.map(function (item) {
            return Object.values(item);
          }).join().split(",");
        }
      } catch (ex) {
        $c.win.alert($p, $c.data.getMessage($p, "MSG_CM_00067"));
        console.error(ex.toString());
        throw ex;
      }
    }
    ;
  }
};

/**
 * @method
 * @name loadMessage
* @description 多言語メッセージデータ配列を全体照会し、グローバルオブジェクト$c.msgに格納します。
 * @param
 * @hidden N
 * @exception 
 * @example $c.data.loadMessage();
 */
scwin.loadMessage = function ($p) {
  const lang = $c.util.isEmpty($p, $c.win.getLanguage($p)) ? "ko" : $c.win.getLanguage($p);
  const getMessageOption = {
    id: "_sbm_getLanguagePack",
    action: "/message/getAllMessage/" + lang,
    method: "get",
    submitDoneHandler: function (e) {
      WebSquare.WebSquareLang = e.responseJSON.message;
    },
    isProcessMsg: false
  };
  $c.sbm.executeDynamic($p, getMessageOption);
};

/**
 * @method
 * @name initChangeCheckedDc
* @description 変更検査対象のData Collectionを保存するオブジェクトを生成します。
* @param {Object} $p WFrame Scope $pオブジェクト
 * @hidden N
 * @exception 
 * @example $c.data.initChangeCheckedDc = function($p);
 */
scwin.initChangeCheckedDc = function ($p) {
  const scwinObj = $c.util.getObject($p, "scwin");
  if (!$c.util.isEmpty($p, $c.data.getParameter($p, "menuInfo"))) {
    scwinObj._changeCheckDcList = [];
  }
};

/**
 * @method
 * @name setChangeCheckedDc
* @description データが修正されている場合、ウィンドウが閉じられる際にウィンドウを閉じるかどうかを確認するダイアログを呼び出します。
* @param {Object} dataObjArr ウィンドウが閉じられる際に修正されたかどうかをチェックするデータコレクションオブジェクト（データマップまたはデータリスト）
* @returns {Object} topFrameオブジェクト
 * @hidden N
 * @exception 
 * @example $c.win.setChangeCheckedDc([dma_sample, dlt_grdAllData]);
 */
scwin.setChangeCheckedDc = function ($p, dcObjArr) {
  const mainFrameScwin = $c.data.getChangeCheckedMainFrame($p);
  if (!$c.util.isEmpty($p, mainFrameScwin) && !$c.util.isEmpty($p, mainFrameScwin._changeCheckDcList)) {
    if ($c.util.isArray($p, dcObjArr)) {
      for (let id in dcObjArr) {
        mainFrameScwin._changeCheckDcList.push(dcObjArr[id].getID());
      }
    } else {
      mainFrameScwin._changeCheckDcList.push(dcObjArr.getID());
    }
  }
};

/**
 * @method
 * @name getChangeCheckedMainFrame
* @description 変更検査対象のData Collection情報を保存する画面のメインフレームを返します。
* @param {Object} $p WFrame Scope $pオブジェクト
* @returns {Object} topFrame topFrameオブジェクト
 * @hidden N
 * @exception 
 * @example ${example}
 */
scwin.getChangeCheckedMainFrame = function ($p, scopeApi) {
  if (typeof scopeApi == 'object') {
    return scwin.__getChangeCheckedMainFrame(scopeApi);
  }
  const scwinObj = $c.util.getObject($p, "scwin");
  if (typeof scwinObj._changeCheckDcList !== "undefined") {
    return scwinObj;
  } else if ($p.main().$p.getFrameId() !== $p.getFrameId()) {
    scopeApi = $p.parent().$p;
    return $c.data.getChangeCheckedMainFrame($p, scopeApi);
  } else {
    return null;
  }
};

/**
 * @method
 * @name __getChangeCheckedMainFrame
* @description $pパラメータを直接受け取るgetChangeCheckedMainFrame
 * @param {Object} scopeApi WFrame Scope $ㅔ
 * @returns {Object} 
 * @hidden Y
 * @exception
 * @example
 */
scwin.__getChangeCheckedMainFrame = function (scopeApi) {
  let $p = scopeApi;
  const scwinObj = $c.util.getObject($p, "scwin");
  if (typeof scwinObj._changeCheckDcList !== "undefined") {
    return scwinObj;
  } else if ($p.main().$p.getFrameId() !== $p.getFrameId()) {
    scopeApi = $p.parent().$p;
    return $c.data.getChangeCheckedMainFrame($p, scopeApi);
  } else {
    return null;
  }
};

/**
 * @method
 * @name setCommonCode
* @description コード性データとコンポーネントのnodeSet（アイテムリスト）連携機能を提供します。
* cdgrpごとにJSONオブジェクトを生成し、arrayに格納して最初のパラメータとして渡します。
* $c.data.setCommonCode関数では、共通コードのロードのためのSubmission(_sbm_searchCode)を生成するだけです。
* Submissionの(_sbm_searchCode)実行は、config.xmlのwframe > postScriptに定義された$c.win.processCommonData関数で実行されます。
* @param {Object} codeOptions {"code" : "コードグループ", "compID" : "適用するコンポーネント名", useLocalCache : "ローカルキャッシュ使用有無"}
* @param {String} codeOptions.code 共通コードグループコード
* @param {String} codeOptions.compId ロードした共通コードデータを保存したDataListとバインドするコンポーネントID
* @param {Boolean} codeOptions.useLocalCache ローカルキャッシュの使用有無 (true[default] : 共通コードのローカルキャッシュを使用、false : ローカルキャッシュに共通コードデータがある場合は削除し、サーバーから共通コードデータを新たに取得)
* @param {requestCallback} callbackFunc コールバック関数
 * @hidden N
 * @exception 
 * @example const codeOptions = [ { code : "00001", compID : "sbx_Duty" },
                    { code : "00002", compID : "sbx_Postion" },
                    { code : "00021", compID : "sbx_JoinClass" },
                    { code : "00005", compID : "sbx_CommCodePart1, sbx_CommCodePart2"},
                    { code : "00024", compID : "grd_CommCodeSample:JOB_CD", useLocalCache : false} ];
$c.data.setCommonCode(codeOptions);
 */
scwin.setCommonCode = function ($p, codeOptions, callbackFunc) {
  let codeOptionsLen = 0;
  if (codeOptions) {
    codeOptionsLen = codeOptions.length;
  } else {
    console.error("=== $c.setCommonCode Parameter Type Error ===\nex) $c.setCommonCode([{\"code:\":\"04\",\"compID\":\"sbx_Gender\"}],\"scwin.callbackFunction\")\n===================================");
    return;
  }
  let i,
    j,
    codeObj,
    dltId,
    dltIdArr = [],
    paramCode = "",
    compArr,
    compArrLen,
    tmpIdArr;
  const dataListOption = _getCodeDataListOptions(scwin.COMMON_CODE_INFO.FILED_ARR);
  for (i = 0; i < codeOptionsLen; i++) {
    codeObj = codeOptions[i];
    try {
      dltId = scwin.DATA_PREFIX + codeObj.code;
      if (typeof scwin.commonCodeList[dltId] !== "undefined" && codeObj.useLocalCache === false) {
        delete scwin.commonCodeList[dltId];
        $p.data.remove(dltId);
      }
      if (typeof scwin.commonCodeList[dltId] === "undefined") {
        dltIdArr.push(dltId);
        if (i > 0) {
          paramCode += ",";
        }
        paramCode += codeObj.code;
        dataListOption.id = dltId;
        $p.data.create(dataListOption); // 同じIDのDataCollectionが存在する場合、削除後に再作成されます
      } else {
        dataListOption.id = dltId;
        $p.data.create(dataListOption);
        let dataListObj = $p.getComponentById(dataListOption.id);
        dataListObj.setJSON(scwin.commonCodeList[dltId]);
      }
      if (codeObj.compID) {
        compArr = codeObj.compID.replaceAll(" ", "").split(",");
        compArrLen = compArr.length;
        for (j = 0; j < compArrLen; j++) {
          tmpIdArr = compArr[j].split(":");
          if (tmpIdArr.length === 1) {
            const comp = $c.util.getComponent($p, tmpIdArr[0]);
            if (!$c.util.isEmpty($p, comp)) {
              comp.setNodeSet("data:" + dltId, scwin.COMMON_CODE_INFO.LABEL, scwin.COMMON_CODE_INFO.VALUE);
            } else {
              console.warn("[$c.setCommonCode] Component(" + tmpIdArr[0] + ")が見つかりません。");
            }
          } else {
            let gridObj = $c.util.getComponent($p, tmpIdArr[0]);
            if (!$c.util.isEmpty($p, gridObj)) {
              gridObj.setColumnNodeSet(tmpIdArr[1], "data:" + dltId, scwin.COMMON_CODE_INFO.LABEL, scwin.COMMON_CODE_INFO.VALUE);
            } else {
              console.warn("[$c.data.setCommonCode] GridView(" + tmpIdArr[0] + ")が見つかりません。");
            }
          }
        }
      }
    } catch (ex) {
      console.error(ex);
    }
  }
  const searchCodeGrpOption = {
    id: "_sbm_searchCode",
    action: "/common/selectCodeList",
    target: "data:json," + $c.str.serialize($p, dltIdArr),
    isProcessMsg: false
  };
  searchCodeGrpOption.submitDoneHandler = function (e) {
    for (let codeGrpDataListId in e.responseJSON) {
      if (codeGrpDataListId.indexOf(scwin.DATA_PREFIX) > -1) {
        scwin.commonCodeList[codeGrpDataListId] = e.responseJSON[codeGrpDataListId];
      }
    }
    if (typeof callbackFunc === "function") {
      callbackFunc();
    }
  };
  if (paramCode !== "") {
    if ($c.util.isEmpty($p, $c.util.getComponent($p, searchCodeGrpOption.id))) {
      $c.sbm.create($p, searchCodeGrpOption);
    } else {
      $p.deleteSubmission(searchCodeGrpOption.id);
      $c.sbm.create($p, searchCodeGrpOption);
    }
    let sbmObj = $c.util.getComponent($p, searchCodeGrpOption.id);
    const reqData = {
      "dma_commonCode": {
        "GRP_CD": paramCode,
        "DATA_PREFIX": scwin.DATA_PREFIX
      }
    };
    sbmObj.setRequestData(reqData);
  } else {
    if (typeof callbackFunc === "function") {
      callbackFunc();
    }
  }

  // dataListを動的に生成するためのオプション情報を返す。
  function _getCodeDataListOptions(infoArr) {
    const option = {
      "type": "dataList",
      "option": {
        "baseNode": "list",
        "repeatNode": "map"
      },
      "columnInfo": []
    };
    for (let idx in infoArr) {
      option.columnInfo.push({
        "id": infoArr[idx]
      });
    }
    return option;
  }
};

/**
 * @method
 * @name getCommonCodeDataList
* @description 特定の共通コードを格納するDataListオブジェクトを返します。
* サーバーから送信されたデータではなく、画面上でデータ加工が必要な場合、DataListオブジェクトを受け取ってフィルタリングやデータ操作を行うことができます。
* @param {String} cdGrp コードグループ
 * @hidden N
 * @exception 
 * @example 
 * const comDataList1 = $c.data.getCommonCodeDataList("00024");
 * comDataList1.setColumnFilter( 
 * 	{type:'regExp', colIndex:'COM_CD', key:/01|02|04|05/gi, condition:'and'}
 * );
 */
scwin.getCommonCodeDataList = function ($p, cdGrp) {
  return $c.util.getComponent($p, scwin.DATA_PREFIX + cdGrp);
};

/**
 * @method
 * @name executeCommonCode
* @description 共通コードを読み込むSubmissionを実行する。
* scwin.onpageloadイベントで定義された$c.data.setCommonCode関数を通じて生成された共通コード照会Submissionは、scwin.ondataload関数が実行される前に
* UI共通フレームワーク内で自動的に実行される。
* ただし、TabControlのalwaysDraw=falseなどのオプション適用などにより、画面がロードされた後に特定のイベントタイミング以降に共通コードをロードしようとする場合
* $c.data.executeCommonCode()関数を実行すればよい。
* @param {String} cdGrp コードグループ
 * @hidden N
 * @exception 
 * @example 
 * const codeOptions = [ 
 * 	{ code : "00002", compID : "sbx_Postion" },
 *	{ code : "00024", compID : "grd_CommCodeSample:JOB_CD"} ];
 *  $c.data.setCommonCode(codeOptions);
 *  $c.data.executeCommonCode();
 */
scwin.executeCommonCode = function ($p) {
  const sbmSearchCode = $c.util.getComponent($p, "_sbm_searchCode");
  $c.sbm.execute($p, sbmSearchCode);
};

/**
 * @method
 * @name getParameter
* @descriptionパラメータを読み込みます。
* @param {String} paramKey パラメータキー
* @returns {Object} パラメーター値
 * @hidden N
 * @exception 
* @example const code = $c.data.getParameter("code");  // 特定のパラメータ値を取得する
const param = $c.data.getParameter();	   // 全体パラメータ値を取得する
 */
scwin.getParameter = function ($p, paramKey, scopeObj, scopeApi) {
  if (typeof paramKey != "string" && paramKey != undefined) {
    scwin.__getParameter(paramKey, scopeObj, scopeApi);
    return;
  }
  if (!$c.util.isEmpty($p, scopeObj)) {
    $p = scopeObj;
  }
  let paramData = "";
  try {
    paramData = $p.getParameter("paramData");
    if ($c.util.isEmpty($p, paramData) === false && $c.util.isJSON($p, paramData)) {
      if ($c.util.isEmpty($p, paramKey) === false) {
        return paramData[paramKey];
      } else {
        return paramData;
      }
    } else {
      paramData = getUrlParameter("paramData");
      if ($c.util.isEmpty($p, paramData) === false) {
        paramData = $c.util.getJSON($p, WebSquare.text.BASE64Decode(paramData));
        if ($c.util.isEmpty($p, paramKey) === false) {
          return paramData[paramKey];
        } else {
          return paramData;
        }
      }
    }
  } catch (ex) {
    console.error(ex);
    return "";
  }
  return paramData;
  function getUrlParameter(paramKey) {
    let param = [];
    const paramArray = location.search.split(/[\&\?\#]/);
    for (let i = 0; i < paramArray.length; i++) {
      if ($c.util.isEmpty($p, paramArray[i]) === false) {
        const valueIdx = paramArray[i].indexOf("=");
        if (valueIdx > 0) {
          const key = paramArray[i].substring(0, valueIdx);
          const value = paramArray[i].substring(valueIdx + 1);
          if (key === paramKey) {
            return value;
          }
        }
      }
    }
  }
};

/**
 * @method
 * @name __getParameter
* @descriptionパラメータを読み込みます。
* @param {String} scopeApi 特定のwindowの$pの値
* @param {String} paramKey パラメータキー
 * @param {String} scopeObj scope Object
* @returns {Object} パラメーター値
 * @hidden Y
 * @exception 
 */
scwin.__getParameter = function (scopeApi, paramKey, scopeObj) {
  if (!$c.util.isEmpty($p, scopeObj)) {
    $p = scopeApi;
  }
  let paramData = "";
  try {
    paramData = $p.getParameter("paramData");
    if ($c.util.isEmpty($p, paramData) === false && $c.util.isJSON($p, paramData)) {
      if ($c.util.isEmpty($p, paramKey) === false) {
        return paramData[paramKey];
      } else {
        return paramData;
      }
    } else {
      paramData = getUrlParameter("paramData");
      if ($c.util.isEmpty($p, paramData) === false) {
        paramData = $c.util.getJSON($p, WebSquare.text.BASE64Decode(paramData));
        if ($c.util.isEmpty($p, paramKey) === false) {
          return paramData[paramKey];
        } else {
          return paramData;
        }
      }
    }
  } catch (ex) {
    console.error(ex);
    return "";
  }
  return paramData;
  function getUrlParameter(paramKey) {
    let param = [];
    const paramArray = location.search.split(/[\&\?\#]/);
    for (let i = 0; i < paramArray.length; i++) {
      if ($c.util.isEmpty($p, paramArray[i]) === false) {
        const valueIdx = paramArray[i].indexOf("=");
        if (valueIdx > 0) {
          const key = paramArray[i].substring(0, valueIdx);
          const value = paramArray[i].substring(valueIdx + 1);
          if (key === paramKey) {
            return value;
          }
        }
      }
    }
  }
};
/**
 * @method
 * @name getColumnName
* @description 特定のコンポーネントにバインドされたDataListやDataMapのカラム名を返します。
* @param {Object} comObj コンポーネントオブジェクト
* @returns {String} カラム名 カラム名のString
 * @hidden N
 * @exception 
 * @example $c.data.getColumnName(ibx_name);
 */
scwin.getColumnName = function ($p, comObj) {
  try {
    if (typeof comObj.getRef === "function") {
      const ref = comObj.getRef();
      const refArray = ref.substring(5).split(".");
      const dataCollectionName = refArray[0];
      const columnId = refArray[1];
      let dataCollection, dataType;
      if (typeof refArray !== "undefined" && refArray.length === 2) {
        dataCollection = comObj.getScopeWindow().$p.getComponentById(dataCollectionName);
        dataType = dataCollection.getObjectType().toLowerCase();
        if (dataType === "datamap") {
          return dataCollection.getName(columnId);
        } else if (dataType === 'datalist') {
          return dataCollection.getColumnName(columnId);
        }
      } else {
        return "";
      }
    }
  } catch (ex) {
    console.error(ex);
  } finally {
    dataCollection = null;
  }
};

/**
 * @method
 * @name getDataCollection
* @description 特定のコンポーネントにバインドされたDataListやDataMapの情報を返します。
* @param {Object} comObj callerObjコンポーネントオブジェクト
* @returns {Object} データコレクション情報
 * @hidden N
 * @exception 
 * @example $c.data.getDataCollection(ibx_applUserId);
 */
scwin.getDataCollection = function ($p, comObj) {
  try {
    if (typeof comObj !== "undefined" && typeof comObj.getRef === "function") {
      if (comObj.getPluginName() === "gridView") {
        return comObj.getDataListInfo();
      } else {
        let ref = comObj.options.ref;
        if (typeof ref !== "undefined" && ref !== "") {
          let refArray = ref.substring(5).split(".");
          if (typeof refArray !== "undefined" && refArray.length === 2) {
            const dataObjInfo = {};
            dataObjInfo.runtimeDataCollectionId = comObj.getScopeWindow().$p.getFrameId() + "_" + refArray[0];
            dataObjInfo.dataColletionId = refArray[0];
            dataObjInfo.columnId = refArray[1];
            return dataObjInfo;
          } else {
            return null;
          }
        } else {
          return null;
        }
      }
    }
  } catch (e) {
    console.error("[$c.data.getDataCollection] Exception :: " + e.message);
  }
};

/**
 * @method
 * @name getMessage
* @description 共通メッセージコードに該当する共通メッセージコードを返します。
* @param {String} sysMsgId メッセージID、Array形式の場合は最初のインデックスがsysMsgIdとなり、2番目のインデックス以降が置換文字となる
* @param {(String|String[])} arguments メッセージ置換文字列 (メッセージIDで置換が必要な分だけ文字列パラメータを渡す)
 * @hidden N
 * @exception 
 * @example
$c.data.getMessage("MSG_CM_00001");  // "変更されたデータを保存しますか？"
$c.data.getMessage("MSG_CM_00002", $c.str.attachPostposition("電話番号"));  // "電話番号は必須入力値です。"
$c.data.getMessage("MSG_CM_00003", "セッションが終了して");  // "セッションが終了してログイン画面に移動します。"
$c.data.getMessage("MSG_CM_00007", "エクセル", "5M");  // エクセルファイルのサイズが5Mを超えました。
 */
scwin.getMessage = function ($p, msgId) {
  let message = "";
  if ($c.util.isEmpty($p, msgId) === false) {
    message = WebSquare.WebSquareLang[msgId];
  }
  if ($c.util.isEmpty($p, message) === false) {
    let tmpMessage = message;
    if (arguments.length > 1) {
      for (let i = 1; i < arguments.length; i++) {
        if ($c.util.isEmpty($p, arguments[i]) === false) {
          tmpMessage = tmpMessage.indexOf("$[" + (i - 1) + "]") != -1 ? $c.str.replaceAll($p, tmpMessage, "$[" + (i - 1) + "]", arguments[i]) : tmpMessage;
        }
      }
      return tmpMessage;
    } else {
      return tmpMessage;
    }
  } else {
    return "";
  }
};

/**
 * @method
 * @name isModified
* @description DataCollectionオブジェクトの変更されたデータがあるかどうかを検査します。
* @param {Object} dcObjArr DataCollectionまたは配列
* @returns {Boolean} 検査結果
 * @hidden N
 * @exception 
 * @example if ($c.data.validateGridView(grd_indexPage, valInfo) && $c.data.isModified(dlt_grdAllData)) {
$c.win.confirm("保存しますか？", "scwin.saveData");
};
 */
scwin.isModified = function ($p, dcObjArr) {
  let result = false;
  if ($c.util.getObjectType($p, dcObjArr) === "array") {
    for (let idx in dcObjArr) {
      if ($c.util.getObjectType($p, dcObjArr[idx]) === "object") {
        if (isModified(dcObjArr[idx]) === true) {
          result = true;
        }
      }
    }
  } else if ($c.util.getObjectType($p, dcObjArr) === "object") {
    result = isModified(dcObjArr);
  }
  return result;
  function isModified(dcObj) {
    if (typeof dcObj !== "undefined" && typeof dcObj !== null) {
      const modifiedIndex = dcObj.getModifiedIndex();
      if (modifiedIndex.length === 0) {
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
};

/**
 * @method
 * @name downloadMultipleDataList
* @description DataListのデータをExcelファイルとして保存します。
* @param {Object}	options.common							JSONの形式で保存されたdataListのエクセルダウンロードオプション
* @param {String}	options.common.fileName					[default: excel.xls] ダウンロードするファイルの名前
* @param {Boolean} options.common.showProcess				[default: true] ダウンロード時にプロセスウィンドウを表示するかどうか
* @param {String}	options.common.multipleSheet			[default: true] ダウンロード時にdataListごとにシートを分離して出力するかどうか
* @param {Object}	options.common.printSet					Excelの印刷に関する設定がJSON形式で保存されたもの
* @param {String}	options.common.printSet.fitToPage		[default: false] Excelプリンター出力時のページ合わせの使用有無
* @param {String}	options.common.printSet.landScape		[default: false] Excelプリンター出力時の横方向出力の有無
* @param {String}	options.common.printSet.fitWidth		[default: 1] Excelプリンター出力時の用紙幅
* @param {String}	options.common.printSet.fitHeight		[default: 1] Excelプリンター出力時の用紙の高さ
* @param {String}	options.common.printSet.scale			[default: 100] Excelプリンター出力時の拡大/縮小倍率。scaleを使用する場合、fitToPageはfalseに設定する必要があります。
* @param {String}	options.common.printSet.pageSize		[default: A4] エクセルプリンター出力時の印刷用紙サイズ (例: "A3", "A4", "A5", "B4") ただし、fitToPage: true の場合のみ有効。
* @param {Array}	options.excelInfo						JSONの形式で保存されたdataListのオプション情報
* @param {String}	options.excelInfo.dataListId			[default: なし] excelのsheetに保存したDataListのID
* @param {String}	options.excelInfo.sheetName				[default: sheet] excelのシート名
* @param {String}	options.excelInfo.removeColumns			[default: なし] ダウンロード時にExcelから削除したい列の番号（複数ある場合は,で区切る）
* @param {String}	options.excelInfo.foldColumns			[default: なし] ダウンロード時にExcelで折りたたむ列の番号（複数ある場合は,で区切る）
* @param {Number}	options.excelInfo.startRowIndex			[default: 0] ExcelファイルでdataListのデータが開始される行の番号（ヘッダーを含む）
* @param {Number}	options.excelInfo.startColumnIndex		[default: 0] ExcelファイルでdataListのデータが開始される列の番号（ヘッダーを含む）
* @param {String}	options.excelInfo.headerColor			[default: #33CCCC] excelファイルでdataListのheader部分の色
* @param {String}	options.excelInfo.headerFontName		[default: なし] excelファイルでdataListのheader部分のfont name
* @param {String}	options.excelInfo.wframeId				[default: 現在のWFrame Id] DataListが位置するWFrame Id情報
* @param {Array}	options.excelInfo.infoArr				データリストに関する内容を追加で他のセルに表現する場合に使用する配列
* @param {Number}	options.excelInfo.infoArr.rowIndex		内容を表示する行番号
* @param {Number}	options.excelInfo.infoArr.colIndex		内容を表示する列番号
* @param {Number}	options.excelInfo.infoArr.rowSpan		マージする行数
* @param {Number}	options.excelInfo.infoArr.colSpan		結合する列の数
* @param {String}	options.excelInfo.infoArr.text			表示する内容
* @param {String}	options.excelInfo.infoArr.textAlign		表示する内容の整列方法 (left、center、right)
* @param {String}	options.excelInfo.infoArr.fontSize		フォントサイズの設定 ( 例: "20px" )
* @param {String}	options.excelInfo.infoArr.fontName		フォント名の設定
* @param {String}	options.excelInfo.infoArr.color			フォントカラーの設定 ( 例: "red" )
* @param {String}	options.excelInfo.infoArr.fontWeight	フォントの太さの設定 ( 例: "bold" )
* @param {String}	options.excelInfo.infoArr.drawBorder	cellのborderを指定 ( 例: true )
* @param {String}	options.excelInfo.infoArr.wordWrap		セルの改行機能 ( 例: "true" )
 * @hidden N
 * @exception 
 * @example
// id가 a,b,c,d,eである5つのカラムが存在するDataList
const options = {
    common: {
        fileName : "excel_data.xlsx",
        showProcess : true,
        multipleSheet : true,
        printSet : {
            landScape : "true",
            fitToPage : "true",
            fitWidth : "1",
            fitHeight : "1",
            scale : "222"
        }
    },
    excelInfo: [
        {
            dataListId : "dlt_data1",
sheetName : "最初のsheet",
            removeColumns : "1,3",
            foldColumns : "2",
            startRowIndex : 3,
            startColumnIndex : 0,
            headerColor : "#DBEEF3",
            bodyColor : "#92CDDC",
            infoArr : [
                {
rowIndex : 1, colIndex : 3, rowSpan : 1, colSpan : 2, text : "データ表示" , textAlign : "center"
                }
            ]
        },
        {
            dataListId : "dlt_data2",
sheetName : "2番目のsheet",
            removeColumns : "1,3",
            foldColumns : "2",
            startRowIndex : 3,
            startColumnIndex : 0,
            headerColor : "#DBEEF3",
            bodyColor : "#92CDDC",
            infoArr : [
                {
rowIndex : 1, colIndex : 3, rowSpan : 1, colSpan : 2, text : "データ表示" , textAlign : "center"
                }
            ]
        }
    ]
};
$c.data.downloadMultipleDataList(options);
 */
scwin.downloadMultipleDataList = function ($p, optionsParam, infoArrParam) {
  const options = {
    common: {
      fileName: optionsParam.common.fileName || "dataList.xlsx",
      showProcess: optionsParam.common.showProcess || true,
      autoSizeColumn: optionsParam.common.autoSizeColumn || true,
      multipleSheet: optionsParam.common.multipleSheet || true,
      printSet: optionsParam.common.printSet || {}
    },
    excelInfo: []
  };
  if (optionsParam.excelInfo.length > 0) {
    let excelInfoCount = optionsParam.excelInfo.length;
    for (let idx = 0; idx < excelInfoCount; idx++) {
      const wframeId = optionsParam.excelInfo[idx].wframeId || $p.getFrameId();
      const dataListId = optionsParam.excelInfo[idx].dataListId;
      let dataListObj = null;
      if ($c.util.isEmpty($p, wframeId) === false) {
        dataListObj = $p.getComponentById(wframeId + "_" + dataListId);
      } else {
        dataListObj = $p.getComponentById(dataListId);
      }
      if (typeof dataListObj === "undefined") {
        console.warn("[$c.data.downloadMultipleDataList] excelInfo.dataListIdに設定されたDataList(" + dataListId + ")が見つかりません。");
        return;
      }
      const excelInfo = {
        dataListId: dataListId,
        sheetName: optionsParam.excelInfo[idx].sheetName || dataListId,
        removeColumns: optionsParam.excelInfo[idx].removeColumns || "",
        foldColumns: optionsParam.excelInfo[idx].foldColumns || "",
        startRowIndex: optionsParam.excelInfo[idx].startRowIndex || 0,
        startColumnIndex: optionsParam.excelInfo[idx].startColumnIndex || 0,
        headerColor: optionsParam.excelInfo[idx].headerColor || "#33CCCC",
        bodyColor: optionsParam.excelInfo[idx].bodyColor || "#FFFFFF",
        wframeId: wframeId,
        infoArr: optionsParam.excelInfo[idx].infoArr
      };
      options.excelInfo.push(excelInfo);
    }
  } else {
    console.warn("[$c.data.downloadMultipleDataList] options.excelInfoの情報が入力されていません。");
    return;
  }
  WebSquare.util.multipleDataListDownload(options, infoArrParam);
};

/**
 * @method
 * @name downloadMultipleGridView
* @description グリッドビューのデータをExcelでダウンロードする。
* @param {Object}	options.common							JSONフォーマットで保存されたdataListのExcelダウンロードオプション
* @param {String}	options.common.fileName					[default: excel.xls] ダウンロードするファイルの名前
* @param {Boolean} options.common.showProcess				[default: true] ダウンロード時にプロセスウィンドウを表示するかどうか
* @param {String}	options.common.multipleSheet			[default: true] ダウンロード時にdataListごとにシートを分離して出力するかどうか
* @param {Object}	options.common.printSet					Excelの印刷に関する設定がJSON形式で保存されたもの
* @param {String}	options.common.printSet.fitToPage		[default: false] Excelプリンター出力時のページ合わせの使用有無
* @param {String}	options.common.printSet.landScape		[default: false] Excelプリンター出力時の横方向出力の有無
* @param {String}	options.common.printSet.fitWidth		[default: 1] Excelプリンター出力時の用紙幅
* @param {String}	options.common.printSet.fitHeight		[default: 1] Excelプリンター出力時の用紙の高さ
* @param {String}	options.common.printSet.scale			[default: 100] Excelプリンター出力時の拡大/縮小倍率。scaleを使用する場合、fitToPageはfalseに設定する必要があります。
* @param {String}	options.common.printSet.pageSize		[default: A4] エクセルプリンター出力時の印刷用紙サイズ (例: "A3", "A4", "A5", "B4") ただし、fitToPage: true の場合のみ有効。
* @param {Array}	[options.excelInfo]						JSONの形式で保存されたdataListのオプション情報
* @param {String}	options.excelInfo.gridId				[default: なし] excelのsheetに保存したGridViewのID
* @param {String}	options.excelInfo.sheetName				[default: sheet] excelのシート名
* @param {String}	options.excelInfo.removeColumns			[default: なし] ダウンロード時にExcelから削除したい列の番号（複数ある場合は,で区切る）
* @param {String}	options.excelInfo.foldColumns			[default: なし] ダウンロード時にExcelで折りたたむ列の番号（複数ある場合は,で区切る）
* @param {Number}	options.excelInfo.startRowIndex			[default: 0] ExcelファイルでdataListのデータが開始される行の番号（ヘッダーを含む）
* @param {Number}	options.excelInfo.startColumnIndex		[default: 0] ExcelファイルでdataListのデータが開始される列の番号（ヘッダーを含む）
* @param {String}	options.excelInfo.headerColor			[default: #33CCCC] ExcelファイルでdataListのヘッダー部分の色
* @param {String}	options.excelInfo.headerFontName		[default: なし] excelファイルでdataListのheader部分のfont name
* @param {String}	options.excelInfo.wframeId				[default: 現在のWFrame Id] DataListが位置するWFrame Id情報
* @param {Array}	options.excelInfo.infoArr				データリストに関する内容を追加で他のセルに表現する場合に使用する配列
* @param {Number}	options.excelInfo.infoArr.rowIndex		内容を表示する行番号
* @param {Number}	options.excelInfo.infoArr.colIndex		内容を表示する列番号
* @param {Number}	options.excelInfo.infoArr.rowSpan		マージする行数
* @param {Number}	options.excelInfo.infoArr.colSpan		結合する列の数
* @param {String}	options.excelInfo.infoArr.text			表示する内容
* @param {String}	options.excelInfo.infoArr.textAlign		表示する内容の整列方法 (left、center、right)
* @param {String}	options.excelInfo.infoArr.fontSize		フォントサイズの設定 ( 例: "20px" )
* @param {String}	options.excelInfo.infoArr.fontName		フォント名の設定
* @param {String}	options.excelInfo.infoArr.color			フォントカラーの設定 ( 例: "red" )
* @param {String}	options.excelInfo.infoArr.fontWeight	フォントの太さの設定 ( 例: "bold" )
* @param {String}	options.excelInfo.infoArr.drawBorder	cellのborderを指定 ( 例: true )
* @param {String}	options.excelInfo.infoArr.wordWrap		セルの改行機能 ( 例: "true" )
 * @hidden N
 * @exception 
 * @example 

// id가 a,b,c,d,eである5つのカラムが存在するDataList
const options = {
    common: {
        fileName : "excel_data.xlsx",
        showProcess : true,
        multipleSheet : true,
        printSet : {
            landScape : "true",
            fitToPage : "true",
            fitWidth : "1",
            fitHeight : "1",
            scale : "222"
        }
    },
    excelInfo: [
        {
            gridId : "grd_data1",
sheetName : "最初のsheet",
            removeColumns : "1,3",
            foldColumns : "2",
            startRowIndex : 3,
            startColumnIndex : 0,
            headerColor : "#DBEEF3",
            bodyColor : "#92CDDC",
            infoArr : [
                {
rowIndex : 1, colIndex : 3, rowSpan : 1, colSpan : 2, text : "データ表示" , textAlign : "center"
                }
            ]
        },
        {
            gridId : "grd_data2",
sheetName : "2番目のsheet",
            removeColumns : "1,3",
            foldColumns : "2",
            startRowIndex : 3,
            startColumnIndex : 0,
            headerColor : "#DBEEF3",
            bodyColor : "#92CDDC",
            infoArr : [
                {
rowIndex : 1, colIndex : 3, rowSpan : 1, colSpan : 2, text : "データ表示" , textAlign : "center"
                }
            ]
        }
    ]
};
$c.data.downloadMultipleGridView(options);
 */
scwin.downloadMultipleGridView = function ($p, optionsParam, infoArrParam) {
  const options = {
    common: {
      fileName: optionsParam.common.fileName || "gridView.xlsx",
      showProcess: optionsParam.common.showProcess || true,
      autoSizeColumn: optionsParam.common.autoSizeColumn || true,
      multipleSheet: optionsParam.common.multipleSheet || true,
      printSet: optionsParam.common.printSet || {},
      msaName: optionsParam.common.msaName || ""
    },
    excelInfo: []
  };
  if (optionsParam.excelInfo.length > 0) {
    let excelInfoCount = optionsParam.excelInfo.length;
    for (let idx = 0; idx < excelInfoCount; idx++) {
      const wframeId = optionsParam.excelInfo[idx].wframeId || $p.getFrameId();
      const gridId = optionsParam.excelInfo[idx].gridId;
      let gridObj = null;
      if ($c.util.isEmpty($p, wframeId) === false) {
        gridObj = $p.getComponentById(wframeId + "_" + gridId);
      } else {
        gridObj = $p.getComponentById(gridId);
      }
      if (typeof gridObj === "undefined") {
        console.warn("[$c.data.downloadMultipleDataList] excelInfo.gridIdに設定された " + gridId + " GridViewが見つかりません。");
        return;
      }
      const excelInfo = {
        gridId: gridId,
        sheetName: optionsParam.excelInfo[idx].sheetName || gridId,
        removeColumns: optionsParam.excelInfo[idx].removeColumns || "",
        foldColumns: optionsParam.excelInfo[idx].foldColumns || "",
        startRowIndex: optionsParam.excelInfo[idx].startRowIndex || 0,
        startColumnIndex: optionsParam.excelInfo[idx].startColumnIndex || 0,
        headerColor: optionsParam.excelInfo[idx].headerColor || "#33CCCC",
        bodyColor: optionsParam.excelInfo[idx].bodyColor || "#FFFFFF",
        wframeId: wframeId,
        infoArr: optionsParam.excelInfo[idx].infoArr
      };
      options.excelInfo.push(excelInfo);
    }
  } else {
    console.warn("[$c.data.downloadMultipleGridView] options.excelInfoの情報が入力されていません。");
    return;
  }
  WebSquare.util.multipleExcelDownload(options, infoArrParam);
};

/**
 * @method
 * @name downloadGridViewExcel
* @description 設定されたオプションでExcelをダウンロードする。
* @param {Object}	grdObj GridViewオブジェクト
* @param {Object}	options JSONの形式で保存されたグリッドのExcelダウンロードオプション
* @param {Boolean} options.hiddenVisible			[default: false] GridViewの非表示列をExcelダウンロード時に含めるかどうか (true: 含める、false: 含めない)
* @param {String}	options.fileName				[default: excel.xls] ダウンロードするファイルの名前で、必須入力値です。
* @param {String}	options.sheetName				[default: sheet] Excelのシート名
* @param {String}	options.type					[default: 0] typeが0の場合は実際のデータ、1の場合は表示されているデータ、2の場合は格納されているdataそのまま（filterを無視し、expressionタイプのセルは出力されない）
* @param {String}	options.removeColumns			[default: なし] ダウンロード時にExcelから削除したい列の番号（複数ある場合は,で区切る）
* @param {String}	options.removeHeaderRows		[default: なし] ダウンロード時にExcelから削除するヘッダーの行インデックス（複数ある場合は,で区切る）
* @param {String}	options.foldColumns				[default: なし] ダウンロード時にExcelで折りたたむ列の番号（複数ある場合は,で区切る）
* @param {Number}	options.startRowIndex			[default: 0] Excelファイルでグリッドのデータが開始される行の番号（ヘッダーを含む）
* @param {Number}	options.startColumnIndex		[default: 0] Excelファイルでグリッドのデータが開始される列の番号（ヘッダーを含む）
* @param {String}	options.headerColor				[default: #33CCCC] Excelファイルでグリッドのヘッダー部分の色
* @param {String}	options.headerFontName			[default: なし] excelファイルにおけるグリッドのheader部分のフォント名
* @param {String}	options.headerFontSize			[default: 10] Excelファイルにおけるグリッドのヘッダー部分のフォントサイズ
* @param {String}	options.headerFontColor			[default: なし] excelファイルにおけるグリッドのheader部分のフォント色
* @param {String}	options.bodyColor				[default: #FFFFFF] Excelファイルでグリッドのbody部分の色
* @param {String}	options.bodyFontName			[default: なし] excelファイルにおけるグリッドのbody部分のフォント名
* @param {String}	options.bodyFontSize			[default: 10] Excelファイルにおけるグリッドのbody部分のフォントサイズ
* @param {String}	options.bodyFontColor			[default: なし] excelファイルにおけるグリッドのbody部分のフォント色
* @param {String}	options.subTotalColor			[default: #CCFFCC] excelファイルにおけるグリッドのsubtotal部分の色
* @param {String}	options.subTotalFontName		[default: なし] excelファイルにおけるグリッドのsubtotal部分のフォント名
* @param {String}	options.subTotalFontSize		[default: 10] Excelファイルにおけるグリッドのsubtotal部分のフォントサイズ
* @param {String}	options.subTotalFontColor		[default: なし] excelファイルにおけるグリッドのsubtotal部分のフォント色
* @param {String}	options.footerColor				[default: #008000] Excelファイルにおけるグリッドのフッター部分の色
* @param {String}	options.footerFontName			[default: なし] excelファイルにおけるグリッドのフッター部分のフォント名
* @param {String}	options.footerFontSize			[default: 10] Excelファイルにおけるグリッドのフッター部分のフォントサイズ
* @param {String}	options.footerFontColor			[default: なし] excelファイルにおけるグリッドのフッター部分のフォント色
* @param {String}	options.oddRowBackgroundColor	[default: なし] excelファイルにおけるグリッドbodyの奇数行の背景色
* @param {String}	options.evenRowBackgroundColor	[default: なし] excelファイルにおけるグリッドbodyの偶数行の背景色
* @param {String}	options.rowNumHeaderColor		[default: なし] rowNumVisibleプロパティがtrueの場合、行番号出力ヘッダー領域の背景色
* @param {String}	options.rowNumHeaderFontName	[default: なし] rowNumVisible属性がtrueの場合、行番号出力ヘッダー領域のフォント名
* @param {String}	options.rowNumHeaderFontSize	[default: なし] rowNumVisible属性がtrueの場合、行番号出力ヘッダー領域のフォントサイズ
* @param {String}	options.rowNumHeaderFontColor	[default: なし] rowNumVisible プロパティが true の場合、行番号出力ヘッダー領域のフォントカラー
* @param {String}	options.rowNumBodyColor			[default: なし] rowNumVisible属性がtrueの場合、行番号出力Body領域の背景色
* @param {String}	options.rowNumBodyFontName		[default: なし] rowNumVisible 属性がtrueの場合、行番号出力Body領域のフォント名
* @param {String}	options.rowNumBodyFontSize		[default: なし] rowNumVisible プロパティが true の場合、行番号出力 Body 領域のフォントサイズ
* @param {String}	options.rowNumBodyFontColor		[default: なし] rowNumVisible プロパティが true の場合、行番号出力 Body 領域のフォントカラー
* @param {String}	options.rowNumFooterColor		[default: なし] rowNumVisibleプロパティがtrueの場合、行番号出力Footerエリアの背景色
* @param {String}	options.rowNumFooterFontName	[default: なし] rowNumVisible属性がtrueの場合、行番号出力Footer領域のフォント名
* @param {String}	options.rowNumFooterFontSize	[default: なし] rowNumVisible属性がtrueの場合、行番号出力Footer領域のフォントサイズ
* @param {String}	options.rowNumFooterFontColor	[default: なし] rowNumVisible 属性が true の場合、行番号出力 Footer 領域のフォントカラー
* @param {String}	options.rowNumSubTotalColor		[default: なし] rowNumVisibleプロパティがtrueの場合、行番号出力のSubtotal領域の背景色
* @param {String}	options.rowNumSubTotalFontName  [default: なし] rowNumVisibleプロパティがtrueの場合、行番号出力Subtotal領域のフォント名
* @param {String}	options.rowNumSubTotalFontSize  [default: なし] rowNumVisibleプロパティがtrueの場合、行番号出力Subtotal領域のフォントサイズ
* @param {String}	options.rowNumSubTotalFontColor [default: なし] rowNumVisibleプロパティがtrueの場合、行番号出力のSubtotal領域のフォントカラー
* @param {String}	options.rowNumHeaderValue		[default: なし] rowNumVisibleプロパティがtrueの場合、行番号出力ヘッダー領域の出力値
* @param {String}	options.rowNumVisible			[default: false] 行番号出力の有無
* @param {Boolean}   options.showProcess			[default: true] ダウンロード時にプロセスウィンドウを表示するかどうか
* @param {Boolean}   options.massStorage			[default: true] 大容量ダウンロードの有無 (デフォルトはtrue。このオプションをtrueにし、showConfirmをfalseにした場合、IEで信頼できるサイトをチェックするオプションが表示される。)
* @param {Boolean}   options.numberToText			[default: false] numberExtraction="true"で、dataType="number"に設定された列のデータをExcelファイルにダウンロードする際、コンマなどフォーマットに含まれる記号を維持します。
* @param {Boolean}   options.showConfirm			[default: false] ダウンロード確認ウィンドウを表示するかどうか（このオプションを有効にした場合、advancedExcelDownloadを呼び出した後、ユーザーがウィンドウのボタンをもう一度クリックする必要があります。massStorageは自動的にtrueになります）
* @param {String}	options.dataProvider			[default: なし] 大量データの処理およびユーザーデータを加工できるProvider Package
* @param {String}	options.splitProvider			[default: なし] 大量データ処理のためにデータを分割して処理できるProvider Package
* @param {String}	options.providerRequestXml		[default: なし] Provider内部で使用するXML文字列
* @param {String}	options.userDataXml				[default: なし] ユーザーがサーバーモジュール開発時に必要なデータを送信できる変数
* @param {Boolean}   options.bodyWordwrap			[default: false] ダウンロード時のbodyの改行機能
* @param {Boolean}   options.subtotalWordwrap		[default: false] ダウンロード時のsubtotalの改行機能
* @param {Boolean}   options.footerWordwrap		[default: false] ダウンロード時のフッターの改行機能
* @param {String}	options.useEuroLocale			[default: false] ダウンロード時のユーロ通貨処理機能（,と.が逆の場合の処理）
* @param {String}	options.useHeader				[default: true] ダウンロード時にヘッダーを出力するかどうか（"true"の場合は出力、"false"の場合は未出力）
* @param {String}	options.useSubTotal				[default: false] ダウンロード時にSubTotalを出力するかどうか（"true"の場合は出力、"false"の場合は未出力）、expressionを指定した場合はavg・sum・min・max・targetColValue・数値をサポートします。
* @param {String}	options.useFooter				[default: true] ダウンロード時にFooterを出力するかどうか（"true"の場合は出力、"false"の場合は未出力）
* @param {String}	options.useHeaderCheckBoxLabel	[default: false] ダウンロード時にヘッダーがチェックボックスの場合、チェック済み値の代わりにラベルを出力するかどうか（"true"の場合はヘッダーカラム値を出力、"false"の場合はチェック済み値を出力）
* @param {String}	options.separator				[default: ,] ダウンロード時にサーバーにデータを送信する際、データを区切る文字。デフォルトはカンマ(,)
* @param {Number}	options.subTotalScale			[default: -1] ダウンロード時のsubTotal平均計算における小数点以下の桁数を指定
* @param {String}	options.subTotalRoundingMode	[default: なし] ダウンロード時のsubTotal平均計算時のRoundを指定する。("CEILING","FLOOR","HALF_UP")
* @param {String}	options.useStyle				[default: false] ダウンロード時にcssを除いたstyleをexcelにも適用するかどうか（背景色・フォント）
* @param {String}	options.freezePane				[default: ""] 枠固定のための座標値および座標値のオフセット（例：freezePane="3,4" X軸3、Y軸4で枠固定、freezePane="0,1,0,5" X軸0、Y軸1からX軸方向に0、Y軸方向に5で枠固定）
* @param {String}	options.autoSizeColumn			[default: false] 幅の自動調整の設定有無
* @param {String}	options.displayGridlines		[default: false] Excelの全セルのグリッドライン削除の有無
* @param {String}	options.colMerge				[default: false] colMergeされた列をマージして出力するかどうか
* @param {String}	options.colMergeTextAlign		[default: center] 列マージされた列のtextAlign設定 (bottom、center、top設定)
* @param {String}	options.mergeCell				[default: false] gridView mergeCellのAPIでセルをマージする際、Excelにも同様にマージしてダウンロードするかどうか
* @param {String}	options.useDataFormat			[default: なし] "true"の場合、dataTypeに応じてExcelファイルに表示形式を出力。dataType="text"のセルはExcelの表示形式に'テキスト'を出力、dataType="number"または"bigDecimal"のセルは"数値"を出力。
* @param {String}	options.indent					[default: なし] グリッドのdataTypeがdrilldownの場合、インデントを表示するための空白挿入数。デフォルト値は0
* @param {String}	options.columnMove				[default: false] グリッドの列移動時に移動された状態でダウンロードするかどうか（"true"の場合、列の移動順序で出力）
* @param {String}	options.columnOrder				[default: なし] エクセルダウンロード時にダウンロードされるカラムの順序を指定できる属性 ( 例: "0,3,2,1"と指定すると指定した順序でダウンロードされる )
* @param {String}	options.columnMoveWithFooter	[default: なし] グリッドのカラム移動時にFooter領域が移動された状態でダウンロードするかどうか
* @param {String}	options.optionParam				[default: なし] DRM連携時にユーザー定義クラスにHashMap引数として渡す値。キーは"optionParam"として参照する。
* @param {String}	options.rowHeight				[default: なし] Excelファイルとしてダウンロードする際のExcelセルの高さ。（単位: pixel）
* @param {String}	options.pwd						[default: なし] Excelファイルをダウンロードする際にパスワードを設定。使用条件：(1) パスワードはBASE64でエンコードして送信する必要がある。(2) websquare.xmlに<encrypt tempDir>を設定する必要がある。(3) POI 3.10へのアップグレードが必要。
* @param {String}	options.maxCellCount			[default: なし] エクセルダウンロードを制限するセル数 ( 例: 1000に設定すると、グリッドのセル数が1000個を超える場合、サーバーにリクエストを送信しない。)
* @param {String}	options.maxRowCount			 	[default: なし] エクセルダウンロードを制限する行数 ( 例: 1000に設定すると、グリッドの行数が1000を超える場合、サーバーにリクエストを送信しない )
* @param {String}	options.headerAutoFilter		[default: false] ヘッダーにフィルターを適用するかどうか
* @param {String}	options.filterRowIndex			[default: -1] フィルターを適用するヘッダーのrow Index
* @param {Object}	options.printSet				Excel印刷に関する設定がJSON形式で保存されたもの
* @param {String}	options.printSet.fitToPage		[default: false] Excelプリンター出力時のページ合わせの使用有無
* @param {String}	options.printSet.landScape		[default: false] Excelプリンター出力時の横方向出力の有無
* @param {String}	options.printSet.fitWidth		[default: 1] Excelプリンター出力時の用紙幅
* @param {String}	options.printSet.fitHeight		[default: 1] Excelプリンター出力時の用紙高さ
* @param {String}	options.printSet.scale			[default: 100] Excelプリンター出力時の拡大/縮小倍率。scaleを使用する場合、fitToPageはfalseに設定する必要があります。
* @param {String}	options.printSet.pageSize		[default: A4] エクセルプリンター出力時の印刷用紙サイズ (例: "A3", "A4", "A5", "B4") ただし、fitToPage: true の場合のみ有効。
* @param {Number}	options.timeout					[デフォルト: なし] リクエストの最大待機時間。ミリ秒単位。timeoutまでに応答がない場合、ダウンロードをfail処理します。
* @param {Number}	options.checkInterval			[default: 1000] 応答確認間隔。ミリ秒単位。指定された周期ごとに応答を確認する。
* @param {Function}  options.onSuccessCallback		[default: なし] リクエスト成功時に呼び出されるコールバック関数。
* @param {Function}  options.onFailureCallback		[default: なし] リクエスト失敗時に呼び出されるcallback関数。
 *
* @param {Object[]}  [infoArr]						subTotalFontNameグリッドに関する内容を追加で他のセルに表現する場合に使用する配列
* @param {Number}	infoArr.rowIndex				内容を表示する行番号
* @param {Number}	infoArr.colIndex				内容を表示する列番号
* @param {Number}	infoArr.rowSpan					結合する行数
* @param {Number}	infoArr.colSpan					結合する列の数
* @param {String}	infoArr.text					表示する内容
* @param {String}	infoArr.textAlign				表示する内容の整列方法 (left、center、right)
* @param {String}	infoArr.fontSize				フォントサイズの設定 ( 例: "20px" )
* @param {String}	infoArr.fontName				フォント名の設定
* @param {String}	infoArr.color					フォントカラーの設定 ( 例: "red" )
* @param {String}	infoArr.fontWeight				font weightの設定 ( 例: "bold" )
* @param {String}	infoArr.drawBorder				cellのborder指定 ( 例: true )
* @param {String}	infoArr.borderColor				cellのborder colorを指定 ( 例: "#FF0000", "red" )
* @param {String}	infoArr.borderWidth				セルのボーダー幅を指定 ( "thin", "medium", "thick" )
* @param {String}	infoArr.wordWrap				cellの改行機能 ( 例: "true" )
* @param {String}	infoArr.bgColor					セルの背景色を設定 ( 例: "red" )
 * @hidden N
 * @return {file} <b>Excel file</b>
 * @exception 
 * @example 
const gridId = "grd_advancedExcel";
const infoArr = [];
const options = {
fileName : "downLoadExcel.xlsx" //[default : excel.xlsx] options.fileNameの値がない場合、デフォルト値を設定
};
$c.data.downloadGridViewExcel(grdObj, options, infoArr);
 */
scwin.downloadGridViewExcel = function ($p, grdObj, options, infoArr) {
  if ($c.util.isEmpty($p, options)) {
    options = {};
  }
  if (typeof infoArr === "undefined") {
    infoArr = [];
  }
  const opts = {
    fileName: options.fileName || "excel.xlsx",
    //String, [defalut: excel.xlsx] ダウンロードしようとするファイルの名前で、必須入力値です。
    sheetName: options.sheetName || "sheet",
    //String, [defalut: sheet] Excelのシート名
    type: options.type || "0",
    //String, [デフォルト: 0] typeが0の場合は実際のデータ、1の場合は表示されているデータ、2の場合は格納されているdataそのまま（filterを無視し、expressionタイプのセルは出力されない）
    removeColumns: options.removeColumns || "",
    //String, [デフォルト: なし] ダウンロード時にExcelから削除したい列の番号（複数ある場合は,で区切る）
    convertIndex: options.convertIndex || "",
    // [デフォルト: なし] typeが"0"または"1"の場合、特定の列のみtypeが"1"または"0"のデータとしてダウンロード。type="1"の状態でconvertIndex="0,2"の場合、indexが0,2の列はtype="1"でダウンロード。
    removeHeaderRows: options.removeHeaderRows || "",
    //String, [デフォルト: なし]	ダウンロード時にExcelで削除したいヘッダーの行インデックス（複数ある場合は,で区切る）
    foldColumns: options.foldColumns || "",
    //String, [default: なし] ダウンロード時にExcelで折りたたむ列の番号（複数ある場合は,で区切る）
    useHeaderCheckBoxLabel: options.useHeaderCheckBoxLabel || "true",
    // String, [default: false] ダウンロード時にheaderがcheckboxの場合、checked値の代わりにlabelを出力するかどうか ("true"はvalueを出力、"false"はchecked値を出力)
    startRowIndex: options.startRowIndex || 0,
    //Number, Excelファイルでグリッドのデータが開始される行の番号（ヘッダーを含む）
    startColumnIndex: options.startColumnIndex || 0,
    //Number, Excelファイルでグリッドのデータが開始される列の番号（ヘッダーを含む）
    headerColor: options.headerColor || "#eeeeee",
    //String, excelファイルでグリッドのheader部分の色

    headerFontName: options.headerFontName || "",
    //String, [default: なし] excelファイルにおけるグリッドのheader部分のfont name
    headerFontSize: options.headerFontSize || "10",
    //String, excelファイルでグリッドのheader部分のfont size
    headerFontColor: options.headerFontColor || "",
    //String, excelファイルでグリッドのheader部分のフォント色
    bodyColor: options.bodyColor || "#FFFFFF",
    //String, Excelファイルでグリッドのbody部分の色
    bodyFontName: options.bodyFontName || "",
    //String, [デフォルト: なし] Excelファイルにおけるグリッドのbody部分のフォント名
    bodyFontSize: options.bodyFontSize || "10",
    //String, Excelファイルでグリッドのbody部分のフォントサイズ
    bodyFontColor: options.bodyFontColor || "",
    //String, excelファイルにおけるグリッドのbody部分のフォント色
    subTotalColor: options.subTotalColor || "#CCFFCC",
    //String, [defalut: #CCFFCC] Excelファイルでグリッドのsubtotal部分の色
    subTotalFontName: options.subTotalFontName || "",
    //String, [default: なし] excelファイルにおけるグリッドのsubtotal部分のfont name
    subTotalFontSize: options.subTotalFontSize || "10",
    //String, [defalut: 10] Excelファイルでグリッドのsubtotal部分のフォントサイズ
    subTotalFontColor: options.subTotalFontColor || "",
    //String, [default: なし] Excelファイルにおけるグリッドのsubtotal部分のフォント色
    footerColor: options.footerColor || "#008000",
    //String, [defalut: #008000] Excelファイルでグリッドのフッター部分の色
    footerFontName: options.footerFontName || "",
    //String, [default: なし] Excelファイルにおけるグリッドのフッター部分のフォント名
    footerFontSize: options.footerFontSize || "10",
    //String, [defalut: 10] excelファイルにおけるグリッドのフッター部分のフォントサイズ
    footerFontColor: options.footerFontColor || "",
    //String, [default: なし] excelファイルにおけるグリッドのフッター部分のフォント色
    oddRowBackgroundColor: options.oddRowBackgroundColor || "",
    //String, excelファイルでグリッドのbodyの奇数行の背景色
    evenRowBackgroundColor: options.evenRowBackgroundColor || "",
    //String, [default: なし] excelファイルでグリッドbodyの偶数行の背景色
    rowNumHeaderColor: options.rowNumHeaderColor || "",
    //String, [デフォルト: なし] rowNumVisible属性がtrueの場合、行番号出力ヘッダー領域の背景色
    rowNumHeaderFontName: options.rowNumHeaderFontName || "",
    //String, [default: なし] rowNumVisible属性がtrueの場合、行番号出力header領域のフォント名
    rowNumHeaderFontSize: options.rowNumHeaderFontSize || "",
    //String, [default: なし] rowNumVisible属性がtrueの場合、行番号出力header領域のフォントサイズ
    rowNumHeaderFontColor: options.rowNumHeaderFontColor || "",
    //String, [default: なし] rowNumVisible属性がtrueの場合、行番号出力header領域のフォントカラー
    rowNumBodyColor: options.rowNumBodyColor || "",
    //String, [デフォルト: なし] rowNumVisible属性がtrueの場合、行番号出力Body領域の背景色
    rowNumBodyFontName: options.rowNumBodyFontName || "",
    //String, [default: なし] rowNumVisible属性がtrueの場合、行番号出力Body領域のフォント名
    rowNumBodyFontSize: options.rowNumBodyFontSize || "",
    //String, [default: なし] rowNumVisible属性がtrueの場合、行番号出力Body領域のフォントサイズ
    rowNumBodyFontColor: options.rowNumBodyFontColor || "",
    //String, [default: なし] rowNumVisible属性がtrueの場合、行番号出力Body領域のフォントカラー
    rowNumFooterColor: options.rowNumFooterColor || "",
    //String, [デフォルト: なし] rowNumVisible プロパティが true の場合、行番号出力 Footer 領域の背景色
    rowNumFooterFontName: options.rowNumFooterFontName || "",
    //String, [default: なし] rowNumVisible属性がtrueの場合、行番号出力Footer領域のフォント名
    rowNumFooterFontSize: options.rowNumFooterFontSize || "",
    //String, [default: なし] rowNumVisible属性がtrueの場合、行番号出力Footer領域のフォントサイズ
    rowNumFooterFontColor: options.rowNumFooterFontColor || "",
    //String, [default: なし] rowNumVisible属性がtrueの場合、行番号出力Footer領域のフォントカラー
    rowNumSubTotalColor: options.rowNumSubTotalColor || "",
    //String, [default: なし] rowNumVisible属性がtrueの場合、行番号出力Subtotal領域の背景色
    rowNumSubTotalFontName: options.rowNumSubTotalFontName || "",
    //String, [default: なし] rowNumVisible属性がtrueの場合、行番号出力Subtotal領域のフォント名
    rowNumSubTotalFontSize: options.rowNumSubTotalFontSize || "",
    //String, [default: なし] rowNumVisible属性がtrueの場合、行番号出力Subtotal領域のフォントサイズ
    rowNumSubTotalFontColor: options.rowNumSubTotalFontColor || "",
    //String, [default: なし] rowNumVisible プロパティが true の場合、行番号出力 Subtotal 領域のフォントカラー
    rowNumHeaderValue: options.rowNumHeaderValue || "",
    //String, [default: なし] rowNumVisibleプロパティがtrueの場合、行番号出力ヘッダー領域の出力値
    rowNumVisible: options.rowNumVisible || "false",
    //String, [defalut: false] 行番号出力の有無
    showProcess: WebSquare.util.getBoolean(options.showProcess) || true,
    //Boolean, [defalut: true] ダウンロード時にプロセスウィンドウを表示するかどうか
    massStorage: WebSquare.util.getBoolean(options.massStorage) || true,
    //Boolean, [default: true] 大容量ダウンロードの有無 (デフォルトはtrueです。このオプションをtrueにし、showConfirmをfalseにした場合、IEで信頼できるサイトをチェックするオプションが表示されます。)
    showConfirm: WebSquare.util.getBoolean(options.showConfirm) || false,
    //Boolean, [defalut: false] ダウンロード確認ウィンドウを表示するかどうか（オプションを有効にした場合、advancedExcelDownloadを呼び出した後、ユーザーがウィンドウのボタンをもう一度クリックする必要がある。massStorageは自動的にtrueになる）
    useProvider: options.useProvider || false,
    //boolean, Providerの使用有無を設定
    useSplitProvider: options.useSplitProvider || false,
    // boolean, split Providerの使用有無を設定
    dataProvider: options.dataProvider || "",
    // String, ExcelHeaderDownの設定のためのプロパティ
    providerRequestXml: options.providerRequestXml || "",
    //String, [default: なし] Provider内部で使用するXML文字列
    userDataXml: options.userDataXml || "",
    //String, [default: なし] ユーザーがサーバーモジュール開発時に必要なデータを送信できる変数
    bodyWordwrap: WebSquare.util.getBoolean(options.bodyWordwrap) || false,
    //Boolean, [default: false] ダウンロード時のボディの改行機能
    useEuroLocale: options.useEuroLocale || "false",
    //String, [default: false] ダウンロード時のユーロ通貨処理機能（,と.が逆の場合の処理）
    useHeader: options.useHeader || "true",
    //String, [default: true] ダウンロード時にヘッダーを出力するかどうか（"true"の場合は出力、"false"の場合は出力しない）
    useSubTotal: options.useSubTotal || "false",
    //String, [デフォルト: false] ダウンロード時にSubTotalを出力するかどうか（"true"の場合は出力、"false"の場合は未出力）、expressionを指定した場合はavg、sum、min、max、targetColValue、数値をサポートします。
    useFooter: options.useFooter || "true",
    //String, [default: true] ダウンロード時にFooterを出力するかどうか（"true"の場合は出力、"false"の場合は未出力）
    separator: options.separator || ",",
    //String, [defalut: ,] ダウンロード時にサーバーにデータを送信する際、データを区切る文字。デフォルトはカンマ(,)
    subTotalScale: options.subTotalScale || -1,
    //Number, [defalut: -1] ダウンロード時のsubTotal平均計算における小数点以下の桁数を指定
    subTotalRoundingMode: options.subTotalRoundingMode || "",
    //String, [default: なし] ダウンロード時のsubTotal平均計算時のRoundを指定する。("CEILING","FLOOR","HALF_UP")
    useStyle: options.useStyle || "",
    //String, [デフォルト: false] ダウンロード時にcssを除いたstyleをexcelにも適用するかどうか（背景色、フォント）
    freezePane: options.freezePane || "",
    //String, [defalut: ""] 枠固定のための座標値および座標値のオフセット ( 例) freezePane="3,4" X軸3、Y軸4で枠固定、freezePane="0,1,0,5" X軸0、Y軸1でX軸に0、Y軸に5で枠固定 )
    autoSizeColumn: options.autoSizeColumn || "true",
    //String, [defalut: false] 幅自動調整の設定有無 - 2016.08.18 オプション設定をtrueに変更
    displayGridlines: options.displayGridlines || "",
    //String, [default: false] Excelの全セルのグリッド線を表示するかどうか
    colMerge: options.colMerge || "",
    //String, [defalut: false] colMergeされた列をマージして出力するかどうか
    useDataFormat: options.useDataFormat || "",
    //String, [デフォルト: なし] グリッドのdataTypeがtextの場合、Excelの表示形式「テキスト」の出力有無（"true"の場合は表示形式テキスト、"false"の場合は表示形式一般を出力）
    indent: options.indent || "",
    //String, [デフォルト: なし] グリッドのdataTypeがdrilldownの場合、インデントを表示するための空白挿入数、デフォルト値は0
    columnMove: options.columnMove || "",
    //String, [defalut: false] グリッドの列移動時に移動された状態でダウンロードするかどうか（"true"の場合、列の移動順序で出力）
    columnOrder: options.columnOrder || "",
    //String, [デフォルト: なし] Excelダウンロード時にダウンロードされるカラムの順序を指定できる属性 ( 例: "0,3,2,1"と指定すると指定した順序でダウンロードされる )
    fitToPage: options.fitToPage || "false",
    //String, [default: false] Excelプリンター出力時のページ合わせの使用有無
    landScape: options.landScape || "false",
    //String, [defalut: false] エクセルプリンター出力時の横方向出力の有無
    fitWidth: options.fitWidth || "1",
    //String, [デフォルト: 1] Excelプリンター出力時の用紙幅
    fitHeight: options.fitHeight || "1",
    //String, [defalut: 1] エクセルプリンター出力時の用紙の高さ
    scale: options.scale || "100",
    //String, [デフォルト: 100] Excelプリンタ出力時の拡大/縮小率。scaleを使用する場合、fitToPageはfalseに設定する必要がある。
    pageSize: options.pageSize || "A4",
    //String, [defalut: A4] エクセルプリンター出力時の印刷用紙設定 ( 例: "A3", "A4", "A5", "B4" )
    checkedData: options.checkedData || false,
    // チェックされているデータのみダウンロードするか？
    dataHandler: options.dataHandler || "",
    // [デフォルト:なし] DataHandler関数の定義
    checkedColumnId: options.checkedColumnId || "",
    // チェックを確認したい対象のカラムID デフォルト:chk
    onSuccessCallback: function (e) {},
    onFailureCallback: function (e) {}
  };

  //infoArrの処理
  // colIndex、rowIndex、rowSpan、colSpanの値がJSONでは文字列として処理されるため、Numberに型変換します。
  if (infoArr != undefined && infoArr.length > 0) {
    infoArr[0].rowIndex = Number(infoArr[0].rowIndex) || 0; // Number [ default : 0 ] 
    infoArr[0].colIndex = Number(infoArr[0].colIndex) || 0; // Number [ default : 0 ] 
    infoArr[0].rowSpan = Number(infoArr[0].rowSpan) || 0; // Number [ default : 0 ] 
    infoArr[0].colSpan = Number(infoArr[0].colSpan) || 0; // Number [ default : 0 ] 
  }
  $c.data.setDownloadGridViewOption($p, grdObj, opts);
  grdObj.advancedExcelDownload(opts, infoArr);
};

/**
 * @method
 * @name downloadGridViewCSV
* @description 設定されたオプションでCSVファイルをダウンロードする。
 * @param {Object}   grdObj GridView Object
* @param {Object[]} options 					JSONの形式で保存されたグリッドのExcelダウンロードオプション
* @param {String}   options.fileName			[default: csvfile.csv] エクセルファイル選択ダイアログが表示される際にデフォルトで指定されるファイル名
* @param {String}   options.type				[default: 1, 0] Gridの保存形式 (0の場合はデータ形式、1の場合は表示形式)
* @param {String}   options.delim				[default: ';'] CSVファイルでデータを区切る文字
* @param {String}   options.removeColumns		[default: なし] 保存しないカラムのインデックス。複数のカラムの場合はカンマ(,)で区切って定義する。
* @param {String}   options.header				[default: 1, 0] Gridの非表示Columnの保存有無(0の場合は保存しない、1の場合は保存する)
* @param {Number}   options.hidden				[default: 0, 1] Gridの非表示Columnの保存有無（0の場合は保存しない、1の場合は保存する）
* @param {String}   options.checkButton		[default: 1, 0] Gridのコントロール（チェックボックス、ラジオボタン、ボタン）カラムの表示・非表示（0の場合はコントロールカラムを非表示、1の場合は表示）
* @param {Array}	options.saveList			[default: なし] hiddenに関係なく最優先で保存するcolumn idのarray
* @param {String}   options.columnMove			[default: false] グリッドの列移動時に移動された状態でダウンロードするかどうか（"true"の場合、列の移動順序で出力）
* @param {String}   options.columnOrder		[default: なし] csvダウンロード時にダウンロードされるカラムの順序を指定できる属性 ( 例: "0,3,2,1"と指定すると指定した順序でダウンロードされる )
* @param {String}   options.spanAll			[default: false] drilldown gridViewの場合、全体リストを展開してダウンロードできる属性。(trueの場合は全体出力、falseの場合は表示されているリストのみ出力)
* @param {String}   options.aposPrefixOnNum	[default: 0, 1] dataTypeがnumberで、lengthが12桁以上の場合に'(apos)を付けるかどうかの設定 (0の場合はaposを付けない、1の場合は付ける)
* @param {String}   options.ignoreSpan			[default: 0, 1] spanされている場合、spanを無視してデータを埋めるかどうか（0の場合は保存しない、1の場合は保存する）
* @param {String}   options.removeQuotation	[default: 0, 1] valueに"、'が含まれている場合、"、'を削除するかどうか（0の場合は削除しない、1の場合は削除する）
* @param {String}   options.removeNewLine		[default: 1, 0] value内に\r\nがある場合の削除有無 (0の場合は削除しない、1の場合は削除する)
* @param {String}   options.optionParam		[default: なし] DRM連携時にユーザー定義クラスにHashMap引数として渡す値。keyは"optionParam"として参照する。
 * @hidden N
 * @exception 
 * @example 
 * const gridId = "grd_AdvancedExcel";
const options = {
fileName : "downLoadCSV.csv" //[default : excel.csv] options.fileNameの値がない場合、デフォルト値を設定
};
$c.data.downloadGridViewCSV(grdObj, options);
//return 例）Excelファイルのダウンロード
 */
scwin.downloadGridViewCSV = function ($p, grdObj, options) {
  if ($c.util.isEmpty($p, options)) {
    options = {};
  }
  $c.data.setDownloadGridViewOption($p, grdObj, options);
  const opts = {
    fileName: options.fileName || "excel.csv",
    //[default: excel.csv] 保存されるファイル名
    type: options.type || "1",
    //[デフォルト: 1] Gridの保存形式（0の場合はデータ形式、1の場合は表示形式）
    delim: options.delim || ",",
    //[default: ,] CSVファイルでデータを区切る文字
    removeColumns: options.removeColumns || "",
    //[default: なし] 保存しないカラムのインデックス。複数のカラムの場合はカンマ(,)で区切って定義する。
    header: options.header || "1",
    //[default: 1] Gridの非表示カラムの保存有無（0の場合は保存しない、1の場合は保存する）
    hidden: options.hidden || 0,
    //[デフォルト: 0] グリッドの非表示カラムの保存有無(0の場合は保存しない、1の場合は保存する)
    checkButton: options.checkButton || "1",
    //[デフォルト: 1] Gridのコントロール（チェックボックス、ラジオボタン、ボタン）カラムの表示・非表示（0の場合はコントロールカラムを非表示、1の場合は表示）
    saveList: options.saveList || "" //[default: なし] hiddenに関係なく保存するcolumn idの配列
  };
  grdObj.saveCSV(opts);
};

/**
 * @method
 * @name uploadGridViewExcel
* @description Excelのxls、xlsxファイルのアップロード
 * @param {Object} grdObj GridView Object
* @param {Object} options JSONの形式で保存されたグリッドのExcelアップロードオプション
 *
* @param {String}  options.type				[default: 0] 1の場合、Excelファイルがグリッドの表示結果で作成されている時。0の場合、Excelファイルがグリッドの実際のデータで構成されている時
* @param {Number}  options.sheetNo				[default: 0] excelファイルでグリッドのデータがあるシート番号
* @param {Number}  options.startRowIndex		[default: 0] Excelファイルでグリッドのデータが開始される行の番号（ヘッダーを含む）
* @param {Number}  options.startColumnIndex	[default: 0] Excelファイルでグリッドのデータが開始される列の番号
* @param {Number}  options.endColumnIndex		[default: 0] Excelファイルでグリッドのデータが終わる列のindex（Excelの列数がグリッドの列数より少ない場合、グリッドの列数を設定）
* @param {String}  options.headerExist			[default: 0] Excelファイルのグリッドデータにヘッダーが存在するかどうか（1の場合はヘッダーが存在、0の場合は存在しない）
* @param {String}  options.footerExist			[default: 1] Excelファイルでグリッドのデータにフッターが存在するかどうか（1の場合フッターが存在、0の場合存在しない。デフォルト値は1。グリッドにフッターがない場合は適用されない）
* @param {String}  options.append				[default: 0] excelファイルからインポートしたデータをグリッドにappendするかどうか（1の場合、現在のグリッドにデータを追加で挿入、0の場合、現在のグリッドのデータを削除して挿入）
* @param {String}  options.hidden				[default: 0] 読み込もうとするExcelファイルにhidden columnが保存されているかどうかを設定するint型の数字（0の場合、Excelファイルにhiddenデータがないため、グリッドのhidden columnに空のデータを挿入。1の場合、Excelファイルにhiddenデータがあるため、Excelファイルからhiddenデータを挿入）
* @param {String}  options.fillHidden			[default: 0] GridのhiddenColumnに空の値を入れるかどうかを決定するためのint型数値（1の場合はhidden Columnに空の値を保存しない、0の場合はhidden columnが保存されていないExcel Fileとみなしてhidden Columnに空の値を入れる）（hiddenが0の場合はfillhiddenは影響を与えない）
* @param {String}  options.skipSpace			[default: 0] 空白無視の有無(1なら無視、0なら含む)
* @param {Array}   options.insertColumns		radio、checkboxなどのカラムをExcelから取得せず、ユーザーカラム設定としてアップロード（データ構造：[ { columnIndex:1, columnValue:"1" } ]）
* @param {String}  options.removeColumns		[default: なし] 保存しないカラムインデックス。複数のカラムの場合はカンマ(,)で区切って定義する。
* @param {String}  options.popupUrl			アップロード時に呼び出すポップアップのURL
* @param {String}  options.delim				アップロード時にデータを区切る文字 (default: , )
* @param {String}  options.status				[default: R]アップロードされたデータの初期状態値。設定しない場合は「R」に設定され、「C」値を設定できる。
* @param {String}  options.pwd					エクセルファイルにパスワードが設定されている場合、パスワード
* @param {String}  options.optionParam			[default: なし] DRM連携時にユーザー定義クラスにHashMap引数として渡す値。keyは"optionParam"として参照する。
* @param {String}  options.cellDataConvertor	[default: true] カラム値をユーザーが修正できる連携クラスの完全パッケージ名。(AbstractCellDataProviderクラスを継承後、convertValueメソッドを実装する必要があります。)
* @param {String}  options.decimal				[default: 4] セルのデータが小数の場合、最終的な小数点以下の桁数。(デフォルト値: 4) (例: 3の場合、4桁目で四捨五入して3桁まで表示。)
* @param {String}  options.useModalDisable		[default: false] アップロードポップアップウィンドウがアクティブになる際に親ウィンドウのコンポーネントを無効化するかどうか。
* @param {String}  options.useMaxByteLength	[default: false] ignoreChar属性で設定した文字を除き、maxByteLength属性で設定した長さ分のデータのみアップロード。
* @param {String}  options.dateFormat			[default: yyyy-MM-dd] セルの書式が日付形式の場合のフォーマット。デフォルト値は "yyyy-MM-dd"
* @param {String}  options.byteCheckEncoding	[default: EUC-JP] useMaxByteLengthが設定されている場合、byte処理時に指定するエンコーディング。EUC-JPの場合は2byte処理、UTF-8の場合は3byte処理を行う。(デフォルトはEUC-)
* @param {String}  options.features			アップロード画面が表示される際のstring形式のスタイル情報。指定されていない場合、アップロードウィンドウがデフォルトスタイルで生成されます
 * @hidden N
 * @exception 
 * @example
const gridId = "grd_AdvancedExcel";
const type = "xlsx";
const options = {
fileName : "gridDataUpload.xlsx" // デフォルト値が存在しないため、必ずfileNameの値を入力する必要がある。
};
$c.data.uploadGridViewExcel(grd_basicInfo,  options);
 */
scwin.uploadGridViewExcel = function ($p, grdObj, options) {
  if ($c.util.isEmpty($p, options)) {
    options = {};
  }
  const width = "490";
  const height = "218";
  const top = document.body.offsetHeight / 2 - parseInt(height) / 2 + $(document).scrollTop();
  const left = document.body.offsetWidth / 2 - parseInt(width) / 2 + $(document).scrollLeft();
  const opts = {
    type: options.type || "0",
    // String, 1の場合、Excelファイルがグリッドの表示結果で作成されている時、0の場合、Excelファイルがグリッドの実際のデータで構成されている時
    sheetNo: options.sheetNo || 0,
    // Number, Excelファイルでグリッドのデータがあるシート番号
    startRowIndex: options.startRowIndex || 1,
    // Number, [default:0] Excelファイルでグリッドのデータが開始される行の番号（ヘッダーを含む）
    startColumnIndex: options.startColumnIndex || 0,
    // Number, [デフォルト:0] Excelファイルでグリッドのデータが開始される列の番号
    endColumnIndex: options.endColumnIndex || 0,
    // Number, [default: 0] excelファイルでグリッドのデータが終わる列のindex
    //（エクセルの列数がグリッドの列数より少ない場合、グリッドの列数を設定）
    headerExist: options.headerExist || "0",
    // String, [defalut:0] excelファイルでグリッドのデータにheaderが存在するかどうか
    footerExist: options.footerExist || "1",
    //String, [defalut: 1] excelファイルでグリッドのデータにフッターが存在するかどうか
    // (1の場合はフッターが存在、0の場合は存在しない。デフォルト値は1。グリッドにフッターがない場合は適用されない)
    append: options.append || "0",
    // String, [デフォルト: 0] Excelファイルから取得したデータをグリッドにappendするかどうか
    // (1の場合は現在のグリッドにデータを追加で挿入、0の場合は現在のグリッドのデータを削除して挿入)
    hidden: options.hidden || "0",
    // String, [default: 0] 読み込もうとするExcelファイルにhidden columnが保存されているかどうかを設定するint型の数値（0であれば
    // Excelファイルにhiddenデータがないため、グリッドのhidden columnに空のデータを挿入
    // 1 : Excelファイルにhiddenデータがあるため、Excelファイルからhiddenデータを挿入 )
    fillHidden: options.fillHidden || "0",
    // String, [defalut: 0] Gridの非表示列に空の値を入れるかどうかを
    // 決定するためのint型数値（1の場合はhidden Columnに空の値を保存しない、0の場合はhidden
    // columnが保存されていないExcelファイルとみなし、hidden Columnに空の
    // 値を入れる（hiddenが0の場合、fillhiddenは影響を与えない）
    skipSpace: options.skipSpace || "0",
    // String, [defalut: 0] 空白無視の有無(1なら無視、0なら含む)
    insertColumns: options.insertColumns || "",
    // Array、radio、checkboxなどのカラムをExcelから取得せずに
    // ユーザーカラム設定としてアップロード（データ構造：[ { columnIndex:1, columnValue:"1" } ]）
    popupUrl: options.popupUrl || "",
    // String, アップロード時に呼び出すポップアップのURL
    status: options.status || "R",
    // String, [default: R]アップロードされたデータの初期状態値。設定しない場合は"R"に設定され、"C"値を設定することができる。
    pwd: options.pwd || "",
    // String, エクセルファイルにパスワードが設定されている場合、パスワード
    features: "top=" + top + ",height=" + height + ",left=" + left + ",width=" + width + ",location=no,menubar=no,resizable=yes,scrollbars=auto,status=no,titlebar=yes,toolbar=no",
    wframe: true
  };
  grdObj.advancedExcelUpload(opts);
};

/**
 * @method
 * @name uploadGridViewCSV
* @description Excelのアップロード
* @param {String}  options.type			[default: 1, 0]データの形式 (0の場合は実データの形式、1の場合はdisplay表示方式)
* @param {String}  options.header			[default: 1, 0]Gridヘッダーの有無 (0の場合、ヘッダー行数を無視して全てアップロードし、1の場合、ヘッダー行数分をスキップする)
* @param {String}  options.delim			[default: ',']CSVファイルでデータを区切る文字
* @param {String}  options.escapeChar		CSVデータから削除する必要がある文字セット（例：'\''）
* @param {Number}  options.startRowIndex 	[default: 0] CSVファイルでグリッドのデータが開始される行の番号。startRowIndexが設定されると、header設定は無視されます。
* @param {String}  options.append			[default: 0, 1]CSVファイルからインポートしたデータをグリッドにappendするかどうか（1の場合、現在のグリッドにデータを追加で挿入、0の場合、現在のグリッドのデータを削除して挿入）
* @param {Number}  options.hidden			[default: 0, 1]非表示カラムの保存有無（0の場合は保存しない、1の場合は保存する）
* @param {String}  options.fillHidden		[default: 0, 1]hidden Columnに空の値を入れるかどうかを決定するためのint型数値（1の場合、hidden Columnに空の値を保存しない、0の場合、hidden columnが保存されていないcsvファイルとみなし、hidden Columnに空の値を入れる）（hiddenが0の場合、fillhiddenは影響を与えない）
* @param {String}  options.skipSpace		[default: 0, 1]空白無視の有無(1なら無視、0なら含む)
* @param {String}  options.expression		[default: 1, 0]expressionカラムのデータを含むかどうか、デフォルト値は含まない（1は含まない、0は含む）
* @param {String}  options.popupUrl		アップロード時に呼び出すポップアップのURL
* @param {String}  options.status			[default: R]アップロードされたデータの初期状態値。設定しない場合は"R"に設定され、"C"値を設定できる。
* @param {String}  options.ignoreSpan		[default: 0, 1] spanされている場合、spanを無視してデータを読み取るかどうか（0の場合、マージされている列を1つとして扱う、1の場合、マージされている列をそれぞれ読み取る）
* @param {String}  options.optionParam		[default: なし] DRM連携時にユーザー定義クラスにHashMap引数として渡す値。keyは"optionParam"として参照する。
 * @hidden N
 * @exception 
 * @example
const gridId = "grd_advancedExcel";
const options = {};
$c.data.uploadGridViewCSV(gridId,  options);
// return 例) Excelファイル(.CSV)のアップロード
 */
scwin.uploadGridViewCSV = function ($p, grdObj, options) {
  if ($c.util.isEmpty($p, options)) {
    options = {};
  }
  const width = "490";
  const height = "218";
  const top = document.body.offsetHeight / 2 - parseInt(height) / 2 + $(document).scrollTop();
  const left = document.body.offsetWidth / 2 - parseInt(width) / 2 + $(document).scrollLeft();
  const opts = {
    type: options.type || "0",
    // String, [default: 1, 0]データ形式 (0の場合は実データ形式、1の場合はdisplay表示方式)
    header: options.header || "0",
    // String, [default: 1, 0]Gridヘッダーの有無 (0の場合、ヘッダー行数を無視して全てアップロードし、1の場合、ヘッダー行数分をスキップする)
    delim: options.delim || ",",
    // String, [default: ',']CSVファイルでデータを区切る文字
    escapeChar: options.escapeChar || "",
    // String, CSVデータから削除する必要がある文字セット（例：'\''）
    startRowIndex: options.startRowIndex || 0,
    // Number, [default: 0] CSVファイルでグリッドのデータが開始される行の番号。startRowIndexが設定されると、header設定は無視されます。
    append: options.append || "0",
    // String, [defalut: 0, 1]CSVファイルから取得したデータをグリッドにappendするかどうか（1の場合、現在のグリッドにデータを追加で挿入、0の場合、現在のグリッドのデータを削除して挿入）
    hidden: options.hidden || 1,
    // Number, [defalut: 0, 1]hiddenカラムの保存有無（0の場合は保存しない、1の場合は保存する）
    fillHidden: options.fillHidden || "0",
    // String, [defalut: 0, 1]hiddenカラムに空の値を入れるかどうかを決定するための整数型の数字（1の場合、hiddenカラムに空の値を保存しない、0の場合、hiddenカラムが保存されていないcsvファイルとみなし、hiddenカラムに空の値を入れる）（hiddenが0の場合、fillhiddenは影響を与えない）
    skipSpace: options.skipSpace || "0",
    // String, [default: 0, 1]空白無視の有無(1なら無視、0なら含む)
    expression: options.expression || "1",
    // String, [defalut: 1, 0]expressionカラムのデータを含むかどうか、デフォルト値は含まない（1は含まない、0は含む）
    popupUrl: options.popupUrl || "",
    // String, アップロード時に呼び出すポップアップのURL
    features: "top=" + top + ",height=" + height + ",left=" + left + ",width=" + width + ",location=no,menubar=no,resizable=yes,scrollbars=auto,status=no,titlebar=yes,toolbar=no",
    wframe: true
  };
  grdObj.readCSV(opts);
};

/**
 * @method
 * @name validateGroup
* @description グループ内に含まれるコンポーネントの入力値に対する有効性を検査します。
* コンポーネントのプロパティの有効性検証を実行し、valInfoArr有効性検証オプションに対して有効性検証を実行します。
* valInfoArrの有効性検証オプションパラメータを渡さない場合、コンポーネント属性（mandatory、allowChar、ignoreChar、maxLength、maxByteLength、minLength、minByteLength）に対してのみ有効性検証を実行します。
 * 
* @param {Object} grpObj グループコンポーネントオブジェクト
* @param {Object[]} options バリデーションオプション <br/>
* @param {String} options[].id バリデーション対象のDataCollectionカラムID
* @param {String} options[].label バリデーション失敗時に出力するラベル名（DataCollectionのカラム名を参照したくない場合に使用）
* @param {Boolean} options[].mandatory 必須入力値かどうか
* @param {Number} options[].minLength 最小入力桁数
* @param {Number} options[].minByteLength 最小入力桁数（バイト単位）
* @param {Boolean} options[].isEmail メールアドレスの有効性検証の実行
* @param {Boolean} options[].isPhone 電話番号の有効性検査を実行
* @param {requestCallback} options[].valFunc ユーザー定義の有効性検証関数
* @param {String} tacId グループが含まれるTabControlコンポーネントのID
* @param {String} tabId グループが含まれるTabControlコンポーネントのTabのID
* @returns {Boolean} 有効性検証の結果
 * @hidden N
 * @exception 
 * @example

if ($c.data.validateGroup(grp_LoginInfo)) {
if (confirm("変更されたデータを保存しますか？")) {
        $c.sbm.execute(sbm_saveData);
    }
}

const valInfo = [ { id : "grpCd", mandatory : true, minLength : 5 },
                { id : "grpNm", mandatory : true } ];

if ($c.data.validateGroup(grp_LoginInfo, valInfo)) {
if (confirm("変更されたデータを保存しますか？")) {
        $c.sbm.execute(sbm_saveCode);
    }
}

const valInfo = [ { id : "grpCd", label : "共通グループコード", mandatory : true, minLength : 5 },
{ id : "grpNm", label : "共通グループ名", mandatory : true } ];

if ($c.data.validateGroup(grp_code, valInfo)) {
if (win.$c.win.confirm("変更されたデータを保存しますか？")) {
        $c.sbm.execute(sbm_saveCode);
    }
};

const valInfo = [ { id : "prntMenuCd", mandatory : true },
                { id : "menuCd", mandatory : true,
                    valFunc : function($p, value) {
                        if (dmaMenu.get("prntMenuCd") == dmaMenu.get("menuCd")) {
return "上位メニューコードとメニューコードが同じであってはいけません。";
                        }
                    } },
                 { id : "menuNm", mandatory : true },
                 { id : "menuLevel", mandatory : true },
                 { id : "menuSeq", mandatory : true },
                 { id : "urlPath", mandatory : true },
                 { id : "isUse", mandatory : true } ];

if ($c.data.validateGroup(tblMenuInfo, valInfo, tacMenuInfo, "tabMenuInfo1") == false) {
    return false;
} 

* @description グループ内に含まれるコンポーネントの入力値に対する有効性を検査します。
 *
* コンポーネントのプロパティの有効性検証を実行し、valInfoArr有効性検証オプションに対して有効性検証を実行します。
* valInfoArrの有効性検証オプションパラメータを渡さない場合、コンポーネント属性（mandatory、allowChar、ignoreChar、maxLength、maxByteLength、minLength、minByteLength）に対してのみ有効性検証を実行します。
 * 
必須入力、入力許可文字、入力禁止文字、最大入力文字数の設定は、コンポーネントのプロパティで設定します。<br/>
- mandatory : 必須入力項目かどうか <br/>
- allowChar : 入力許可文字 <br/>
- ignoreChar : 入力許可不可文字 <br/>
- maxLength : 最大入力文字数 <br/>
- maxByteLength : 最大入力バイト数 <br/>
 */
scwin.validateGroup = function ($p, grpObj, valInfoArr, tacObj, tabId) {
  if (!$c.util.isEmpty($p, tacObj) && tacObj.getPluginName() === 'tabControl') {
    grpObj = tacObj.getWindow(tabId)[grpObj];
  }
  let objArr = $c.util.getChildren($p, grpObj, {
    includePlugin: "checkbox checkcombobox datePicker editor input inputCalendar multiselect radio selectbox searchbox secret textarea",
    recursive: true
  });
  const errors = [];
  try {
    for (let objIdx in objArr) {
      const obj = objArr[objIdx];
      const dataObjInfo = $c.data.getDataCollection($p, obj);
      let dataCollection = null;
      let columnId = null;
      let value = null;
      if (dataObjInfo !== undefined && dataObjInfo !== null) {
        dataCollection = $p.getComponentById(dataObjInfo.runtimeDataCollectionId);
        columnId = dataObjInfo.columnId;
      }
      if (dataCollection !== null && dataCollection.getObjectType() === "dataMap") {
        value = dataCollection.get(dataObjInfo.columnId);
        if (typeof value === "string") {
          value = value.trim();
        }
      } else {
        let tempIdArr = obj.getID().split("_");
        if (obj.getPluginName() !== "editor") {
          if (typeof obj.getValue === "function") {
            value = obj.getValue();
            if (typeof value === "string") {
              value = value.trim();
            }
          } else {
            continue;
          }
        } else {
          value = obj.getHTML();
          if (typeof value === "string") {
            value = value.trim();
          }
        }
      }
      let valInfo = {
        id: columnId
      };
      let isVaild = false;
      for (let valIdx in valInfoArr) {
        if (typeof valInfoArr[valIdx].id !== "undefined" && valInfoArr[valIdx].id === columnId) {
          valInfo = valInfoArr[valIdx];
          isVaild = true;
          break;
        }
      }
      if (typeof objArr[objIdx].options.mandatory !== "undefined" && objArr[objIdx].options.mandatory) {
        valInfo.mandatory = true;
        isVaild = true;
      }
      if (typeof objArr[objIdx].options.minlength !== "undefined" && objArr[objIdx].options.minlength > 0 && objArr[objIdx].getPluginName() !== "inputCalendar") {
        valInfo.minLength = objArr[objIdx].options.minlength;
        isVaild = true;
      }
      if (typeof objArr[objIdx].options.minByteLength !== "undefined" && objArr[objIdx].options.minByteLength > 0 && objArr[objIdx].getPluginName() !== "inputCalendar") {
        valInfo.minByteLength = objArr[objIdx].options.minByteLength;
        isVaild = true;
      }
      if (isVaild === true) {
        _setResult(dataCollection, obj.getID(), valInfo, value);
      }
    }
    if (errors.length > 0) {
      if (typeof tacObj !== "undefined" && typeof tabId !== "undefined" && tabId !== "") {
        const tabIndex = tacObj.getTabIndex(tabId);
        Promise.resolve().then(function ($p) {
          return tacObj.setSelectedTabIndex(tabIndex);
        });
      }
      const option = {
        callBackParam: {
          "objId": errors[0].objId
        }
      };
      $c.win.alert($p, errors[0].message, function (param) {
        const obj = $p.getComponentById(param.objId);
        obj.focus();
      }, option);
      return false;
    } else {
      return true;
    }
    function _setResult(dataCollection, objId, valInfo, value) {
      const msgInfo = $c.data.getValResultMsg($p, valInfo, value);
      if ($c.util.isEmpty($p, msgInfo.message) === false) {
        const comObj = $p.getComponentById(objId);
        const errIdx = errors.length;
        errors[errIdx] = {};
        errors[errIdx].columnId = valInfo.id;
        errors[errIdx].objId = objId;
        if ($c.util.isEmpty($p, valInfo.label) === false) {
          errors[errIdx].columnName = valInfo.label;
        } else if ($c.util.isEmpty($p, dataCollection) === false) {
          // var scope = $c.win.getScope(dataCollection);
          errors[errIdx].columnName = $c.data.getColumnName($p, comObj);
        } else if (typeof comObj.getInvalidMessage === "function") {
          errors[errIdx].columnName = comObj.getInvalidMessage();
        }
        if (msgInfo.msgType == "2") {
          errors[errIdx].message = msgInfo.message;
        } else {
          if ($c.util.isEmpty($p, errors[errIdx].columnName) === false) {
            errors[errIdx].message = $c.str.attachPostposition($p, errors[errIdx].columnName) + " " + msgInfo.message;
          } else {
            errors[errIdx].message = msgInfo.message;
          }
        }
      }
    }
  } catch (ex) {
    console.error("Exception :: Object Id : " + obj.getID() + ", Plug-in Name: " + obj.getPluginName() + ", " + ex.message);
  } finally {
    objArr = null;
  }
};

/**
 * @method
 * @name validateGridView
* @description GridViewを通じて入力されたデータに対して有効性検証を行います。
* 入力許可文字、入力不許可文字、最大入力文字数の設定は、GridViewのColumnのプロパティで設定します。
- allowChar : 入力許可文字
- ignoreChar : 入力許可不可文字
- maxLength : 最大入力文字数
- maxByteLength : 最大入力バイト数
* @param {Object} gridViewObj GridViewオブジェクト
* @param {Object[]} options データ検証オプション
* @param {String} options[].id 検証対象のDataCollectionカラムID
* @param {Boolean} options[].mandatory 必須入力値かどうか
* @param {Number} options[].minLength 最小入力桁数
* @param {Boolean} options[].isEmail メールアドレスの有効性検証の実行
* @param {Boolean} options[].isPhone 電話番号の有効性検査を実行
* @param {requestCallback} options[].valFunc ユーザー定義の有効性検証関数
* @param {Object} tacObj GridViewが含まれるTabControlコンポーネントオブジェクト
* @param {String} tabId GridViewが含まれるTabControlコンポーネントのTabのID
* @returns {Boolean} 有効性検証の結果
 * @hidden N
 * @exception 
 * @example const valInfo = [ {id: "grpCd", mandatory: true, minLength: 5},
               {id: "grpNm", mandatory: true} ];

if ($c.data.validateGridView(grd_MenuAuthority, valInfo)) {

if (confirm("変更されたデータを保存しますか？")) {
       scwin.saveGroup();
   }
}

const valInfo = [ {id: "grpCd", label : "共通グループコード", mandatory: true, minLength: 5},
{id: "grpNm", label : "共通グループ名", mandatory: true} ];

if ($c.data.validateGridView(grd_MenuAuthority, valInfo)) {

if (confirm("変更されたデータを保存しますか？")) {
       scwin.saveGroup();
   }
}

const valInfo = [ { id : "prntMenuCd", mandatory : true },
                { id : "menuCd", mandatory : true,
                  valFunc : function($p, value, dataCollectionObj, rowIndex) {
                    if (dmaMenu.get("prntMenuCd") == dmaMenu.get("menuCd")) {
return "上位メニューコードとメニューコードが同じであってはいけません。";
                    }
                  }
                },
                { id : "menuNm", mandatory : true },
                { id : "menuLevel", mandatory : true },
                { id : "menuSeq", mandatory : true },
                { id : "urlPath", mandatory : true },
                { id : "isUse", mandatory : true } ];

if ($c.data.validateGridView(grd_MenuAuthority, valInfo, tacMenuInfo, "tabMenuInfo1") == false) {
   return false;
}
 */
scwin.validateGridView = function ($p, gridViewObj, valInfoArr, tacObj, tabId) {
  if (gridViewObj === null) {
    return false;
  }
  const dataList = $c.util.getGridViewDataList($p, gridViewObj);
  if (dataList === null) {
    return false;
  }
  const errors = [];
  try {
    const modifiedIdx = dataList.getModifiedIndex();
    for (let dataIdx = 0; dataIdx < modifiedIdx.length; dataIdx++) {
      let valInfo = {};
      let isVaild = false;
      let modifiedData = dataList.getRowJSON(modifiedIdx[dataIdx]);
      if (modifiedData.rowStatus === "D") {
        continue;
      }
      for (let valIdx in valInfoArr) {
        if (typeof valInfoArr[valIdx].id !== "undefined" && modifiedData[valInfoArr[valIdx].id] !== "undefined") {
          let value = modifiedData[valInfoArr[valIdx].id];
          if (typeof value === "string") {
            value = value.trim();
          }
          _setResult(modifiedIdx[dataIdx], dataList, gridViewObj.getID(), valInfoArr[valIdx], value);
        }
      }
    }
    if (errors.length > 0) {
      if (typeof tacObj !== "undefined" && typeof tabId !== "undefined" && tabId !== "") {
        const tabIndex = tacObj.getTabIndex(tabId);
        tacObj.setSelectedTabIndex(tabIndex);
      }
      const option = {
        callBackParam: {
          "objId": errors[0].objId,
          "columnId": errors[0].columnId,
          "rowIndex": errors[0].rowIndex
        }
      };
      $c.win.alert($p, errors[0].message, function (param) {
        const grdiViewObj = $p.getComponentById(param.objId);
        grdiViewObj.setFocusedCell(param.rowIndex, param.columnId, true);
      }, option);
      return false;
    } else {
      return true;
    }
    function _setResult(rowIndex, dataList, gridViewObjId, valInfo, value) {
      const msgInfo = $c.data.getValResultMsg($p, valInfo, value, dataList, rowIndex);
      if ($c.util.isEmpty($p, msgInfo.message) === false) {
        const errIdx = errors.length;
        errors[errIdx] = {};
        errors[errIdx].columnId = valInfo.id;
        errors[errIdx].objId = gridViewObjId;
        if ($c.util.isEmpty($p, valInfo.label) === false) {
          errors[errIdx].columnName = valInfo.label;
        } else {
          errors[errIdx].columnName = dataList.getColumnName(valInfo.id);
        }
        errors[errIdx].rowIndex = rowIndex;
        if (msgInfo.msgType == "2") {
          errors[errIdx].message = msgInfo.message;
        } else {
          errors[errIdx].message = $c.str.attachPostposition($p, errors[errIdx].columnName) + " " + msgInfo.message;
        }
      }
    }
  } catch (ex) {
    console.error(ex);
  }
};

/**
 * @method
 * @name createDataList
* @description DataListを動的に生成します。
* @param {String} dsId DataListのID
* @param {Array} colArr カラム情報
* @param {Array} typeArr カラムのdataType定義
* @param {Object} options dataCollectionのプロパティ[baseNode, repeatNode, saveRemovedData, scwinObj]
* @returns {Object} 生成したDataListオブジェクト
 * @hidden N
 * @exception 
 * @example const dcoptions = {
    baseNode : "list",
    repeatNode : "map",
    saveRemovedData : "true"
};
const dlObj = $c.data.createDataList("dlt_code", ["cdGrp", "cd", "nm","ord"], ["text", "text", "text", "text"] , dcoptions);
 */
scwin.createDataList = function ($p, dsId, colArr, typeArr, options) {
  try {
    const dltObj = $c.util.getComponent($p, dsId);
    if (!$c.util.isEmpty($p, dltObj)) {
      $p.data.remove(dsId);
    }
    let colInfoJSON = [];
    if (typeof colArr !== "undefined") {
      colInfoJSON = [];
      for (let i = 0; i < colArr.length; i++) {
        let dataType = "text";
        if (typeof typeArr !== "undefined") {
          dataType = typeArr[i];
        }
        const colInfo = {
          "id": colArr[i],
          "dataType": dataType,
          "name": colArr[i]
        };
        colInfoJSON.push(colInfo);
      }
    }
    if (typeof options === "undefined") {
      options = {};
      options.baseNode = "list";
      options.repeatNode = "map";
      options.saveRemovedData = "true";
    }
    ;
    const dataCollectionJSON = {
      id: dsId,
      type: "dataList",
      option: {
        "baseNode": options.baseNode || "list",
        "repeatNode": options.repeatNode || "map",
        "saveRemovedData": options.saveRemovedData || "true"
      },
      columnInfo: colInfoJSON
    };
    const codeDataObj = $p.data.create(dataCollectionJSON);
    return $c.util.getComponent($p, dsId);
  } catch (ex) {
    console.error(ex);
  }
};

/**
 * @method
 * @name createDataMap
* @description DataMapを動的に生成します。
* @param {String} dsId dataMapのID
* @param {Array} colArr カラム情報
* @param {Object} options DataMapの生成オプション
 * @param {Object} dataCollection dataCollection(dataMap)
* @returns {Object} 生成したDataMapオブジェクト
 * @hidden N
 * @exception 
 * @example const mapObj = $c.data.createDataMap("dma_test", ["col1", "col2", "col3"] , ["text", "text", "text"]);
 */
scwin.createDataMap = function ($p, dsId, colArr, typeArr, options) {
  try {
    const dltObj = $c.util.getComponent($p, dsId);
    if (!$c.util.isEmpty($p, dltObj)) {
      $p.data.remove(dsId);
    }
    let colInfoJSON = [];
    if (typeof colArr !== "undefined") {
      colInfoJSON = [];
      for (let i = 0; i < colArr.length; i++) {
        let dataType = "text";
        if (typeof typeArr !== "undefined") {
          dataType = typeArr[i];
        }
        const colInfo = {
          "id": colArr[i],
          "type": dataType,
          "name": colArr[i]
        };
        colInfoJSON.push(colInfo);
      }
    }
    if (typeof options === "undefined") {
      options = {
        "baseNode": "map"
      };
    }
    ;
    const dataCollectionJSON = {
      "id": dsId,
      "type": "dataMap",
      "option": {
        "baseNode": options.baseNode || "map"
      },
      "keyInfo": colInfoJSON
    };
    $p.data.create(dataCollectionJSON);
    return $c.util.getComponent($p, dsId);
  } catch (ex) {
    console.error(ex);
  }
};

/**
 * @method
 * @name undoAll
* @description 全体データを初期設定されたデータ(originalData)に置き換え、行の状態を初期化(R)します。
* 初期設定されたデータとは、setJSONやsetXMLなどのAPIを通じて設定されたデータがこれに該当します。
* 追加(C)された行を削除します
* @param {Object} dltId 初期化したいDataCollectionオブジェクト
 * @hidden N
 * @exception 
 * @example $c.data.undoAll(dlt_grdAllData);
 */
scwin.undoAll = function ($p, dltId) {
  try {
    let dltObj = null;
    if (typeof dltId === "string") {
      dltObj = $c.util.getComponent($p, dltId);
    } else {
      dltObj = dltId;
    }
    const rowCount = dltObj.getRowCount();
    const removeIdx = [];
    const undoIdx = [];
    dltObj.setBroadcast(false);
    for (let i = 0; i < rowCount; i++) {
      if (dltObj.getRowStatus(i) == "C") {
        removeIdx.push(i);
        continue;
      }
      undoIdx.push(i);
    }
    dltObj.removeRows(removeIdx);
    dltObj.undoRows(undoIdx);
    dltObj.setBroadcast(true, true);
  } catch (ex) {
    console.error(ex);
  }
};

/**
 * @method
 * @name undoRow
* @description 指定したGridViewで選択列(chk)がチェックされた行をキャンセル(Undo)処理します。
* @param {Object|String} dltId DataListオブジェクトまたはDataListのID
 * @hidden N
 * @exception 
 * @example $c.data.undoRow(dlt_data1);
 */
scwin.undoRow = function ($p, dltId) {
  try {
    let dltObj = null;
    if (typeof dltId === "string") {
      dltObj = $c.util.getComponent($p, dltId);
    } else {
      dltObj = dltId;
    }
    const checkedIdx = dltObj.getMatchedIndex("chk", "1");
    dltObj.setBroadcast(false);
    for (let idx = checkedIdx.length - 1; idx >= 0; idx--) {
      if (dltObj.getRowStatus(checkedIdx[idx]) == "C") {
        dltObj.removeRow(checkedIdx[idx]);
      } else {
        dltObj.undoRow(checkedIdx[idx]);
      }
    }
    dltObj.setBroadcast(true, true);
  } catch (ex) {
    console.error(ex);
  }
};

/**
 * @method
 * @name undoGridView
* @description GridViewとバインドされたDataListのデータの変更されたデータをUndoする。
* @param {Object|String} grdId GridViewオブジェクトまたはGridViewのID
 * @hidden N
 * @exception 
 * @example $c.data.undoGridView(dlt_grdAllData);
 */
scwin.undoGridView = async function ($p, grdId) {
  try {
    let grdObj = null;
    if (typeof grdId === "string") {
      grdObj = $c.util.getComponent($p, grdId);
    } else {
      grdObj = grdId;
    }
    if (typeof grdObj === "object" && grdObj !== "") {
      const dltObj = $c.util.getGridViewDataList($p, grdObj);
      if (dltObj === null) {
        return;
      }
      if ($c.data.isModified($p, dltObj)) {
        if (await $c.win.confirm($p, $c.data.getMessage($p, "MSG_CM_00052"))) {
          $c.data.undoAll($p, dltObj);
        }
        ;
      }
      ;
    }
  } catch (ex) {
    console.error(ex);
  }
};

/**
 * @method
 * @name deleteRow
* @description 指定したGridViewで選択列(chk)がチェックされた行を削除(Delete)処理します。
* @param {Object|String} dltId DataListオブジェクトまたはDataList ID
 * @hidden N
 * @exception 
 * @example $c.data.deleteRow(dlt_data1);
 */
scwin.deleteRow = function ($p, dltId) {
  try {
    let dltObj = null;
    if (typeof dltId === "string") {
      dltObj = $c.util.getComponent($p, dltId);
    } else {
      dltObj = dltId;
    }
    const checkedIdx = dltObj.getMatchedIndex("chk", "1");
    dltObj.setBroadcast(false);
    for (let idx = checkedIdx.length - 1; idx >= 0; idx--) {
      if (dltObj.getRowStatus(checkedIdx[idx]) == "C") {
        dltObj.removeRow(checkedIdx[idx]);
      } else {
        dltObj.deleteRow(checkedIdx[idx]);
        dltObj.setCellData(checkedIdx[idx], "chk", "");
      }
    }
    dltObj.setBroadcast(true, true);
  } catch (ex) {
    console.error(ex);
  }
};

/**
 * @method
 * @name insertRow
* @description 指定したGridViewに新しい行を追加する。
* @param {Object|String} grdId GridViewオブジェクトまたはGridViewのID
* @returns {Number} 新しく追加された行のインデックス
 * @hidden N
 * @exception 
 * @example $c.data.insertRow(grd_data1);
 */
scwin.insertRow = function ($p, grdId) {
  try {
    let grdObj = null;
    if (typeof grdId === "string") {
      grdObj = $c.util.getComponent($p, grdId);
    } else {
      grdObj = grdId;
    }
    if (typeof grdObj === "object" && grdObj !== "") {
      const dltObj = $c.util.getGridViewDataList($p, grdObj);
      if (dltObj === null) {
        return;
      }
      const focusedRowIdx = grdObj.getFocusedRowIndex();
      if (focusedRowIdx > -1) {
        return dltObj.insertRow(focusedRowIdx + 1);
      } else {
        return dltObj.insertRow();
      }
    }
  } catch (ex) {
    console.error(ex);
  }
};

/**
 * @method
 * @name getMatchedJSON
* @description 検索条件に一致するデータを返します。
* @param {Object} dataListObj : DataList IDまたはDataListオブジェクト
* @param {Array|Object} condArr 比較条件
* @param {String} condArr.columnId カラムID
* @param {String} condArr.operator 比較演算子 ( ==, !=, >, <, >=, <=, LIKE )
* @param {String|Number|Boolean} condArr.value 比較値
* @param {String} condArr.logical 論理演算子 ( &&, ||)
* @returns {Object} DataListデータ DataList IDまたはDataListオブジェクト
 * @hidden N
 * @exception 
 * @example $c.data.getMatchedJSON(dlt_memberList, { columnId : "POSITION_CD", operator : "==", value : "03"});

$c.data.getMatchedJSON(dlt_memberList, [
    { columnId : "POSITION_CD", operator : "==", value : "03" },
    { columnId : "DUTY_CD", operator : "==", value : "02", logical : "&&" }
]);

$c.data.getMatchedJSON(dlt_memberList, [
    { columnId : "POSITION_CD", operator : "==", value : "03" },
    { columnId : "DUTY_CD", operator : "==", value : "02" }
]);

$c.data.getMatchedJSON(dlt_memberList, [
    { columnId : "POSITION_CD", operator : "==", value : "03"},
    { columnId : "DUTY_CD", operator : "lIKE", value : "0", logical : "||" }
]);
 */
scwin.getMatchedJSON = function ($p, dataListObj, condArr) {
  if (typeof dataListObj === "string") {
    dataListObj = $p.getComponentById(dataListObj);
  }
  const returnData = [];
  const allData = dataListObj.getAllJSON();
  if ($c.util.isArray($p, condArr) === false) {
    condArr = [condArr];
  }
  for (let idx = 0; idx < allData.length; idx++) {
    let result = true;
    for (let conIdx = 0; conIdx < condArr.length; conIdx++) {
      const colValue = allData[idx][condArr[conIdx].columnId.trim()];
      const value = condArr[conIdx].value;
      const operator = condArr[conIdx].operator.trim();
      const logical = (condArr[conIdx].logical || "&&").trim();
      if (operator === "==") {
        if (colValue == value) {
          if (logical === "||") {
            result = true;
            break;
          }
        } else {
          if (logical === "&&") {
            result = false;
          }
        }
      } else if (operator === "!=") {
        if (colValue != value) {
          if (logical === "||") {
            result = true;
            break;
          }
        } else {
          if (logical === "&&") {
            result = false;
          }
        }
      } else if (operator === ">") {
        if (colValue > value) {
          if (logical === "||") {
            result = true;
            break;
          }
        } else {
          if (logical === "&&") {
            result = false;
          }
        }
      } else if (operator === "<") {
        if (colValue < value) {
          if (logical === "||") {
            result = true;
            break;
          }
        } else {
          if (logical === "&&") {
            result = false;
          }
        }
      } else if (operator === ">=") {
        if (colValue >= value) {
          if (logical === "||") {
            result = true;
            break;
          }
        } else {
          if (logical === "&&") {
            result = false;
          }
        }
      } else if (operator === "<=") {
        if (colValue <= value) {
          if (logical === "||") {
            result = true;
            break;
          }
        } else {
          if (logical === "&&") {
            result = false;
          }
        }
      } else if (operator === "LIKE") {
        if (colValue.indexOf(value) > -1) {
          if (logical === "||") {
            result = true;
            break;
          }
        } else {
          if (logical === "&&") {
            result = false;
          }
        }
      } else {
        result = false;
      }
    }
    if (result === true) {
      returnData.push(allData[idx]);
    }
  }
  return returnData;
};

/**
 * @method
 * @name setUserData
* @description コンポーネントにカスタムデータを設定する。
* @param {Object} comObj コンポーネントオブジェクト
* @param {String} key ユーザー定義データのkey
* @param {String} value ユーザー定義データvalue
 * @hidden N
 * @exception 
 * @example $c.data.setUserData(btn_search, "userId", "M000001");
 */
scwin.setUserData = function ($p, comObj, key, value) {
  comObj.setUserData("__" + key, value);
};

/**
 * @method
 * @name getUserData
* @description コンポーネントに保存されたカスタムデータを返します。
* @param {Object} comObj コンポーネントオブジェクト
* @param {String} key ユーザー定義データのKey
* @returns {String} ユーザー定義データのvalue
 * @hidden N
 * @exception 
 * @example const userId = $c.data.getUserData(btn_search, "userId");
 */
scwin.getUserData = function ($p, comObj, key) {
  return comObj.getUserData("__" + key);
};

/**
 * @method
 * @name createHolidayDataList
* @description 祝日データを保存するdlt_holiday DataListオブジェクトを作成し、config.jsファイルにdlt_holiday DataListオブジェクト情報を設定します。
 * @hidden N
 * @exception 
 * @example $c.data.createHolidayDataList($p);
 */
scwin.createHolidayDataList = function ($p) {
  const dcOption = {
    baseNode: "list",
    repeatNode: "map",
    saveRemovedData: "true"
  };
  $c.data.createDataList($p, "dlt_holiday", ["REST_DATE", "REST_NAME", "REST_CODE", "NOTE", "REST_SEQ"], ["text", "text", "text", "text", "text"], dcOption);

  // config.jsファイルの「inputCalendar/holidayRef/@value」属性に祝日データが格納された$p.top().dlt_holiday情報を設定する。
  // ※ 注意事項
  // WebSquare.BootLoader.configurationJSONの[0].WebSquareの情報に直接アクセスする方式は非公開です。
  // WebSquare.BootLoader.configurationJSONの[0].WebSquareオブジェクトはエンジンのアップデートに伴い変更される可能性があるため、共通コードでのみ限定的に使用してください。
  const webSquareConfig = WebSquare.BootLoader.configurationJSON[0].WebSquare;
  webSquareConfig.inputCalendar.holidayRef = {};
  webSquareConfig.inputCalendar.holidayRef["@value"] = "data:" + $p.top().$p.getFrameId() + "_dlt_holiday.REST_DATE";
  webSquareConfig.calendar.holidayRef = {};
  webSquareConfig.calendar.holidayRef["@value"] = "data:" + $p.top().$p.getFrameId() + "_dlt_holiday.REST_DATE";
};

/**
 * @method
 * @name loadHoliday
* @description 祝日データを照会して$p.top().dlt_holiday オブジェクトに保存します。
 * @hidden N
 * @exception 
 * @example $c.data.loadHoliday($p);
 */
scwin.loadHoliday = function ($p) {
  const getHolidayOption = {
    id: "_sbm_getHoliday",
    action: "/holiday/selectHoliday",
    target: "data:json,dlt_holiday",
    method: "post",
    submitDoneHandler: function (e) {
      if (typeof $p.top().dlt_holiday === "object") {
        $p.top().dlt_holiday.setJSON(e.responseJSON.dlt_holiday);
      }
    },
    isProcessMsg: false
  };
  $c.sbm.executeDynamic($p, getHolidayOption, {});
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'}}]}]})