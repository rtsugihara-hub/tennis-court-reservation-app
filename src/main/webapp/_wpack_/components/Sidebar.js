/*amd /components/Sidebar.xml 5550 d10ecd7f958194022020cdfe9b55de9671273e599dc1461c5691f138534de32c */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',E:[{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'}},{T:1,N:'w2:workflowCollection'}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:''}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.onpageload = function () {
  scwin.initSidebar();
};

// サイドバーの初期化・権限に応じたメニューの出し分け
scwin.initSidebar = function () {
  var userStr = localStorage.getItem("user");
  var isAdmin = false;
  if (userStr) {
    try {
      var user = JSON.parse(userStr);
      if (user.role === "ADMIN" || user.role === "admin") {
        isAdmin = true;
      }
    } catch (e) {
      isAdmin = false;
    }
  }
  if (isAdmin) {
    txt_menuTitle.setValue("管理メニュー");
    grp_userMenu.hide();
    grp_adminMenu.show("");
  } else {
    txt_menuTitle.setValue("メインメニュー");
    grp_adminMenu.hide();
    grp_userMenu.show("");
  }
  scwin.highlightActiveMenu();
};

// 現在のURL（アクティブ画面）に応じたボタンのスタイル強調設定
scwin.highlightActiveMenu = function () {
  var currentUrl = window.location.href;
  var menuMap = {
    "btn_dashboard": "/user/Dashboard.xml",
    "btn_courts": "/user/CourtList.xml",
    "btn_mypage": "/user/MyPage.xml",
    "btn_adminCourts": "/admin/AdminCourtList.xml",
    "btn_adminReservations": "/admin/AdminReservationList.xml"
  };
  for (var btnId in menuMap) {
    var btnComp = $w.getComponentById(btnId);
    if (btnComp) {
      if (currentUrl.indexOf(menuMap[btnId]) !== -1) {
        btnComp.setStyle("background-color", "#007bff");
        btnComp.setStyle("color", "#fff");
        btnComp.setStyle("font-weight", "bold");
      } else {
        btnComp.setStyle("background-color", "transparent");
        btnComp.setStyle("color", "#333");
        btnComp.setStyle("font-weight", "normal");
      }
    }
  }
};

// サイドバー自体の開閉切り替え（Header.xml等から呼び出し可能）
scwin.toggleSidebar = function () {
  if (grp_sidebar.getStyle("display") === "none") {
    grp_sidebar.show("");
  } else {
    grp_sidebar.hide();
  }
};

// 画面遷移ハンドラー
scwin.navigateTo = function (url) {
  $w.url(url);
};

// 各メニューのクリックイベント（先頭の /websquare を完全除去）
scwin.btn_dashboard_onclick = function (e) {
  scwin.navigateTo("/user/Dashboard.xml");
};
scwin.btn_courts_onclick = function (e) {
  scwin.navigateTo("/user/CourtList.xml");
};
scwin.btn_mypage_onclick = function (e) {
  scwin.navigateTo("/user/MyPage.xml");
};
scwin.btn_adminCourts_onclick = function (e) {
  scwin.navigateTo("/admin/AdminCourtList.xml");
};
scwin.btn_adminReservations_onclick = function (e) {
  scwin.navigateTo("/admin/AdminReservationList.xml");
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{tagname:'aside',id:'grp_sidebar',style:'width: 220px; background-color: #f4f4f4; border-right: 1px solid #ddd; min-height: calc(100vh - 50px);'},E:[{T:1,N:'w2:textbox',A:{id:'txt_menuTitle',label:'',style:'padding: 10px 16px; font-weight: bold; border-bottom: 1px solid #ddd; color: #666; font-size: 12px;'}},{T:1,N:'xf:group',A:{tagname:'nav',id:'grp_nav'},E:[{T:1,N:'xf:group',A:{id:'grp_userMenu'},E:[{T:1,N:'xf:trigger',A:{type:'button',id:'btn_dashboard',style:'display: block; width: 100%; padding: 12px 16px; text-align: left; background-color: transparent; color: #333; border: none; border-bottom: 1px solid #e0e0e0; cursor: pointer; font-size: 14px;','ev:onclick':'scwin.btn_dashboard_onclick'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'ダッシュボード'}]}]},{T:1,N:'xf:trigger',A:{type:'button',id:'btn_courts',style:'display: block; width: 100%; padding: 12px 16px; text-align: left; background-color: transparent; color: #333; border: none; border-bottom: 1px solid #e0e0e0; cursor: pointer; font-size: 14px;','ev:onclick':'scwin.btn_courts_onclick'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'コート一覧・予約'}]}]},{T:1,N:'xf:trigger',A:{type:'button',id:'btn_mypage',style:'display: block; width: 100%; padding: 12px 16px; text-align: left; background-color: transparent; color: #333; border: none; border-bottom: 1px solid #e0e0e0; cursor: pointer; font-size: 14px;','ev:onclick':'scwin.btn_mypage_onclick'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'マイページ'}]}]}]},{T:1,N:'xf:group',A:{id:'grp_adminMenu'},E:[{T:1,N:'xf:trigger',A:{type:'button',id:'btn_adminCourts',style:'display: block; width: 100%; padding: 12px 16px; text-align: left; background-color: transparent; color: #333; border: none; border-bottom: 1px solid #e0e0e0; cursor: pointer; font-size: 14px;','ev:onclick':'scwin.btn_adminCourts_onclick'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'コート登録・編集'}]}]},{T:1,N:'xf:trigger',A:{type:'button',id:'btn_adminReservations',style:'display: block; width: 100%; padding: 12px 16px; text-align: left; background-color: transparent; color: #333; border: none; border-bottom: 1px solid #e0e0e0; cursor: pointer; font-size: 14px;','ev:onclick':'scwin.btn_adminReservations_onclick'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'予約一覧・受付管理'}]}]}]}]}]}]}]}]})