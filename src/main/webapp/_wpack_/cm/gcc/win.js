/*amd /cm/gcc/win.xml 52222 a37b4c6d233594123545e0f6ee03f12d53112365769ec88eb2482f9ee58ac8d2 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',A:{},E:[{T:1,N:'w2:type',E:[{T:3,text:'COMMON'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'}},{T:1,N:'w2:workflowCollection'}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:'scwin.__getI18NUrl,scwin.getScope,scwin.__getScope,scwin.getActiveWindowInfo,scwin.showToastMessage,scwin.openMenu,scwin.openPopup,scwin.closePopup,scwin.closeAllPopup,scwin.isPopup,scwin.messagBox,scwin.setProgramAuthority,scwin.processCommonData,scwin.setHistoryBackEvent,scwin.pushState,scwin.changePageState,scwin.addEventOnBeforeUnload,scwin.removeEventOnBeforeUnload,scwin.__setOnBeforeUnload,scwin.errorHandler,scwin.reload,scwin.getProgramId,scwin.goHome,scwin.logout,scwin.isAdmin,scwin.getFullPath,scwin.setEnterKeyEvent,scwin.alert,scwin.confirm,scwin.getLanguage,scwin.getPopupId,scwin.moveUrl,scwin.setWFrameSrc,scwin.getFrame,scwin.getParent,scwin.setLangCode,scwin.getLangCode,scwin.getCbFunctionManager'}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){/**
 * @component
 * @componentName udc_win
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
* 業務画面領域制御（権限、業務画面共通UI要素及びボタン制御、個人化など）関数を作成する。
 *
 * @author Inswave Systems
 * @class win
 * @namespace $c.win
 */
// =============================================================================

// メッセージレイヤーインデックス
scwin.MESSAGE_IDX = 1;

// メッセージ通知コールバックFunction情報の保存
scwin.CB_FUNCTION_MANAGER = {
  cbFuncIdx: 0,
  // 情報保存のIndex Key
  cbFuncSave: {} // 情報保存オブジェクト
};
scwin.onpageload = function ($p) {
  requires("uiplugin.popup");
};

/**
 * @method 
 * @name __getI18NUrl
* @description 多言語処理関数
* @param {String} xmlUrl フールURLからw2xPath以下のパス
 * @hidden N
 * @exception 
 * @example
 * $c.getI18NUrl( "/ui/SW/request.xml" ); 
* //return 例）"/websquare/I18N?w2xPath=/ui/SW/request.xml"
 */
scwin.__getI18NUrl = function (xmlUrl) {
  const contextPath = $c.sbm.getContextPath($p);
  const baseURL = contextPath + "/I18N";
  let rsURL = "";
  const locale = WebSquare.cookie.getCookie("locale");
  const bXml = "/blank.xml";
  xmlUrl = $c.util.getParameter($p, "w2xPath", xmlUrl) || xmlUrl;
  xmlUrl = xmlUrl.replace(/\?.*/, "");
  if (xmlUrl.search(bXml) > -1 && xmlUrl.search(WebSquare.baseURI) == -1) {
    xmlUrl = WebSquare.baseURI + "/blank.xml";
  }
  rsURL = baseURL + "?w2xPath=" + WebSquare.jsLoader.getUri(WebSquare.core.getURL(xmlUrl));
  if (locale != null && locale != '') {
    rsURL = rsURL + "&locale=" + unescape(locale);
  }
  return rsURL;
};

/**
 * @method
 * @name getScope
* @description コンポーネントの現在のスコープ情報を返します。
* @param {string} comObj コンポーネントオブジェクト
 * @hidden N
 * @exception 
 * @example ${example}
 */
scwin.getScope = function ($p, comObj) {
  if (typeof comObj == 'undefined') {
    const scopeApi = $p;
    return $c.win.__getScope(scopeApi);
  }
  try {
    if (typeof comObj === "string") {
      const scopeObj = $c.util.getComponent($p, comObj);
      if (scopeObj !== null) {
        return scopeObj.getScopeWindow();
      }
    } else {
      return comObj.getScopeWindow();
    }
  } catch (ex) {
    console.error(ex);
    return null;
  }
};

/**
 * @method
 * @name __getScope
* @description $pをパラメーターとして直接渡すgetScope
* @param {Object} comObj コンポーネントオブジェクト
 * @returns
 * @hidden N
 * @exception
 * @example
 */
scwin.__getScope = function (comObj) {
  try {
    if (typeof comObj === "string") {
      const scopeObj = $c.util.getComponent($p, comObj);
      if (scopeObj !== null) {
        return scopeObj.getScopeWindow();
      }
    } else {
      return comObj.getScopeWindow();
    }
  } catch (ex) {
    console.error(ex);
    return null;
  }
};

/**
 * @method 
 * @name getActiveWindowInfo
* @description 現在アクティブな実行フレームウィンドウの情報を返します。
* @param {Object} コンポーネントオブジェクトまたはID（WFrame Scopeパスを含むフルパスID）
* @returns {Object} 現在のアクティブウィンドウの情報を返す
* {String} activeinfo.type : アクティブウィンドウタイプ [P : ポップアップ, T: タブコンテンツ, W: ウィンドウコンポーネント]
* {Object} activeinfo.window : アクティブウィンドウオブジェクト
* {String} activeinfo.programCd : アクティブウィンドウのプログラムコード
 * @hidden N
 * @exception 
 * @example
 */
scwin.getActiveWindowInfo = function ($p, scopeApi) {
  // $pを直接挿入した場合。
  if (typeof scopeApi == 'object') {
    $p = scopeApi;
  }
  ;
  const activeInfo = {
    "type": "",
    // T:Tabcontrol, W:windowContainer, P:popup
    "window": "",
    // Windowオブジェクト
    "programCd": "" // プログラムコード (ポップアップの場合は例外)
  };
  const popupList = $p.getPopupWindowList();
  let popupWindow = null;
  if (popupList.length > 0) {
    for (let i = popupList.length - 1; i > -1; i--) {
      if (document.activeElement.id + "_wframe" === popupList[i].$p.getFrameId()) {
        popupWindow = $p.getPopupWindow(document.activeElement.id);
      }
    }
  }
  let findProgramList;
  if (popupWindow !== null) {
    // WFrame Popupで開かれたポップアップ画面
    activeInfo["type"] = "P";
    activeInfo["programCd"] = $c.win.getProgramId($p, popupWindow.$p);
    activeInfo["window"] = popupWindow;
  } else if ($p.main().main && typeof $p.main().main.getLayoutId === "function") {
    // TabControlまたはWindowContainerを通じて開かれた業務画面
    activeInfo["type"] = $p.main().main.getLayoutId();
    if (activeInfo["type"] == "T") {
      const selectedTabId = $p.main().tac_layout.getSelectedTabID();
      findProgramList = $c.data.menuComp.getMatchedJSON("MENU_CD", selectedTabId, true);
      if (findProgramList.length > 0) {
        activeInfo["programCd"] = findProgramList[0].PROGRAM_CD;
      }
      activeInfo["window"] = $p.main().tac_layout.getWindow(selectedTabId);
    } else if (activeInfo["type"] == "M") {
      const selectedWindowId = $p.main().wdc_main.getSelectedWindowId();
      findProgramList = $c.data.menuComp.getMatchedJSON("MENU_CD", selectedWindowId, true);
      if (findProgramList.length > 0) {
        activeInfo["programCd"] = findProgramList[0].PROGRAM_CD;
      }
      activeInfo["window"] = $p.main().wdc_main.getWindow(selectedWindowId);
    } else if (activeInfo["type"] == "S") {
      if (!$c.util.isEmpty($p, $c.data.getParameter($p, $p.main().wfm_layout.getWindow().$p, "menuInfo"))) {
        activeInfo["programCd"] = $c.data.getParameter($p, $p.main().wfm_layout.getWindow().$p, "menuInfo");
      }
      activeInfo["window"] = $p.main().wfm_layout.getWindow();
    }
  } else {
    // Window Popupの方式で開かれたポップアップ画面
    activeInfo["type"] = "P";
    activeInfo["programCd"] = $c.win.getProgramId($p);
    activeInfo["window"] = $p.getFrame();
  }
  return activeInfo;
};

/**
 * @method 
 * @name showToastMessage
* @description トーストメッセージを表示する。
* @param {String} メッセージ種類 ( エラー : scwin.MESSAGE_CODE.STATUS_ERROR, 成功 : scwin.MESSAGE_CODE.STATUS_SUCCESS, 警告 : scwin.MESSAGE_CODE.STATUS_WARNING, 情報 : scwin.MESSAGE_CODE.STATUS_INFO )
* @param {String} メッセージ メッセージ
 * @hidden N
 * @exception 
 * @example
$c.win.showToastMessage($c.sbm.getMessageCode('STATUS_SUCCESS'), e.responseJSON.rsMsg.statusMsg);
 */
scwin.showToastMessage = function ($p, messageType, message) {
  if ($c.util.isEmpty($p, $p.main().wfm_footer)) {
    return;
  }
  const messageIdx = new Date().getTime();
  const wfmFooter = $p.main().wfm_footer.getWindow();
  let className = "";
  if ($c.sbm.getMessageCode($p, 'STATUS_ERROR') === messageType) {
    className = "error";
  } else if ($c.sbm.getMessageCode($p, 'STATUS_SUCCESS') === messageType) {
    className = "success";
  } else if ($c.sbm.getMessageCode($p, 'STATUS_WARNING') === messageType) {
    className = "warning";
  } else {
    className = "info";
  }
  wfmFooter.$p.dynamicCreate("grp_notice_" + messageIdx, "group", {
    style: "opacity: 0.0;"
  }, wfmFooter.grp_noticeArea);
  let grpNotice = wfmFooter.$p.getComponentById("grp_notice_" + messageIdx);
  grpNotice.addClass("notice");
  wfmFooter.$p.dynamicCreate("grp_noticeInfo_" + messageIdx, "group", {
    style: "opacity: 0.0"
  }, grpNotice);
  let grpNoticeInfo = wfmFooter.$p.getComponentById("grp_noticeInfo_" + messageIdx);
  grpNoticeInfo.addClass(className);
  wfmFooter.$p.dynamicCreate("tbx_message_" + messageIdx, "textbox", {
    style: "display:inline; margin-left:3px",
    label: message
  }, grpNoticeInfo);
  wfmFooter.$p.$("#" + grpNotice.getID()).fadeTo(1000, 1);
  wfmFooter.$p.$("#" + grpNoticeInfo.getID()).fadeTo(1000, 1);
  $c.util.setTimeout($p, function (idx) {
    let grpNotice = wfmFooter.$p.getComponentById("grp_notice_" + idx);
    if (!$c.util.isEmpty($p, grpNotice)) {
      wfmFooter.$p.$("#" + grpNotice.getID()).fadeTo(1000, 0);
    }
    let grpNoticeInfo = wfmFooter.$p.getComponentById("grp_noticeInfo_" + idx);
    if (!$c.util.isEmpty($p, grpNoticeInfo)) {
      wfmFooter.$p.$("#" + grpNoticeInfo.getID()).fadeTo(1000, 0);
    }
    $c.util.setTimeout($p, function (idx) {
      const tbxMessage = wfmFooter.$p.getComponentById("tbx_message_" + idx);
      if (!$c.util.isEmpty($p, tbxMessage)) {
        tbxMessage.remove();
      }
      let grpNoticeInfo = wfmFooter.$p.getComponentById("grp_noticeInfo_" + idx);
      if (!$c.util.isEmpty($p, grpNoticeInfo)) {
        grpNoticeInfo.remove();
      }
      let grpNotice = wfmFooter.$p.getComponentById("grp_notice_" + idx);
      if (!$c.util.isEmpty($p, grpNotice)) {
        grpNotice.remove();
      }
      let objArr = $c.util.getChildren($p, wfmFooter.grp_noticeArea, {
        includePlugin: "group textbox",
        recursive: true
      });
    }, {
      delay: 1500,
      args: [idx],
      key: "MessageRemove" + idx
    });
  }, {
    delay: 3000,
    args: [messageIdx],
    key: "MessageFadeOut" + messageIdx
  });
};

/**
 * @method 
 * @name openMenu
* @description 特定のメニューを開きます。
* @param {String} menuNm メニュー名 - 単位画面でこの値をタイトルとして設定します。
* @param {String} url 画面ファイルのパス
* @param {String} menuCode メニューコード - DBに保存されているメニューコード
* @param {Object} data 画面に渡すJSONデータオブジェクト
* @param {Object} option 画面オープンオプション
* @param {String} option.menuType メニュータイプ ("SP" : サンプル画面)
* @param {String} option.closable 閉じるボタンを表示するかどうか
* @param {Boolean} option.isHistory ブラウザ履歴に記録するかどうか (true, false)
* @returns {Boolean} メインレイアウト内に画面が開かれたかどうか
 * @hidden N
 * @exception 
 * @example
* $c.win.openMenu("人事照会","/tmp/tmp01.xml","010001");
 */
scwin.openMenu = function ($p, menuNm, url, menuCode, paramObj, option) {
  // クライアントでURLを隠すメニューの場合は、新しいウィンドウで開く処理を適用
  if ($c.util.isEmpty($p, url)) {
    $c.win.alert($p, "メニューにプログラムが登録されていません。");
    return false;
  }
  if (url == "/") {
    const url = document.location.href + "/";
    window.open(url, "", "width=1200, height=700, left=450, top=100");
    return false;
  } else {
    menuCode = menuCode || "";
    const layout = $p.main().main.getLayoutId();
    let tmpUrl;
    let menuCodeParm = menuCode;
    let frameMode = '';
    let data = {};
    let closable = true;
    let fixed = false;
    if (url.indexOf("/") !== 0) {
      url = "/" + url;
    }
    url = $c.sbm.getContextPath($p) + url;
    if (typeof paramObj !== "undefined" && paramObj !== null) {
      data = paramObj;
    }
    data.menuInfo = {
      menuNm: menuNm,
      menuCode: menuCode,
      src: url
    };
    if (!$c.util.isEmpty($p, option) && !$c.util.isEmpty($p, option.menuType)) {
      data.menuInfo.menuType = option.menuType;
    }
    if (!$c.util.isEmpty($p, option) && !$c.util.isEmpty($p, option.closable)) {
      closable = option.closable;
    }
    if (!$c.util.isEmpty($p, option) && !$c.util.isEmpty($p, option.fixed)) {
      fixed = option.fixed;
    }
    if (layout == "T") {
      const tabObj = {
        closable: closable,
        // タブを閉じる機能を提供
        openAction: "select",
        // exist は既存のタブを更新、new は常に新規、selectは同一idが存在する場合選択、last: 既存のタブを最後のタブに移動後選択
        label: menuNm
      };
      const contObj = {
        frameMode: "wframePreload",
        scope: true,
        src: url,
        alwaysDraw: false,
        title: menuNm,
        dataObject: {
          type: "json",
          name: "paramData",
          data: data
        }
      };

      // tabObjのopenActionでlast値の動作として、選択されていない場合に選択するロジックを追加
      return Promise.resolve().then(function () {
        return $p.main().tac_layout.addTab(menuCode, tabObj, contObj);
      }).then(function (tabId) {
        $p.main().tac_layout.setSelectedTabIndex(tabId);
        return tabId;
      }).then(function (tabId) {
        // historyに画面遷移したプログラムコードを保存
        if (!$c.util.isEmpty($p, option) && option.isHistory && !$c.util.isEmpty($p, menuCode)) {
          $c.win.pushState($p, data);
        }
        return tabId;
      });
    } else if (layout == "M") {
      const options = {
        title: menuNm,
        src: url,
        windowTitle: menuNm,
        windowId: menuCode,
        openAction: "selectWindow",
        frameMode: "wframe",
        fixed: fixed === true ? true : false,
        _closable: closable === false ? false : true,
        closeAction: function (title) {
          const winScope = $p.main().wdc_main.getWindowByUniqueId(this.id);
          if (winScope.options != undefined && winScope.options._closable === false) {
            return false;
          } else {
            const isOnbeforecloseall = $p.main().wdc_main.getUserData("isOnbeforeCloseAll");
            if (typeof isOnbeforecloseall === "undefined" || isOnbeforecloseall === false) {
              const isClose = $p.main().main.closeBeforePage(winScope.$p.getFrame());
              if (isClose === false) {
                $p.main().wdc_main.setFocus($p.main().wdc_main.getSelectedIndex());
              }
              $p.main().wdc_main.setUserData("isOnbeforeCloseAll", false);
              return isClose;
            }
            return true;
          }
        },
        dataObject: {
          type: "json",
          name: "paramData",
          data: data
        }
      };
      return Promise.resolve().then(function () {
        $p.main().wdc_main.createWindow(options);
        return options;
      }).then(function (options) {
        let winScope = $p.main().wdc_main.getWindow(options.windowId);
        winScope.options = {
          _closable: options._closable
        };

        // historyに画面遷移したプログラムコードを保存
        if (!$c.util.isEmpty($p, option) && option.isHistory && !$c.util.isEmpty($p, menuCode)) {
          $c.win.pushState($p, data);
        }
      });
    } else if (layout == "S") {
      const isClose = $p.main().main.closeBeforePage($p.main().wfm_layout.getWindow().$p.getFrame());
      if (isClose) {
        const programCd = $p.main().wfm_side.getWindow().dlt_menu.getMatchedColumnData("SRC_PATH", url, "PROGRAM_CD");
        data.menuInfo.programCd = programCd[0];

        // historyに画面遷移したプログラムコードを保存
        if (!$c.util.isEmpty($p, option) && option.isHistory && !$c.util.isEmpty($p, menuCode)) {
          $c.win.pushState($p, data);
        }
        const param = {
          dataObject: {
            type: "json",
            name: "paramData",
            data: data
          }
        };
        return Promise.resolve().then(function () {
          return $p.main().wfm_layout.setSrc(url, param);
        });
      } else {
        return false;
      }
    }
  }
  return false;
};

/**
 * @method 
 * @name openPopup
* @description ポップアップウィンドウを開きます。
* @param {String} url 画面パス
* @param {Array} options ポップアップウィンドウのオプション
* @param {String} options.id ポップアップウィンドウのID
* @param {String} options.type 画面オープンタイプ ("wframePopup", "browserPopup")
* @param {String} options.width ポップアップウィンドウの幅
* @param {String} options.height ポップアップウィンドウの高さ
* @param {String} options.popupName useIframeがtrueの場合、popupオブジェクトの名前としてpopupフレームのタイトルバーに表示されます。
* @param {String} options.useIFrame [default : false] true : IFrameを使用するWebSquare popup / false: window.openを使用するpopup
* @param {String} options.style Popupのスタイルを指定します。値がある場合、left、top、width、heightは適用されません。
 * @param {String} options.resizable [default : false]
 * @param {String} options.modal [default : false]
 * @param {String} options.scrollbars [default : false]
 * @param {String} options.title [default : false]
 * @param {String} options.notMinSize [default : false]
* @param {Object} data ポップアップ画面に渡すデータオブジェクト（typeがwframePopupの場合のみ対応）
 * @hidden N
 * @exception 
 * @example
 */
scwin.openPopup = function ($p, url, opts, data) {
  return new Promise(function (resolve, reject) {
    if ($p.top().$p.getComponentById("udc_gridVIew_finder")) {
      $p.top().$p.getComponentById("udc_gridVIew_finder").gridFinderClose();
    }
    if (typeof opts !== "object") {
      opts = {};
    }
    if ($c.util.isEmpty($p, data)) {
      data = {};
    }
    if ($c.util.isEmpty($p, data.callbackFn)) {
      data.callbackFn = function (rtn) {
        if (!$c.util.isEmpty($p, rtn)) {
          if (!$c.util.isEmpty($p, rtn.clickValue)) {
            resolve(rtn.clickValue);
          } else {
            resolve(rtn);
          }
        } else {
          resolve(false);
        }
      };
    }
    scwin._openPopup($p, url, opts, data);
  });
};

/**
 * @method 
 * @name _openPopup
* @description ポップアップウィンドウを開く。
* @param {String} url URL 画面パス
* @param {Array} options ポップアップウィンドウのオプション
* @param {String} options.id ポップアップウィンドウのID
* @param {String} options.type 画面オープンタイプ ("wframePopup", "browserPopup")
* @param {String} options.width ポップアップウィンドウの幅
* @param {String} options.height ポップアップウィンドウの高さ
* @param {String} options.popupName useIframeがtrueの場合、popupオブジェクトの名前としてpopupフレームのタイトルバーに表示されます。
* @param {String} options.useIFrame [default : false] true : IFrameを使用するWebSquare popup / false: window.openを使用するpopup
* @param {String} options.style Popupのスタイルを指定します。値がある場合、left、top、width、heightは適用されません。
 * @param {String} options.resizable [default : false]
 * @param {String} options.modal [default : false]
 * @param {String} options.scrollbars [default : false]
 * @param {String} options.title [default : false]
 * @param {String} options.notMinSize [default : false]
* @param {Object} data ポップアップ画面に渡すデータオブジェクト（typeがwframePopupの場合のみ対応）
 * @hidden Y
 * @exception 
 * @example
 */
scwin._openPopup = function ($p, url, opt, data) {
  data.menuInfo = {
    src: url
  };
  const _dataObj = {
    type: "json",
    data: data,
    name: "paramData"
  };
  let width = opt.width || 500;
  let height = opt.height || 500;
  try {
    const deviceWidth = parseFloat($("body").css("width"));
    const deviceHeight = parseFloat($("body").css("height"));
    if (!opt.notMinSize) {
      let borderSize = 4;
      if (opt.type != "browserPopup") {
        borderSize = 4;
        if (deviceWidth > 0 && width > deviceWidth) {
          width = deviceWidth - borderSize; // ポップアップのborderを考慮
        }
        if (deviceHeight > 0 && height > deviceHeight) {
          height = deviceHeight - borderSize; // ポップアップのborderを考慮
        }
      } else {
        if (window.screen.availHeight <= height) {
          height = window.screen.availHeight - 100;
        }
      }
    }
  } catch (ex) {
    console.error(ex);
  }
  opt.type = opt.type || "wframePopup";
  opt.frameModal = opt.frameModal || "";
  opt.className = opt.frameModal == "frame" ? opt.className ? opt.className + " f_pop" : "f_pop" : "";
  let top, left;
  if (opt.type == "browserPopup") {
    top = Math.floor((window.screen.availHeight - 50 - $c.num.parseInt($p, height)) / 2) + (window.screen.availTop || 0) + "px";
    left = Math.floor((window.screen.availWidth - $c.num.parseInt($p, width)) / 2) + (window.screen.availLeft || 0) + "px";
  } else {
    let frameTop = 0;
    let frameLeft = 0;
    if (opt.frameModal === "frame") {
      frameTop = $p.getFrame().render.getBoundingClientRect().top / 2;
      frameLeft = $p.getFrame().render.getBoundingClientRect().left / 2;
    }
    top = document.body.offsetHeight / 2 - $c.num.parseInt($p, height) / 2 - frameTop + $(document).scrollTop() + "px";
    left = document.body.offsetWidth / 2 - $c.num.parseInt($p, width) / 2 - frameLeft + $(document).scrollLeft() + "px";
  }
  if (typeof _dataObj.data !== "undefined") {
    if (typeof _dataObj.data.callbackFn == "function") {
      const cbFuncIdx = ++scwin.CB_FUNCTION_MANAGER["cbFuncIdx"];
      const idx = "__close_callback_Func__" + new Date().getTime() + "_" + cbFuncIdx;
      scwin.CB_FUNCTION_MANAGER["cbFuncSave"][$p.id + idx] = _dataObj.data.callbackFn;
      _dataObj.data.callbackFn = $p.id + idx;
    } else if (typeof _dataObj.data.callbackFn === "undefined") {
      _dataObj.data.callbackFn = "";
    } else if (typeof _dataObj.data.callbackFn === "string") {
      _dataObj.data.callbackFn = $p.id + _dataObj.data.callbackFn;
    }
  }
  const options = {
    id: opt.id,
    popupName: opt.popupName || "",
    type: opt.type,
    width: width + "px",
    height: height + "px",
    top: opt.top || top || "140px",
    left: opt.left || left || "500px",
    modal: opt.modal == false ? false : true,
    frameModal: opt.frameModal,
    dataObject: _dataObj,
    alwaysOnTop: opt.alwaysOnTop || true,
    useModalStack: opt.useModalStack == false ? false : true,
    resizable: opt.resizable == false ? false : true,
    useMaximize: opt.useMaximize || false,
    className: opt.className || "",
    scrollbars: true,
    windowDragMove: opt.windowDragMove || true,
    windowMoveType: opt.windowMoveType || "overflow",
    minVisibleWindowPixel: 20,
    closeAction: function () {
      if ($p.top().$p.getComponentById("udc_gridVIew_finder")) {
        $p.top().$p.getComponentById("udc_gridVIew_finder").gridFinderClose();
      }
      let popupWindow = $p.getPopupWindow(this.id);
      if ($p.getPopupWindow(this.id) == undefined) {
        popupWindow = this.getScopeWindow();
      }
      let isClose = true;
      if (popupWindow.$p.getFrameId() === null) {
        if ($p.main().main && typeof $p.main().main.closeBeforePage === "function") {
          isClose = $p.main().main.closeBeforePage(window.$p.main().$p.getFrame());
        }
      } else {
        if ($p.main().main && typeof $p.main().main.closeBeforePage === "function") {
          isClose = $p.main().main.closeBeforePage(popupWindow.$p.getFrame());
        }
      }
      if (!isClose) {
        return false;
      }
      const messageType = $c.data.getParameter($p, "messageType", popupWindow.$p) || "alert";
      const callbackFuncStr = $c.data.getParameter($p, "callbackFn", popupWindow.$p);
      const callbackFunc = $c.util.getCallBackFunction($p, callbackFuncStr);
      if (typeof callbackFunc === "function") {
        let popup;
        if (popupWindow.$p.isWFramePopup()) {
          popup = popupWindow.scwin._popup;
        } else {
          popup = popupWindow.$p.main().scwin._popup;
        }
        if (!$c.util.isEmpty($p, popup) && !$c.util.isEmpty($p, popup.callbackParam)) {
          callbackFunc($c.util.getJSON($p, popup.callbackParam));
        } else if ($p.main().main && !$c.util.isEmpty($p, popupWindow.$p.main().scwin._popup) && !$c.util.isEmpty($p, popupWindow.$p.main().scwin._popup.callbackParam)) {
          callbackFunc($c.util.getJSON($p, popupWindow.$p.main().main._popup.callbackParam));
        } else {
          if (messageType === "confirm") {
            callbackFunc({
              clickValue: false
            });
          }
        }
      }
      return true;
    },
    popupUrl: "../popup"
  };
  $p.openPopup($c.sbm.getContextPath($p) + url, options);
};

/**
 * @method 
 * @name closePopup
* @description ポップアップウィンドウを閉じる。
* @param {Object} $p WFrame Scope $pオブジェクト
* @param {String} popId ポップアップウィンドウのID。値がない場合は現在のウィンドウのID
* @param {String} callbackParamStr 親ウィンドウに渡されたデータ
* @param {String} callbackFnStr コールバック関数名
 * @hidden N
 * @exception 
 * @example
 */
scwin.closePopup = function ($p, callbackParam, callbackFnStr) {
  if (!$c.util.isEmpty($p, callbackParam)) {
    $p.getFrame().scope.scwin._popup = {
      callbackParam: callbackParam
    };
  }
  scwin._closePopup($p, $c.win.getPopupId($p), $c.str.serialize($p, callbackParam), callbackFnStr);
};

// TODO :: 以下のコードはテスト完了後に削除する必要があります。
/**
 * @method 
 * @name _closePopup
* @description ポップアップウィンドウを閉じる。
* @param {Object} $p WFrame Scope $pオブジェクト
* @param {String} popId ポップアップウィンドウのID。値がない場合は現在のウィンドウのID
* @param {String} callbackParamStr 親ウィンドウに渡されたデータ
* @param {String} callbackFnStr コールバック関数名
 * @hidden Y
 * @exception 
 * @example
 */
scwin._closePopup = function ($p, popId, callbackParamStr, callbackFnStr) {
  $c.util.setTimeout($p, function () {
    if ($p.isWFramePopup()) {
      $p.closePopup(popId);
    } else {
      let func = $c.util.getCallBackFunction($p, callbackFnStr);
      if (func) {
        func($c.util.getJSON($p, callbackParamStr));
      } else if (opener !== null) {
        func = opener.$c.util.getCallBackFunction($p, callbackFnStr);
        if (func) {
          func($c.util.getJSON($p, callbackParamStr));
        }
      }
      $w.closePopup();
    }
  }, {
    delay: 10,
    key: "closePopup" + (Math.random() * 16).toString().replace(".", "")
  });
};

/**
 * @method 
 * @name closeAllPopup
* @description 現在開いているすべてのポップアップウィンドウを閉じる。
 * @hidden N
 * @exception 
 * @example
$c.win.closeAllPopup();
 */
scwin.closeAllPopup = function ($p) {
  // WebSquare.uiplugin.popup.popupListプロパティはエンジン内の非公開プロパティであり、共通部分でのみ制限的に使用されます（業務画面ソースでの使用は禁止）
  const popupList = WebSquare.uiplugin.popup.popupList;
  for (let idx = 0; idx < popupList.length; idx++) {
    $p.closePopup(WebSquare.uiplugin.popup.popupList[idx].id);
  }
};

/**
 * @method 
 * @name isPopup
* @description 現在の画面がポップアップであるかどうかを返します。
* @returns {Boolean} ポップアップかどうか（ポップアップの場合はtrue、ポップアップでない場合はfalse）
 * @hidden N
 * @exception 
 * @example
if ($c.win.isPopup()) {
$c.win.alert("現在の画面はポップアップです。");
};
 */
scwin.isPopup = function ($p) {
  return isPopup($p);
  function isPopup(scope) {
    if (scope.isPopup()) {
      return true;
    } else if (scope.top().$p.getFrameId() === scope.getFrameId()) {
      return false;
    } else {
      return isPopup(scope.parent().$p);
    }
  }
};

/**
 * @method 
 * @name messagBox
* @description メッセージポップアップを呼び出します。
* @param {Object} $p WFrame Scope $pオブジェクト
* @param {String} messageType ポップアップウィンドウのタイプ (alert || confirm)
* @param {String} messageStr メッセージ
* @param {String} closeCallbackFncName コールバック関数名
* @param {String} title ポップアップウィンドウのタイトル
 * @hidden N
 * @exception 
 * @example
//アラートウィンドウを表示する場合
scwin.callback = function(){
console.log("コールバック関数です。");
};
$c.win.messagebox($p, "alert", "送信するメッセージ", "callback");

//確認ダイアログを表示する場合
scwin.callback = function(){
console.log("コールバック関数です。");
};
$c.win.messagebox($p, "confirm", "送信するメッセージ", "callback");
 */
scwin.messagBox = function ($p, messageType, messageStr, closeCallbackFncName, opts) {
  messageStr = messageStr || "";
  messageType = messageType || "alert";
  let popId = messageType || "tmp";
  popId = popId + (Math.random() * 16).toString().replace(".", "");
  if (typeof opts.callBackParam !== "object") {
    opts.callBackParam = {};
  }
  let sysMsg = "";
  if ($c.util.isArray($p, messageStr)) {
    sysMsg = $c.data.getMessage($p, messageStr);
    if (typeof sysMsg === "string" && sysMsg != "") {
      messageStr = sysMsg;
    } else {
      messageStr = "";
    }
  } else {
    sysMsg = $c.data.getMessage($p, messageStr);
    if (typeof sysMsg === "string" && $c.util.isEmpty($p, sysMsg) === false) {
      messageStr = sysMsg;
    }
  }
  const data = {
    "message": messageStr,
    "callbackFn": closeCallbackFncName,
    "messageType": messageType,
    "id": popId,
    "callBackParam": opts.callBackParam
  };
  const options = {
    id: popId,
    popupName: messageType == "alert" ? $c.data.getMessage($p, "MSG_CM_00046") : $c.data.getMessage($p, "MSG_CM_00047"),
    width: 380,
    height: 223,
    frameModal: "top",
    className: "messagebox"
  };
  $c.win.openPopup($p, "/cm/xml/messageBox.xml", options, data);
};

/**
 * @method 
 * @name setProgramAuthority
* @description ユーザーの権限に応じて画面コンポーネントを制御する。
 * @hidden N
 * @exception 
 * @example
 */
scwin.setProgramAuthority = function ($p) {
  const menuInfo = $c.data.getParameter($p, "menuInfo");
  if (typeof menuInfo !== "undefined" && typeof menuInfo.menuCode !== "undefined" && menuInfo.menuCode.trim() !== "") {
    const menuCd = menuInfo.menuCode;
    const menuInfoList = $p.main().wfm_side.getWindow().dlt_menu.getMatchedJSON("MENU_CD", menuCd);
    if (menuInfoList.length > 0) {
      const programAuthorityList = $p.main().wfm_side.getWindow().dlt_programAuthority.getMatchedJSON("PROGRAM_CD", menuInfoList[0].PROGRAM_CD);
      if (programAuthorityList.length > 0) {
        const programAuthority = programAuthorityList[0];
        const objArr = $c.util.getChildren($p, $p.getFrame(), {
          excludePlugin: "group textbox output calendar image span",
          recursive: true
        });
        for (let i = 0; i < objArr.length; i++) {
          if (objArr[i].getPluginName() === "anchor" || objArr[i].getPluginName() === "trigger") {
            if (objArr[i].getOriginalID().indexOf("btn_search") > -1) {
              if (programAuthority.IS_AUTH_SELECT !== "Y") {
                objArr[i].hide();
              }
            } else if (objArr[i].getOriginalID().indexOf("btn_add") > -1) {
              if (programAuthority.IS_AUTH_SAVE !== "Y") {
                objArr[i].hide();
              }
            } else if (objArr[i].getOriginalID().indexOf("btn_cancel") > -1) {
              if (programAuthority.IS_AUTH_SAVE !== "Y") {
                objArr[i].hide();
              }
            } else if (objArr[i].getOriginalID().indexOf("btn_save") > -1) {
              if (programAuthority.IS_AUTH_SAVE !== "Y") {
                objArr[i].hide();
              }
            } else if (objArr[i].getOriginalID().indexOf("btn_excel") > -1) {
              if (programAuthority.IS_AUTH_EXCEL !== "Y") {
                objArr[i].hide();
              }
            }
          }
        }
      }
    }
  }
};

/**
 * @method 
 * @name processCommonData
* @description 共通コード、権限、個人化処理のために生成されたSubmissionをPromise Workflow機能を利用して実行する。
 * @hidden N
 * @exception 
 * @example
 */
scwin.processCommonData = function ($p) {
  const scwinObj = $c.util.getObject($p, "scwin");
  const commonDataWorkflow = {
    "id": "wkf_commonDataWorkflow",
    "processMsg": "",
    "step": [],
    "resolveCallback": "",
    "rejectCallback": ""
  };
  if (typeof scwinObj.ondataload === "function") {
    commonDataWorkflow["resolveCallback"] = scwinObj.ondataload;
  }
  const sbmSearchCode = $c.util.getComponent($p, "_sbm_searchCode");
  if ($c.util.isEmpty($p, sbmSearchCode) === false) {
    commonDataWorkflow.step = [{
      "type": "submit",
      "action": "_sbm_searchCode"
    }, {
      "type": "submitDone",
      "action": "_sbm_searchCode"
    }];
  }
  const sbmSelectShortcutList = $c.util.getComponent($p, "_sbm_selectShortcutList");
  if ($c.util.isEmpty($p, sbmSelectShortcutList) === false) {
    commonDataWorkflow.step.push({
      "type": "submit",
      "action": "_sbm_selectShortcutList"
    });
    commonDataWorkflow.step.push({
      "type": "submitDone",
      "action": "_sbm_selectShortcutList"
    });
  }
  if (commonDataWorkflow.step.length > 0) {
    $c.sbm.executeWorkflow($p, commonDataWorkflow);
  } else {
    if (typeof scwinObj.ondataload === "function") {
      scwinObj.ondataload();
    }
  }
};

/**
 * @method 
 * @name setHistoryBackEvent
* @description ブラウザのBack、Forwardが発生した際にonPopStateイベントを登録します。
 * @hidden N
 * @exception 
 * @example $c.win._setHistoryBackEvent();
 */
scwin.setHistoryBackEvent = function ($p) {
  if (window.addEventListener) {
    window.addEventListener("popstate", $c.win.changePageState);
  } else {
    window.attachEvent("popstate", $c.win.changePageState);
  }
};

/**
 * @method 
 * @name pushState
* @description history.pushState APIを呼び出して、ブラウザでHistoryの状態を記録します。
 * @hidden N
 * @exception 
 * @example $c.win.pushState(option.dataObject.data);
 */
scwin.pushState = function ($p, data) {
  if (data.menuInfo.menuCode === "MAIN") {
    history.pushState({
      "data": data
    }, data.menuInfo.menuNm, $c.sbm.getContextPath($p) + "/");
  } else {
    history.pushState({
      "data": data
    }, data.menuInfo.menuNm, "?menuCd=" + data.menuInfo.menuCode);
  }
};

/**
 * @method 
 * @name changePageState
* @description ブラウザのBack、Forwardが発生した際にonPopStateイベント処理を実行する。
 * @hidden N
 * @exception 
 * @example $c.win.changePageState();
 */
scwin.changePageState = function ($p) {
  scwin.__changePageState();
};

/**
 * @method
 * @name __changePageState
* @description changePageStateで$pを直接パラメータとして送信する場合に使用
 * @param
 * @hidden Y
 * @exception 
 */
scwin.__changePageState = function () {
  if (!$c.util.isEmpty($p, history.state) && !$c.util.isEmpty($p, history.state.data) && !$c.util.isEmpty($p, history.state.data.menuInfo)) {
    const options = {};
    options.isHistory = false;
    const data = history.state.data;
    $c.win.openMenu($p, data.menuInfo.menuNm, data.menuInfo.src, data.menuInfo.menuCode, data.param, options);
  }
};

/**
 * @method 
 * @name addEventOnBeforeUnload
* @description Window.onBeforeUnloadイベントを追加する。
 * @hidden N
 * @exception 
 * @example $c.win.addEventOnBeforeUnload();
 */
scwin.addEventOnBeforeUnload = function ($p) {
  if (window.addEventListener) {
    window.addEventListener("beforeunload", $c.win.__setOnBeforeUnload);
  } else {
    window.attachEvent("onbeforeunload", $c.win.__setOnBeforeUnload);
  }
};

/**
 * @method 
 * @name removeEventOnBeforeUnload
* @description Window.onBeforeUnloadイベントを削除します。
 * @hidden N
 * @exception 
 * @example $c.win.removeEventOnBeforeUnload();
 */
scwin.removeEventOnBeforeUnload = function ($p) {
  if (window.removeEventListener) {
    window.removeEventListener("beforeunload", $c.win.__setOnBeforeUnload);
  } else {
    window.detachEvent("onbeforeunload", $c.win.__setOnBeforeUnload);
  }
};

/**
 * @method
 * @name __setOnBeforeUnload
* @description Window.onBeforeUnloadイベント発生時にページを離れるかどうかを確認します。
* @param {object} e イベントオブジェクト
 * @hidden N
 * @exception 
 * @example $c.win.__setOnBeforeUnload();
 */
scwin.__setOnBeforeUnload = function (e) {
  e.preventDefault();
  e.returnValue = "You didn't save changes";
  return e.returnValue;
};

/**
 * @method 
 * @name errorHandler
* @description ウェブスクエアページの呼び出し時にエラーが発生した場合に発生するイベント関数
 * @hidden N
 * @exception 
 */
scwin.errorHandler = function ($p, e) {
  if (e.status == 404) {
    $c.win.alert($p, e.responseURL + " URLが存在しません。");
  }
};

/**
 * @method 
 * @name reload
* @description ページ全体を再読み込みします。
 * @hidden N
 * @exception 
 */
scwin.reload = function ($p) {
  $c.win.removeEventOnBeforeUnload($p);
  window.location.reload();
};

/**
 * @method 
 * @name getProgramId
* @description プログラムIDを返します。
 * @hidden N
 * @exception 
 * @example
const programId = $c.win.getProgramId();
 */
scwin.getProgramId = function ($p, scopeApi) {
  let programId = "";
  if (typeof scopeApi == "object") {
    programId = scwin.__getProgramId(scopeApi);
    return programId;
  }
  ;
  if ($c.util.isEmpty($p, $p.getMetaValue("meta_screenId"))) {
    // WebSquareのファイル名をプログラムIDと同一に作成した場合のみ正常に動作します。
    let src = "";
    if (!$c.util.isEmpty($p, $p.getFrame())) {
      src = $p.getFrame().getSrc();
    } else {
      src = $p.getParameter("w2xPath");
    }
    if (src.indexOf("/ui/") >= 0) {
      programId = src.substring(src.lastIndexOf("/") + 1, src.lastIndexOf("."));
    }
  } else {
    programId = $p.getMetaValue("meta_screenId");
  }
  return programId;
};

/**
 * @method
 * @name __getProgramId
* @description getProgramIdで$pをパラメーターとして直接送信する場合に呼び出される関数
* @param {$p} scopeApi $p引数が含まれているオブジェクト
 * @hidden Y
 * @exception 
 */
scwin.__getProgramId = function (scopeApi) {
  let $p = scopeApi;
  let programId = "";
  if ($c.util.isEmpty($p, $p.getMetaValue("meta_screenId"))) {
    // WebSquareのファイル名をプログラムIDと同じく作成した場合のみ正常に動作します。
    let src = "";
    if (!$c.util.isEmpty($p, $p.getFrame())) {
      src = $p.getFrame().getSrc();
    } else {
      src = $p.getParameter("w2xPath");
    }
    if (src.indexOf("/ui/") >= 0) {
      programId = src.substring(src.lastIndexOf("/") + 1, src.lastIndexOf("."));
    }
  } else {
    programId = $p.getMetaValue("meta_screenId");
  }
  return programId;
};

/**
 * @method 
 * @name goHome
* @description 最上位ページをインデックス画面に移動 (/)
* @param {Boolean} isLogin ログインページから移動したかどうか
 * @hidden N
 * @exception 
 * @example
 */
scwin.goHome = function ($p) {
  const contextPath = $c.sbm.getContextPath($p);
  if (contextPath == "") {
    top.window.location.href = "/";
  } else {
    top.window.location.href = contextPath;
  }
};

/**
 * @method 
 * @name logout
 * @description
* ログアウトによってWASのユーザーセッションを削除します。
* 正常処理：/に移動。
* エラー発生：既存の画面にエラーメッセージを送信
 * @hidden N
 * @exception 
 * @example
 * $c.win.logout();
 */
scwin.logout = function ($p) {
  $c.win.removeEventOnBeforeUnload($p);
  const logoutGrpOption = {
    id: "_sbm_Logout",
    action: "/main/logout",
    target: "",
    submitDoneHandler: "$c.win.goHome",
    isProcessMsg: false
  };
  $c.sbm.executeDynamic($p, logoutGrpOption);
};

/**
 * @method 
 * @name isAdmin
* @description ログインしたユーザーがシステム管理者であるかどうかを返します。
 * @hidden N
 * @exception 
 * @example
 */
scwin.isAdmin = function ($p) {
  const isAdmin = $p.main().wfm_side.getWindow().dma_defInfo.get("IS_ADMIN");
  if (isAdmin === "Y") {
    return true;
  } else {
    return false;
  }
};

/**
 * @method 
 * @name getFullPath
* @description contextRootを含むパスを返します。
* @param {String} path ファイルパス（Contextを含まない）
* @returns {String} コンテキストを含むファイルパス
 * @hidden N
 * @exception 
 * @example
$c.win.getFullPath("/ui/dev/common/commonCode1.xml");
 */
scwin.getFullPath = function ($p, path) {
  let rtn_path = "";
  const contextPath = $c.sbm.getContextPath($p);
  if (contextPath == "") {
    rtn_path = path;
  } else {
    rtn_path = contextPath + path;
  }
  return rtn_path;
};

/**
 * @method 
 * @name setEnterKeyEvent
* @description 該当グループ内のコンポーネントでエンターキーが発生すると、該当コンポーネントの値をDataCollectionに保存し、objFunc関数を実行します。
* @param {Object} grpObj グループオブジェクト
* @param {Object} objFunc 関数オブジェクト
 * @hidden N
 * @exception 
 * @example
$c.win.setEnterKeyEvent(tbl_search, scwin.btn_search_onclick);
 */
scwin.setEnterKeyEvent = function ($p, grpObj, objFunc) {
  let objArr = $c.util.getChildren($p, grpObj, {
    includePlugin: "checkbox checkcombobox editor input inputCalendar multiselect radio selectbox searchbox secret textarea autoComplete",
    recursive: true
  });
  try {
    for (let i = 0; i < objArr.length; i++) {
      try {
        if (typeof objFunc === "function") {
          objArr[i].bind("onkeyup", function (e) {
            if (e.keyCode === 13) {
              if (typeof this.getRef === "function") {
                let ref = this.getRef();
                let refArray = ref.substring(5).split(".");
                if (typeof refArray !== "undefined" && refArray.length === 2) {
                  const dataCollectionName = refArray[0];
                  const columnId = refArray[1];
                  const dataCollection = this.getScopeWindow().$p.getComponentById(dataCollectionName);
                  const dataType = dataCollection.getObjectType().toLowerCase();
                  if (dataType === "datamap") {
                    dataCollection.set(columnId, this.getValue());
                  } else if (dataType === 'datalist' && typeof rowIndex !== "undefined") {
                    dataCollection.setCellData(dataCollection.getRowPosition(), columnId, this.getValue());
                  }
                }
                objFunc();
              }
            }
          });
        }
      } catch (e) {
        console.error("[$c.win.setEnterKeyEvent] Exception :: " + e.message);
      }
    }
  } catch (ex) {
    console.error(ex);
  } finally {
    objArr = null;
  }
};

/**
 * @method 
 * @name alert
* @description アラートメッセージウィンドウを呼び出します。
* @param {String} messageStr メッセージ
* @param {String} closeCallbackFncName コールバック関数名
* @param {Object} opts ポップアップオプション
* @returns {String} コンテキストを含むファイルパス
 * @hidden N
 * @exception 
 * @example
$c.win.alert("郵便番号を選択してください。");
$c.win.alert("郵便番号を選択してください。", "scwin.alertCallBack");

// 共通メッセージIDを渡すとメッセージに変換して表示
$c.win.alert("$c.cfm.0002") // 保存しますか？

// 共通メッセージに置換値がある場合はArrayで渡す
$c.win.alert(["bbs.cfm.0001",  "MA0101", "MA010101"]) //"カテゴリー [MA0101]を削除しますか？\n削除すると、[MA0101]で登録した投稿を閲覧できなくなります。"

// 存在しない共通メッセージIDの場合、Stringの場合
$c.win.alert("$c.cfm.002") // "$c.cfm.002"

// 存在しない共通メッセージIDの場合、Array の場合
$c.win.alert(["bbs.cfm.0001",  "MA0101", "MA010101"]) //メッセージなし
 */
scwin.alert = function ($p, messageStr, closeCallbackFncName, opts) {
  return new Promise(function (resolve, reject) {
    if (typeof opts !== "object") {
      opts = {};
    }
    if ($c.util.isEmpty($p, closeCallbackFncName)) {
      closeCallbackFncName = function () {
        resolve();
      };
    }
    $c.win.messagBox($p, "alert", messageStr, closeCallbackFncName, opts);
  });
};

/**
 * @method 
 * @name confirm
* @description Confirmメッセージウィンドウを呼び出します。
* @param {String} messageStr メッセージ
* @param {String} closeCallbackFncName コールバック関数名
 * @hidden N
 * @exception 
 * @example

$c.win.confirm("変更されたコードグループ情報を保存しますか？", "scwin.saveCodeGrpConfirmCallback");
$c.win.confirm("下位に新しい組織を追加しますか？", "scwin.insertConfirmCallBack");
 */
scwin.confirm = function ($p, messageStr, closeCallbackFncName, opts) {
  return new Promise(function (resolve, reject) {
    if (typeof opts !== "object") {
      opts = {};
    }
    if ($c.util.isEmpty($p, closeCallbackFncName)) {
      closeCallbackFncName = function (rtn) {
        if (!$c.util.isEmpty($p, rtn) && !$c.util.isEmpty($p, rtn.clickValue)) {
          resolve(rtn.clickValue);
        } else {
          resolve(false);
        }
      };
    }
    $c.win.messagBox($p, "confirm", messageStr, closeCallbackFncName, opts);
  });
};

/**
 * @method 
 * @name getLanguage
* @description 言語コードを返す。
* @returns {String} 言語コード (例: "ko", "en", "ja")
 * @hidden N
 * @exception 
 * @example
const lang = $c.win.getLanguage();
 */
scwin.getLanguage = function ($p) {
  const language = $c.win.getLangCode($p) || navigator.language || navigator.userLanguage || navigator.systemLanguage;
  if ($c.util.isEmpty($p, language) === false && language.length > 1) {
    return language.substring(0, 2);
  } else {
    return "";
  }
};

/**
 * @method 
 * @name getPopupId
* @description ポップアップIDを返します。
 * @hidden N
 * @exception 
 * @example
const popupId = $c.win.getPopupId();
 */
scwin.getPopupId = function ($p) {
  // const parent = opener || parent;

  if ($p.getPopupId()) {
    return $p.getPopupId();
  } else {
    return window.scwin.$w.getPopupId(window.$p);
  }
};

/**
 * @method 
 * @name moveUrl
* @description 現在の画面を特定のURLに移動させる。
* @param {String} moveUrl 画面ファイルのパス
* @param {Object} paramObj 移動時に渡すパラメータ値
 * @hidden N
 * @exception 
 * @example
const param = {
    id : "00001",
name : "abcd"
};
$c.win.moveUrl("/tmp/tmp01.xml", param);
 */
scwin.moveUrl = function ($p, moveUrl, paramObj) {
  paramObj = {
    "dataObject": {
      "type": "json",
      "name": "paramData",
      "data": paramObj
    }
  };
  const contextPath = $c.sbm.getContextPath($p);
  return $p.getFrame().setSrc(contextPath + moveUrl, paramObj);
};

/**
 * @method 
 * @name setWFrameSrc
* @description 特定のWFrameのウェブスクエアページ(XML)を変更する。
* @param {Object} wframeObj WFrameオブジェクト
* @param {String} pageUrl WebSquareページ（XML）ファイルのパス
* @param {Object} paramObj WFrameをセットする際に渡すパラメータオブジェクト
 * @hidden N
 * @exception 
 * @example
const param = {
    id : "00001",
name : "abcd"
};
$c.win.setWFrameSrc(wfm_content, "/tmp/tmp01.xml", param);
 */
scwin.setWFrameSrc = function ($p, wframeObj, moveUrl, paramObj) {
  paramObj = {
    "dataObject": {
      "type": "json",
      "name": "paramData",
      "data": paramObj
    }
  };
  const contextPath = $c.sbm.getContextPath($p);
  return wframeObj.setSrc(contextPath + moveUrl, paramObj);
};

/**
 * @method 
 * @name getFrame
* @description wframe内のスクリプト領域からこの関数を呼び出した場合、自身を囲むwframe objectを返します。グローバルスクリプトから呼び出した場合はnullを返します。
* @returns {Object} オブジェクト自身を包んだwframeオブジェクト
 * @hidden N
 * @exception 
 * @example
const frameObj = $c.win.getFrame();
 */
scwin.getFrame = function ($p) {
  try {
    return $p.getFrame();
  } catch (ex) {
    console.error(ex);
  }
};
/**
 * @method 
 * @name getParent
* @description 自身の親WFrameオブジェクトを探して返します。
* @returns {Object} 自身を包むwframeオブジェクトの親wframeオブジェクト
 * @hidden N
 * @exception 
 * @example
const parentFrame = $c.win.getParent();
const dltObj = parentFrame.dlt_dataList1; // 自分の親フレーム内にあるdlt_dataList1にアクセス
const pScwinObj = parentFrame.scwin; // 親フレームにあるscwinオブジェクトにアクセス
if (!$c.util.isEmpty(pScwinObj){
pScwinObj.search(); // 親画面にあるscwin.search関数を呼び出し
}
 */
scwin.getParent = function ($p) {
  try {
    return $p.parent();
  } catch (ex) {
    console.error(ex);
  }
};

/**
 * @method 
 * @name setLangCode
* @description 言語コードを設定する。
* @param {String} langCode 言語コード (韓国語："ko"、英語："en"、中国語："zh", 日本語 : "ja")
 * @hidden N
 * @exception 
 * @example
$c.win.setLangCode("ko");
$c.win.setLangCode("en");
 */
scwin.setLangCode = function ($p, langCode) {
  WebSquare.cookie.setCookie("system_language", langCode);
};

/**
 * @method 
 * @name getLangCode
* @description 言語コードを返す。
* @returns 言語コード (韓国語: "ko"、英語: "en"、中国語: "zh", 日本語 : "ja")
 * @hidden N
 * @exception 
 * @example
$c.win.getLangCode();
 */
scwin.getLangCode = function ($p, langCode) {
  return WebSquare.cookie.getCookie("system_language");
};

/**
 * @method
 * @name getCbFunctionManager
* @description メッセージ通知コールバックFunctionの情報保存のためのオブジェクトを読み込む。
 * @param
* @returns {Object} $c.winに宣言されたCB_FUNCTION_MANAGERオブジェクトを取得する
 * @hidden N
 * @exception
 * @example const CB_FUNCTION_MANAGER = $c.win.getCbFunctionManager();
 */
scwin.getCbFunctionManager = function ($p) {
  return scwin.CB_FUNCTION_MANAGER;
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'}}]}]})