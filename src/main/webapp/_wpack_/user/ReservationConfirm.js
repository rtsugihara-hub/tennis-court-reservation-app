/*amd /user/ReservationConfirm.xml 11290 1694cb08fae57587c0bc3fd4489d02efba3e234ea62f8ca63f87f988855cd041 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',E:[{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'},E:[{T:1,N:'w2:dataMap',A:{baseNode:'map',id:'dma_courtDetail'},E:[{T:1,N:'w2:keyInfo',E:[{T:1,N:'w2:key',A:{id:'id',name:'コートID',dataType:'text'}},{T:1,N:'w2:key',A:{id:'name',name:'コート名',dataType:'text'}},{T:1,N:'w2:key',A:{id:'type',name:'コート種別',dataType:'text'}},{T:1,N:'w2:key',A:{id:'isIndoor',name:'屋内外区分',dataType:'text'}},{T:1,N:'w2:key',A:{id:'date',name:'利用日',dataType:'text'}},{T:1,N:'w2:key',A:{id:'timeSlot',name:'利用時間帯',dataType:'text'}},{T:1,N:'w2:key',A:{id:'pricePerHour',name:'利用料金',dataType:'number'}},{T:1,N:'w2:key',A:{id:'displayDateTime',name:'表示利用日時',dataType:'text'}},{T:1,N:'w2:key',A:{id:'displayPrice',name:'表示利用料金',dataType:'text'}}]}]},{T:1,N:'w2:dataMap',A:{baseNode:'map',id:'dma_createReservation'},E:[{T:1,N:'w2:keyInfo',E:[{T:1,N:'w2:key',A:{id:'userId',name:'ユーザーID',dataType:'number'}},{T:1,N:'w2:key',A:{id:'userName',name:'予約者名',dataType:'text'}},{T:1,N:'w2:key',A:{id:'courtId',name:'コートID',dataType:'number'}},{T:1,N:'w2:key',A:{id:'courtName',name:'コート名',dataType:'text'}},{T:1,N:'w2:key',A:{id:'date',name:'利用日',dataType:'text'}},{T:1,N:'w2:key',A:{id:'timeSlot',name:'利用時間帯',dataType:'text'}},{T:1,N:'w2:key',A:{id:'totalPrice',name:'合計料金',dataType:'number'}},{T:1,N:'w2:key',A:{id:'status',name:'ステータス',dataType:'text'}}]}]}]},{T:1,N:'w2:workflowCollection'},{T:1,N:'xf:submission',A:{id:'sbm_getCourtDetail',ref:'',target:'data:json,dma_courtDetail',action:'http://localhost:8081/api/courts/',method:'get',mediatype:'application/json',encoding:'UTF-8',mode:'asynchronous',processMsg:'コート情報読み込み中...','ev:submitdone':'scwin.sbm_getCourtDetail_submitdone','ev:submiterror':'scwin.sbm_getCourtDetail_submiterror'}},{T:1,N:'xf:submission',A:{id:'sbm_createReservation',ref:'data:json,dma_createReservation',target:'',action:'http://localhost:8081/api/reservations',method:'post',mediatype:'application/json',encoding:'UTF-8',mode:'asynchronous',processMsg:'予約処理中...','ev:submitdone':'scwin.sbm_createReservation_submitdone','ev:submiterror':'scwin.sbm_createReservation_submiterror'}}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:''}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.courtId = null;
scwin.userInfo = null;
scwin.onpageload = function () {
  scwin.initPage();
};
scwin.initPage = function () {
  // 1. LocalStorage からユーザー情報をロード
  var userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      scwin.userInfo = JSON.parse(userStr);
      txt_userName.setValue(scwin.userInfo.name || "未設定");
    } catch (e) {
      txt_userName.setValue("未設定");
    }
  }

  // 2. コートIDの取得
  var param = $w.getParameter("param");
  var directCourtId = $w.getParameter("courtId");
  if (param && param.courtId) {
    scwin.courtId = param.courtId;
  } else if (directCourtId) {
    scwin.courtId = directCourtId;
  }
  if (scwin.courtId) {
    var sbmObj = $w.getSubmission("sbm_getCourtDetail");
    if (sbmObj) {
      sbmObj.action = "http://localhost:8081/api/courts/" + scwin.courtId;
    }
    $w.executeSubmission("sbm_getCourtDetail");
  } else {
    alert("コートIDが見つかりません。コート一覧からやり直してください。");
  }
};

// コート情報の取得完了時の表示加工および date / timeSlot / price 保持処理
scwin.sbm_getCourtDetail_submitdone = function (e) {
  var court = e.responseJSON || dma_courtDetail.getJSON();
  if (court && (court.id || scwin.courtId)) {
    if (!court.id) court.id = scwin.courtId;
    dma_courtDetail.setJSON(court);

    // 利用日・時間帯の分離・保持ロジック
    var cDate = court.date || "";
    var cTimeSlot = court.timeSlot || "";
    if ((!cDate || !cTimeSlot) && court.displayDateTime) {
      var parts = court.displayDateTime.trim().split(" ");
      if (parts.length >= 2) {
        cDate = cDate || parts[0];
        cTimeSlot = cTimeSlot || parts.slice(1).join(" ");
      }
    }
    var displayDateTime = cDate && cTimeSlot ? cDate + " " + cTimeSlot : court.displayDateTime || "";

    // 金額（pricePerHour）の確実な数値保持
    var priceNum = Number(court.pricePerHour);
    if (isNaN(priceNum) || priceNum <= 0) {
      priceNum = Number(dma_courtDetail.get("pricePerHour")) || 0;
    }
    var displayPrice = "¥" + priceNum.toLocaleString();
    dma_courtDetail.set("date", cDate);
    dma_courtDetail.set("timeSlot", cTimeSlot);
    dma_courtDetail.set("pricePerHour", priceNum);
    dma_courtDetail.set("displayDateTime", displayDateTime);
    dma_courtDetail.set("displayPrice", displayPrice);
  }
};
scwin.sbm_getCourtDetail_submiterror = function (e) {
  alert("対象コート情報の取得に失敗しました。");
};

// 戻るボタン押下
scwin.btn_back_onclick = function (e) {
  $w.url("/user/CourtDetail.xml", {
    param: {
      courtId: scwin.courtId
    }
  });
};

// 予約確定ボタン押下処理（totalPrice の確実な抽出・抽出強化）
scwin.btn_confirm_onclick = function (e) {
  var courtId = scwin.courtId || $p.getParameter("courtId");
  var userId = scwin.userInfo ? scwin.userInfo.id : null;
  if (!userId) {
    var userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        var u = JSON.parse(userStr);
        userId = u.id;
      } catch (err) {}
    }
  }
  if (!courtId) {
    alert("コートIDが取得できませんでした。画面をやり直してください。");
    return;
  }
  if (!userId) {
    alert("ログインユーザー情報が見つかりません。再ログインしてください。");
    return;
  }
  var courtName = dma_courtDetail.get("name") || "";
  var courtDate = dma_courtDetail.get("date") || "";
  var timeSlot = dma_courtDetail.get("timeSlot") || "";
  var displayDT = dma_courtDetail.get("displayDateTime") || "";

  // 日時バックアップ抽出
  if ((!courtDate || !timeSlot) && displayDT) {
    var dtParts = displayDT.trim().split(" ");
    if (dtParts.length >= 2) {
      if (!courtDate) courtDate = dtParts[0];
      if (!timeSlot) timeSlot = dtParts.slice(1).join(" ");
    }
  }

  // ★ 金額（totalPrice）の多重抽出ロジック（0円リクエストの防止）
  var totalPrice = Number(dma_courtDetail.get("pricePerHour"));
  if (isNaN(totalPrice) || totalPrice <= 0) {
    var rawObj = dma_courtDetail.getJSON();
    totalPrice = Number(rawObj.pricePerHour);
  }

  // displayPrice (例: "¥5,000") から数字のみをパースする最終バックアップ
  if (isNaN(totalPrice) || totalPrice <= 0) {
    var dispPriceStr = dma_courtDetail.get("displayPrice") || "";
    var parsedPrice = parseInt(dispPriceStr.replace(/[^0-9]/g, ""), 10);
    if (!isNaN(parsedPrice)) {
      totalPrice = parsedPrice;
    } else {
      totalPrice = 0;
    }
  }
  var requestPayload = {
    courtId: Number(courtId),
    userId: Number(userId),
    userName: scwin.userInfo ? scwin.userInfo.name : "",
    courtName: courtName,
    date: courtDate,
    timeSlot: timeSlot,
    totalPrice: totalPrice,
    status: "confirmed"
  };

  // AJAX による予約 API POST 通信
  $.ajax({
    url: "http://localhost:8081/api/reservations",
    type: "POST",
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(requestPayload),
    success: function (res) {
      $w.url("/user/ReservationComplete.xml", {
        param: {
          reservationId: res ? res.id : "",
          courtName: courtName,
          displayDateTime: displayDT
        }
      });
    },
    error: function (xhr) {
      var errorMsg = xhr.responseText || "予約処理に失敗しました。";
      alert(errorMsg);
    }
  });
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{style:'display: flex; flex-direction: column; min-height: 100vh;',id:'grp_wrapper'},E:[{T:1,N:'w2:wframe',A:{id:'wfm_header',src:'/components/Header.xml',style:'width: 100%; min-height: 60px;'}},{T:1,N:'xf:group',A:{style:'display: flex; flex: 1;',id:'grp_body'},E:[{T:1,N:'w2:wframe',A:{id:'wfm_sidebar',src:'/components/Sidebar.xml',style:'width: 220px; min-height: 100%;'}},{T:1,N:'xf:group',A:{style:'padding: 20px; flex: 1; display: flex; flex-direction: column; align-items: center; background-color: #f8f9fa;',id:'grp_container'},E:[{T:1,N:'xf:group',A:{style:'width: 100%; max-width: 600px;',id:'grp_content'},E:[{T:1,N:'w2:textbox',A:{tagname:'h2',id:'txt_pageTitle',label:'予約内容の確認',style:'margin-top: 0; margin-bottom: 20px; color: #333;'}},{T:1,N:'xf:group',A:{style:'background-color: #fff; padding: 24px; border-radius: 8px; border: 1px solid #ddd; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);',id:'grp_card'},E:[{T:1,N:'w2:textbox',A:{tagname:'h3',id:'txt_cardTitle',label:'ご予約内容',style:'margin-top: 0; border-bottom: 2px solid #333; padding-bottom: 10px; color: #333;'}},{T:1,N:'xf:group',A:{style:'display: grid; grid-template-columns: 130px 1fr; gap: 14px; margin: 24px 0; font-size: 15px;',id:'grp_details'},E:[{T:1,N:'w2:textbox',A:{tagname:'strong',id:'lbl_userTitle',label:'予約者名:',style:''}},{T:1,N:'w2:textbox',A:{id:'txt_userName',label:'',style:''}},{T:1,N:'w2:textbox',A:{tagname:'strong',id:'lbl_courtTitle',label:'コート名:',style:''}},{T:1,N:'w2:textbox',A:{id:'txt_courtName',ref:'data:dma_courtDetail.name',label:'',style:''}},{T:1,N:'w2:textbox',A:{tagname:'strong',id:'lbl_typeTitle',label:'コート種別:',style:''}},{T:1,N:'w2:textbox',A:{id:'txt_type',ref:'data:dma_courtDetail.type',label:'',style:''}},{T:1,N:'w2:textbox',A:{tagname:'strong',id:'lbl_dateTimeTitle',label:'利用日時:',style:''}},{T:1,N:'w2:textbox',A:{id:'txt_dateTime',ref:'data:dma_courtDetail.displayDateTime',label:'',style:''}},{T:1,N:'w2:textbox',A:{tagname:'strong',id:'lbl_priceTitle',label:'お支払金額:',style:''}},{T:1,N:'w2:textbox',A:{id:'txt_price',ref:'data:dma_courtDetail.displayPrice',label:'',style:'font-weight: bold; color: #007bff;'}}]},{T:1,N:'xf:group',A:{style:'display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px;',id:'grp_buttons'},E:[{T:1,N:'xf:trigger',A:{type:'button',id:'btn_back',style:'padding: 8px 20px; background-color: #6c757d; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;','ev:onclick':'scwin.btn_back_onclick'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'詳細へ戻る'}]}]},{T:1,N:'xf:trigger',A:{type:'button',id:'btn_confirm',style:'padding: 8px 20px; background-color: #28a745; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; font-weight: bold;','ev:onclick':'scwin.btn_confirm_onclick'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'予約を確定する'}]}]}]}]}]}]}]}]}]}]}]})