/*amd /cm/template/page/01_Single/1_07 process.xml 5907 6c5353f94ffb3bf56a87665ab6e2fa9bec03762b7a7ec4b176a9d0a297c47f47 */
define({declaration:{A:{version:'1.0',encoding:'UTF-8'}},E:[{T:1,N:'html',A:{xmlns:'http://www.w3.org/1999/xhtml','xmlns:ev':'http://www.w3.org/2001/xml-events','xmlns:w2':'http://www.inswave.com/websquare','xmlns:xf':'http://www.w3.org/2002/xforms'},E:[{T:1,N:'head',E:[{T:1,N:'w2:type',E:[{T:3,text:'COMPONENT'}]},{T:1,N:'w2:buildDate'},{T:1,N:'w2:MSA'},{T:1,N:'xf:model',E:[{T:1,N:'w2:dataCollection',A:{baseNode:'map'}},{T:1,N:'w2:workflowCollection'}]},{T:1,N:'w2:layoutInfo'},{T:1,N:'w2:publicInfo',A:{method:''}},{T:1,N:'script',A:{lazy:'false',type:'text/javascript'},E:[{T:4,cdata:function(scopeObj){with(scopeObj){scwin.onpageload = function () {};
scwin.setScreen = function (idx) {
  if (idx == 1) {
    step1.addClass("on");
    step2.removeClass("on");
    step3.removeClass("on");
    step4.removeClass("on");
    step5.removeClass("on");
  } else if (idx == 2) {
    step1.removeClass("on");
    step2.addClass("on");
    step3.removeClass("on");
    step4.removeClass("on");
    step5.removeClass("on");
  } else if (idx == 3) {
    step1.removeClass("on");
    step2.removeClass("on");
    step3.addClass("on");
    step4.removeClass("on");
    step5.removeClass("on");
  } else if (idx == 4) {
    step1.removeClass("on");
    step2.removeClass("on");
    step3.removeClass("on");
    step4.addClass("on");
    step5.removeClass("on");
  } else if (idx == 5) {
    step1.removeClass("on");
    step2.removeClass("on");
    step3.removeClass("on");
    step4.removeClass("on");
    step5.addClass("on");
  }
};

// progress
scwin.step1_onclick = function (e) {
  scwin.setScreen(1);
};
scwin.step2_onclick = function (e) {
  scwin.setScreen(2);
};
scwin.step3_onclick = function (e) {
  scwin.setScreen(3);
};
scwin.step4_onclick = function (e) {
  scwin.setScreen(4);
};
scwin.step5_onclick = function (e) {
  scwin.setScreen(5);
};
}}}]}]},{T:1,N:'body',A:{'ev:onpageload':'scwin.onpageload'},E:[{T:1,N:'xf:group',A:{class:'sub_contents',id:'',style:''},E:[{T:1,N:'xf:group',A:{class:'pgtbox',id:'',style:''},E:[{T:1,N:'w2:textbox',A:{class:'pgt_tit',id:'',label:'画面タイトル',style:'',tagname:''}},{T:1,N:'xf:group',A:{class:'breadcrumb',id:'',style:''},E:[{T:1,N:'xf:group',A:{id:'',style:'',tagname:'ul'},E:[{T:1,N:'xf:group',A:{class:'home',id:'',style:'',tagname:'li'},E:[{T:1,N:'w2:anchor',A:{id:'',outerDiv:'false',style:''},E:[{T:1,N:'xf:label'}]}]},{T:1,N:'xf:group',A:{id:'',style:'',tagname:'li'},E:[{T:1,N:'w2:anchor',A:{id:'',outerDiv:'false',style:''},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'1奥行きメニュー'}]}]}]},{T:1,N:'xf:group',A:{id:'',style:'',tagname:'li'},E:[{T:1,N:'w2:anchor',A:{id:'',outerDiv:'false',style:''},E:[{T:1,N:'xf:label',E:[{T:4,cdata:'2奥行きメニュー'}]}]}]},{T:1,N:'xf:group',A:{id:'',style:'',tagname:'li'},E:[{T:1,N:'w2:span',A:{id:'',label:'3奥行きメニュー',style:''}}]}]}]},{T:1,N:'xf:trigger',A:{class:'btn_fav',id:'',style:'',type:'button'},E:[{T:1,N:'xf:label'}]}]},{T:1,N:'xf:group',A:{class:'processbar',id:'',style:'',tagname:'ul'},E:[{T:1,N:'xf:group',A:{class:'on','ev:onclick':'scwin.step1_onclick',id:'step1',tagname:'li'},E:[{T:1,N:'w2:span',A:{class:'num',id:'',label:'1',style:''}},{T:1,N:'xf:group',A:{class:'dot_wrap',id:'',style:''},E:[{T:1,N:'w2:span',A:{class:'dot on',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot',id:'',label:'',style:''}}]},{T:1,N:'w2:textbox',A:{id:'',label:'ステップ1',style:''}}]},{T:1,N:'xf:group',A:{'ev:onclick':'scwin.step2_onclick',id:'step2',style:'',tagname:'li'},E:[{T:1,N:'w2:span',A:{class:'num',id:'',label:'2',style:''}},{T:1,N:'xf:group',A:{class:'dot_wrap',id:'',style:''},E:[{T:1,N:'w2:span',A:{class:'dot on',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot on',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot',id:'',label:'',style:''}}]},{T:1,N:'w2:textbox',A:{id:'',label:'ステップ2',style:''}}]},{T:1,N:'xf:group',A:{'ev:onclick':'scwin.step3_onclick',id:'step3',style:'',tagname:'li'},E:[{T:1,N:'w2:span',A:{class:'num',id:'',label:'3',style:''}},{T:1,N:'xf:group',A:{class:'dot_wrap',id:'',style:''},E:[{T:1,N:'w2:span',A:{class:'dot on',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot on',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot on',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot',id:'',label:'',style:''}}]},{T:1,N:'w2:textbox',A:{id:'',label:'ステップ3',style:''}}]},{T:1,N:'xf:group',A:{'ev:onclick':'scwin.step4_onclick',id:'step4',style:'',tagname:'li'},E:[{T:1,N:'w2:span',A:{class:'num',id:'',label:'4',style:''}},{T:1,N:'xf:group',A:{class:'dot_wrap',id:'',style:''},E:[{T:1,N:'w2:span',A:{class:'dot on',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot on',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot on',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot on',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot',id:'',label:'',style:''}}]},{T:1,N:'w2:textbox',A:{id:'',label:'ステップ4',style:''}}]},{T:1,N:'xf:group',A:{'ev:onclick':'scwin.step5_onclick',id:'step5',style:'',tagname:'li'},E:[{T:1,N:'w2:span',A:{class:'num',id:'',label:'5',style:''}},{T:1,N:'xf:group',A:{class:'dot_wrap',id:'',style:''},E:[{T:1,N:'w2:span',A:{class:'dot on',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot on',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot on ',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot on ',id:'',label:'',style:''}},{T:1,N:'w2:span',A:{class:'dot on ',id:'',label:'',style:''}}]},{T:1,N:'w2:textbox',A:{id:'',label:'ステップ5',style:''}}]}]}]}]}]}]})