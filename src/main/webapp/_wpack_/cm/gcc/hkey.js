/*amd /cm/gcc/hkey.xml 24328 35a76987afe3a78e71a8ea4ab18912b1c0f7ab79b3285371918ac1194d411624 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',A:{},E:[{T:1,N:'w2:type',E:[{T:3,text:'COMMON'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'}},{T:1,N:'w2:workflowCollection'}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:'scwin.init,scwin.isUseShortCut,scwin.setEventPause,scwin.setShortKey,scwin.setCkEditorShortKeyDownAction,scwin.addEvent,scwin.keyToken,scwin.delEvent'}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){// =============================================================================
// ウェブブラウザのショートカットキーが動作しないように設定 (true：動作、false：非動作)
scwin.IS_USE_BROWSER_SHORTCUT = true;
scwin.onpageload = function ($p) {};

/**
 * @method
 * @name init
* @description ユーザー定義のショートカットキー機能を初期化します。
* @param {Object} $p WFrameスコープ内の$pオブジェクト
 * @hidden N
 * @exception 
 */
scwin.init = function ($p) {
  try {
    const dataListCreationOpt = {
      id: "dlt_shortcutList",
      type: "dataList",
      option: {
        "baseNode": "list",
        "repeatNode": "map",
        "saveRemovedData": "true"
      },
      columnInfo: [{
        "id": "SHORTCUT_SEQ",
        "dataType": "text",
        "name": "ショートカットキー順番"
      }, {
        "id": "PROGRAM_CD",
        "dataType": "text",
        "name": "プログラムコード"
      }, {
        "id": "COMPLEX_KEY",
        "dataType": "text",
        "name": "複合キー"
      }, {
        "id": "LAST_KEY",
        "dataType": "text",
        "name": "ショートカットキー"
      }, {
        "id": "EVENT_TYPE",
        "dataType": "text",
        "name": "イベントタイプ"
      }, {
        "id": "EVENT_TARGET",
        "dataType": "text",
        "name": "イベントターゲット"
      }, {
        "id": "EVENT_DETAIL",
        "dataType": "text",
        "name": "イベント説明"
      }, {
        "id": "EVENT_YN",
        "dataType": "text",
        "name": "使用有無"
      }, {
        "id": "EVENT_NAME",
        "dataType": "text",
        "name": "イベント名"
      }]
    };
    $p.data.create(dataListCreationOpt);
    $c.hkey.dataList = $p.getComponentById("dlt_shortcutList");
    const shortcutTargetElement = document;
    if (shortcutTargetElement.addEventListener) {
      shortcutTargetElement.addEventListener('keydown', scwin.__keydownEvent);
    } else if (shortcutTargetElement.attachEvent) {
      shortcutTargetElement.attachEvent('keydown', scwin.__keydownEvent);
    }
  } catch (ex) {
    console.error(ex);
  }
};

/**
 * @method
 * @name isUseShortCut
* @description ショートカットキーの使用有無を設定します。
* @param {String} shortcutFlag ショートカットキーの使用有無 (Y: 使用 , N: 未使用)
 * @hidden N
 * @exception 
 */
scwin.isUseShortCut = function ($p, shortcutFlag) {
  try {
    if (shortcutFlag == "Y") {
      scwin.loadingEvent = "Y";
      document.onkeydown = scwin.__checkEvent;
    } else {
      scwin.loadingEvent = "N";
      document.onkeydown = null;
    }
  } catch (ex) {
    console.error(ex);
  }
};

/**
 * @method
 * @name setEventPause
* @description コンポーネントに設定されたイベントを停止する。
* @param {String} _targetComp : 設定コンポーネントオブジェクトID
* @param {Boolean} _flag : イベント設定の可否値 [default: false(実行), true(停止)]
* @param {Object} _eventList : 停止イベントリストの値（配列） [default:null （すべてのイベント）]
 * @hidden N
 * @exception 
 */
scwin.setEventPause = function ($p, _targetComp, _flag, _eventList) {
  try {
    const comp = $p.getComponentById(_targetComp);
    const flag = WebSquare.util.getBoolean(_flag);
    const eventList = typeof _eventList != "undefined" ? _eventList : null;
    if (typeof comp == "undefined") return -1;
    if (comp.options.pluginName == "dataList") {
      comp.setBroadcast(flag);
      if (flag) {
        comp.broadcast({
          "linkedDataList": ["notifyDataChanged"],
          "gridView": ["notifyDataChanged"],
          "generalComp": "both"
        });
      }
      comp.setEventPause(eventList, flag);
      for (let i in comp.childCompHash) {
        const childComp = $c.util.getObject($p, comp.childCompHash[i].id);
        if (typeof childComp != "undefined") {
          childComp.setEventPause(eventList, flag);
        }
      }
      for (let i in comp.refCompHash) {
        const refComp = $c.util.getObject($p, comp.refCompHash[i].id);
        if (typeof refComp != "undefined") {
          refComp.setEventPause(eventList, flag);
        }
      }
    } else {
      comp.setEventPause(eventList, !flag);
    }
  } catch (ex) {
    console.error(ex);
  }
};

/**
 * @method
 * @name setShortKey
* @description ショートカットキーのデータを照会するためのSubmissionを生成します。
 * 
* $c.hkey.setShortKey関数では、ショートカットキーデータの読み込みのためのSubmission(_sbm_selectShortcutList)を生成するだけです。
* Submissionの実行（_sbm_selectShortcutList）は、config.xmlのwframe > postScriptに定義された$c.win.processCommonData関数で実行されます。
 * @hidden N
 * @exception 
 */
scwin.setShortKey = function ($p, frame) {
  let frameP = null;
  if (typeof frame === "object") {
    frameP = frame.$p;
  } else {
    frameP = $p;
  }

  // ログイン画面かどうかをチェック、ログイン画面ではショートカットキーを設定しない。
  const loginDisplay = frameP.getParentWindow().scwin.loginChk;
  if (loginDisplay && loginDisplay === 'login.xml') {
    return false;
  } else {
    const programCd = $c.win.getProgramId($p, frameP);
    const programShortKeyInfo = $c.data.getMatchedJSON($p, $c.hkey.dataList, {
      columnId: "PROGRAM_CD",
      operator: "==",
      value: programCd
    });
    if (!$c.util.isEmpty($p, programCd) && !$c.util.isEmpty($p, programShortKeyInfo) && programShortKeyInfo.length === 0) {
      const searchCodeGrpOption = {
        id: "_sbm_selectShortcutList",
        action: "/main/selectShortcutList",
        target: '',
        method: "post",
        mediatype: "application/json",
        mode: "asynchronous",
        isProcessMsg: false,
        submitDoneHandler: function (e) {
          const rsMsg = e.responseJSON.rsMsg;
          if (rsMsg.statusCode == $c.sbm.getMessageCode($p, 'STATUS_SUCCESS')) {
            $c.hkey.dataList.setJSON(e.responseJSON.dlt_shortcutList, true);
          }
        }
      };
      const param = {
        dma_shortcut: {
          PROGRAM_CD: programCd
        }
      };
      $c.sbm.create($p, searchCodeGrpOption);
      const subObj = $c.util.getComponent($p, "_sbm_selectShortcutList");
      subObj.setRequestData(param);
    }
  }
};

/**
 * @method
 * @name setCkEditorShortKeyDownAction
 * @description 
* CkEditor4（iframe）内のDocumentオブジェクトにkeyDownイベントをバインドします。
* $c.hkey.setCKEditorShortKeyDownAction関数は、CKEditorを含む画面を開く際に呼び出す必要があります。
 * 
 * @hidden N
 * @exception 
 */
scwin.setCkEditorShortKeyDownAction = function ($p) {
  $p.setTimeout(function () {
    const chkEditorIframe = $p.$(".cke_wysiwyg_frame");
    for (let i = 0; i < chkEditorIframe.length; i++) {
      const iframeTargetElement = chkEditorIframe[i].contentWindow.document;
      if (iframeTargetElement.addEventListener) {
        iframeTargetElement.addEventListener('keydown', scwin.__keydownEvent);
      } else if (iframeTargetElement.attachEvent) {
        iframeTargetElement.attachEvent('keydown', scwin.__keydownEvent);
      }
    }
  }, {
    delay: 1000,
    key: "ckEditorKeyDownEventBindingTimer"
  });
};

// ショートカットキーイベントが読み込まれたかどうかを設定
scwin.loadingEvent = 'Y';

/**
 * @method
 * @name __keydownEvent
* @description ショートカットキー keydownEvent
* @param {Object} e イベントオブジェクト
 * @hidden Y
 * @exception
 * @example
 */
scwin.__keydownEvent = function (e) {
  if (scwin.loadingEvent == "Y") {
    scwin.__checkEvent(e);
  }
  ;
};

/**
 * @method
 * @name __checkEvent
* @description ショートカットキーのイベントを確認します。
* @param {Object} e イベントオブジェクト
 * @hidden Y
 * @exception
 * @example
 */
scwin.__checkEvent = function (e) {
  try {
    let lastKey = e.key || e.keyCode || e.which;
    let complexKey = "";
    if ($c.util.isEmpty($p, lastKey)) {
      return;
    }
    if (e.ctrlKey && e.altKey) {
      complexKey = "ctrlAltKey";
    } else if (e.ctrlKey && e.shiftKey) {
      complexKey = "ctrlShiftKey";
    } else if (e.altKey && e.shiftKey) {
      complexKey = "altShiftKey";
    } else {
      if (e.altKey) {
        complexKey = "altKey";
      } else if (e.ctrlKey) {
        complexKey = "ctrlKey";
      } else if (e.shiftKey) {
        complexKey = "shiftKey";
      } else {
        complexKey = "singleKey";
      }
    }

    // Ctrl、Alt、Shiftではなく、lastKeyが認識される場合
    if (lastKey != "Control" && lastKey != "Alt" && lastKey != "Shift") {
      // IEブラウザでe.keyの値が正常にロードされない場合のブラウザショートカットキー処理
      if (typeof lastKey === "number" || lastKey === "Unidentified") {
        if (e.keyCode >= 112 && e.keyCode <= 123) {
          const f_number = ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12"];
          lastKey = f_number[e.keyCode - 112];
        } else if (e.keyCode == 9) {
          lastKey = "Tab";
        } else if (e.keyCode == 27) {
          lastKey = "Escape";
        } else if (e.keyCode == 187) {
          lastKey = "=";
        } else if (e.keyCode == 189) {
          lastKey = "-";
        } else {
          lastKey = String.fromCharCode(e.keyCode).toUpperCase();
        }
      }
      if (scwin.__isPreventKey(complexKey, lastKey)) {
        scwin.__runEvent(complexKey, lastKey);

        // 運用環境でブラウザのショートカットキーの動作を停止
        if (scwin.IS_USE_BROWSER_SHORTCUT === false) {
          // IEでF1キーの動作を停止
          if ('onhelp' in window) {
            window.onhelp = function () {
              return false;
            };
          }
          if (e.preventDefault) {
            e.preventDefault();
          } else if (e.returnValue) {
            e.returnValue = false;
          }
        }
      }
    }
  } catch (ex) {
    console.error(ex);
  }
};

/**
 * @method
 * @name __runEvent
* @description ショートカットキーを実行する。
* @param {String} complexKey 複合キー情報 (alt, shift, ctrl)
* @param {String} eventKey イベントキーの値
* @returns {boolean} successFlagのboolean値
 * @hidden Y
 * @exception
 * @example
 */
scwin.__runEvent = function (complexKey, eventKey) {
  try {
    scwin.__runGlobalEvent(complexKey, eventKey);
    const charCode = eventKey.charCodeAt(0);
    if (charCode == 13 || charCode == 39) {
      return;
    }
    const checkShortcut = {};
    const programCd = "";
    eventKey = eventKey.toUpperCase();
    const scopeApi = window.$p;
    const activeWindowInfo = $c.win.getActiveWindowInfo($p, scopeApi);
    const findframe = activeWindowInfo["window"]; // ショートカットキーが検出されたフレーム

    let searchEvent = $c.data.getMatchedJSON($p, $c.hkey.dataList, [{
      columnId: "PROGRAM_CD",
      operator: "==",
      value: activeWindowInfo["programCd"],
      logical: "&&"
    }, {
      columnId: "COMPLEX_KEY",
      operator: "==",
      value: complexKey,
      logical: "&&"
    }, {
      columnId: "LAST_KEY",
      operator: "==",
      value: eventKey,
      logical: "&&"
    }]);
    if (typeof searchEvent == "undefined" || searchEvent.length == 0) {
      searchEvent = $c.data.getMatchedJSON($p, $c.hkey.dataList, [{
        columnId: "PROGRAM_CD",
        operator: "==",
        value: 'TOP',
        logical: "&&"
      }, {
        columnId: "COMPLEX_KEY",
        operator: "==",
        value: complexKey,
        logical: "&&"
      }, {
        columnId: "LAST_KEY",
        operator: "==",
        value: eventKey,
        logical: "&&"
      }]);
    }
    if (typeof searchEvent != "undefined" && searchEvent.length > 0) {
      const shortuctObj = searchEvent[0];
      if (shortuctObj["EVENT_TYPE"] === "F") {
        if (shortuctObj["EVENT_YN"] == "Y") {
          const funcTokenArr = shortuctObj["EVENT_TARGET"].split(".");
          let runFunction = findframe;
          if (funcTokenArr.length > 0) {
            for (let i = 0; i < funcTokenArr.length; i++) {
              runFunction = runFunction[funcTokenArr[i].trim()];
            }
          } else {
            runFunction = false;
          }
          if (typeof runFunction == "function") {
            runFunction();
          }
        }
      } else if (shortuctObj["EVENT_TYPE"] === "B") {
        if (shortuctObj["EVENT_YN"] == "Y") {
          const runComponent = findframe.$p.getComponentById(shortuctObj["EVENT_TARGET"].trim());
          if (runComponent) {
            runComponent.trigger("click");
          }
        }
      }
    }
    $c.hkey.dataList.removeColumnFilterAll();
  } catch (ex) {
    console.error(ex);
  }
};

/**
 * @method
 * @name addEvent
* @description ショートカットキーを追加する。
* @param {Object} object ショートカットキー追加情報オブジェクト
* @returns {boolean} successFlagのboolean値
 * @hidden N
 * @exception
 * @example
 */
scwin.addEvent = function ($p, object) {
  const successFlag = false;
  try {
    const programCd = object["PROGRAM_CD"] || "";
    const keyCodeObj = scwin.keyToken($p, object.shortCutKey.toUpperCase());
    const eventTarget = object["EVENT_TARGET"] || "";
    const eventName = object["EVENT_NAME"] || "";
    const eventDetail = object["EVENT_DETAIL"] || "";
    const eventType = object["EVENT_TYPE"].toUpperCase() == "B" || object["EVENT_TYPE"].toUpperCase() == "BUTTON" ? "B" : "F";
    const eventYn = object["EVENT_YN"] || "Y";
    if (programCd == "" || eventTarget == "") {
      return false;
    } else {
      const isKey = $c.data.getMatchedJSON($p, $c.hkey.dataList.getID(), [{
        columnId: "PROGRAM_CD",
        operator: "==",
        value: object["PROGRAM_CD"],
        logical: "&&"
      }, {
        columnId: "COMPLEX_KEY",
        operator: "==",
        value: keyCodeObj["COMPLEX_KEY"],
        logical: "&&"
      }, {
        columnId: "LAST_KEY",
        operator: "==",
        value: keyCodeObj["LAST_KEY"].toUpperCase(),
        logical: "&&"
      }]);
      if (isKey.length > 0) {
        const index = $c.hkey.dataList.getRealRowIndex(0);
        $c.hkey.dataList.setRowJSON(index, {
          "PROGRAM_CD": programCd,
          "COMPLEX_KEY": keyCodeObj["COMPLEX_KEY"],
          "LAST_KEY": keyCodeObj["LAST_KEY"],
          "EVENT_TARGET": eventTarget,
          "EVENT_NAME": eventName,
          "EVENT_DETAIL": eventDetail,
          "EVENT_TYPE": eventType,
          "EVENT_YN": eventYn
        }, true);
      } else {
        const insertIdx = $c.hkey.dataList.insertRow();
        $c.hkey.dataList.setRowJSON(insertIdx, {
          "PROGRAM_CD": programCd,
          "COMPLEX_KEY": keyCodeObj["COMPLEX_KEY"],
          "LAST_KEY": keyCodeObj["LAST_KEY"],
          "EVENT_TARGET": eventTarget,
          "EVENT_NAME": eventName,
          "EVENT_DETAIL": eventDetail,
          "EVENT_TYPE": eventType,
          "EVENT_YN": eventYn
        }, true);
      }
      $c.hkey.dataList.removeColumnFilterAll();
      return true;
    }
  } catch (ex) {
    console.error(ex);
  }
  return WebSquare.util.getBoolean(successFlag);
};

/**
 * @method
 * @name keyToken
* @description キートークン
* @param {String} keyCode 入力されたキーのCode値
* @returns {Object} 入力されたキーの複合キーと組み合わせキーのオブジェクト
 * @hidden N
 * @exception
 * @example
 */
scwin.keyToken = function ($p, keyCode) {
  try {
    const rtnVal = {
      "COMPLEX_KEY": "",
      "LAST_KEY": ""
    };
    const token = keyCode.split("+");
    let firstKey, secondKey, lastKey;
    if (token.length > 2) {
      firstKey = token[0].toUpperCase();
      secondKey = token[1].toUpperCase();
      lastKey = isNaN(Number(token[2])) ? token[2] : "NUM" + token[2];
      if (firstKey == "ALT") {
        rtnVal["COMPLEX_KEY"] = "altShiftKey";
        rtnVal["LAST_KEY"] = lastKey;
      } else if (firstKey == "CTRL") {
        if (secondKey == "SHIFT") {
          rtnVal["COMPLEX_KEY"] = "ctrlShiftKey";
          rtnVal["LAST_KEY"] = lastKey;
        } else {
          rtnVal["COMPLEX_KEY"] = "ctrlAltKey";
          rtnVal["LAST_KEY"] = lastKey;
        }
      }
    } else if (token.length == 2) {
      firstKey = token[0].toUpperCase();
      lastKey = isNaN(Number(token[1])) ? token[1] : "NUM" + token[1];
      if (firstKey == "CTRL" || firstKey == "CTRLKEY") {
        rtnVal["COMPLEX_KEY"] = "ctrlKey";
        rtnVal["LAST_KEY"] = lastKey;
      } else if (firstKey == "ALT" || firstKey == "ALTKEY") {
        rtnVal["COMPLEX_KEY"] = "altKey";
        rtnVal["LAST_KEY"] = lastKey;
      } else if (firstKey == "SHIFT" || firstKey == "SHIFTKEY") {
        rtnVal["COMPLEX_KEY"] = "shiftKey";
        rtnVal["LAST_KEY"] = lastKey;
      } else if (firstKey == "ALTSHIFTKEY") {
        rtnVal["COMPLEX_KEY"] = "altShiftKey";
        rtnVal["LAST_KEY"] = lastKey;
      } else if (firstKey == "CTRLSHIFTKEY") {
        rtnVal["COMPLEX_KEY"] = "ctrlShiftKey";
        rtnVal["LAST_KEY"] = lastKey;
      } else if (firstKey == "CTRLALTKEY") {
        rtnVal["COMPLEX_KEY"] = "ctrlAltKey";
        rtnVal["LAST_KEY"] = lastKey;
      } else {
        rtnVal["COMPLEX_KEY"] = "singleKey";
        rtnVal["LAST_KEY"] = lastKey;
      }
    } else {
      lastKey = isNaN(Number(token[0])) ? token[0] : "NUM" + token[0];
      rtnVal["COMPLEX_KEY"] = "singleKey";
      rtnVal["LAST_KEY"] = lastKey;
    }
    return rtnVal;
  } catch (ex) {
    console.error(ex);
  }
};

/**
 * @method
 * @name delEvent
* @description ショートカットキー登録削除関数
* @param {string} keyCode keyCodeの値
* @param {Object} options optionsの値が含まれているオブジェクト
* @returns {boolean} rtnValue 値、削除の可否
 * @hidden N
 * @exception
 * @example
 */
scwin.delEvent = function ($p, keyCode, options) {
  let rtnVal = true;
  try {
    if (keyCode.lastIndexOf("+") > 0) {
      keyCode = keyCode.toUpperCase();
      const _idx = keyCode.lastIndexOf("+");
      const lastKey = keyCode.slice(_idx + 1).toUpperCase();
      const complexKey = keyCode.slice(0, _idx);
      let complexKeyArr = "";
      if (!isNaN(Number(lastKey))) {
        lastKey = "NUM" + lastKey;
      }
      if (complexKey == "ALT" || complexKey == "ALTKEY") {
        complexKeyArr = "altKey";
      } else if (complexKey == "CTRL" || complexKey == "CTRLKEY") {
        complexKeyArr = "ctrlKey";
      } else if (complexKey == "SHIFT" || complexKey == "SHIFTKEY") {
        complexKeyArr = "shiftKey";
      } else if (complexKey == "ALT+SHIFT" || complexKey == "ALTSHIFTKEY") {
        complexKeyArr = "altShiftKey";
      } else if (complexKey == "CTRL+SHIFT" || complexKey == "CTRLSHIFTKEY") {
        complexKeyArr = "ctrlShiftKey";
      } else if (complexKey == "CTRL+ALT" || complexKey == "CTRLALTKEY") {
        complexKeyArr = "ctrlAltKey";
      } else if (complexKey == "SINGLE" || complexKey == "SINGLEKEY") {
        complexKeyArr = "singleKey";
      }
      const isKey = $c.data.getMatchedJSON($p, $c.hkey.dataList.getID(), [{
        columnId: "PROGRAM_CD",
        operator: "==",
        value: options["PROGRAM_CD"],
        logical: "&&"
      }, {
        columnId: "COMPLEX_KEY",
        operator: "==",
        value: complexKeyArr,
        logical: "&&"
      }, {
        columnId: "LAST_KEY",
        operator: "==",
        value: lastKey,
        logical: "&&"
      }]);
      if (isKey.length > 0) {
        const idxArr = options.REMOVE_IDX;
        for (let i = 0; i < idxArr.length; i++) {
          $c.hkey.dataList.removeRow(idxArr[i]);
        }
      }
      $c.hkey.dataList.removeColumnFilterAll();
    }
  } catch (ex) {
    console.error(ex);
    rtnVal = false;
  }
  return rtnVal;
};

/**
 * @method
 * @name __isPreventKey
* @description ショートカットキーの実行を防ぐ対象のKeyであるかどうかの検査を行います。
* @param {string} complexKey 複合キーの値（alt、shiftなど）
* @param {string} lastKey 最後のキー値。複合キーの場合は組み合わせで最後に押すキー
* @returns {boolean} ショートカットキーの実行を防ぐ対象であればfalse、そうでない場合はtrue
 * @hidden Y
 * @exception
 * @example
 */
scwin.__isPreventKey = function (complexKey, lastKey) {
  const exTag = ["INPUT", "TEXTAREA", "IFRAME"];
  const controlKeyList = ["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "ctrlKey", "altKey", "ctrlAltKey", "ctrlShiftKey", "altShiftKey", "Escape"];
  const activeTag = document.activeElement.tagName;
  if (exTag.indexOf(activeTag) === -1) {
    if (complexKey === "singleKey" && lastKey === "Tab" || complexKey === "shiftKey" && lastKey === "Tab" || complexKey === "singleKey" && lastKey === "Enter") {
      return false;
    } else {
      return true;
    }
  } else if (exTag.indexOf(activeTag) > -1 && (complexKey === "ctrlKey" && lastKey === "A" || complexKey === "ctrlKey" && lastKey === "C" || complexKey === "ctrlKey" && lastKey === "V" || complexKey === "ctrlKey" && lastKey === "X" || complexKey === "ctrlKey" && lastKey === "Y" || complexKey === "ctrlKey" && lastKey === "Z" || complexKey === "ctrlShiftKey" && lastKey === "Z")) {
    return false;
  } else if (controlKeyList.indexOf(complexKey) !== -1 || controlKeyList.indexOf(lastKey) !== -1) {
    return true;
  }
};

/**
 * @method
 * @name __runGlobalEvent
* @description グローバルショートカットキー実行関数。
* @param {string} complexKey 複合キー "ctrlKey"、"altKey"、"ctrlAltKey"、"ctrlShiftKey"、"altShiftKey"
 * @param {string} eventKey "F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", 
* "F12"、"Tab"、"Escape"、"0~9"、"a-z"、"A-Z"、特殊文字(!@#~)など
 * @returns
 * @hidden Y
    * @exception
    * @example
    */
scwin.__runGlobalEvent = function (complexKey, eventKey) {
  try {
    // F1キーを押した時にユーザーが定義したスクリプトのみが実行されるようにするため
    // ブラウザのファンクションキーの動作を停止するには、scwin.IS_USE_BROWSER_SHORTCUTプロパティをfalseに設定する必要があります。（デフォルト値はtrueです）
    if (eventKey === "F1") {
      // $c.win.alert("F1が実行されました。");
      // Escape Keyが入力されると、最後に開かれたAlertまたはConfirmウィンドウを閉じます。
    } else if (eventKey === "Escape") {
      let popupIndex = $p.getAllPopupList().length - 1;
      if (popupIndex > -1) {
        for (let i = popupIndex; popupIndex >= 0; popupIndex--) {
          if ($p.getAllPopupList()[i].options.frameMode === "wframe") {
            let messageType = $c.data.getParameter($p, "messageType", $p.getPopupWindow($p.getAllPopupList()[popupIndex].id).$p);
            if (!$c.util.isEmpty($p, messageType) && (messageType === "alert" || messageType === "confirm")) {
              $p.getPopupWindow($p.getAllPopupList()[popupIndex].id).$p.closePopup();
            }
          }
        }
      }
    }
  } catch (ex) {
    console.error(ex);
  }
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'}}]}]})