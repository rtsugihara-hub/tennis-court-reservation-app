/*amd /user/CourtDetail.xml 8025 92d167f89c1dbaf5ff3ccb7194b0e6cd2a2d4d489c659f30ab72504d9ad2845a */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',E:[{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'},E:[{T:1,N:'w2:dataMap',A:{baseNode:'map',id:'dma_courtDetail'},E:[{T:1,N:'w2:keyInfo',E:[{T:1,N:'w2:key',A:{id:'id',name:'コートID',dataType:'text'}},{T:1,N:'w2:key',A:{id:'name',name:'コート名',dataType:'text'}},{T:1,N:'w2:key',A:{id:'type',name:'コート種別',dataType:'text'}},{T:1,N:'w2:key',A:{id:'isIndoor',name:'屋内外区分',dataType:'text'}},{T:1,N:'w2:key',A:{id:'date',name:'利用日',dataType:'text'}},{T:1,N:'w2:key',A:{id:'timeSlot',name:'利用時間帯',dataType:'text'}},{T:1,N:'w2:key',A:{id:'pricePerHour',name:'利用料金',dataType:'number'}},{T:1,N:'w2:key',A:{id:'description',name:'概要・説明',dataType:'text'}},{T:1,N:'w2:key',A:{id:'status',name:'公開ステータス',dataType:'text'}},{T:1,N:'w2:key',A:{id:'displayIndoor',name:'表示用屋内外',dataType:'text'}},{T:1,N:'w2:key',A:{id:'displayDateTime',name:'表示利用日時',dataType:'text'}},{T:1,N:'w2:key',A:{id:'displayPrice',name:'表示利用料金',dataType:'text'}}]}]}]},{T:1,N:'w2:workflowCollection'},{T:1,N:'xf:submission',A:{id:'sbm_getCourtDetail',ref:'',target:'data:json,dma_courtDetail',action:'http://localhost:8081/api/courts/',method:'get',mediatype:'application/json',encoding:'UTF-8',mode:'asynchronous',processMsg:'読み込み中...','ev:submitdone':'scwin.sbm_getCourtDetail_submitdone','ev:submiterror':'scwin.sbm_getCourtDetail_submiterror'}}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:''}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.courtId = null;
scwin.onpageload = function () {
  // 渡されたパラメータ（オブジェクトパラメータ or URLクエリ文字列の双方に対応）
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
    } else if (typeof sbm_getCourtDetail !== "undefined") {
      sbm_getCourtDetail.action = "http://localhost:8081/api/courts/" + scwin.courtId;
    }
    $w.executeSubmission("sbm_getCourtDetail");
  } else {
    alert("コートIDが見つかりません。一覧画面からやり直してください。");
  }
};

// コート詳細取得完了時の加工処理
scwin.sbm_getCourtDetail_submitdone = function (e) {
  var court = e.responseJSON || dma_courtDetail.getJSON();
  if (court && court.id) {
    dma_courtDetail.setJSON(court);

    // 屋内外テキスト
    var isIndoor = court.isIndoor === true || court.isIndoor === "true" || court.isIndoor === 1;
    dma_courtDetail.set("displayIndoor", isIndoor ? "屋内" : "屋外");

    // 利用日時テキスト
    dma_courtDetail.set("displayDateTime", (court.date || "") + " " + (court.timeSlot || ""));

    // 利用料金テキスト（¥表記・カンマ区切り）
    var priceNum = Number(court.pricePerHour) || 0;
    dma_courtDetail.set("displayPrice", "¥" + priceNum.toLocaleString());

    // ステータスに応じた「予約手続きへ」ボタンの有効/無効制御
    var status = (court.status || "").toString().toLowerCase();
    if (status === "available" || status === "公開中") {
      btn_goToConfirm.setValue("予約手続きへ");
      btn_goToConfirm.setDisabled(false);
      btn_goToConfirm.setStyle("background-color", "#28a745");
      btn_goToConfirm.setStyle("cursor", "pointer");
    } else {
      btn_goToConfirm.setValue("予約不可");
      btn_goToConfirm.setDisabled(true);
      btn_goToConfirm.setStyle("background-color", "#6c757d");
      btn_goToConfirm.setStyle("cursor", "not-allowed");
    }
  }
};
scwin.sbm_getCourtDetail_submiterror = function (e) {
  alert("コート情報の取得に失敗しました。");
};

// 一覧へ戻るボタン押下
scwin.btn_back_onclick = function (e) {
  $w.url("/user/CourtList.xml");
};

// 予約手続きへボタン押下
scwin.btn_goToConfirm_onclick = function (e) {
  var status = (dma_courtDetail.get("status") || "").toString().toLowerCase();
  if (status !== "available" && status !== "公開中") return;

  // 予約確認画面へ遷移（courtId をパラメータ渡し）
  $w.url("/user/ReservationConfirm.xml", {
    param: {
      courtId: scwin.courtId
    }
  });
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{style:'display: flex; flex-direction: column; min-height: 100vh;',id:'grp_wrapper'},E:[{T:1,N:'w2:wframe',A:{id:'wfm_header',src:'/components/Header.xml',style:'width: 100%; min-height: 60px;'}},{T:1,N:'xf:group',A:{style:'display: flex; flex: 1;',id:'grp_body'},E:[{T:1,N:'w2:wframe',A:{id:'wfm_sidebar',src:'/components/Sidebar.xml',style:'width: 220px; min-height: 100%;'}},{T:1,N:'xf:group',A:{style:'padding: 20px; flex: 1; display: flex; flex-direction: column; align-items: center; background-color: #f8f9fa;',id:'grp_container'},E:[{T:1,N:'xf:group',A:{style:'width: 100%; max-width: 600px;',id:'grp_content'},E:[{T:1,N:'w2:textbox',A:{tagname:'h2',id:'txt_pageTitle',label:'コート詳細',style:'margin-top: 0; margin-bottom: 20px; color: #333;'}},{T:1,N:'xf:group',A:{style:'background-color: #fff; padding: 24px; border-radius: 8px; border: 1px solid #ddd;',id:'grp_card'},E:[{T:1,N:'w2:textbox',A:{tagname:'h3',id:'txt_cardTitle',label:'コート詳細情報',style:'margin-top: 0; border-bottom: 2px solid #333; padding-bottom: 10px; color: #333;'}},{T:1,N:'xf:group',A:{style:'display: grid; grid-template-columns: 120px 1fr; gap: 12px; margin: 24px 0; font-size: 15px;',id:'grp_details'},E:[{T:1,N:'w2:textbox',A:{tagname:'strong',id:'lbl_nameTitle',label:'コート名:',style:''}},{T:1,N:'w2:textbox',A:{id:'txt_name',ref:'data:dma_courtDetail.name',label:'',style:''}},{T:1,N:'w2:textbox',A:{tagname:'strong',id:'lbl_typeTitle',label:'コート種別:',style:''}},{T:1,N:'w2:textbox',A:{id:'txt_type',ref:'data:dma_courtDetail.type',label:'',style:''}},{T:1,N:'w2:textbox',A:{tagname:'strong',id:'lbl_indoorTitle',label:'屋内外:',style:''}},{T:1,N:'w2:textbox',A:{id:'txt_indoor',ref:'data:dma_courtDetail.displayIndoor',label:'',style:''}},{T:1,N:'w2:textbox',A:{tagname:'strong',id:'lbl_dateTimeTitle',label:'利用日時:',style:''}},{T:1,N:'w2:textbox',A:{id:'txt_dateTime',ref:'data:dma_courtDetail.displayDateTime',label:'',style:''}},{T:1,N:'w2:textbox',A:{tagname:'strong',id:'lbl_priceTitle',label:'利用料金:',style:''}},{T:1,N:'w2:textbox',A:{id:'txt_price',ref:'data:dma_courtDetail.displayPrice',label:'',style:''}},{T:1,N:'w2:textbox',A:{tagname:'strong',id:'lbl_descriptionTitle',label:'概要・説明:',style:''}},{T:1,N:'w2:textbox',A:{id:'txt_description',ref:'data:dma_courtDetail.description',label:'',style:''}}]},{T:1,N:'xf:group',A:{style:'display: flex; gap: 12px; justify-content: flex-end; margin-top: 24px;',id:'grp_buttons'},E:[{T:1,N:'xf:trigger',A:{type:'button',id:'btn_back',style:'padding: 8px 20px; background-color: #6c757d; color: #fff; border: none; border-radius: 4px; cursor: pointer;','ev:onclick':'scwin.btn_back_onclick'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'一覧へ戻る'}]}]},{T:1,N:'xf:trigger',A:{type:'button',id:'btn_goToConfirm',style:'padding: 8px 20px; background-color: #28a745; color: #fff; border: none; border-radius: 4px; cursor: pointer;','ev:onclick':'scwin.btn_goToConfirm_onclick'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'予約手続きへ'}]}]}]}]}]}]}]}]}]}]}]})