/*amd /user/ReservationDetail.xml 10244 55f2221907578eb7dce875fb3a0c435e57b37ab8a56a5edd9c1190f159598ac4 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',E:[{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'},E:[{T:1,N:'w2:dataMap',A:{baseNode:'map',id:'dma_reservationDetail'},E:[{T:1,N:'w2:keyInfo',E:[{T:1,N:'w2:key',A:{id:'id',name:'予約ID',dataType:'text'}},{T:1,N:'w2:key',A:{id:'userId',name:'ユーザーID',dataType:'text'}},{T:1,N:'w2:key',A:{id:'userName',name:'予約者名',dataType:'text'}},{T:1,N:'w2:key',A:{id:'courtId',name:'コートID',dataType:'text'}},{T:1,N:'w2:key',A:{id:'courtName',name:'コート名',dataType:'text'}},{T:1,N:'w2:key',A:{id:'date',name:'利用日',dataType:'text'}},{T:1,N:'w2:key',A:{id:'timeSlot',name:'利用時間帯',dataType:'text'}},{T:1,N:'w2:key',A:{id:'totalPrice',name:'お支払金額',dataType:'number'}},{T:1,N:'w2:key',A:{id:'status',name:'予約ステータス',dataType:'text'}},{T:1,N:'w2:key',A:{id:'createdAt',name:'予約申込日時',dataType:'text'}},{T:1,N:'w2:key',A:{id:'updatedAt',name:'更新日時',dataType:'text'}},{T:1,N:'w2:key',A:{id:'displayDateTime',name:'表示利用日時',dataType:'text'}},{T:1,N:'w2:key',A:{id:'displayPrice',name:'表示お支払金額',dataType:'text'}},{T:1,N:'w2:key',A:{id:'displayStatus',name:'表示ステータス',dataType:'text'}},{T:1,N:'w2:key',A:{id:'displayCreatedAt',name:'表示申込日時',dataType:'text'}}]}]}]},{T:1,N:'w2:workflowCollection'},{T:1,N:'xf:submission',A:{id:'sbm_getReservationDetail',ref:'',target:'data:json,dma_reservationDetail',action:'http://localhost:8081/api/reservations/',method:'get',mediatype:'application/json',encoding:'UTF-8',mode:'asynchronous',processMsg:'読み込み中...','ev:submitdone':'scwin.sbm_getReservationDetail_submitdone','ev:submiterror':'scwin.sbm_getReservationDetail_submiterror'}},{T:1,N:'xf:submission',A:{id:'sbm_cancelReservation',ref:'',target:'',action:'http://localhost:8081/api/reservations/',method:'put',mediatype:'application/json',encoding:'UTF-8',mode:'asynchronous',processMsg:'キャンセル処理中...','ev:submitdone':'scwin.sbm_cancelReservation_submitdone','ev:submiterror':'scwin.sbm_cancelReservation_submiterror'}}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:''}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.reservationId = null;
scwin.onpageload = function () {
  scwin.initPage();
};
scwin.initPage = function () {
  var userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      var user = JSON.parse(userStr);
      txt_userName.setValue(user.name || "未設定");
    } catch (e) {
      txt_userName.setValue("未設定");
    }
  }
  var param = $w.getParameter("param");
  var directResId = $w.getParameter("reservationId");
  if (param && param.reservationId) {
    scwin.reservationId = param.reservationId;
  } else if (directResId) {
    scwin.reservationId = directResId;
  }
  if (scwin.reservationId) {
    var sbmObj = $w.getSubmission("sbm_getReservationDetail");
    if (sbmObj) {
      sbmObj.action = "http://localhost:8081/api/reservations/" + scwin.reservationId;
    }
    $w.executeSubmission("sbm_getReservationDetail");
  } else {
    alert("予約IDが見つかりません。マイページからやり直してください。");
  }
};
scwin.sbm_getReservationDetail_submitdone = function (e) {
  var res = e.responseJSON || dma_reservationDetail.getJSON();
  if (res && res.id) {
    dma_reservationDetail.setJSON(res);
    var displayDateTime = (res.date || "") + " " + (res.timeSlot || "");
    var priceNum = Number(res.totalPrice) || 0;
    var displayPrice = "¥" + priceNum.toLocaleString();
    var formattedCreatedAt = scwin.formatToJST(res.createdAt);
    var displayStatus = scwin.getStatusText(res.status);
    dma_reservationDetail.set("displayDateTime", displayDateTime);
    dma_reservationDetail.set("displayPrice", displayPrice);
    dma_reservationDetail.set("displayCreatedAt", formattedCreatedAt);
    dma_reservationDetail.set("displayStatus", displayStatus);
    if (res.userName) {
      txt_userName.setValue(res.userName);
    }
    scwin.updateStatusView(res.status);
  }
};
scwin.sbm_getReservationDetail_submiterror = function (e) {
  alert("予約詳細情報の取得に失敗しました。");
};
scwin.updateStatusView = function (status) {
  var statusText = scwin.getStatusText(status);
  dma_reservationDetail.set("displayStatus", statusText);
  var statusLower = (status || "").toString().toLowerCase();
  if (statusLower === "cancelled" || statusLower === "キャンセル" || statusLower === "キャンセル済") {
    txt_status.setStyle("color", "#dc3545");
    btn_cancel.hide();
  } else {
    txt_status.setStyle("color", "#28a745");
    if (statusLower === "confirmed" || statusLower === "予約済") {
      btn_cancel.show("");
    } else {
      btn_cancel.hide();
    }
  }
};
scwin.formatToJST = function (dateString) {
  if (!dateString) return "-";
  try {
    var date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    var y = date.getFullYear();
    var m = ("0" + (date.getMonth() + 1)).slice(-2);
    var d = ("0" + date.getDate()).slice(-2);
    var hh = ("0" + date.getHours()).slice(-2);
    var mm = ("0" + date.getMinutes()).slice(-2);
    return y + "-" + m + "-" + d + " " + hh + ":" + mm;
  } catch (e) {
    return dateString;
  }
};
scwin.getStatusText = function (status) {
  var s = (status || "").toString().toLowerCase();
  if (s === "confirmed" || s === "予約済") return "予約済";
  if (s === "completed" || s === "利用済" || s === "来店済") return "利用済";
  return "キャンセル済";
};
scwin.btn_backToMyPage_onclick = function (e) {
  $w.url("/user/MyPage.xml");
};

// 予約キャンセル実行（/api/reservations/{id}/cancel を呼び出し）
scwin.btn_cancel_onclick = function (e) {
  if (!confirm("この予約をキャンセルしますか？")) return;
  var sbmObj = $w.getSubmission("sbm_cancelReservation");
  if (sbmObj) {
    sbmObj.action = "http://localhost:8081/api/reservations/" + scwin.reservationId + "/cancel";
  }
  $w.executeSubmission("sbm_cancelReservation");
};
scwin.sbm_cancelReservation_submitdone = function (e) {
  alert("予約をキャンセルいたしました。");
  dma_reservationDetail.set("status", "cancelled");
  scwin.updateStatusView("cancelled");
};
scwin.sbm_cancelReservation_submiterror = function (e) {
  alert("予約のキャンセル処理に失敗しました。");
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{style:'display: flex; flex-direction: column; min-height: 100vh;',id:'grp_wrapper'},E:[{T:1,N:'w2:wframe',A:{id:'wfm_header',src:'/components/Header.xml',style:'width: 100%; min-height: 60px;'}},{T:1,N:'xf:group',A:{style:'display: flex; flex: 1;',id:'grp_body'},E:[{T:1,N:'w2:wframe',A:{id:'wfm_sidebar',src:'/components/Sidebar.xml',style:'width: 220px; min-height: 100%;'}},{T:1,N:'xf:group',A:{style:'padding: 20px; flex: 1; display: flex; flex-direction: column; align-items: center; background-color: #f8f9fa;',id:'grp_container'},E:[{T:1,N:'xf:group',A:{style:'width: 100%; max-width: 600px;',id:'grp_content'},E:[{T:1,N:'w2:textbox',A:{tagname:'h2',id:'txt_pageTitle',label:'予約詳細',style:'margin-top: 0; margin-bottom: 20px; color: #333;'}},{T:1,N:'xf:group',A:{style:'background-color: #fff; padding: 24px; border-radius: 8px; border: 1px solid #ddd; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);',id:'grp_card'},E:[{T:1,N:'w2:textbox',A:{tagname:'h3',id:'txt_cardTitle',label:'予約詳細情報',style:'margin-top: 0; border-bottom: 2px solid #333; padding-bottom: 10px; color: #333;'}},{T:1,N:'xf:group',A:{style:'display: grid; grid-template-columns: 130px 1fr; gap: 14px; margin: 24px 0; font-size: 15px;',id:'grp_details'},E:[{T:1,N:'w2:textbox',A:{tagname:'strong',id:'lbl_idTitle',label:'予約ID:',style:''}},{T:1,N:'w2:textbox',A:{id:'txt_id',ref:'data:dma_reservationDetail.id',label:'',style:''}},{T:1,N:'w2:textbox',A:{tagname:'strong',id:'lbl_userTitle',label:'予約者名:',style:''}},{T:1,N:'w2:textbox',A:{id:'txt_userName',label:'',style:''}},{T:1,N:'w2:textbox',A:{tagname:'strong',id:'lbl_courtTitle',label:'コート名:',style:''}},{T:1,N:'w2:textbox',A:{id:'txt_courtName',ref:'data:dma_reservationDetail.courtName',label:'',style:''}},{T:1,N:'w2:textbox',A:{tagname:'strong',id:'lbl_dateTimeTitle',label:'利用日時:',style:''}},{T:1,N:'w2:textbox',A:{id:'txt_dateTime',ref:'data:dma_reservationDetail.displayDateTime',label:'',style:''}},{T:1,N:'w2:textbox',A:{tagname:'strong',id:'lbl_priceTitle',label:'お支払金額:',style:''}},{T:1,N:'w2:textbox',A:{id:'txt_price',ref:'data:dma_reservationDetail.displayPrice',label:'',style:''}},{T:1,N:'w2:textbox',A:{tagname:'strong',id:'lbl_statusTitle',label:'予約ステータス:',style:''}},{T:1,N:'w2:textbox',A:{id:'txt_status',ref:'data:dma_reservationDetail.displayStatus',label:'',style:'font-weight: bold;'}},{T:1,N:'w2:textbox',A:{tagname:'strong',id:'lbl_createdAtTitle',label:'予約申込日時:',style:''}},{T:1,N:'w2:textbox',A:{id:'txt_createdAt',ref:'data:dma_reservationDetail.displayCreatedAt',label:'',style:''}}]},{T:1,N:'xf:group',A:{style:'display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px;',id:'grp_buttons'},E:[{T:1,N:'xf:trigger',A:{type:'button',id:'btn_backToMyPage',style:'padding: 8px 20px; background-color: #6c757d; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 14px;','ev:onclick':'scwin.btn_backToMyPage_onclick'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'マイページへ戻る'}]}]},{T:1,N:'xf:trigger',A:{type:'button',id:'btn_cancel',style:'padding: 8px 20px; background-color: #dc3545; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-size: 14px; font-weight: bold;','ev:onclick':'scwin.btn_cancel_onclick'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'予約キャンセル'}]}]}]}]}]}]}]}]}]}]}]})