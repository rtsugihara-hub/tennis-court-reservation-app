/*amd /user/MyPage.xml 8846 e09748da736f0be2d52ce1627682be5a95e5a387509bc6b06cf396869dd1b796 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',E:[{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'style',A:{type:'text/css'},E:[{T:4,cdata:'.grid-btn-action{background-color:#00a0e9!important;color:#fff!important;border:none!important;border-radius:4px!important;padding:4px 12px!important;font-size:13px!important;font-weight:700!important;cursor:pointer!important}.grid-btn-action:hover{background-color:#0080ca!important}'}]},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'},E:[{T:1,N:'w2:dataMap',A:{baseNode:'map',id:'dma_userInfo'},E:[{T:1,N:'w2:keyInfo',E:[{T:1,N:'w2:key',A:{id:'id',name:'ユーザーID',dataType:'text'}},{T:1,N:'w2:key',A:{id:'name',name:'氏名',dataType:'text'}},{T:1,N:'w2:key',A:{id:'email',name:'メールアドレス',dataType:'text'}}]}]},{T:1,N:'w2:dataList',A:{baseNode:'list',repeatNode:'map',id:'dlt_reservationList',saveRemovedData:'true'},E:[{T:1,N:'w2:columnInfo',E:[{T:1,N:'w2:column',A:{id:'id',name:'予約ID',dataType:'text'}},{T:1,N:'w2:column',A:{id:'courtName',name:'コート名',dataType:'text'}},{T:1,N:'w2:column',A:{id:'date',name:'利用日',dataType:'text'}},{T:1,N:'w2:column',A:{id:'timeSlot',name:'利用時間帯',dataType:'text'}},{T:1,N:'w2:column',A:{id:'displayDateTime',name:'利用日時',dataType:'text'}},{T:1,N:'w2:column',A:{id:'totalPrice',name:'合計料金',dataType:'number'}},{T:1,N:'w2:column',A:{id:'status',name:'ステータスコード',dataType:'text'}},{T:1,N:'w2:column',A:{id:'displayStatus',name:'ステータス',dataType:'text'}},{T:1,N:'w2:column',A:{id:'statusStyle',name:'ステータススタイル',dataType:'text'}}]}]}]},{T:1,N:'w2:workflowCollection'},{T:1,N:'xf:submission',A:{id:'sbm_getUserReservations',ref:'',target:'data:json,dlt_reservationList',action:'http://localhost:8081/api/reservations/user/',method:'get',mediatype:'application/json',encoding:'UTF-8',mode:'asynchronous',processMsg:'読み込み中...','ev:submitdone':'scwin.sbm_getUserReservations_submitdone','ev:submiterror':'scwin.sbm_getUserReservations_submiterror'}}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:''}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.onpageload = function () {
  scwin.initUserInfo();
};

// ログインユーザー情報のロード＆API呼び出し
scwin.initUserInfo = function () {
  var userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      var user = JSON.parse(userStr);
      dma_userInfo.setJSON(user);
      lbl_userName.setValue((user.name || "") + " 様");
      lbl_userEmail.setValue(user.email || "");

      // ユーザーIDに紐づく予約履歴を取得
      if (user.id) {
        var sbmObj = $w.getSubmission("sbm_getUserReservations");
        sbmObj.action = "http://localhost:8081/api/reservations/user/" + user.id;
        $w.executeSubmission("sbm_getUserReservations");
      }
    } catch (e) {
      console.error(e);
    }
  }
};

// 取得データの加工（日時結合・ステータステキストの生成）
scwin.sbm_getUserReservations_submitdone = function (e) {
  var resList = e.responseJSON || dlt_reservationList.getAllJSON();
  if (!resList || resList.length === 0) {
    return;
  }
  dlt_reservationList.removeAll();
  for (var i = 0; i < resList.length; i++) {
    var item = resList[i];
    var newRow = dlt_reservationList.insertRow();
    dlt_reservationList.setCellData(newRow, "id", item.id);
    dlt_reservationList.setCellData(newRow, "courtName", item.courtName);
    dlt_reservationList.setCellData(newRow, "displayDateTime", (item.date || "") + " " + (item.timeSlot || ""));
    dlt_reservationList.setCellData(newRow, "totalPrice", item.totalPrice);
    dlt_reservationList.setCellData(newRow, "status", item.status);
    dlt_reservationList.setCellData(newRow, "displayStatus", scwin.getStatusText(item.status));
  }
};
scwin.sbm_getUserReservations_submiterror = function (e) {
  console.error("予約履歴の取得に失敗しました。");
};

// ステータステキスト変換
scwin.getStatusText = function (status) {
  if (status === "completed" || status === "利用済" || status === "来店済") return "利用済";
  if (status === "cancelled" || status === "キャンセル") return "キャンセル";
  return "予約確定";
};

// ★ ボタン単体に色を付けるための Custom Formatter 関数
scwin.fn_actionBtnFormatter = function (val, formattedVal, rowIdx, colIdx) {
  return '<button type="button" class="grid-btn-action">詳細・変更</button>';
};

// GridView セル（詳細・変更ボタン）クリックイベント
scwin.grd_reservationList_oncellclick = function (row, col) {
  var colId = grd_reservationList.getColumnID(col);
  var rowData = dlt_reservationList.getRowJSON(row);
  if (colId === "btn_detail") {
    // 選択された予約IDをパラメータに渡して予約詳細画面へ遷移
    $w.url("/user/ReservationDetail.xml", {
      param: {
        reservationId: rowData.id
      }
    });
  }
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{style:'display: flex; flex-direction: column; min-height: 100vh;',id:'grp_wrapper'},E:[{T:1,N:'w2:wframe',A:{id:'wfm_header',src:'/components/Header.xml',style:'width: 100%; min-height: 60px;'}},{T:1,N:'xf:group',A:{style:'display: flex; flex: 1;',id:'grp_body'},E:[{T:1,N:'w2:wframe',A:{id:'wfm_sidebar',src:'/components/Sidebar.xml',style:'width: 220px; min-height: 100%;'}},{T:1,N:'xf:group',A:{style:'padding: 20px; flex: 1; background-color: #f8f9fa;',id:'grp_container'},E:[{T:1,N:'w2:textbox',A:{tagname:'h2',id:'txt_pageTitle',label:'マイページ',style:'margin-top: 0; margin-bottom: 20px; color: #333;'}},{T:1,N:'xf:group',A:{style:'margin-bottom: 30px; background-color: #fff; padding: 20px; border-radius: 8px; border: 1px solid #ddd;',id:'grp_userInfoArea'},E:[{T:1,N:'w2:textbox',A:{tagname:'h3',id:'txt_userInfoTitle',label:'会員情報',style:'margin: 0 0 15px 0; border-bottom: 1px solid #eee; padding-bottom: 8px; color: #333;'}},{T:1,N:'xf:group',A:{style:'display: flex; flex-direction: column; gap: 12px; font-size: 16px; color: #333;',id:'grp_userInfoDetails'},E:[{T:1,N:'xf:group',A:{style:'display: flex; align-items: center;',id:'grp_userName'},E:[{T:1,N:'w2:textbox',A:{tagname:'span',id:'lbl_nameTitle',label:'氏名：',style:'font-weight: bold; width: 80px;'}},{T:1,N:'w2:textbox',A:{tagname:'span',id:'lbl_userName',label:'',style:''}}]},{T:1,N:'xf:group',A:{style:'display: flex; align-items: center;',id:'grp_userEmail'},E:[{T:1,N:'w2:textbox',A:{tagname:'span',id:'lbl_emailTitle',label:'メール：',style:'font-weight: bold; width: 80px;'}},{T:1,N:'w2:textbox',A:{tagname:'span',id:'lbl_userEmail',label:'',style:''}}]}]}]},{T:1,N:'xf:group',A:{style:'border-radius: 8px; padding: 20px; background-color: #fff; border: 1px solid #ddd;',id:'grp_gridArea'},E:[{T:1,N:'w2:textbox',A:{tagname:'h3',id:'txt_gridTitle',label:'■ 予約履歴一覧',style:'margin: 0 0 15px 0; color: #333;'}},{T:1,N:'w2:gridView',A:{id:'grd_reservationList',dataList:'data:dlt_reservationList',style:'width: 100%; height: 350px;',autoFit:'allColumn',visibleRowNum:'10',rowNumVisible:'false','ev:oncellclick':'scwin.grd_reservationList_oncellclick'},E:[{T:1,N:'w2:header',A:{id:'header1'},E:[{T:1,N:'w2:row',A:{id:'row1',style:'background-color: #d4edda;'},E:[{T:1,N:'w2:column',A:{id:'col_id',value:'予約ID',width:'80'}},{T:1,N:'w2:column',A:{id:'col_courtName',value:'コート名',width:'140'}},{T:1,N:'w2:column',A:{id:'col_dateTime',value:'利用日時',width:'160'}},{T:1,N:'w2:column',A:{id:'col_totalPrice',value:'合計料金',width:'110'}},{T:1,N:'w2:column',A:{id:'col_status',value:'ステータス',width:'120'}},{T:1,N:'w2:column',A:{id:'col_action',value:'操作',width:'120'}}]}]},{T:1,N:'w2:gBody',A:{id:'gBody1'},E:[{T:1,N:'w2:row',A:{id:'row2'},E:[{T:1,N:'w2:column',A:{id:'id',inputType:'text',readOnly:'true',style:'font-size:16px;'}},{T:1,N:'w2:column',A:{id:'courtName',inputType:'text',readOnly:'true',style:'font-size:16px;'}},{T:1,N:'w2:column',A:{id:'displayDateTime',inputType:'text',readOnly:'true',style:'font-size:16px;'}},{T:1,N:'w2:column',A:{id:'totalPrice',inputType:'text',dataType:'number',displayFormat:'¥#,###',readOnly:'true',style:'font-size:16px;'}},{T:1,N:'w2:column',A:{id:'displayStatus',inputType:'text',readOnly:'true',style:'font-size:14px;'}},{T:1,N:'w2:column',A:{id:'btn_detail',inputType:'text',customFormatter:'scwin.fn_actionBtnFormatter',width:'100',readOnly:'true'}}]}]}]}]}]}]}]}]}]}]})