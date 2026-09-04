/*amd /admin/AdminReservationList.xml 12635 2659bc6831e0ec3259ec82f8e073c5f0d8ddc90bcd7ba949a61b3498c9ca9d22 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',E:[{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'style',A:{type:'text/css'},E:[{T:4,cdata:'.disabled-btn{background-color:#e9ecef!important;color:#6c757d!important;border:1px solid #ced4da!important;cursor:not-allowed!important;opacity:.65}.active-btn{background-color:#00a0e9!important;color:#fff!important;cursor:pointer!important}'}]},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'},E:[{T:1,N:'w2:dataMap',A:{baseNode:'map',id:'dma_search'},E:[{T:1,N:'w2:keyInfo',E:[{T:1,N:'w2:key',A:{id:'date',name:'利用日',dataType:'text'}},{T:1,N:'w2:key',A:{id:'status',name:'ステータス',dataType:'text'}}]}]},{T:1,N:'w2:dataList',A:{baseNode:'list',repeatNode:'map',id:'dlt_reservationList',saveRemovedData:'true'},E:[{T:1,N:'w2:columnInfo',E:[{T:1,N:'w2:column',A:{id:'id',name:'予約ID',dataType:'text'}},{T:1,N:'w2:column',A:{id:'displayUserName',name:'予約者名',dataType:'text'}},{T:1,N:'w2:column',A:{id:'courtName',name:'コート名',dataType:'text'}},{T:1,N:'w2:column',A:{id:'displayDateTime',name:'利用日時',dataType:'text'}},{T:1,N:'w2:column',A:{id:'totalPrice',name:'合計金額',dataType:'number'}},{T:1,N:'w2:column',A:{id:'status',name:'ステータス',dataType:'text'}},{T:1,N:'w2:column',A:{id:'displayStatus',name:'ステータス名',dataType:'text'}},{T:1,N:'w2:column',A:{id:'btnVisitedText',name:'ボタン名',dataType:'text'}},{T:1,N:'w2:column',A:{id:'isBtnDisabled',name:'ボタン無効フラグ',dataType:'text'}}]}]}]},{T:1,N:'w2:workflowCollection'},{T:1,N:'xf:submission',A:{id:'sbm_getReservations',ref:'',target:'',action:'http://localhost:8081/api/reservations',method:'get',mediatype:'application/json',encoding:'UTF-8',mode:'asynchronous',processMsg:'読み込み中...','ev:submitdone':'scwin.sbm_getReservations_submitdone'}}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:''}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.rawReservations = []; // APIレスポンス生データ保存用

scwin.onpageload = function () {
  dma_search.set("status", "すべて");
  scwin.fetchReservations();
};

// 予約一覧の取得実行
scwin.fetchReservations = function () {
  $p.executeSubmission("sbm_getReservations");
};

// API 応答完了ハンドラ
scwin.sbm_getReservations_submitdone = function (e) {
  var resData = e.responseJSON;
  if (Array.isArray(resData)) {
    scwin.rawReservations = resData;
  } else if (e.responseText) {
    try {
      scwin.rawReservations = JSON.parse(e.responseText);
    } catch (err) {
      scwin.rawReservations = [];
    }
  } else {
    scwin.rawReservations = [];
  }
  scwin.applyFilter();
};

// 検索・フィルター処理（一括 setJSON 方式）
scwin.applyFilter = function () {
  var searchDate = dma_search.get("date");
  var searchStatus = dma_search.get("status") || "すべて";
  var masterList = scwin.rawReservations;
  var filteredList = [];
  if (Array.isArray(masterList)) {
    for (var i = 0; i < masterList.length; i++) {
      var item = masterList[i];
      var itemStatus = (item.status || "").toLowerCase();

      // 1. 利用日フィルター
      if (searchDate && searchDate.trim() !== "" && item.date !== searchDate) {
        continue;
      }

      // 2. ステータスフィルター
      if (searchStatus && searchStatus !== "すべて") {
        if (searchStatus === "予約済" && itemStatus !== "confirmed" && itemStatus !== "予約済") continue;
        if (searchStatus === "来店済" && itemStatus !== "completed" && itemStatus !== "来店済" && itemStatus !== "利用済") continue;
        if (searchStatus === "キャンセル" && itemStatus !== "キャンセル" && itemStatus !== "cancelled" && itemStatus !== "キャンセル済") continue;
      }

      // 表示用データの構築
      var displayUserName = item.userName !== undefined && item.userName !== null && item.userName !== "" ? item.userName : "未登録";
      var displayDateTime = (item.date || "") + " " + (item.timeSlot || "");
      var displayStatus = scwin.getStatusText(item.status);

      // ★ 「予約済(confirmed)」以外のステータスはボタンをグレーアウト＆無効化
      var isConfirmed = itemStatus === "confirmed" || itemStatus === "予約済";
      filteredList.push({
        id: String(item.id || ""),
        displayUserName: displayUserName,
        courtName: item.courtName || "コート",
        displayDateTime: displayDateTime,
        totalPrice: Number(item.totalPrice) || 0,
        status: item.status || "",
        displayStatus: displayStatus,
        btnVisitedText: isConfirmed ? "来店済" : "-",
        isBtnDisabled: isConfirmed ? "false" : "true"
      });
    }
  }

  // 一括で DataList へ適用
  dlt_reservationList.setJSON(filteredList);
};

// ステータス表示文字変換
scwin.getStatusText = function (status) {
  var s = (status || "").toLowerCase();
  if (s === "confirmed" || s === "予約済") return "予約済";
  if (s === "completed" || s === "利用済" || s === "来店済") return "来店済";
  if (s === "cancelled" || s === "キャンセル" || s === "キャンセル済") return "キャンセル";
  return status || "予約済";
};

// ★ ボタンセル用の動的スタイルフォーマッター（来店済・キャンセル行のグレーアウト）
scwin.fn_buttonStyleFormatter = function (value, formattedValue, rowIdx, colIdx) {
  var rowData = dlt_reservationList.getRowJSON(rowIdx);
  var st = (rowData.status || "").toLowerCase();
  if (st === "confirmed" || st === "予約済") {
    return '<button type="button" class="active-btn" style="width:100%; height:26px; border:none; border-radius:4px; font-weight:bold;">来店済</button>';
  } else {
    return '<button type="button" class="disabled-btn" disabled="disabled" style="width:100%; height:26px; border-radius:4px;">完了</button>';
  }
};

// 検索ボタン押下
scwin.btn_search_onclick = function (e) {
  scwin.applyFilter();
};

// リセットボタン押下
scwin.btn_reset_onclick = function (e) {
  dma_search.set("date", "");
  dma_search.set("status", "すべて");
  scwin.applyFilter();
};

// GridView セル（来店済ボタン）クリック処理
scwin.grd_reservationList_oncellclick = function (row, col) {
  var colId = grd_reservationList.getColumnID(col);
  var rowData = dlt_reservationList.getRowJSON(row);
  if (colId === "btn_visited") {
    var st = (rowData.status || "").toLowerCase();
    if (st === "confirmed" || st === "予約済") {
      scwin.handleMarkAsVisited(rowData.id);
    } else {
      // 「来店済」や「キャンセル」済みの場合は更新不可
      alert("「予約済」の予約のみ「来店済」へ更新できます。");
    }
  }
};

// 来店済ステータスへの更新処理（PUT通信）
scwin.handleMarkAsVisited = function (id) {
  if (!confirm("この予約のステータスを「来店済」に更新しますか？")) return;
  $.ajax({
    url: "http://localhost:8081/api/reservations/" + id + "/status",
    type: "PUT",
    contentType: "application/json",
    data: JSON.stringify({
      status: "completed"
    }),
    success: function () {
      alert("ステータスを「来店済」に更新しました");
      scwin.fetchReservations();
    },
    error: function (xhr) {
      alert("ステータス更新に失敗しました。");
    }
  });
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{style:'display: flex; flex-direction: column; min-height: 100vh;',id:'grp_wrapper'},E:[{T:1,N:'w2:wframe',A:{id:'wfm_header',src:'/components/Header.xml',style:'width: 100%; min-height: 60px;'}},{T:1,N:'xf:group',A:{style:'display: flex; flex: 1;',id:'grp_body'},E:[{T:1,N:'w2:wframe',A:{id:'wfm_sidebar',src:'/components/Sidebar.xml',style:'width: 220px; min-height: 100%;'}},{T:1,N:'xf:group',A:{style:'padding: 20px; flex: 1; background-color: #f8f9fa;',id:'grp_container'},E:[{T:1,N:'w2:textbox',A:{tagname:'h2',id:'txt_pageTitle',label:'予約一覧',style:'margin-top: 0; margin-bottom: 20px; color: #333;'}},{T:1,N:'xf:group',A:{style:'border-radius: 8px; padding: 10px 0 20px 0; margin-bottom: 20px; background-color: #fff; max-width: 450px;',id:'grp_searchArea'},E:[{T:1,N:'xf:group',A:{style:'display: flex; flex-direction: column; gap: 15px;',id:'grp_searchFields'},E:[{T:1,N:'xf:group',A:{style:'display: flex; align-items: center;',id:'grp_dateFilter'},E:[{T:1,N:'w2:textbox',A:{tagname:'label',id:'lbl_dateFilter',label:'利用日：',style:'width: 100px; font-weight: bold;'}},{T:1,N:'w2:inputCalendar',A:{ref:'data:dma_search.date',id:'ica_dateFilter',style:'padding: 6px; font-size: 14px; border: 1px solid #333; border-radius: 4px; width: 180px;',renderType:'component'}}]},{T:1,N:'xf:group',A:{style:'display: flex; align-items: center;',id:'grp_statusFilter'},E:[{T:1,N:'w2:textbox',A:{tagname:'label',id:'lbl_statusFilter',label:'ステータス：',style:'width: 100px; font-weight: bold;'}},{T:1,N:'xf:select1',A:{ref:'data:dma_search.status',id:'sbx_statusFilter',style:'padding: 6px; font-size: 14px; border: 1px solid #333; border-radius: 4px; width: 180px;',appearance:'minimal'},E:[{T:1,N:'xf:choices',E:[{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'すべて'}]},{T:1,N:'xf:value',E:[{T:4,cdata:'すべて'}]}]},{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'予約済'}]},{T:1,N:'xf:value',E:[{T:4,cdata:'予約済'}]}]},{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'来店済'}]},{T:1,N:'xf:value',E:[{T:4,cdata:'来店済'}]}]},{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'キャンセル'}]},{T:1,N:'xf:value',E:[{T:4,cdata:'キャンセル'}]}]}]}]}]},{T:1,N:'xf:group',A:{style:'display: flex; gap: 12px; justify-content: flex-start; margin-left: 100px; margin-top: 5px;',id:'grp_searchBtns'},E:[{T:1,N:'xf:trigger',A:{type:'button',id:'btn_reset',style:'background-color: #fff; color: #333; border: 1px solid #333; border-radius: 4px; padding: 6px 20px; font-size: 14px; cursor: pointer;','ev:onclick':'scwin.btn_reset_onclick'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'リセット'}]}]},{T:1,N:'xf:trigger',A:{type:'button',id:'btn_search',style:'background-color: #00a0e9; color: #fff; border: none; border-radius: 4px; padding: 6px 24px; font-size: 14px; font-weight: bold; cursor: pointer;','ev:onclick':'scwin.btn_search_onclick'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'検索'}]}]}]}]}]},{T:1,N:'xf:group',A:{style:'padding: 20px; background-color: #fff; border-radius: 8px; border: 1px solid #ddd;',id:'grp_gridArea'},E:[{T:1,N:'w2:textbox',A:{tagname:'h3',id:'txt_gridTitle',label:'■ 予約一覧',style:'margin: 0 0 15px 0; color: #333;'}},{T:1,N:'w2:gridView',A:{id:'grd_reservationList',dataList:'data:dlt_reservationList',style:'width: 100%; height: 380px;',autoFit:'allColumn',visibleRowNum:'10',rowNumVisible:'false','ev:oncellclick':'scwin.grd_reservationList_oncellclick'},E:[{T:1,N:'w2:header',A:{id:'header1'},E:[{T:1,N:'w2:row',A:{id:'row1',style:'background-color: #d4edda;'},E:[{T:1,N:'w2:column',A:{id:'col_id',value:'予約ID',width:'80'}},{T:1,N:'w2:column',A:{id:'col_userName',value:'予約者名',width:'120'}},{T:1,N:'w2:column',A:{id:'col_courtName',value:'コート名',width:'140'}},{T:1,N:'w2:column',A:{id:'col_dateTime',value:'利用日時',width:'160'}},{T:1,N:'w2:column',A:{id:'col_totalPrice',value:'合計金額',width:'110'}},{T:1,N:'w2:column',A:{id:'col_status',value:'ステータス',width:'100'}},{T:1,N:'w2:column',A:{id:'col_action',value:'ステータス更新',width:'120'}}]}]},{T:1,N:'w2:gBody',A:{id:'row2'},E:[{T:1,N:'w2:row',A:{id:'row2_body'},E:[{T:1,N:'w2:column',A:{id:'id',inputType:'text',readOnly:'true'}},{T:1,N:'w2:column',A:{id:'displayUserName',inputType:'text',readOnly:'true'}},{T:1,N:'w2:column',A:{id:'courtName',inputType:'text',readOnly:'true'}},{T:1,N:'w2:column',A:{id:'displayDateTime',inputType:'text',readOnly:'true'}},{T:1,N:'w2:column',A:{id:'totalPrice',inputType:'text',dataType:'number',displayFormat:'¥#,###',readOnly:'true'}},{T:1,N:'w2:column',A:{id:'displayStatus',inputType:'text',readOnly:'true'}},{T:1,N:'w2:column',A:{id:'btn_visited',inputType:'text',customFormatter:'scwin.fn_buttonStyleFormatter',width:'100',readOnly:'true'}}]}]}]}]}]}]}]}]}]}]})