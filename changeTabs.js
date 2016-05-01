window.onload = function() {
  chrome.tabs.query({}, function(tabs){
    var keies = '1234567890abcdefg';
    var windowIds = [];
    var keyAssigns = [];
    var elements = '';
    var tabsCount = tabs.length;
    var targetTabId = '';
    var targetWindowId = '';
    var width = tabs[0].width / 2;

    elements += '<table style="text-align: center; table-layout: fixed;" width=' + width + '>'
    elements += '<tr>'
    for(var i = 0; i < tabsCount; i++){
      if(i >= keies.length){
        break;
      }
      if(tabs[i].active == true) {
        elements += '<td bgcolor="#AAEEDD">' + keies[i] + '</td>';
      } else {
        elements += '<td>' + keies[i] + '</td>';
      }
    }
    elements += '</tr>'
    elements += '<tr>'
    for(var i = 0; i < tabsCount; i++){
      if(i >= keies.length){
        break;
      }
      if(tabs[i].active == true) {
        elements += '<td bgcolor="#AAEEDD">';
      } else {
	elements += '<td>';
      }
      elements += '<img src="' + tabs[i].favIconUrl + '" width="16" class="favicon" />' + '</td>'
      keyAssigns[keies[i]] = tabs[i].id;
      windowIds[tabs[i].id] = tabs[i].windowId;
    }
    elements += '</tr>'
    elements += '</table>'

    document.getElementById('tab_list').innerHTML = elements;

    window.addEventListener('keydown', function(e){
    if(e.shiftKey){
      targetTabId = keyAssigns[String.fromCharCode(e.keyCode)];
    }else{
      targetTabId = keyAssigns[String.fromCharCode((e.keyCode)).toLowerCase()];
    }
    targetWindowId = windowIds[targetTabId];
      chrome.tabs.update(targetTabId, {selected: true});
      chrome.windows.update(targetWindowId, {focused: true});
    });
  });
}
