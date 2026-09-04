/*amd /admin/AdminCourtList.xml 22389 f67cbbd15ee25433ac06426b61adb1820739a17d1fb305e0e3bf447b9ca12ea6 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',E:[{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'style',A:{type:'text/css'},E:[{T:4,cdata:'.grid-btn-edit{background-color:#00a0e9!important;color:#fff!important;border:none!important;border-radius:4px!important;padding:4px 12px!important;font-size:12px!important;cursor:pointer!important}.grid-btn-edit:hover{background-color:#0080ca!important}.grid-btn-delete{background-color:#dc3545!important;color:#fff!important;border:none!important;border-radius:4px!important;padding:4px 12px!important;font-size:12px!important;cursor:pointer!important}.grid-btn-delete:hover{background-color:#bd2130!important}.grid-btn-disabled{background-color:#e9ecef!important;color:#6c757d!important;border:1px solid #ced4da!important;border-radius:4px!important;padding:4px 12px!important;font-size:12px!important;cursor:not-allowed!important;opacity:.65}'}]},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'},E:[{T:1,N:'w2:dataMap',A:{baseNode:'map',id:'dma_courtForm'},E:[{T:1,N:'w2:keyInfo',E:[{T:1,N:'w2:key',A:{id:'id',name:'コートID',dataType:'text'}},{T:1,N:'w2:key',A:{id:'name',name:'コート名',dataType:'text'}},{T:1,N:'w2:key',A:{id:'type',name:'コート種別',dataType:'text'}},{T:1,N:'w2:key',A:{id:'isIndoor',name:'屋内外区分',dataType:'text'}},{T:1,N:'w2:key',A:{id:'date',name:'利用日',dataType:'text'}},{T:1,N:'w2:key',A:{id:'timeSlot',name:'利用時間帯',dataType:'text'}},{T:1,N:'w2:key',A:{id:'pricePerHour',name:'利用料金',dataType:'number'}},{T:1,N:'w2:key',A:{id:'status',name:'公開ステータス',dataType:'text'}},{T:1,N:'w2:key',A:{id:'description',name:'備考・説明',dataType:'text'}},{T:1,N:'w2:key',A:{id:'isDeleted',name:'削除フラグ',dataType:'text'}}]}]},{T:1,N:'w2:dataList',A:{baseNode:'list',repeatNode:'map',id:'dlt_courtList',saveRemovedData:'true'},E:[{T:1,N:'w2:columnInfo',E:[{T:1,N:'w2:column',A:{id:'id',name:'コートID',dataType:'text'}},{T:1,N:'w2:column',A:{id:'name',name:'コート名',dataType:'text'}},{T:1,N:'w2:column',A:{id:'type',name:'コート種別',dataType:'text'}},{T:1,N:'w2:column',A:{id:'indoor',name:'屋内外区分',dataType:'text'}},{T:1,N:'w2:column',A:{id:'isIndoor',name:'屋内外区分(Form)',dataType:'text'}},{T:1,N:'w2:column',A:{id:'date',name:'利用日',dataType:'text'}},{T:1,N:'w2:column',A:{id:'timeSlot',name:'利用時間帯',dataType:'text'}},{T:1,N:'w2:column',A:{id:'pricePerHour',name:'利用料金',dataType:'number'}},{T:1,N:'w2:column',A:{id:'status',name:'公開ステータス',dataType:'text'}},{T:1,N:'w2:column',A:{id:'description',name:'備考・説明',dataType:'text'}},{T:1,N:'w2:column',A:{id:'isDeleted',name:'削除フラグ',dataType:'text'}},{T:1,N:'w2:column',A:{id:'displayStatus',name:'表示用ステータス',dataType:'text'}},{T:1,N:'w2:column',A:{id:'displayIndoor',name:'表示用屋内外',dataType:'text'}},{T:1,N:'w2:column',A:{id:'displayDateTime',name:'表示日時',dataType:'text'}}]}]},{T:1,N:'w2:dataList',A:{baseNode:'list',repeatNode:'map',id:'dlt_reservationList',saveRemovedData:'true'},E:[{T:1,N:'w2:columnInfo',E:[{T:1,N:'w2:column',A:{id:'id',name:'予約ID',dataType:'text'}},{T:1,N:'w2:column',A:{id:'courtId',name:'コートID',dataType:'text'}},{T:1,N:'w2:column',A:{id:'status',name:'予約ステータス',dataType:'text'}}]}]}]},{T:1,N:'w2:workflowCollection'},{T:1,N:'xf:submission',A:{id:'sbm_getCourts',ref:'',target:'',action:'http://localhost:8081/api/courts',method:'get',mediatype:'application/json',encoding:'UTF-8',mode:'asynchronous',processMsg:'読み込み中...','ev:submitdone':'scwin.sbm_getCourts_submitdone'}},{T:1,N:'xf:submission',A:{id:'sbm_getReservations',ref:'',target:'',action:'http://localhost:8081/api/reservations',method:'get',mediatype:'application/json',encoding:'UTF-8',mode:'asynchronous','ev:submitdone':'scwin.sbm_getReservations_submitdone'}}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:''}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.editingCourtId = null;
scwin.onpageload = function () {
  scwin.btn_clear_onclick();
  scwin.loadData();
};

// 1. まず予約データを取得
scwin.loadData = function () {
  $p.executeSubmission("sbm_getReservations");
};

// 2. 予約データ取得完了ハンドラ
scwin.sbm_getReservations_submitdone = function (e) {
  var resList = e.responseJSON;
  if (Array.isArray(resList)) {
    dlt_reservationList.setJSON(resList);
  }
  $p.executeSubmission("sbm_getCourts");
};

// 3. コート一覧データ加工＆一括バインド処理
scwin.sbm_getCourts_submitdone = function (e) {
  var rawList = e.responseJSON;
  if (!Array.isArray(rawList)) {
    if (e.responseText) {
      try {
        rawList = JSON.parse(e.responseText);
      } catch (err) {
        rawList = [];
      }
    } else {
      rawList = [];
    }
  }
  var formattedList = [];
  for (var i = 0; i < rawList.length; i++) {
    var rowData = rawList[i];
    var isDel = rowData.isDeleted === true || rowData.isDeleted === "true" || rowData.isDeleted === 1;
    if (isDel) continue;
    var isIndoorVal = rowData.indoor === true || rowData.indoor === "true" || rowData.isIndoor === true || rowData.isIndoor === "true";
    var indoorText = isIndoorVal ? "屋内" : "屋外";
    var statusText = rowData.status === "available" || rowData.status === "公開中" ? "公開中" : "非公開";
    var dateTimeText = (rowData.date || "") + " " + (rowData.timeSlot || "");
    formattedList.push({
      id: String(rowData.id || ""),
      name: rowData.name || "",
      type: rowData.type || "",
      pricePerHour: Number(rowData.pricePerHour) || 0,
      status: rowData.status || "",
      description: rowData.description || "",
      date: rowData.date || "",
      timeSlot: rowData.timeSlot || "",
      indoor: isIndoorVal,
      isIndoor: isIndoorVal,
      displayIndoor: indoorText,
      displayStatus: statusText,
      displayDateTime: dateTimeText
    });
  }
  dlt_courtList.setJSON(formattedList);
};

// アクティブな予約の判定関数
scwin.hasActiveReservations = function (courtId) {
  if (!courtId) return false;
  var count = dlt_reservationList.getTotalRow();
  var targetIdNum = Number(courtId);
  for (var i = 0; i < count; i++) {
    var res = dlt_reservationList.getRowJSON(i);
    var resCourtIdNum = Number(res.courtId);
    var rStatus = (res.status || "").toLowerCase();
    if (resCourtIdNum === targetIdNum && rStatus !== "cancelled" && rStatus !== "キャンセル" && rStatus !== "キャンセル済") {
      return true;
    }
  }
  return false;
};

// 予約有無に応じた編集ボタンの動的レンダリング
scwin.fn_editBtnFormatter = function (val, formattedVal, rowIdx, colIdx) {
  var rowData = dlt_courtList.getRowJSON(rowIdx);
  if (rowData && scwin.hasActiveReservations(rowData.id)) {
    return '<button type="button" class="grid-btn-disabled" disabled="disabled" title="予約が存在するため編集できません">編集</button>';
  } else {
    return '<button type="button" class="grid-btn-edit">編集</button>';
  }
};

// 予約有無に応じた削除ボタンの動的レンダリング
scwin.fn_deleteBtnFormatter = function (val, formattedVal, rowIdx, colIdx) {
  var rowData = dlt_courtList.getRowJSON(rowIdx);
  if (rowData && scwin.hasActiveReservations(rowData.id)) {
    return '<button type="button" class="grid-btn-disabled" disabled="disabled" title="予約が存在するため削除できません">削除</button>';
  } else {
    return '<button type="button" class="grid-btn-delete">削除</button>';
  }
};

// フォーム完全初期化
scwin.btn_clear_onclick = function (e) {
  scwin.editingCourtId = null;
  txt_formTitle.setValue("新規コート登録");
  btn_submit.setValue("保存");
  dma_courtForm.reset();
  dma_courtForm.set("type", "");
  dma_courtForm.set("isIndoor", "");
  dma_courtForm.set("status", "");
  if (ipt_name) ipt_name.setValue("");
  if (ica_date) ica_date.setValue("");
  if (ipt_timeSlot) ipt_timeSlot.setValue("");
  if (ipt_price) ipt_price.setValue("");
  if (txa_description) txa_description.setValue("");
  if (rad_isIndoor) {
    rad_isIndoor.setValue("");
    if (typeof rad_isIndoor.setSelectedIndex === "function") {
      rad_isIndoor.setSelectedIndex(-1);
    }
  }
  if (sbx_type) {
    sbx_type.setValue("");
    if (typeof sbx_type.setSelectedIndex === "function") {
      sbx_type.setSelectedIndex(0);
    }
  }
  if (sbx_status) {
    sbx_status.setValue("");
    if (typeof sbx_status.setSelectedIndex === "function") {
      sbx_status.setSelectedIndex(0);
    }
  }
};

// 保存・更新ボタン処理（日付のハイフン整形追加）
scwin.btn_submit_onclick = function (e) {
  var form = dma_courtForm.getJSON();
  if (!form.name || form.name.trim() === "") {
    alert("コート名を入力してください。");
    ipt_name.focus();
    return;
  }
  if (!form.type || form.type.trim() === "") {
    alert("コート種別を選択してください。");
    sbx_type.focus();
    return;
  }
  if (form.isIndoor === "" || form.isIndoor === null || form.isIndoor === undefined) {
    alert("屋内外区分を選択してください。");
    rad_isIndoor.focus();
    return;
  }
  if (!form.date || form.date.trim() === "") {
    alert("利用日を選択してください。");
    ica_date.focus();
    return;
  }
  if (!form.timeSlot || form.timeSlot.trim() === "") {
    alert("利用時間帯を入力してください。（例: 10:00-12:00）");
    ipt_timeSlot.focus();
    return;
  }
  if (form.pricePerHour === "" || form.pricePerHour === null || form.pricePerHour === undefined || isNaN(form.pricePerHour)) {
    alert("利用料金を入力してください。");
    ipt_price.focus();
    return;
  }
  if (!form.status || form.status.trim() === "") {
    alert("公開ステータスを選択してください。");
    sbx_status.focus();
    return;
  }
  if (scwin.editingCourtId && scwin.hasActiveReservations(scwin.editingCourtId)) {
    alert("指定されたコートには既に予約が存在するため、コート情報を編集できません。");
    return;
  }

  // ★ 日付のハイフン整形ロジック (例: "20260918" -> "2026-09-18")
  var formattedDate = form.date ? form.date.trim() : "";
  if (/^\d{8}$/.test(formattedDate)) {
    formattedDate = formattedDate.substring(0, 4) + "-" + formattedDate.substring(4, 6) + "-" + formattedDate.substring(6, 8);
  }
  var isIndoorBool = String(form.isIndoor) === "true";
  var priceNum = parseInt(form.pricePerHour, 10);
  if (isNaN(priceNum)) priceNum = 0;
  var statusVal = form.status === "公開中" || form.status === "available" ? "available" : "maintenance";
  var requestPayload = {
    id: scwin.editingCourtId ? Number(scwin.editingCourtId) : null,
    name: form.name.trim(),
    type: form.type,
    isIndoor: isIndoorBool,
    indoor: isIndoorBool,
    date: formattedDate,
    // 整形済み日付を適用
    timeSlot: form.timeSlot.trim(),
    pricePerHour: priceNum,
    status: statusVal,
    description: form.description ? form.description.trim() : "",
    isDeleted: false
  };
  var targetUrl = scwin.editingCourtId ? "http://localhost:8081/api/courts/" + scwin.editingCourtId : "http://localhost:8081/api/courts";
  var httpMethod = scwin.editingCourtId ? "PUT" : "POST";
  $.ajax({
    url: targetUrl,
    type: httpMethod,
    contentType: "application/json; charset=utf-8",
    data: JSON.stringify(requestPayload),
    success: function (res) {
      alert(scwin.editingCourtId ? "更新しました" : "登録しました");
      scwin.btn_clear_onclick();
      scwin.loadData();
    },
    error: function (xhr) {
      alert("保存処理に失敗しました：" + (xhr.responseText || ""));
    }
  });
};

// GridView セル（編集・削除ボタン）クリック処理
scwin.grd_courtList_oncellclick = function (row, col) {
  var colId = grd_courtList.getColumnID(col);
  var rowData = dlt_courtList.getRowJSON(row);
  if (scwin.hasActiveReservations(rowData.id)) {
    return;
  }
  if (colId === "btn_edit") {
    scwin.handleEdit(rowData);
  } else if (colId === "btn_delete") {
    scwin.handleDelete(rowData.id);
  }
};

// 編集処理
scwin.handleEdit = function (court) {
  if (scwin.hasActiveReservations(court.id)) {
    alert("指定されたコートには既に予約が存在するため、コート情報を編集できません。");
    return;
  }
  scwin.editingCourtId = court.id;
  txt_formTitle.setValue("コート情報編集");
  btn_submit.setValue("更新");
  dma_courtForm.setJSON(court);
  dma_courtForm.set("status", court.status === "available" || court.status === "公開中" ? "公開中" : "非公開");
  var indoorBool = court.indoor === true || court.indoor === "true" || court.isIndoor === true || court.isIndoor === "true";
  dma_courtForm.set("isIndoor", String(indoorBool));
};

// 削除処理
scwin.handleDelete = function (id) {
  if (scwin.hasActiveReservations(id)) {
    alert("指定されたコートには既に予約が存在するため削除できません。");
    return;
  }
  if (!confirm("このコート情報を削除しますか？")) return;
  $.ajax({
    url: "http://localhost:8081/api/courts/" + id,
    type: "DELETE",
    success: function () {
      alert("削除しました");
      if (scwin.editingCourtId === String(id)) {
        scwin.btn_clear_onclick();
      }
      scwin.loadData();
    },
    error: function (xhr) {
      alert("削除処理に失敗しました：" + (xhr.responseText || ""));
    }
  });
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{style:'display: flex; flex-direction: column; min-height: 100vh;',id:'grp_wrapper'},E:[{T:1,N:'w2:wframe',A:{id:'wfm_header',src:'/components/Header.xml',style:'width: 100%; min-height: 60px;'}},{T:1,N:'xf:group',A:{style:'display: flex; flex: 1;',id:'grp_body'},E:[{T:1,N:'w2:wframe',A:{id:'wfm_sidebar',src:'/components/Sidebar.xml',style:'width: 220px; min-height: 100%;'}},{T:1,N:'xf:group',A:{style:'padding: 20px; flex: 1; background-color: #f8f9fa;',id:'grp_container'},E:[{T:1,N:'w2:textbox',A:{tagname:'h2',id:'txt_pageTitle',label:'コート登録・編集',style:'margin-top: 0; margin-bottom: 20px; color: #333;'}},{T:1,N:'xf:group',A:{style:'border: 1px solid #ccc; border-radius: 8px; padding: 20px; background-color: #fff; max-width: 550px; margin: 0 auto 30px auto;',id:'grp_form'},E:[{T:1,N:'w2:textbox',A:{tagname:'h3',id:'txt_formTitle',label:'新規コート登録',style:'text-align: center; margin-top: 0; margin-bottom: 20px;'}},{T:1,N:'xf:group',A:{style:'display: flex; flex-direction: column; gap: 12px;',id:'grp_fields'},E:[{T:1,N:'xf:group',A:{style:'display: flex; align-items: center;',id:'grp_name'},E:[{T:1,N:'w2:textbox',A:{tagname:'label',id:'lbl_name',label:'コート名 *',style:'width: 130px; font-weight: bold;'}},{T:1,N:'xf:input',A:{ref:'data:dma_courtForm.name',style:'flex: 1; padding: 6px; border: 1px solid #333; border-radius: 4px;',id:'ipt_name',placeholder:'コート名を入力してください。'}}]},{T:1,N:'xf:group',A:{style:'display: flex; align-items: center;',id:'grp_type'},E:[{T:1,N:'w2:textbox',A:{tagname:'label',id:'lbl_type',label:'コート種別 *',style:'width: 130px; font-weight: bold;'}},{T:1,N:'xf:select1',A:{ref:'data:dma_courtForm.type',id:'sbx_type',style:'flex: 1; padding: 6px; border: 1px solid #333; border-radius: 4px;',appearance:'minimal'},E:[{T:1,N:'xf:choices',E:[{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'選択してください'}]},{T:1,N:'xf:value'}]},{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'オムニ'}]},{T:1,N:'xf:value',E:[{T:4,cdata:'オムニ'}]}]},{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'クレー'}]},{T:1,N:'xf:value',E:[{T:4,cdata:'クレー'}]}]},{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'ハード'}]},{T:1,N:'xf:value',E:[{T:4,cdata:'ハード'}]}]},{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'人工芝'}]},{T:1,N:'xf:value',E:[{T:4,cdata:'人工芝'}]}]}]}]}]},{T:1,N:'xf:group',A:{style:'display: flex; align-items: center;',id:'grp_indoor'},E:[{T:1,N:'w2:textbox',A:{tagname:'label',id:'lbl_indoor',label:'屋内外区分 *',style:'width: 130px; font-weight: bold;'}},{T:1,N:'xf:select1',A:{ref:'data:dma_courtForm.isIndoor',id:'rad_isIndoor',style:'display: flex; gap: 15px;',appearance:'full',cols:'',rows:'1'},E:[{T:1,N:'xf:choices',E:[{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'屋外'}]},{T:1,N:'xf:value',E:[{T:4,cdata:'false'}]}]},{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'屋内'}]},{T:1,N:'xf:value',E:[{T:4,cdata:'true'}]}]}]}]}]},{T:1,N:'xf:group',A:{style:'display: flex; align-items: center;',id:'grp_date'},E:[{T:1,N:'w2:textbox',A:{tagname:'label',id:'lbl_date',label:'利用日 *',style:'width: 130px; font-weight: bold;'}},{T:1,N:'w2:inputCalendar',A:{ref:'data:dma_courtForm.date',id:'ica_date',style:'flex: 1; padding: 6px; border: 1px solid #333; border-radius: 4px;',renderType:'component'}}]},{T:1,N:'xf:group',A:{style:'display: flex; align-items: center;',id:'grp_timeSlot'},E:[{T:1,N:'w2:textbox',A:{tagname:'label',id:'lbl_timeSlot',label:'利用時間帯 *',style:'width: 130px; font-weight: bold;'}},{T:1,N:'xf:input',A:{ref:'data:dma_courtForm.timeSlot',style:'flex: 1; padding: 6px; border: 1px solid #333; border-radius: 4px;',id:'ipt_timeSlot',placeholder:'例: 10:00-12:00'}}]},{T:1,N:'xf:group',A:{style:'display: flex; align-items: center;',id:'grp_price'},E:[{T:1,N:'w2:textbox',A:{tagname:'label',id:'lbl_price',label:'利用料金 *',style:'width: 130px; font-weight: bold;'}},{T:1,N:'xf:input',A:{ref:'data:dma_courtForm.pricePerHour',dataType:'number',style:'flex: 1; padding: 6px; border: 1px solid #333; border-radius: 4px;',id:'ipt_price',placeholder:'例: 2000'}}]},{T:1,N:'xf:group',A:{style:'display: flex; align-items: center;',id:'grp_status'},E:[{T:1,N:'w2:textbox',A:{tagname:'label',id:'lbl_status',label:'公開ステータス *',style:'width: 130px; font-weight: bold;'}},{T:1,N:'xf:select1',A:{ref:'data:dma_courtForm.status',id:'sbx_status',style:'flex: 1; padding: 6px; border: 1px solid #333; border-radius: 4px;',appearance:'minimal'},E:[{T:1,N:'xf:choices',E:[{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'選択してください'}]},{T:1,N:'xf:value'}]},{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'公開中'}]},{T:1,N:'xf:value',E:[{T:4,cdata:'公開中'}]}]},{T:1,N:'xf:item',E:[{T:1,N:'xf:label',E:[{T:4,cdata:'非公開'}]},{T:1,N:'xf:value',E:[{T:4,cdata:'非公開'}]}]}]}]}]},{T:1,N:'xf:group',A:{style:'display: flex; align-items: flex-start;',id:'grp_description'},E:[{T:1,N:'w2:textbox',A:{tagname:'label',id:'lbl_description',label:'備考・説明：',style:'width: 130px; font-weight: bold; margin-top: 6px;'}},{T:1,N:'xf:textarea',A:{ref:'data:dma_courtForm.description',style:'flex: 1; padding: 6px; border: 1px solid #333; border-radius: 4px; height: 70px;',id:'txa_description',placeholder:'（任意）備考を入力してください'}}]},{T:1,N:'xf:group',A:{style:'display: flex; justify-content: flex-end; gap: 15px; margin-top: 10px;',id:'grp_buttons'},E:[{T:1,N:'xf:trigger',A:{type:'button',id:'btn_clear',style:'padding: 6px 20px; background-color: #6c757d; color: #fff; border: none; border-radius: 4px; cursor: pointer;','ev:onclick':'scwin.btn_clear_onclick'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'クリア'}]}]},{T:1,N:'xf:trigger',A:{type:'button',id:'btn_submit',style:'padding: 6px 24px; background-color: #00a0e9; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;','ev:onclick':'scwin.btn_submit_onclick'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'保存'}]}]}]}]}]},{T:1,N:'xf:group',A:{style:'padding: 20px; background-color: #fff; border-radius: 8px; border: 1px solid #ddd;',id:'grp_gridArea'},E:[{T:1,N:'w2:textbox',A:{tagname:'h3',id:'txt_gridTitle',label:'■ コート一覧',style:'margin: 0 0 15px 0; color: #333;'}},{T:1,N:'w2:gridView',A:{id:'grd_courtList',dataList:'data:dlt_courtList',style:'width: 100%; height: 350px;',autoFit:'allColumn',visibleRowNum:'10',rowNumVisible:'false','ev:oncellclick':'scwin.grd_courtList_oncellclick'},E:[{T:1,N:'w2:header',A:{id:'header1'},E:[{T:1,N:'w2:row',A:{id:'row1',style:'background-color: #d4edda;'},E:[{T:1,N:'w2:column',A:{id:'col_id',value:'コートID',width:'70'}},{T:1,N:'w2:column',A:{id:'col_name',value:'コート名',width:'120'}},{T:1,N:'w2:column',A:{id:'col_type',value:'コート種別',width:'90'}},{T:1,N:'w2:column',A:{id:'col_indoor',value:'屋内外',width:'70'}},{T:1,N:'w2:column',A:{id:'col_dateTime',value:'利用日時',width:'140'}},{T:1,N:'w2:column',A:{id:'col_price',value:'利用料金',width:'100'}},{T:1,N:'w2:column',A:{id:'col_status',value:'公開ステータス',width:'100'}},{T:1,N:'w2:column',A:{id:'col_description',value:'備考・説明',width:'180'}},{T:1,N:'w2:column',A:{id:'col_edit',value:'編集',width:'70'}},{T:1,N:'w2:column',A:{id:'col_delete',value:'削除',width:'70'}}]}]},{T:1,N:'w2:gBody',A:{id:'gBody1'},E:[{T:1,N:'w2:row',A:{id:'row2'},E:[{T:1,N:'w2:column',A:{id:'id',inputType:'text',readOnly:'true'}},{T:1,N:'w2:column',A:{id:'name',inputType:'text',readOnly:'true'}},{T:1,N:'w2:column',A:{id:'type',inputType:'text',readOnly:'true'}},{T:1,N:'w2:column',A:{id:'displayIndoor',inputType:'text',readOnly:'true'}},{T:1,N:'w2:column',A:{id:'displayDateTime',inputType:'text',readOnly:'true'}},{T:1,N:'w2:column',A:{id:'pricePerHour',inputType:'text',dataType:'number',displayFormat:'¥#,###',readOnly:'true'}},{T:1,N:'w2:column',A:{id:'displayStatus',inputType:'text',readOnly:'true'}},{T:1,N:'w2:column',A:{id:'description',inputType:'text',readOnly:'true',textAlign:'left'}},{T:1,N:'w2:column',A:{id:'btn_edit',inputType:'text',customFormatter:'scwin.fn_editBtnFormatter',width:'70',readOnly:'true'}},{T:1,N:'w2:column',A:{id:'btn_delete',inputType:'text',customFormatter:'scwin.fn_deleteBtnFormatter',width:'70',readOnly:'true'}}]}]}]}]}]}]}]}]}]}]})