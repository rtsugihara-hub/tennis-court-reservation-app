/*amd /components/Header.xml 3952 ccd25df036f358debde43ac279cb426b524dbaf35dc026b66dd6e4162bb5e0c8 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',E:[{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'}},{T:1,N:'w2:workflowCollection'}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:''}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.onpageload = function () {
  scwin.initHeader();
};

// ヘッダー情報の初期化処理
scwin.initHeader = function () {
  var userStr = localStorage.getItem("user");
  if (userStr) {
    try {
      var user = JSON.parse(userStr);
      var roleName = user.role === "ADMIN" || user.role === "admin" ? "管理者" : "一般ユーザー";
      lbl_userInfo.setValue((user.name || "ユーザー") + " 様 (" + roleName + ")");
    } catch (e) {
      lbl_userInfo.setValue("ゲスト 様");
    }
  } else {
    lbl_userInfo.setValue("ゲスト 様");
  }
};

// ハンバーガーボタン押下処理（配置されている各画面の wfm_sidebar を直接開閉）
scwin.btn_toggleSidebar_onclick = function (e) {
  // 親スコープ（ヘッダーを呼び出している各画面）の $p を取得
  var parentP = $p.parent() ? $p.parent().$p : $p;

  // 1. WebSquare コンポーネント経由でサイドバー(wfm_sidebar)を取得
  var sidebarComp = parentP.getComponentById("wfm_sidebar");
  if (sidebarComp) {
    var currentDisplay = sidebarComp.getStyle("display");
    if (currentDisplay === "none") {
      sidebarComp.setStyle("display", "block");
    } else {
      sidebarComp.setStyle("display", "none");
    }
  } else {
    // 2. DOM 経由でのフォールバック処理
    var sidebarElem = document.getElementById("wfm_sidebar");
    if (sidebarElem) {
      if (sidebarElem.style.display === "none") {
        sidebarElem.style.display = "block";
      } else {
        sidebarElem.style.display = "none";
      }
    }
  }
};

// ログアウトボタン押下処理
scwin.btn_logout_onclick = function (e) {
  if (confirm("ログアウトしますか？")) {
    // 1. セッション・ローカルストレージのユーザー情報削除
    localStorage.removeItem("user");

    // 2. ログイン画面への確実な画面遷移
    // パス構成に合わせてリダイレクト URL を指定
    window.location.href = "http://localhost:8080/websquare/websquare.html?w2xPath=/Login.xml";
  }
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{tagname:'header',style:'background-color: #333; color: #fff; padding: 10px 20px; display: flex; justify-content: space-between; align-items: center;',id:'grp_header'},E:[{T:1,N:'xf:group',A:{style:'display: flex; align-items: center; gap: 15px;',id:'grp_header_left'},E:[{T:1,N:'xf:trigger',A:{type:'button',id:'btn_toggleSidebar',style:'background-color: transparent; color: #fff; border: none; padding: 4px; font-size: 22px; cursor: pointer; display: flex; align-items: center; line-height: 1;','ev:onclick':'scwin.btn_toggleSidebar_onclick'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'☰'}]}]},{T:1,N:'w2:textbox',A:{tagname:'h1',id:'txt_appTitle',label:'テニスコート予約システム',style:'margin: 0; font-size: 18px; color: #fff;'}}]},{T:1,N:'xf:group',A:{style:'display: flex; align-items: center; gap: 15px;',id:'grp_header_right'},E:[{T:1,N:'w2:textbox',A:{id:'lbl_userInfo',label:'',style:'color: #fff;'}},{T:1,N:'xf:trigger',A:{type:'button',id:'btn_logout',style:'background-color: #6c757d; color: #fff; border: none; border-radius: 4px; padding: 6px 12px; cursor: pointer;','ev:onclick':'scwin.btn_logout_onclick'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'ログアウト'}]}]}]}]}]}]}]})