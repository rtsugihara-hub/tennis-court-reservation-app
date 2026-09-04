/*amd /Login.xml 5812 6d8f3a0ae7293908b3ae8be328e21d6c35885137b5432a96f293c57ad3a7bcfe */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',E:[{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'},E:[{T:1,N:'w2:dataMap',A:{baseNode:'map',id:'dma_login'},E:[{T:1,N:'w2:keyInfo',E:[{T:1,N:'w2:key',A:{id:'email',name:'メールアドレス',dataType:'text'}},{T:1,N:'w2:key',A:{id:'password',name:'パスワード',dataType:'text'}}]}]},{T:1,N:'w2:dataMap',A:{baseNode:'map',id:'dma_user'},E:[{T:1,N:'w2:keyInfo',E:[{T:1,N:'w2:key',A:{id:'id',name:'ユーザーID',dataType:'text'}},{T:1,N:'w2:key',A:{id:'name',name:'名前',dataType:'text'}},{T:1,N:'w2:key',A:{id:'email',name:'メールアドレス',dataType:'text'}},{T:1,N:'w2:key',A:{id:'role',name:'権限',dataType:'text'}}]}]}]},{T:1,N:'w2:workflowCollection'},{T:1,N:'xf:submission',A:{id:'sbm_login',ref:'data:json,dma_login',target:'data:json,dma_user',action:'http://localhost:8081/api/auth/login',method:'post',mediatype:'application/json',encoding:'UTF-8',instance:'',replace:'',errorHandler:'',customHandler:'',mode:'asynchronous',processMsg:'ログイン中...','ev:submitdone':'scwin.sbm_login_submitdone','ev:submiterror':'scwin.sbm_login_submiterror'}}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:''}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.onpageload = function () {
  // 画面読み込み時の初期化処理
  lbl_error.setValue("");
};

// ログインボタンクリックイベント
scwin.btn_login_onclick = function (e) {
  lbl_error.setValue("");
  var email = dma_login.get("email");
  var password = dma_login.get("password");

  // 入力チェック
  if (!email || email.trim() === "") {
    lbl_error.setValue("メールアドレスを入力してください。");
    ipt_email.focus();
    return;
  }
  if (!password || password.trim() === "") {
    lbl_error.setValue("パスワードを入力してください。");
    ipt_password.focus();
    return;
  }

  // Submission実行（ログイン通信）
  $w.executeSubmission("sbm_login");
};

// ログイン通信 成功時コールバック
scwin.sbm_login_submitdone = function (e) {
  // DataMap経由ではなく、イベントオブジェクトから直接レスポンスJSONを取得
  var userData = e.responseJSON || dma_user.getJSON();
  console.log("【ログインユーザー情報】", userData);
  if (!userData || !userData.id) {
    lbl_error.setValue("ログイン情報の取得に失敗しました。");
    return;
  }

  // LocalStorage にユーザー情報を保存
  localStorage.setItem("user", JSON.stringify(userData));

  // ロール判定（大文字・小文字・プロパティ名表記の揺れに対応）
  var rawRole = userData.role || userData.ROLE || userData.userRole || "";
  var userRole = rawRole.toString().toLowerCase();

  // 遷移先URLの決定
  var targetUrl = "/user/Dashboard.xml";
  if (userRole.indexOf("admin") !== -1) {
    targetUrl = "/admin/AdminCourtList.xml";
  }
  console.log("【判定ロール】", userRole, "【遷移先】", targetUrl);

  // 画面遷移実行
  $w.url(targetUrl);
};

// ログイン通信 エラー時コールバック
scwin.sbm_login_submiterror = function (e) {
  lbl_error.setValue("メールアドレスまたはパスワードが正しくありません。");
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{style:'width: 100%; flex: 1; min-height: 100vh; display: flex; align-items: center; justify-content: center; background-color: #f8f9fa; box-sizing: border-box; padding: 20px;',id:'grp_container'},E:[{T:1,N:'xf:group',A:{style:'width: 100%; max-width: 600px; padding: 40px; background-color: #fff; border: 1px solid #ccc; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); box-sizing: border-box;',id:'grp_card'},E:[{T:1,N:'w2:textbox',A:{style:'text-align: center; margin-top: 0; margin-bottom: 24px; font-size: 24px; color: #333; font-weight: bold;',id:'txt_title',label:'テニスコート予約管理システム',tagname:'h2'}},{T:1,N:'w2:textbox',A:{style:'color: red; font-size: 14px; margin-bottom: 20px; text-align: center; min-height: 20px;',id:'lbl_error',label:'',tagname:'p'}},{T:1,N:'xf:group',A:{style:'margin-bottom: 20px;',id:'grp_email'},E:[{T:1,N:'w2:textbox',A:{style:'display: block; margin-bottom: 8px; font-weight: bold; text-align: left; color: #333;',id:'lbl_email',label:'メールアドレス',tagname:'label'}},{T:1,N:'xf:input',A:{ref:'data:dma_login.email',style:'width: 100%; padding: 12px; font-size: 16px; border-radius: 4px; border: 1px solid #ccc; box-sizing: border-box;',id:'ipt_email',placeholder:'Eメールを入力してください。'}}]},{T:1,N:'xf:group',A:{style:'margin-bottom: 24px;',id:'grp_password'},E:[{T:1,N:'w2:textbox',A:{style:'display: block; margin-bottom: 8px; font-weight: bold; text-align: left; color: #333;',id:'lbl_password',label:'パスワード',tagname:'label'}},{T:1,N:'xf:secret',A:{ref:'data:dma_login.password',style:'width: 100%; padding: 12px; font-size: 16px; border-radius: 4px; border: 1px solid #ccc; box-sizing: border-box;',id:'ipt_password',placeholder:'パスワードを入力してください。'}}]},{T:1,N:'xf:trigger',A:{type:'button',style:'width: 100%; padding: 12px; background-color: #007bff; color: #fff; font-size: 16px; font-weight: bold; border: none; border-radius: 4px; cursor: pointer;',id:'btn_login','ev:onclick':'scwin.btn_login_onclick'},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'ログイン'}]}]}]}]}]}]}]})