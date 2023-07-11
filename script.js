(function(){
    var script = {
 "scrollBarMargin": 2,
 "class": "Player",
 "id": "rootPlayer",
 "children": [
  "this.MainViewer",
  "this.Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
  "this.Container_0DD1BF09_1744_0507_41B3_29434E440055",
  "this.Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
  "this.Container_062AB830_1140_E215_41AF_6C9D65345420",
  "this.Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
  "this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
  "this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
  "this.Container_2820BA13_0D5D_5B97_4192_AABC38F6F169",
  "this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
  "this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC"
 ],
 "scrollBarVisible": "rollOver",
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0].forEach(function(component) { component.set('visible', false); }) }",
 "layout": "absolute",
 "width": "100%",
 "paddingRight": 0,
 "scripts": {
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "unregisterKey": function(key){  delete window[key]; },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "registerKey": function(key, value){  window[key] = value; },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getKey": function(key){  return window[key]; },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "existsKey": function(key){  return key in window; },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); }
 },
 "scrollBarWidth": 10,
 "minHeight": 20,
 "horizontalAlign": "left",
 "buttonToggleFullscreen": "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "downloadEnabled": false,
 "defaultVRPointer": "laser",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "minWidth": 20,
 "height": "100%",
 "contentOpaque": false,
 "buttonToggleMute": "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "borderRadius": 0,
 "borderSize": 0,
 "definitions": [{
 "hfovMin": "150%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "yaw": 163.63,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -17.26,
   "panorama": "this.panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E"
  }
 ],
 "label": "4",
 "id": "panorama_A060534A_AB47_530E_41DC_BA65238B3835",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_BF53D822_AB43_DD3E_41E2_8EC65E7D151E",
  "this.overlay_B8FC3823_AB42_BD3E_41E1_AFD15D279412"
 ],
 "vfov": 180,
 "pitch": 0,
 "partial": false,
 "thumbnailUrl": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_camera",
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "media": "this.panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_camera"
  },
  {
   "media": "this.panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_camera"
  },
  {
   "media": "this.panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_camera"
  },
  {
   "media": "this.panorama_A060534A_AB47_530E_41DC_BA65238B3835",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A060534A_AB47_530E_41DC_BA65238B3835_camera"
  },
  {
   "media": "this.panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_camera"
  },
  {
   "media": "this.panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 5, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_camera"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "class": "PlayList"
},
{
 "id": "window_B8FD50EA_AB47_CD0E_41C6_6D887EBFDB2B",
 "width": 400,
 "bodyBackgroundColorDirection": "vertical",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "shadowVerticalLength": 0,
 "closeButtonBackgroundColorRatios": [],
 "headerPaddingRight": 10,
 "closeButtonPressedIconColor": "#FFFFFF",
 "horizontalAlign": "center",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "headerVerticalAlign": "middle",
 "titlePaddingLeft": 5,
 "closeButtonBorderRadius": 11,
 "shadowSpread": 1,
 "minHeight": 20,
 "paddingLeft": 0,
 "titleFontSize": "1.29vmin",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "veilColorRatios": [
  0,
  1
 ],
 "modal": true,
 "bodyPaddingTop": 5,
 "backgroundColor": [],
 "backgroundOpacity": 1,
 "titleFontColor": "#000000",
 "minWidth": 20,
 "height": 400,
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "footerHeight": 5,
 "titleFontWeight": "normal",
 "title": "",
 "headerBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "closeButtonIconHeight": 12,
 "veilColorDirection": "horizontal",
 "propagateClick": false,
 "overflow": "scroll",
 "headerBorderSize": 0,
 "veilHideEffect": {
  "class": "FadeOutEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "shadowHorizontalLength": 3,
 "headerBackgroundOpacity": 1,
 "titlePaddingTop": 5,
 "shadow": true,
 "bodyPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "scrollBarMargin": 2,
 "class": "Window",
 "veilShowEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "footerBackgroundColorDirection": "vertical",
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "children": [
  "this.image_uid5C7445BA_478A_72E4_41C1_BCFC8AAF00B8_0",
  "this.htmlText_B8FF50EA_AB47_CD0E_41AF_AB690FECE63B",
  {
   "class": "WebFrame",
   "insetBorder": false,
   "width": "100%",
   "scrollEnabled": true,
   "paddingRight": 0,
   "url": "https://www.instagram.com/reel/CrtPzKhO6WL/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==",
   "minHeight": 0,
   "paddingLeft": 0,
   "backgroundColor": [],
   "minWidth": 0,
   "height": "33%",
   "backgroundOpacity": 1,
   "borderRadius": 0,
   "borderSize": 0,
   "paddingTop": 0,
   "propagateClick": false,
   "backgroundColorRatios": [],
   "data": {
    "name": "WebFrame21774"
   },
   "paddingBottom": 0,
   "shadow": false,
   "backgroundColorDirection": "vertical"
  }
 ],
 "titlePaddingRight": 5,
 "shadowColor": "#000000",
 "layout": "vertical",
 "showEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "bodyPaddingLeft": 5,
 "paddingRight": 0,
 "titleFontStyle": "normal",
 "contentOpaque": false,
 "closeButtonIconLineWidth": 2,
 "bodyBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "shadowBlurRadius": 6,
 "titleFontFamily": "Arial",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "bodyBackgroundOpacity": 1,
 "shadowOpacity": 0.5,
 "borderRadius": 5,
 "headerPaddingLeft": 10,
 "bodyPaddingRight": 5,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "headerPaddingTop": 10,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "titleTextDecoration": "none",
 "headerBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundColorRatios": [],
 "gap": 10,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarOpacity": 0.5,
 "bodyBorderColor": "#000000",
 "headerPaddingBottom": 10,
 "data": {
  "name": "Window21049"
 },
 "scrollBarVisible": "rollOver",
 "closeButtonIconColor": "#000000",
 "titlePaddingBottom": 5,
 "hideEffect": {
  "class": "FadeOutEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "paddingBottom": 0
},
{
 "items": [
  {
   "media": "this.panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_camera"
  },
  {
   "media": "this.panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_camera"
  },
  {
   "media": "this.panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_camera"
  },
  {
   "media": "this.panorama_A060534A_AB47_530E_41DC_BA65238B3835",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A060534A_AB47_530E_41DC_BA65238B3835_camera"
  },
  {
   "media": "this.panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_camera"
  },
  {
   "media": "this.panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_camera"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "hfovMin": "207%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "yaw": -3.89,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 29.69,
   "panorama": "this.panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2"
  },
  {
   "yaw": 97.17,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -48.29,
   "panorama": "this.panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2"
  },
  {
   "yaw": -81.64,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -1.06,
   "panorama": "this.panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5"
  }
 ],
 "label": "2",
 "id": "panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_BB5B9FB8_AB5F_530A_41DF_3056CDDBC49B",
  "this.overlay_A4616790_AB5E_D31A_41DE_E97994B329E1",
  "this.overlay_A44D4A0E_AB42_DD06_41E3_63E895288841",
  "this.overlay_A4D5D28A_AB43_4D0E_41E2_9CE45970F78A"
 ],
 "vfov": 180,
 "pitch": 0,
 "partial": false,
 "thumbnailUrl": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": -42.64,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_5CE8B633_478A_71E4_41BD_90B8C3AC84F0",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -82.83,
  "class": "PanoramaCameraPosition",
  "hfov": 114,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_524DB672_478A_7E64_41C7_4818E83459B9",
 "automaticZoomSpeed": 10
},
{
 "class": "Photo",
 "height": 377,
 "thumbnailUrl": "media/photo_BACE580C_AB7D_5D0A_41DD_3B31A6C427B5_t.png",
 "label": "lightworkz_media-removebg-preview (1)",
 "id": "photo_BACE580C_AB7D_5D0A_41DD_3B31A6C427B5",
 "duration": 5000,
 "width": 661,
 "image": {
  "class": "ImageResource",
  "levels": [
   {
    "class": "ImageResourceLevel",
    "url": "media/photo_BACE580C_AB7D_5D0A_41DD_3B31A6C427B5.png"
   }
  ]
 }
},
{
 "id": "window_BACBA2BA_AB7D_CD0E_41DE_72A489EBE7F6",
 "width": 400,
 "bodyBackgroundColorDirection": "vertical",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "shadowVerticalLength": 0,
 "closeButtonBackgroundColorRatios": [],
 "headerPaddingRight": 10,
 "closeButtonPressedIconColor": "#FFFFFF",
 "horizontalAlign": "center",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "veilOpacity": 0.4,
 "headerVerticalAlign": "middle",
 "titlePaddingLeft": 5,
 "closeButtonBorderRadius": 11,
 "shadowSpread": 1,
 "minHeight": 20,
 "paddingLeft": 0,
 "titleFontSize": "1.29vmin",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "verticalAlign": "middle",
 "veilColorRatios": [
  0,
  1
 ],
 "modal": true,
 "bodyPaddingTop": 5,
 "backgroundColor": [],
 "backgroundOpacity": 1,
 "titleFontColor": "#000000",
 "minWidth": 20,
 "height": 400,
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "footerHeight": 5,
 "titleFontWeight": "normal",
 "title": "",
 "headerBackgroundColorDirection": "vertical",
 "borderSize": 0,
 "closeButtonIconHeight": 12,
 "veilColorDirection": "horizontal",
 "propagateClick": false,
 "overflow": "scroll",
 "headerBorderSize": 0,
 "veilHideEffect": {
  "class": "FadeOutEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "shadowHorizontalLength": 3,
 "headerBackgroundOpacity": 1,
 "titlePaddingTop": 5,
 "shadow": true,
 "bodyPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "scrollBarMargin": 2,
 "class": "Window",
 "veilShowEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "footerBackgroundColorDirection": "vertical",
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "children": [
  "this.image_uid5C76B5BB_478A_72E4_41B1_490F3D1E9C05_0",
  "this.htmlText_BACDE2BA_AB7D_CD0E_41D0_FD19D3C593FD"
 ],
 "titlePaddingRight": 5,
 "shadowColor": "#000000",
 "layout": "vertical",
 "showEffect": {
  "class": "FadeInEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "bodyPaddingLeft": 5,
 "paddingRight": 0,
 "titleFontStyle": "normal",
 "contentOpaque": false,
 "closeButtonIconLineWidth": 2,
 "bodyBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "shadowBlurRadius": 6,
 "titleFontFamily": "Arial",
 "scrollBarWidth": 10,
 "closeButtonIconWidth": 12,
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "bodyBackgroundOpacity": 1,
 "shadowOpacity": 0.5,
 "borderRadius": 5,
 "headerPaddingLeft": 10,
 "bodyPaddingRight": 5,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "scrollBarColor": "#000000",
 "footerBorderColor": "#000000",
 "headerPaddingTop": 10,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "paddingTop": 0,
 "titleTextDecoration": "none",
 "headerBorderColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "backgroundColorRatios": [],
 "gap": 10,
 "footerBorderSize": 0,
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarOpacity": 0.5,
 "bodyBorderColor": "#000000",
 "headerPaddingBottom": 10,
 "data": {
  "name": "Window18630"
 },
 "scrollBarVisible": "rollOver",
 "footerBackgroundOpacity": 1,
 "closeButtonIconColor": "#000000",
 "titlePaddingBottom": 5,
 "hideEffect": {
  "class": "FadeOutEffect",
  "easing": "cubic_in_out",
  "duration": 500
 },
 "paddingBottom": 0
},
{
 "initialPosition": {
  "yaw": 176.11,
  "class": "PanoramaCameraPosition",
  "hfov": 114,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_5CD5D611_478A_71A4_41C9_3F858DC07E6C",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_camera",
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "150%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "yaw": 29.69,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -3.89,
   "panorama": "this.panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E"
  },
  {
   "yaw": -17.26,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 163.63,
   "panorama": "this.panorama_A060534A_AB47_530E_41DC_BA65238B3835"
  },
  {
   "yaw": -17.26,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 163.63,
   "panorama": "this.panorama_A060534A_AB47_530E_41DC_BA65238B3835"
  },
  {
   "yaw": 161.14,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 137.36,
   "panorama": "this.panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61"
  }
 ],
 "label": "3",
 "id": "panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_BB464CFC_AB45_750B_41E3_2EB132A51DAD",
  "this.overlay_BB5001B3_AB43_4F1E_41CD_0C0A58878EED",
  "this.overlay_BBE8ECF1_AB42_B51D_41C0_B940003F0C7D",
  "this.overlay_A4B625A9_AB4F_F70A_41D4_750B2A24E888",
  "this.overlay_B9FBD148_AB47_4F0A_4189_FEDFF03B6A6E"
 ],
 "vfov": 180,
 "pitch": 0,
 "partial": false,
 "thumbnailUrl": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 98.36,
  "class": "PanoramaCameraPosition",
  "hfov": 114,
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_5CA62605_478A_71AC_41CC_E32F8FE69A7C",
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "150%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "yaw": -1.06,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": -81.64,
   "panorama": "this.panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E"
  },
  {
   "class": "AdjacentPanorama",
   "panorama": "this.panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61"
  }
 ],
 "label": "1",
 "id": "panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_A6AC5C5B_AB45_750E_41E4_BDF6FB34071F",
  "this.overlay_A5E92D80_AB5D_57FA_41E0_2936A00F6AA4"
 ],
 "vfov": 180,
 "pitch": 0,
 "partial": false,
 "thumbnailUrl": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": -18.86,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_5CB285FA_478A_7264_41CD_ED829B210571",
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "150%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "yaw": -48.29,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 97.17,
   "panorama": "this.panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E"
  }
 ],
 "label": "5",
 "id": "panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_BB10E520_AB46_B73A_41E2_001CC4F9DC49"
 ],
 "vfov": 180,
 "pitch": 0,
 "partial": false,
 "thumbnailUrl": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 178.94,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_5C8A45E3_478A_7264_41D0_83FE4F5619C0",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -1.57,
  "class": "PanoramaCameraPosition",
  "hfov": 114,
  "pitch": -13.1
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_A060534A_AB47_530E_41DC_BA65238B3835_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 0,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_camera",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -16.37,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_5CFB5627_478A_71EC_41C5_467717050FBA",
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "150%",
 "class": "Panorama",
 "adjacentPanoramas": [
  {
   "yaw": 137.36,
   "class": "AdjacentPanorama",
   "distance": 1,
   "backwardYaw": 161.14,
   "panorama": "this.panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2"
  }
 ],
 "label": "6",
 "id": "panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61",
 "hfovMax": 130,
 "overlays": [
  "this.overlay_BA446548_AB7D_F70A_41C6_958EC4FE37A7",
  "this.overlay_B8085396_AB46_D307_41D1_85B148B7B2BF"
 ],
 "vfov": 180,
 "pitch": 0,
 "partial": false,
 "thumbnailUrl": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_t.jpg",
 "frames": [
  {
   "front": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/f/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/f/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/f/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "class": "CubicPanoramaFrame",
   "top": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/u/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/u/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/u/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "thumbnailUrl": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_t.jpg",
   "back": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/b/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/b/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/b/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "bottom": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/d/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/d/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/d/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "left": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/l/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/l/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/l/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   },
   "right": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/r/0/{row}_{column}.jpg",
      "rowCount": 3,
      "class": "TiledImageResourceLevel",
      "colCount": 3,
      "width": 1536,
      "tags": "ondemand",
      "height": 1536
     },
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/r/1/{row}_{column}.jpg",
      "rowCount": 2,
      "class": "TiledImageResourceLevel",
      "colCount": 2,
      "width": 1024,
      "tags": "ondemand",
      "height": 1024
     },
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/r/2/{row}_{column}.jpg",
      "rowCount": 1,
      "class": "TiledImageResourceLevel",
      "colCount": 1,
      "width": 512,
      "tags": [
       "ondemand",
       "preload"
      ],
      "height": 512
     }
    ]
   }
  }
 ],
 "hfov": 360
},
{
 "initialPosition": {
  "yaw": 131.71,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_5C90B5D9_478A_72A5_41C9_931128002F80",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -150.31,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_5C9E95CD_478A_72BD_419E_DB1D30DFF388",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": 162.74,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_5CB9A5EE_478A_727C_41B8_87CF45E652A9",
 "automaticZoomSpeed": 10
},
{
 "initialPosition": {
  "yaw": -16.37,
  "class": "PanoramaCameraPosition",
  "pitch": 0
 },
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_in"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "easing": "linear"
   },
   {
    "yawSpeed": 7.96,
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "easing": "cubic_out"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "class": "PanoramaCamera",
 "id": "camera_5CCA261C_478A_71DC_41AF_633D07E6D392",
 "automaticZoomSpeed": 10
},
{
 "gyroscopeVerticalDraggingEnabled": true,
 "class": "PanoramaPlayer",
 "buttonCardboardView": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270"
 ],
 "buttonToggleGyroscope": "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "mouseControlMode": "drag_acceleration",
 "id": "MainViewerPanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "buttonToggleHotspots": "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "touchControlMode": "drag_rotation"
},
{
 "toolTipFontSize": 13,
 "toolTipOpacity": 0.5,
 "id": "MainViewer",
 "left": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "width": "100%",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 7,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 6,
 "minHeight": 50,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "minWidth": 100,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "height": "100%",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipShadowOpacity": 0,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": true,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Georgia",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "shadow": false,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "vrPointerSelectionTime": 2000,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBottom": 55,
 "progressHeight": 6,
 "class": "ViewerArea",
 "toolTipBackgroundColor": "#000000",
 "toolTipFontColor": "#FFFFFF",
 "playbackBarHeadShadow": true,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingRight": 0,
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "transitionMode": "blending",
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipBorderSize": 1,
 "top": 0,
 "toolTipPaddingTop": 7,
 "toolTipPaddingLeft": 10,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 10,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 5,
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "data": {
  "name": "Main Viewer"
 },
 "paddingBottom": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
 "width": 115.05,
 "layout": "absolute",
 "right": "0%",
 "children": [
  "this.Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
  "this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE"
 ],
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "top": "0%",
 "verticalAlign": "top",
 "height": 641,
 "minWidth": 1,
 "backgroundOpacity": 0,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--SETTINGS"
 },
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_0DD1BF09_1744_0507_41B3_29434E440055",
 "left": 30,
 "width": 573,
 "layout": "absolute",
 "children": [
  "this.Label_0DD14F09_1744_0507_41AA_D8475423214A",
  "this.Label_0DD1AF09_1744_0507_41B4_9F5A60B503B2"
 ],
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "top": 15,
 "verticalAlign": "top",
 "height": 133,
 "minWidth": 1,
 "backgroundOpacity": 0,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--STICKER"
 },
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
 "left": "0%",
 "children": [
  "this.Image_1B99DD00_16C4_0505_41B3_51F09727447A",
  "this.Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
  "this.IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270"
 ],
 "backgroundImageUrl": "skin/Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48.png",
 "right": "0%",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "verticalAlign": "top",
 "height": 118,
 "minWidth": 1,
 "layout": "absolute",
 "backgroundOpacity": 0.64,
 "contentOpaque": false,
 "borderRadius": 0,
 "bottom": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--MENU"
 },
 "paddingBottom": 0,
 "gap": 10,
 "shadow": false,
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_062AB830_1140_E215_41AF_6C9D65345420",
 "left": "0%",
 "children": [
  "this.Container_062A782F_1140_E20B_41AF_B3E5DE341773",
  "this.Container_062A9830_1140_E215_41A7_5F2BBE5C20E4"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "right": "0%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "minHeight": 1,
 "backgroundOpacity": 0.6,
 "bottom": "0%",
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--INFO photo"
 },
 "gap": 10,
 "shadow": false,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8",
 "left": "0%",
 "children": [
  "this.Container_23F7B7B7_0C0A_6293_4197_F931EEC6FA48",
  "this.Container_23F097B8_0C0A_629D_4176_D87C90BA32B6"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "right": "0%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "minHeight": 1,
 "backgroundOpacity": 0.6,
 "bottom": "0%",
 "click": "this.setComponentVisibility(this.Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8, false, 0, null, null, false)",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--INFO photoalbum"
 },
 "gap": 10,
 "shadow": false,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "right": "0%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "minHeight": 1,
 "backgroundOpacity": 0.6,
 "bottom": "0%",
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--PANORAMA LIST"
 },
 "gap": 10,
 "shadow": false,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "left": "0%",
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "right": "0%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "minHeight": 1,
 "backgroundOpacity": 0.6,
 "bottom": "0%",
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--LOCATION"
 },
 "gap": 10,
 "shadow": false,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "left": "0%",
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "right": "0%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "minHeight": 1,
 "backgroundOpacity": 0.6,
 "bottom": "0%",
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--FLOORPLAN"
 },
 "gap": 10,
 "shadow": false,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_2820BA13_0D5D_5B97_4192_AABC38F6F169",
 "left": "0%",
 "children": [
  "this.Container_28215A13_0D5D_5B97_4198_A7CA735E9E0A"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "right": "0%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "minHeight": 1,
 "backgroundOpacity": 0.6,
 "bottom": "0%",
 "click": "this.setComponentVisibility(this.Container_2820BA13_0D5D_5B97_4192_AABC38F6F169, true, 0, null, null, false)",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--PHOTOALBUM + text"
 },
 "gap": 10,
 "shadow": false,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "left": "0%",
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "right": "0%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "minHeight": 1,
 "backgroundOpacity": 0.6,
 "bottom": "0%",
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--PHOTOALBUM"
 },
 "gap": 10,
 "shadow": false,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC",
 "left": "0%",
 "children": [
  "this.Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
  "this.Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "right": "0%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "top": "0%",
 "verticalAlign": "top",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "minHeight": 1,
 "backgroundOpacity": 0.6,
 "bottom": "0%",
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#04A3E1",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "--REALTOR"
 },
 "gap": 10,
 "shadow": false,
 "visible": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "class": "IconButton",
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "width": 58,
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed.png",
 "minHeight": 1,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0.png",
 "verticalAlign": "middle",
 "height": 58,
 "minWidth": 1,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "class": "IconButton",
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "width": 58,
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed.png",
 "minHeight": 1,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D.png",
 "verticalAlign": "middle",
 "height": 58,
 "minWidth": 1,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "IconButton MUTE"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Arrow 06b Right-Up"
 },
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_BFC31489_AB5E_F50A_41E0_C1090E8F8026",
   "pitch": -44.73,
   "yaw": 102.54,
   "hfov": 15.85,
   "distance": 50
  }
 ],
 "id": "overlay_BF53D822_AB43_DD3E_41E2_8EC65E7D151E",
 "maps": [
  {
   "yaw": 102.54,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_1_HS_0_0_0_map.gif",
      "width": 34,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -44.73,
   "hfov": 15.85
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2, this.camera_5CB9A5EE_478A_727C_41B8_87CF45E652A9); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "data": {
  "label": "Arrow 06c"
 },
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_BC3D9010_ABC5_4D1A_41D9_035D815951D7",
   "pitch": -19.84,
   "yaw": 163.63,
   "hfov": 20.47,
   "distance": 100
  }
 ],
 "id": "overlay_B8FC3823_AB42_BD3E_41E1_AFD15D279412",
 "maps": [
  {
   "yaw": 163.63,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0_HS_2_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -19.84,
   "hfov": 20.47
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "Image",
 "id": "image_uid5C7445BA_478A_72E4_41C1_BCFC8AAF00B8_0",
 "width": "100%",
 "paddingRight": 0,
 "url": "media/photo_BACE580C_AB7D_5D0A_41DD_3B31A6C427B5.png",
 "horizontalAlign": "center",
 "minHeight": 0,
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "height": "33%",
 "minWidth": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image8018"
 },
 "paddingBottom": 0,
 "shadow": false
},
{
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "id": "htmlText_B8FF50EA_AB47_CD0E_41AF_AB690FECE63B",
 "width": "100%",
 "paddingRight": 10,
 "scrollBarWidth": 10,
 "minHeight": 0,
 "paddingLeft": 10,
 "height": "33%",
 "minWidth": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 10,
 "propagateClick": false,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\">Check our other services</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText21050"
 },
 "paddingBottom": 10,
 "shadow": false,
 "scrollBarVisible": "rollOver"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5, this.camera_5C8A45E3_478A_7264_41D0_83FE4F5619C0); this.mainPlayList.set('selectedIndex', 0)"
  }
 ],
 "data": {
  "label": "Arrow 06c Left-Up"
 },
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_BFDA547D_AB5E_F505_41E4_F66C10D02280",
   "pitch": -48.65,
   "yaw": -81.64,
   "hfov": 17.69,
   "distance": 50
  }
 ],
 "id": "overlay_BB5B9FB8_AB5F_530A_41DF_3056CDDBC49B",
 "maps": [
  {
   "yaw": -81.64,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_1_HS_0_0_0_map.gif",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -48.65,
   "hfov": 17.69
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2, this.camera_5C9E95CD_478A_72BD_419E_DB1D30DFF388); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "data": {
  "label": "Arrow 04a"
 },
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_BFDA047E_AB5E_F507_41E2_D0B2C7DEB2A6",
   "pitch": -37.39,
   "yaw": -3.89,
   "hfov": 16.35,
   "distance": 100
  }
 ],
 "id": "overlay_A4616790_AB5E_D31A_41DE_E97994B329E1",
 "maps": [
  {
   "yaw": -3.89,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_1_HS_1_0_0_map.gif",
      "width": 22,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -37.39,
   "hfov": 16.35
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2, this.camera_5C90B5D9_478A_72A5_41C9_931128002F80); this.mainPlayList.set('selectedIndex', 4)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_1_HS_2_0.png",
      "width": 346,
      "class": "ImageResourceLevel",
      "height": 379
     }
    ]
   },
   "pitch": -11.41,
   "yaw": 97.17,
   "hfov": 30.55
  }
 ],
 "id": "overlay_A44D4A0E_AB42_DD06_41E3_63E895288841",
 "maps": [
  {
   "yaw": 97.17,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 17
     }
    ]
   },
   "pitch": -11.41,
   "hfov": 30.55
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Bathroom"
 },
 "rollOverDisplay": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_1_HS_3_0.png",
      "width": 381,
      "class": "ImageResourceLevel",
      "height": 98
     }
    ]
   },
   "pitch": -30.59,
   "yaw": 98.32,
   "hfov": 29.54,
   "distance": 50
  }
 ],
 "id": "overlay_A4D5D28A_AB43_4D0E_41E2_9CE45970F78A",
 "maps": [
  {
   "yaw": 98.32,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_1_HS_3_0_map.gif",
      "width": 62,
      "class": "ImageResourceLevel",
      "height": 15
     }
    ]
   },
   "pitch": -30.59,
   "hfov": 29.54
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "Image",
 "id": "image_uid5C76B5BB_478A_72E4_41B1_490F3D1E9C05_0",
 "width": "100%",
 "paddingRight": 0,
 "url": "media/photo_BACE580C_AB7D_5D0A_41DD_3B31A6C427B5.png",
 "horizontalAlign": "center",
 "minHeight": 0,
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "height": "50%",
 "minWidth": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "scaleMode": "fit_inside",
 "data": {
  "name": "Image8019"
 },
 "paddingBottom": 0,
 "shadow": false
},
{
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "id": "htmlText_BACDE2BA_AB7D_CD0E_41D0_FD19D3C593FD",
 "width": "100%",
 "paddingRight": 10,
 "scrollBarWidth": 10,
 "minHeight": 0,
 "paddingLeft": 10,
 "height": "50%",
 "minWidth": 0,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 10,
 "propagateClick": false,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\">Elevate your business with our captivating virtual tours, showcasing your products and services in stunning 3D detail. Engage customers like never before and leave a lasting impression</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText18631"
 },
 "paddingBottom": 10,
 "shadow": false,
 "scrollBarVisible": "rollOver"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E, this.camera_5CD5D611_478A_71A4_41C9_3F858DC07E6C); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Arrow 06c Right-Up"
 },
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_BFDB447F_AB5E_F505_41C6_26BA783130D9",
   "pitch": -23.32,
   "yaw": 29.69,
   "hfov": 24.58,
   "distance": 50
  }
 ],
 "id": "overlay_BB464CFC_AB45_750B_41E3_2EB132A51DAD",
 "maps": [
  {
   "yaw": 29.69,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_1_HS_0_0_0_map.gif",
      "width": 41,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -23.32,
   "hfov": 24.58
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A060534A_AB47_530E_41DC_BA65238B3835, this.camera_5CFB5627_478A_71EC_41C5_467717050FBA); this.mainPlayList.set('selectedIndex', 3); this.mainPlayList.set('selectedIndex', 3)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_1_HS_1_0.png",
      "width": 150,
      "class": "ImageResourceLevel",
      "height": 150
     }
    ]
   },
   "pitch": 2.69,
   "yaw": -17.26,
   "hfov": 13.57
  }
 ],
 "id": "overlay_BB5001B3_AB43_4F1E_41CD_0C0A58878EED",
 "maps": [
  {
   "yaw": -17.26,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 2.69,
   "hfov": 13.57
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Kitchen"
 },
 "rollOverDisplay": true,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_1_HS_2_0.png",
      "width": 199,
      "class": "ImageResourceLevel",
      "height": 80
     }
    ]
   },
   "pitch": -7.29,
   "yaw": -16.92,
   "hfov": 17.81,
   "distance": 50
  }
 ],
 "id": "overlay_BBE8ECF1_AB42_B51D_41C0_B940003F0C7D",
 "maps": [
  {
   "yaw": -16.92,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_1_HS_2_0_map.gif",
      "width": 39,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -7.29,
   "hfov": 17.81
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61, this.camera_5CE8B633_478A_71E4_41BD_90B8C3AC84F0); this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_1_HS_3_0.png",
      "width": 138,
      "class": "ImageResourceLevel",
      "height": 129
     }
    ]
   },
   "pitch": -4.08,
   "yaw": 161.14,
   "hfov": 12.46
  }
 ],
 "id": "overlay_A4B625A9_AB4F_F70A_41D4_750B2A24E888",
 "maps": [
  {
   "yaw": 161.14,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_1_HS_3_0_0_map.gif",
      "width": 17,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -4.08,
   "hfov": 12.46
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showWindow(this.window_B8FD50EA_AB47_CD0E_41C6_6D887EBFDB2B, null, false)"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Info 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_BFDC7480_AB5E_F5FB_41C0_B495E9ECC1C0",
   "pitch": -4.4,
   "yaw": -169.33,
   "hfov": 10.32,
   "distance": 100
  }
 ],
 "id": "overlay_B9FBD148_AB47_4F0A_4189_FEDFF03B6A6E",
 "maps": [
  {
   "yaw": -169.33,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_1_HS_4_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -4.4,
   "hfov": 10.32
  }
 ]
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E, this.camera_5CA62605_478A_71AC_41CC_E32F8FE69A7C); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Arrow 04c"
 },
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_BFD9047B_AB5E_F50D_41B9_C0C07513FAD6",
   "pitch": -24.69,
   "yaw": -1.06,
   "hfov": 22.45,
   "distance": 100
  }
 ],
 "id": "overlay_A6AC5C5B_AB45_750E_41E4_BDF6FB34071F",
 "maps": [
  {
   "yaw": -1.06,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_1_HS_0_0_0_map.gif",
      "width": 38,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -24.69,
   "hfov": 22.45
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.mainPlayList.set('selectedIndex', 5)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_1_HS_1_0.png",
      "width": 296,
      "class": "ImageResourceLevel",
      "height": 260
     }
    ]
   },
   "pitch": -13.41,
   "yaw": 178.95,
   "hfov": 25.97
  }
 ],
 "id": "overlay_A5E92D80_AB5D_57FA_41E0_2936A00F6AA4",
 "maps": [
  {
   "yaw": 178.95,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_1_HS_1_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -13.41,
   "hfov": 25.97
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E, this.camera_524DB672_478A_7E64_41C7_4818E83459B9); this.mainPlayList.set('selectedIndex', 1)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_1_HS_0_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ]
   },
   "pitch": -9.32,
   "yaw": -48.29,
   "hfov": 13.41
  }
 ],
 "id": "overlay_BB10E520_AB46_B73A_41E2_001CC4F9DC49",
 "maps": [
  {
   "yaw": -48.29,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": -9.32,
   "hfov": 13.41
  }
 ],
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.showWindow(this.window_BACBA2BA_AB7D_CD0E_41DE_72A489EBE7F6, null, false)"
  }
 ],
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "data": {
  "label": "Info 01"
 },
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": "this.AnimatedImageResource_BFC5D48A_AB5E_F50E_41BC_01328CCCFB92",
   "pitch": 15.64,
   "yaw": -6.53,
   "hfov": 9.97,
   "distance": 100
  }
 ],
 "id": "overlay_BA446548_AB7D_F70A_41C6_958EC4FE37A7",
 "maps": [
  {
   "yaw": -6.53,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_1_HS_1_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 15.64,
   "hfov": 9.97
  }
 ]
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea",
   "click": "this.startPanoramaWithCamera(this.panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2, this.camera_5CB285FA_478A_7264_41CD_ED829B210571); this.mainPlayList.set('selectedIndex', 2)"
  }
 ],
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false,
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0_HS_2_0.png",
      "width": 291,
      "class": "ImageResourceLevel",
      "height": 248
     }
    ]
   },
   "pitch": 2.83,
   "yaw": 137.36,
   "hfov": 26.19
  }
 ],
 "id": "overlay_B8085396_AB46_D307_41D1_85B148B7B2BF",
 "maps": [
  {
   "yaw": 137.36,
   "class": "HotspotPanoramaOverlayMap",
   "image": {
    "class": "ImageResource",
    "levels": [
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0_HS_2_0_0_map.gif",
      "width": 18,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ]
   },
   "pitch": 2.83,
   "hfov": 26.19
  }
 ],
 "enabledInCardboard": true
},
{
 "class": "IconButton",
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "width": 58,
 "paddingRight": 0,
 "minHeight": 1,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB.png",
 "verticalAlign": "middle",
 "height": 58,
 "minWidth": 1,
 "mode": "push",
 "backgroundOpacity": 0,
 "rollOverIconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "IconButton VR"
 },
 "paddingBottom": 0,
 "shadow": false,
 "visible": false,
 "cursor": "hand"
},
{
 "class": "IconButton",
 "maxHeight": 37,
 "maxWidth": 49,
 "id": "IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270",
 "width": 100,
 "right": 30,
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270_pressed.png",
 "minHeight": 1,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270.png",
 "verticalAlign": "middle",
 "height": 75,
 "minWidth": 1,
 "mode": "push",
 "backgroundOpacity": 0,
 "bottom": 8,
 "rollOverIconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "IconButton VR"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "class": "IconButton",
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "width": 58,
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed.png",
 "minHeight": 1,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A.png",
 "verticalAlign": "middle",
 "height": 58,
 "minWidth": 1,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "IconButton GYRO"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "class": "IconButton",
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "width": 58,
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96_pressed.png",
 "minHeight": 1,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96.png",
 "verticalAlign": "middle",
 "height": 58,
 "minWidth": 1,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "IconButton HS "
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
 "width": 110,
 "layout": "horizontal",
 "right": "0%",
 "children": [
  "this.IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329"
 ],
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "top": "0%",
 "verticalAlign": "middle",
 "height": 110,
 "minWidth": 1,
 "backgroundOpacity": 0,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "button menu sup"
 },
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE",
 "children": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
  "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
  "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
  "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
  "this.IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
  "this.IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521"
 ],
 "layout": "vertical",
 "right": "0%",
 "width": "91.304%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "height": "85.959%",
 "minWidth": 1,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "bottom": "0%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": true,
 "gap": 3,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-button set"
 },
 "paddingBottom": 0,
 "shadow": false,
 "visible": false,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "fontFamily": "Bebas Neue Bold",
 "class": "Label",
 "textShadowVerticalLength": 0,
 "id": "Label_0DD14F09_1744_0507_41AA_D8475423214A",
 "left": 0,
 "width": 454,
 "textShadowColor": "#000000",
 "paddingRight": 0,
 "fontColor": "#FFFFFF",
 "text": "Envidox",
 "minHeight": 1,
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "top": 5,
 "verticalAlign": "top",
 "height": 86,
 "minWidth": 1,
 "backgroundOpacity": 0,
 "fontSize": 90,
 "textShadowBlurRadius": 10,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "fontStyle": "normal",
 "textShadowHorizontalLength": 0,
 "textShadowOpacity": 1,
 "shadow": false,
 "data": {
  "name": "text 1"
 },
 "paddingBottom": 0,
 "textDecoration": "none",
 "fontWeight": "bold"
},
{
 "fontFamily": "Bebas Neue Book",
 "class": "Label",
 "textShadowVerticalLength": 0,
 "id": "Label_0DD1AF09_1744_0507_41B4_9F5A60B503B2",
 "left": 0,
 "width": 388,
 "textShadowColor": "#000000",
 "paddingRight": 0,
 "fontColor": "#FFFFFF",
 "text": "Demo",
 "minHeight": 1,
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "textShadowBlurRadius": 10,
 "verticalAlign": "top",
 "height": 46,
 "minWidth": 1,
 "backgroundOpacity": 0,
 "fontSize": 41,
 "borderRadius": 0,
 "bottom": 0,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "fontStyle": "normal",
 "textShadowHorizontalLength": 0,
 "textShadowOpacity": 1,
 "paddingBottom": 0,
 "shadow": false,
 "data": {
  "name": "text 2"
 },
 "textDecoration": "none",
 "fontWeight": "normal"
},
{
 "class": "Image",
 "maxHeight": 2,
 "maxWidth": 3000,
 "id": "Image_1B99DD00_16C4_0505_41B3_51F09727447A",
 "left": "0%",
 "right": "0%",
 "paddingRight": 0,
 "url": "skin/Image_1B99DD00_16C4_0505_41B3_51F09727447A.png",
 "minHeight": 1,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "verticalAlign": "middle",
 "height": 2,
 "minWidth": 1,
 "backgroundOpacity": 0,
 "bottom": 53,
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "scaleMode": "fit_outside",
 "data": {
  "name": "white line"
 },
 "paddingBottom": 0,
 "shadow": false
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
 "left": "0%",
 "width": 1199,
 "layout": "horizontal",
 "children": [
  "this.Button_1B998D00_16C4_0505_41AD_67CAA4AAEFE0",
  "this.Button_1B999D00_16C4_0505_41AB_D0C2E7857448",
  "this.Button_1B9A4D00_16C4_0505_4193_E0EA69B0CBB0",
  "this.Button_1B9A5D00_16C4_0505_41B0_D18F25F377C4",
  "this.Button_1B9A3D00_16C4_0505_41B2_6830155B7D52"
 ],
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "left",
 "paddingLeft": 30,
 "verticalAlign": "middle",
 "height": 51,
 "minWidth": 1,
 "backgroundOpacity": 0,
 "contentOpaque": false,
 "borderRadius": 0,
 "bottom": "0%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": true,
 "paddingTop": 0,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "-button set container"
 },
 "paddingBottom": 0,
 "gap": 3,
 "shadow": false,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_062A782F_1140_E20B_41AF_B3E5DE341773",
 "left": "10%",
 "children": [
  "this.Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
  "this.Container_062A082F_1140_E20A_4193_DF1A4391DC79"
 ],
 "shadowColor": "#000000",
 "layout": "horizontal",
 "right": "10%",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "shadowBlurRadius": 25,
 "horizontalAlign": "left",
 "shadowSpread": 1,
 "paddingLeft": 0,
 "top": "5%",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "minWidth": 1,
 "minHeight": 1,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "bottom": "5%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "gap": 10,
 "shadow": true,
 "data": {
  "name": "Global"
 },
 "shadowHorizontalLength": 0,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_062A9830_1140_E215_41A7_5F2BBE5C20E4",
 "left": "10%",
 "children": [
  "this.IconButton_062A8830_1140_E215_419D_3439F16CCB3E"
 ],
 "layout": "vertical",
 "right": "10%",
 "paddingRight": 20,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "right",
 "paddingLeft": 0,
 "top": "5%",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minWidth": 1,
 "backgroundOpacity": 0,
 "bottom": "80%",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 20,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_23F7B7B7_0C0A_6293_4197_F931EEC6FA48",
 "left": "10%",
 "children": [
  "this.Container_23F797B7_0C0A_6293_41A7_EC89DBCDB93F",
  "this.Container_23F027B7_0C0A_6293_418E_075FCFAA8A19"
 ],
 "shadowColor": "#000000",
 "layout": "horizontal",
 "right": "10%",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "shadowBlurRadius": 25,
 "horizontalAlign": "left",
 "shadowSpread": 1,
 "paddingLeft": 0,
 "top": "5%",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "minWidth": 1,
 "minHeight": 1,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "bottom": "5%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "gap": 10,
 "shadow": true,
 "data": {
  "name": "Global"
 },
 "shadowHorizontalLength": 0,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_23F097B8_0C0A_629D_4176_D87C90BA32B6",
 "left": "10%",
 "children": [
  "this.IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA"
 ],
 "layout": "vertical",
 "right": "10%",
 "paddingRight": 20,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "right",
 "paddingLeft": 0,
 "top": "5%",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minWidth": 1,
 "backgroundOpacity": 0,
 "bottom": "80%",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 20,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "left": "15%",
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "shadowColor": "#000000",
 "layout": "vertical",
 "right": "15%",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "shadowBlurRadius": 25,
 "horizontalAlign": "center",
 "shadowSpread": 1,
 "paddingLeft": 0,
 "top": "7%",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "minWidth": 1,
 "minHeight": 1,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "bottom": "7%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "gap": 10,
 "shadow": true,
 "data": {
  "name": "Global"
 },
 "shadowHorizontalLength": 0,
 "overflow": "visible",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "left": "10%",
 "children": [
  "this.Container_221C0648_0C06_E5FD_4193_12BCE1D6DD6B",
  "this.Container_221C9648_0C06_E5FD_41A1_A79DE53B3031"
 ],
 "shadowColor": "#000000",
 "layout": "horizontal",
 "right": "10%",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "shadowBlurRadius": 25,
 "horizontalAlign": "left",
 "shadowSpread": 1,
 "paddingLeft": 0,
 "top": "5%",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "minWidth": 1,
 "minHeight": 1,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "bottom": "5%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "gap": 10,
 "shadow": true,
 "data": {
  "name": "Global"
 },
 "shadowHorizontalLength": 0,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "left": "10%",
 "children": [
  "this.IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF"
 ],
 "layout": "vertical",
 "right": "10%",
 "paddingRight": 20,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "right",
 "paddingLeft": 0,
 "top": "5%",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minWidth": 1,
 "backgroundOpacity": 0,
 "bottom": "80%",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 20,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "left": "15%",
 "children": [
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
  "this.HTMLText_B25CE068_ABC7_CD0A_41C6_990B00E49E0E"
 ],
 "shadowColor": "#000000",
 "layout": "vertical",
 "right": "15%",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "shadowBlurRadius": 25,
 "horizontalAlign": "center",
 "shadowSpread": 1,
 "paddingLeft": 0,
 "top": "7%",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "minWidth": 1,
 "minHeight": 1,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "bottom": "7%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "gap": 10,
 "shadow": true,
 "data": {
  "name": "Global"
 },
 "shadowHorizontalLength": 0,
 "overflow": "visible",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_28215A13_0D5D_5B97_4198_A7CA735E9E0A",
 "left": "15%",
 "children": [
  "this.Container_28214A13_0D5D_5B97_4193_B631E1496339",
  "this.Container_2B0BF61C_0D5B_2B90_4179_632488B1209E"
 ],
 "shadowColor": "#000000",
 "layout": "vertical",
 "right": "15%",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "shadowBlurRadius": 25,
 "horizontalAlign": "center",
 "shadowSpread": 1,
 "paddingLeft": 0,
 "top": "7%",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "minWidth": 1,
 "minHeight": 1,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "bottom": "7%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "gap": 10,
 "shadow": true,
 "data": {
  "name": "Global"
 },
 "shadowHorizontalLength": 0,
 "overflow": "visible",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "left": "15%",
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "shadowColor": "#000000",
 "layout": "vertical",
 "right": "15%",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "shadowBlurRadius": 25,
 "horizontalAlign": "center",
 "shadowSpread": 1,
 "paddingLeft": 0,
 "top": "7%",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "minWidth": 1,
 "minHeight": 1,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "bottom": "7%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "gap": 10,
 "shadow": true,
 "data": {
  "name": "Global"
 },
 "shadowHorizontalLength": 0,
 "overflow": "visible",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
 "left": "10%",
 "children": [
  "this.Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
  "this.Container_06C58BA5_1140_A63F_419D_EC83F94F8C54"
 ],
 "shadowColor": "#000000",
 "layout": "horizontal",
 "right": "10%",
 "paddingRight": 0,
 "shadowVerticalLength": 0,
 "contentOpaque": false,
 "shadowBlurRadius": 25,
 "horizontalAlign": "left",
 "shadowSpread": 1,
 "paddingLeft": 0,
 "top": "5%",
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "verticalAlign": "top",
 "minWidth": 1,
 "minHeight": 1,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "borderRadius": 0,
 "bottom": "5%",
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "gap": 10,
 "shadow": true,
 "data": {
  "name": "Global"
 },
 "shadowHorizontalLength": 0,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F",
 "left": "10%",
 "children": [
  "this.IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81"
 ],
 "layout": "vertical",
 "right": "10%",
 "paddingRight": 20,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "right",
 "paddingLeft": 0,
 "top": "5%",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minWidth": 1,
 "backgroundOpacity": 0,
 "bottom": "80%",
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 20,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container X global"
 },
 "gap": 10,
 "shadow": false,
 "paddingBottom": 0,
 "overflow": "visible",
 "scrollBarVisible": "rollOver"
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_1_HS_0_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_BFC31489_AB5E_F50A_41E0_C1090E8F8026",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 360
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_BC3D9010_ABC5_4D1A_41D9_035D815951D7",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_1_HS_0_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_BFDA547D_AB5E_F505_41E4_F66C10D02280",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_1_HS_1_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 510
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 21,
 "rowCount": 6,
 "id": "AnimatedImageResource_BFDA047E_AB5E_F507_41E2_D0B2C7DEB2A6",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_1_HS_0_0.png",
   "width": 520,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 24,
 "rowCount": 6,
 "id": "AnimatedImageResource_BFDB447F_AB5E_F505_41C6_26BA783130D9",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_1_HS_4_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "rowCount": 6,
 "id": "AnimatedImageResource_BFDC7480_AB5E_F5FB_41C0_B495E9ECC1C0",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_1_HS_0_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 300
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 21,
 "rowCount": 6,
 "id": "AnimatedImageResource_BFD9047B_AB5E_F50D_41B9_C0C07513FAD6",
 "colCount": 4
},
{
 "frameDuration": 41,
 "levels": [
  {
   "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_1_HS_1_0.png",
   "width": 460,
   "class": "ImageResourceLevel",
   "height": 690
  }
 ],
 "class": "AnimatedImageResource",
 "frameCount": 22,
 "rowCount": 6,
 "id": "AnimatedImageResource_BFC5D48A_AB5E_F50E_41BC_01328CCCFB92",
 "colCount": 4
},
{
 "class": "IconButton",
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329",
 "width": 60,
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329_pressed.png",
 "minHeight": 1,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329.png",
 "verticalAlign": "middle",
 "height": 60,
 "minWidth": 1,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "click": "if(!this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE.get('visible')){ this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, false, 0, null, null, false) }",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "image button menu"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "class": "IconButton",
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
 "width": 58,
 "paddingRight": 0,
 "minHeight": 1,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC.png",
 "verticalAlign": "middle",
 "height": 58,
 "minWidth": 1,
 "mode": "push",
 "backgroundOpacity": 0,
 "rollOverIconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.shareTwitter(window.location.href)",
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "IconButton TWITTER"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "class": "IconButton",
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521",
 "width": 58,
 "paddingRight": 0,
 "minHeight": 1,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "iconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521.png",
 "verticalAlign": "middle",
 "height": 58,
 "minWidth": 1,
 "mode": "push",
 "backgroundOpacity": 0,
 "rollOverIconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.shareFacebook(window.location.href)",
 "propagateClick": true,
 "paddingTop": 0,
 "transparencyActive": true,
 "data": {
  "name": "IconButton FB"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "iconWidth": 0,
 "class": "Button",
 "gap": 5,
 "rollOverShadow": false,
 "id": "Button_1B998D00_16C4_0505_41AD_67CAA4AAEFE0",
 "width": 120,
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "fontFamily": "Montserrat",
 "rollOverBackgroundColorRatios": [
  0.01
 ],
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "shadowBlurRadius": 15,
 "minHeight": 1,
 "horizontalAlign": "center",
 "borderColor": "#000000",
 "paddingLeft": 0,
 "verticalAlign": "middle",
 "height": 40,
 "iconBeforeLabel": true,
 "minWidth": 1,
 "mode": "push",
 "backgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 0,
 "fontSize": 12,
 "iconHeight": 0,
 "label": "VIRTUAL TOUR",
 "borderRadius": 0,
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, true, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "normal",
 "paddingBottom": 0,
 "shadow": false,
 "layout": "horizontal",
 "data": {
  "name": "Button Service Info"
 },
 "textDecoration": "none",
 "cursor": "hand",
 "fontWeight": "bold",
 "backgroundColorDirection": "vertical"
},
{
 "iconWidth": 32,
 "class": "Button",
 "gap": 5,
 "id": "Button_1B999D00_16C4_0505_41AB_D0C2E7857448",
 "width": 130,
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "fontFamily": "Montserrat",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "shadowBlurRadius": 15,
 "minHeight": 1,
 "horizontalAlign": "center",
 "borderColor": "#000000",
 "paddingLeft": 0,
 "verticalAlign": "middle",
 "height": 40,
 "iconBeforeLabel": true,
 "minWidth": 1,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "fontSize": 12,
 "iconHeight": 32,
 "label": "PANORAMA LIST",
 "borderRadius": 0,
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "normal",
 "paddingBottom": 0,
 "shadow": false,
 "layout": "horizontal",
 "data": {
  "name": "Button panorama list"
 },
 "textDecoration": "none",
 "cursor": "hand",
 "fontWeight": "bold",
 "backgroundColorDirection": "vertical"
},
{
 "iconWidth": 32,
 "class": "Button",
 "gap": 5,
 "id": "Button_1B9A4D00_16C4_0505_4193_E0EA69B0CBB0",
 "width": 103,
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "fontFamily": "Montserrat",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "shadowBlurRadius": 15,
 "minHeight": 1,
 "horizontalAlign": "center",
 "borderColor": "#000000",
 "paddingLeft": 0,
 "verticalAlign": "middle",
 "height": 40,
 "iconBeforeLabel": true,
 "minWidth": 1,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "fontSize": 12,
 "iconHeight": 32,
 "label": "SERVICES",
 "borderRadius": 0,
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, true, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "normal",
 "paddingBottom": 0,
 "shadow": false,
 "layout": "horizontal",
 "data": {
  "name": "Button floorplan"
 },
 "textDecoration": "none",
 "cursor": "hand",
 "fontWeight": "bold",
 "backgroundColorDirection": "vertical"
},
{
 "iconWidth": 32,
 "class": "Button",
 "gap": 5,
 "id": "Button_1B9A5D00_16C4_0505_41B0_D18F25F377C4",
 "width": 112,
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "fontFamily": "Montserrat",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "shadowBlurRadius": 15,
 "minHeight": 1,
 "horizontalAlign": "center",
 "borderColor": "#000000",
 "paddingLeft": 0,
 "verticalAlign": "middle",
 "height": 40,
 "iconBeforeLabel": true,
 "minWidth": 1,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "fontSize": 12,
 "iconHeight": 32,
 "label": "PHOTOALBUM",
 "borderRadius": 0,
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, true, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "normal",
 "paddingBottom": 0,
 "shadow": false,
 "layout": "horizontal",
 "data": {
  "name": "Button photoalbum"
 },
 "textDecoration": "none",
 "cursor": "hand",
 "fontWeight": "bold",
 "backgroundColorDirection": "vertical"
},
{
 "iconWidth": 32,
 "class": "Button",
 "gap": 5,
 "id": "Button_1B9A3D00_16C4_0505_41B2_6830155B7D52",
 "width": 90,
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "fontFamily": "Montserrat",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "shadowBlurRadius": 15,
 "minHeight": 1,
 "horizontalAlign": "center",
 "borderColor": "#000000",
 "paddingLeft": 0,
 "verticalAlign": "middle",
 "height": 40,
 "iconBeforeLabel": true,
 "minWidth": 1,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "backgroundOpacity": 0,
 "fontSize": 12,
 "iconHeight": 32,
 "label": "ABOUT US",
 "borderRadius": 0,
 "shadowSpread": 1,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, true, 0, null, null, false)",
 "propagateClick": true,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "normal",
 "paddingBottom": 0,
 "shadow": false,
 "layout": "horizontal",
 "data": {
  "name": "Button realtor"
 },
 "textDecoration": "none",
 "cursor": "hand",
 "fontWeight": "bold",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
 "children": [
  "this.Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "width": "85%",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "backgroundColor": [
  "#000000"
 ],
 "minWidth": 1,
 "height": "100%",
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "backgroundColorRatios": [
  0
 ],
 "data": {
  "name": "-left"
 },
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_062A082F_1140_E20A_4193_DF1A4391DC79",
 "children": [
  "this.Container_062A3830_1140_E215_4195_1698933FE51C",
  "this.Container_062A2830_1140_E215_41AA_EB25B7BD381C",
  "this.Container_062AE830_1140_E215_4180_196ED689F4BD"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "width": "50%",
 "paddingRight": 50,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "paddingLeft": 50,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 460,
 "height": "100%",
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#0069A3",
 "paddingTop": 20,
 "propagateClick": false,
 "gap": 0,
 "scrollBarOpacity": 0.51,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "-right"
 },
 "paddingBottom": 20,
 "shadow": false,
 "overflow": "visible",
 "backgroundColorDirection": "vertical"
},
{
 "class": "IconButton",
 "maxHeight": 60,
 "id": "IconButton_062A8830_1140_E215_419D_3439F16CCB3E",
 "maxWidth": 60,
 "width": "25%",
 "paddingRight": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed.jpg",
 "minHeight": 50,
 "iconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E.jpg",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "height": "75%",
 "minWidth": 50,
 "mode": "push",
 "backgroundOpacity": 0,
 "rollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_rollover.jpg",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "paddingTop": 0,
 "propagateClick": false,
 "transparencyActive": false,
 "data": {
  "name": "X"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_23F797B7_0C0A_6293_41A7_EC89DBCDB93F",
 "children": [
  "this.ViewerAreaLabeled_23F787B7_0C0A_6293_419A_B4B58B92DAFC",
  "this.Container_23F7F7B7_0C0A_6293_4195_D6240EBAFDC0"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "width": "85%",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "backgroundColor": [
  "#000000"
 ],
 "minWidth": 1,
 "height": "100%",
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "backgroundColorRatios": [
  0
 ],
 "data": {
  "name": "-left"
 },
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_23F027B7_0C0A_6293_418E_075FCFAA8A19",
 "children": [
  "this.Container_23F017B8_0C0A_629D_41A5_DE420F5F9331",
  "this.Container_23F007B8_0C0A_629D_41A3_034CF0D91203",
  "this.Container_23F047B8_0C0A_629D_415D_F05EF8619564"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "width": "50%",
 "paddingRight": 50,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "paddingLeft": 50,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 460,
 "height": "100%",
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#0069A3",
 "paddingTop": 20,
 "propagateClick": false,
 "gap": 0,
 "scrollBarOpacity": 0.51,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "-right"
 },
 "paddingBottom": 20,
 "shadow": false,
 "overflow": "visible",
 "backgroundColorDirection": "vertical"
},
{
 "class": "IconButton",
 "maxHeight": 60,
 "id": "IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA",
 "maxWidth": 60,
 "width": "25%",
 "paddingRight": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA_pressed.jpg",
 "minHeight": 50,
 "iconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA.jpg",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "height": "75%",
 "minWidth": 50,
 "mode": "push",
 "backgroundOpacity": 0,
 "rollOverIconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA_rollover.jpg",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8, false, 0, null, null, false)",
 "paddingTop": 0,
 "propagateClick": false,
 "transparencyActive": false,
 "data": {
  "name": "X"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "children": [
  "this.HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": 140,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "header"
 },
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "selectedItemThumbnailShadowVerticalLength": 0,
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "rollOverItemThumbnailShadowColor": "#04A3E1",
 "itemMaxHeight": 1000,
 "itemLabelFontFamily": "Montserrat",
 "width": "100%",
 "horizontalAlign": "center",
 "itemBorderRadius": 0,
 "minHeight": 1,
 "selectedItemLabelFontColor": "#04A3E1",
 "selectedItemThumbnailShadowBlurRadius": 16,
 "itemLabelPosition": "bottom",
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "selectedItemLabelFontWeight": "bold",
 "verticalAlign": "middle",
 "itemHorizontalAlign": "center",
 "paddingLeft": 70,
 "backgroundColor": [
  "#000000"
 ],
 "backgroundOpacity": 0.05,
 "itemPaddingLeft": 3,
 "minWidth": 1,
 "height": "100%",
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "itemThumbnailBorderRadius": 0,
 "borderSize": 0,
 "itemWidth": 220,
 "itemBackgroundColor": [],
 "propagateClick": false,
 "itemMinHeight": 50,
 "itemBackgroundColorRatios": [],
 "itemPaddingTop": 3,
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "shadow": false,
 "itemVerticalAlign": "top",
 "itemThumbnailShadow": false,
 "scrollBarMargin": 2,
 "class": "ThumbnailGrid",
 "backgroundColorDirection": "vertical",
 "itemLabelTextDecoration": "none",
 "itemLabelFontWeight": "normal",
 "paddingRight": 70,
 "itemThumbnailHeight": 125,
 "rollOverItemThumbnailShadow": true,
 "itemMinWidth": 50,
 "itemOpacity": 1,
 "scrollBarWidth": 10,
 "itemHeight": 156,
 "itemThumbnailOpacity": 1,
 "itemLabelFontSize": 14,
 "selectedItemThumbnailShadow": true,
 "itemThumbnailScaleMode": "fit_outside",
 "itemThumbnailWidth": 220,
 "borderRadius": 5,
 "itemLabelFontColor": "#666666",
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "itemBackgroundColorDirection": "vertical",
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "scrollBarColor": "#04A3E1",
 "paddingTop": 10,
 "itemPaddingBottom": 3,
 "backgroundColorRatios": [
  0
 ],
 "gap": 26,
 "itemPaddingRight": 3,
 "data": {
  "name": "ThumbnailList"
 },
 "scrollBarVisible": "rollOver",
 "itemLabelGap": 7,
 "scrollBarOpacity": 0.5,
 "itemLabelFontStyle": "normal",
 "rollOverItemLabelFontColor": "#04A3E1",
 "paddingBottom": 70,
 "itemLabelHorizontalAlign": "center",
 "itemMaxWidth": 1000,
 "itemBackgroundOpacity": 0,
 "itemMode": "normal"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_221C0648_0C06_E5FD_4193_12BCE1D6DD6B",
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "width": "85%",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "backgroundColor": [
  "#000000"
 ],
 "minWidth": 1,
 "height": "100%",
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "backgroundColorRatios": [
  0
 ],
 "data": {
  "name": "-left"
 },
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_221C9648_0C06_E5FD_41A1_A79DE53B3031",
 "children": [
  "this.Container_221C8648_0C06_E5FD_41A0_8247B2B7DEB0",
  "this.Container_221B7648_0C06_E5FD_418B_12E57BBFD8EC",
  "this.Container_221B4648_0C06_E5FD_4194_30EDC4E7D1B6"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "width": "15%",
 "paddingRight": 50,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "paddingLeft": 50,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 400,
 "height": "100%",
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#0069A3",
 "paddingTop": 20,
 "propagateClick": false,
 "gap": 0,
 "scrollBarOpacity": 0.51,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "-right"
 },
 "paddingBottom": 20,
 "shadow": false,
 "overflow": "visible",
 "backgroundColorDirection": "vertical"
},
{
 "class": "IconButton",
 "maxHeight": 60,
 "id": "IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF",
 "maxWidth": 60,
 "width": "25%",
 "paddingRight": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed.jpg",
 "minHeight": 50,
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.jpg",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "height": "75%",
 "minWidth": 50,
 "mode": "push",
 "backgroundOpacity": 0,
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.jpg",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "paddingTop": 0,
 "propagateClick": false,
 "transparencyActive": false,
 "data": {
  "name": "X"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "children": [
  "this.HTMLText_2F8A4686_0D4F_6B71_4183_10C1696E2923",
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
  "this.Container_B06B0CB5_ABC2_D51A_41B7_8074ED1B7A65"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": 140,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "header"
 },
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "id": "HTMLText_B25CE068_ABC7_CD0A_41C6_990B00E49E0E",
 "width": "38.932%",
 "shadowColor": "#000000",
 "shadowVerticalLength": 3,
 "paddingRight": 20,
 "shadowBlurRadius": 7,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "paddingLeft": 18,
 "backgroundColor": [
  "#000000"
 ],
 "shadowSpread": 1,
 "minWidth": 1,
 "height": "22.886%",
 "backgroundOpacity": 0.81,
 "shadowOpacity": 0.45,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "scrollBarVisible": "rollOver",
 "propagateClick": false,
 "paddingTop": 20,
 "backgroundColorRatios": [
  0
 ],
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:20px;\"><B>Website building</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:33px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:12px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#cccccc;font-size:14px;font-family:Tahoma, Geneva, sans-serif;\">Website development is the process of creating and designing websites for the internet. It involves various tasks such as web design, coding, content creation, and website maintenance. Website development aims to deliver a user-friendly, visually appealing, and functional website that meets the specific needs and goals of businesses or individuals. It encompasses both the technical aspects of website building and the strategic planning to ensure an effective online presence.</SPAN></SPAN></DIV></div>",
 "shadowHorizontalLength": 0,
 "paddingBottom": 20,
 "shadow": true,
 "data": {
  "name": "HTMLText53815"
 },
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_28214A13_0D5D_5B97_4193_B631E1496339",
 "children": [
  "this.HTMLText_28217A13_0D5D_5B97_419A_F894ECABEB04",
  "this.IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": 140,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "header"
 },
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_2B0BF61C_0D5B_2B90_4179_632488B1209E",
 "children": [
  "this.ViewerAreaLabeled_281D2361_0D5F_E9B0_41A1_A1F237F85FD7",
  "this.IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D",
  "this.IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": "100%",
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container photo"
 },
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "visible",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": "100%",
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container photo"
 },
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "visible",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
 "children": [
  "this.Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "width": "55%",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "backgroundColor": [
  "#000000"
 ],
 "minWidth": 1,
 "height": "100%",
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "backgroundColorRatios": [
  0
 ],
 "data": {
  "name": "-left"
 },
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_06C58BA5_1140_A63F_419D_EC83F94F8C54",
 "children": [
  "this.Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
  "this.Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
  "this.Container_06C42BA5_1140_A63F_4195_037A0687532F"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "width": "45%",
 "paddingRight": 60,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "paddingLeft": 60,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 460,
 "height": "100%",
 "backgroundOpacity": 1,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#0069A3",
 "paddingTop": 20,
 "propagateClick": false,
 "gap": 0,
 "scrollBarOpacity": 0.51,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "-right"
 },
 "paddingBottom": 20,
 "shadow": false,
 "overflow": "visible",
 "backgroundColorDirection": "vertical"
},
{
 "class": "IconButton",
 "maxHeight": 60,
 "id": "IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81",
 "maxWidth": 60,
 "width": "25%",
 "paddingRight": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_pressed.jpg",
 "minHeight": 50,
 "iconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81.jpg",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "height": "75%",
 "minWidth": 50,
 "mode": "push",
 "backgroundOpacity": 0,
 "rollOverIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_rollover.jpg",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "paddingTop": 0,
 "propagateClick": false,
 "transparencyActive": false,
 "data": {
  "name": "X"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "class": "Image",
 "maxHeight": 1000,
 "maxWidth": 2000,
 "id": "Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A",
 "left": "0%",
 "width": "100%",
 "paddingRight": 0,
 "url": "skin/Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A.jpg",
 "minHeight": 1,
 "horizontalAlign": "center",
 "top": "0%",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "height": "100%",
 "minWidth": 1,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "scaleMode": "fit_outside",
 "data": {
  "name": "Image"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_062A3830_1140_E215_4195_1698933FE51C",
 "width": "100%",
 "scrollBarVisible": "rollOver",
 "layout": "horizontal",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 0,
 "horizontalAlign": "right",
 "paddingLeft": 0,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": 60,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "propagateClick": false,
 "gap": 0,
 "scrollBarOpacity": 0.5,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container space"
 },
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_062A2830_1140_E215_41AA_EB25B7BD381C",
 "children": [
  "this.HTMLText_062AD830_1140_E215_41B0_321699661E7F",
  "this.Button_062AF830_1140_E215_418D_D2FC11B12C47"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 520,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 100,
 "height": "100%",
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#E73B2C",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.79,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container text"
 },
 "paddingBottom": 30,
 "shadow": false,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_062AE830_1140_E215_4180_196ED689F4BD",
 "width": 370,
 "scrollBarVisible": "rollOver",
 "layout": "horizontal",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": 40,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "paddingBottom": 0,
 "gap": 10,
 "shadow": false,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "toolTipFontSize": 12,
 "toolTipOpacity": 1,
 "id": "ViewerAreaLabeled_23F787B7_0C0A_6293_419A_B4B58B92DAFC",
 "left": 0,
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "right": 0,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 6,
 "toolTipShadowColor": "#333333",
 "minHeight": 1,
 "paddingLeft": 0,
 "playbackBarBorderRadius": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "minWidth": 1,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipShadowOpacity": 1,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "shadow": false,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBottom": 2,
 "progressHeight": 6,
 "class": "ViewerArea",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "playbackBarHeadShadow": true,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingRight": 0,
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "transitionMode": "blending",
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipBorderSize": 1,
 "top": 0,
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "bottom": 0,
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "playbackBarHeadOpacity": 1,
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#FFFFFF",
 "playbackBarBottom": 0,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "data": {
  "name": "Viewer info 1"
 },
 "paddingBottom": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_23F7F7B7_0C0A_6293_4195_D6240EBAFDC0",
 "left": "0%",
 "children": [
  "this.IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD",
  "this.Container_23F7D7B7_0C0A_6293_4195_312C9CAEABE4",
  "this.IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4"
 ],
 "layout": "horizontal",
 "width": "100%",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "left",
 "top": "0%",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "height": "100%",
 "minWidth": 1,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container arrows"
 },
 "shadow": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_23F017B8_0C0A_629D_41A5_DE420F5F9331",
 "width": "100%",
 "scrollBarVisible": "rollOver",
 "layout": "horizontal",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 0,
 "horizontalAlign": "right",
 "paddingLeft": 0,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": 60,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "propagateClick": false,
 "gap": 0,
 "scrollBarOpacity": 0.5,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container space"
 },
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_23F007B8_0C0A_629D_41A3_034CF0D91203",
 "children": [
  "this.HTMLText_23F067B8_0C0A_629D_41A9_1A1C797BB055",
  "this.Button_23F057B8_0C0A_629D_41A2_CD6BDCDB0145"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 520,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 100,
 "height": "100%",
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#E73B2C",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.79,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container text"
 },
 "paddingBottom": 30,
 "shadow": false,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_23F047B8_0C0A_629D_415D_F05EF8619564",
 "width": 370,
 "scrollBarVisible": "rollOver",
 "layout": "horizontal",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": 40,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "paddingBottom": 0,
 "gap": 10,
 "shadow": false,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "id": "HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
 "left": "0%",
 "width": "77.115%",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 100,
 "top": "0%",
 "paddingLeft": 80,
 "height": "100%",
 "minWidth": 1,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.21vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.21vh;font-family:'Bebas Neue Bold';\">Panorama list:</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 },
 "shadow": false,
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver"
},
{
 "class": "IconButton",
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "right": 20,
 "width": "100%",
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "minHeight": 50,
 "horizontalAlign": "right",
 "top": 20,
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "height": "36.14%",
 "minWidth": 50,
 "mode": "push",
 "backgroundOpacity": 0,
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "paddingTop": 0,
 "propagateClick": false,
 "transparencyActive": false,
 "data": {
  "name": "IconButton X"
 },
 "shadow": false,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "class": "WebFrame",
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
 "left": "0%",
 "insetBorder": false,
 "right": "0%",
 "paddingRight": 0,
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14377.55330038866!2d-73.99492968084243!3d40.75084469078082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9f775f259%3A0x999668d0d7c3fd7d!2s400+5th+Ave%2C+New+York%2C+NY+10018!5e0!3m2!1ses!2sus!4v1467271743182\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen>",
 "paddingLeft": 0,
 "scrollEnabled": true,
 "top": "0%",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "minWidth": 1,
 "minHeight": 1,
 "backgroundOpacity": 1,
 "bottom": "0%",
 "borderRadius": 0,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "data": {
  "name": "WebFrame48191"
 },
 "shadow": false,
 "paddingBottom": 0,
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_221C8648_0C06_E5FD_41A0_8247B2B7DEB0",
 "width": "100%",
 "scrollBarVisible": "rollOver",
 "layout": "horizontal",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 0,
 "horizontalAlign": "right",
 "paddingLeft": 0,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": 60,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "propagateClick": false,
 "gap": 0,
 "scrollBarOpacity": 0.5,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container space"
 },
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_221B7648_0C06_E5FD_418B_12E57BBFD8EC",
 "children": [
  "this.HTMLText_221B6648_0C06_E5FD_41A0_77851DC2C548",
  "this.Button_221B5648_0C06_E5FD_4198_40C786948FF0"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 520,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 100,
 "height": "100%",
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#E73B2C",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.79,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container text"
 },
 "paddingBottom": 30,
 "shadow": false,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_221B4648_0C06_E5FD_4194_30EDC4E7D1B6",
 "width": 370,
 "scrollBarVisible": "rollOver",
 "layout": "horizontal",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": 40,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "paddingBottom": 0,
 "gap": 10,
 "shadow": false,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "id": "HTMLText_2F8A4686_0D4F_6B71_4183_10C1696E2923",
 "left": "0%",
 "width": "77.115%",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 100,
 "top": "0%",
 "paddingLeft": 80,
 "height": "100%",
 "minWidth": 1,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.21vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.21vh;font-family:'Bebas Neue Bold';\">Other Services:</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 },
 "shadow": false,
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver"
},
{
 "class": "IconButton",
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "right": 20,
 "width": "100%",
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg",
 "minHeight": 50,
 "horizontalAlign": "right",
 "top": 20,
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.jpg",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "height": "36.14%",
 "minWidth": 50,
 "mode": "push",
 "backgroundOpacity": 0,
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.jpg",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "paddingTop": 0,
 "propagateClick": false,
 "transparencyActive": false,
 "data": {
  "name": "IconButton X"
 },
 "shadow": false,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_B06B0CB5_ABC2_D51A_41B7_8074ED1B7A65",
 "left": "8.88%",
 "width": "22.422%",
 "scrollBarVisible": "rollOver",
 "layout": "absolute",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "left",
 "top": "0%",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": "100%",
 "backgroundOpacity": 0.3,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container33852"
 },
 "shadow": false,
 "paddingBottom": 0,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "id": "HTMLText_28217A13_0D5D_5B97_419A_F894ECABEB04",
 "left": "0%",
 "width": "77.115%",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 100,
 "top": "0%",
 "paddingLeft": 80,
 "height": "100%",
 "minWidth": 1,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.21vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.21vh;font-family:'Bebas Neue Bold';\">PHOTOALBUM:</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 },
 "shadow": false,
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver"
},
{
 "class": "IconButton",
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3",
 "right": 20,
 "width": "100%",
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3_pressed.jpg",
 "minHeight": 50,
 "horizontalAlign": "right",
 "top": 20,
 "iconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3.jpg",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "height": "36.14%",
 "minWidth": 50,
 "mode": "push",
 "backgroundOpacity": 0,
 "rollOverIconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3_rollover.jpg",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_2820BA13_0D5D_5B97_4192_AABC38F6F169, false, 0, null, null, false)",
 "paddingTop": 0,
 "propagateClick": false,
 "transparencyActive": false,
 "data": {
  "name": "IconButton X"
 },
 "shadow": false,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "toolTipFontSize": 12,
 "toolTipOpacity": 1,
 "id": "ViewerAreaLabeled_281D2361_0D5F_E9B0_41A1_A1F237F85FD7",
 "left": "0%",
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "width": "100%",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 6,
 "minHeight": 1,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "minWidth": 1,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "height": "100%",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipShadowOpacity": 1,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "shadow": false,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBottom": 2,
 "progressHeight": 6,
 "class": "ViewerArea",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "playbackBarHeadShadow": true,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingRight": 0,
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "transitionMode": "blending",
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipBorderSize": 1,
 "top": "0%",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "data": {
  "name": "Viewer photoalbum + text 1"
 },
 "paddingBottom": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical"
},
{
 "class": "IconButton",
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D",
 "left": 10,
 "width": "14.22%",
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D_pressed.png",
 "minHeight": 50,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "top": "20%",
 "iconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D.png",
 "verticalAlign": "middle",
 "minWidth": 50,
 "mode": "push",
 "backgroundOpacity": 0,
 "bottom": "20%",
 "rollOverIconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "transparencyActive": false,
 "data": {
  "name": "IconButton <"
 },
 "shadow": false,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "class": "IconButton",
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14",
 "right": 10,
 "width": "14.22%",
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14_pressed.png",
 "minHeight": 50,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "top": "20%",
 "iconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14.png",
 "verticalAlign": "middle",
 "minWidth": 50,
 "mode": "push",
 "backgroundOpacity": 0,
 "bottom": "20%",
 "rollOverIconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "transparencyActive": false,
 "data": {
  "name": "IconButton >"
 },
 "shadow": false,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "toolTipFontSize": 12,
 "toolTipOpacity": 1,
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "left": "0%",
 "playbackBarHeight": 10,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipShadowBlurRadius": 3,
 "playbackBarRight": 0,
 "width": "100%",
 "toolTipTextShadowBlurRadius": 3,
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderSize": 0,
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 6,
 "minHeight": 1,
 "toolTipShadowColor": "#333333",
 "playbackBarBorderRadius": 0,
 "paddingLeft": 0,
 "playbackBarHeadBorderRadius": 0,
 "transitionDuration": 500,
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderColor": "#000000",
 "minWidth": 1,
 "toolTipFontStyle": "normal",
 "progressLeft": 0,
 "height": "100%",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "toolTipShadowOpacity": 1,
 "borderSize": 0,
 "playbackBarBorderSize": 0,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "toolTipFontFamily": "Arial",
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "toolTipShadowHorizontalLength": 0,
 "shadow": false,
 "progressRight": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "toolTipShadowVerticalLength": 0,
 "vrPointerSelectionTime": 2000,
 "progressBarBackgroundColorDirection": "vertical",
 "playbackBarHeadShadowHorizontalLength": 0,
 "progressBottom": 2,
 "progressHeight": 6,
 "class": "ViewerArea",
 "toolTipBackgroundColor": "#F6F6F6",
 "toolTipFontColor": "#606060",
 "playbackBarHeadShadow": true,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "paddingRight": 0,
 "progressBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "transitionMode": "blending",
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "toolTipBorderSize": 1,
 "top": "0%",
 "toolTipPaddingTop": 4,
 "toolTipPaddingLeft": 6,
 "progressBorderRadius": 0,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarLeft": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "playbackBarHeadHeight": 15,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#FFFFFF",
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipBorderColor": "#767676",
 "data": {
  "name": "Viewer photoalbum 1"
 },
 "paddingBottom": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical"
},
{
 "class": "IconButton",
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "left": 10,
 "width": "14.22%",
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "minHeight": 50,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "top": "20%",
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "verticalAlign": "middle",
 "minWidth": 50,
 "mode": "push",
 "backgroundOpacity": 0,
 "bottom": "20%",
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "transparencyActive": false,
 "data": {
  "name": "IconButton <"
 },
 "shadow": false,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "class": "IconButton",
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "right": 10,
 "width": "14.22%",
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "minHeight": 50,
 "horizontalAlign": "center",
 "paddingLeft": 0,
 "top": "20%",
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "verticalAlign": "middle",
 "minWidth": 50,
 "mode": "push",
 "backgroundOpacity": 0,
 "bottom": "20%",
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "transparencyActive": false,
 "data": {
  "name": "IconButton >"
 },
 "shadow": false,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "class": "IconButton",
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "right": 20,
 "width": "10%",
 "paddingRight": 0,
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.jpg",
 "minHeight": 50,
 "horizontalAlign": "right",
 "top": 20,
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.jpg",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "height": "10%",
 "minWidth": 50,
 "mode": "push",
 "backgroundOpacity": 0,
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.jpg",
 "borderRadius": 0,
 "borderSize": 0,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "paddingTop": 0,
 "propagateClick": false,
 "transparencyActive": false,
 "data": {
  "name": "IconButton X"
 },
 "shadow": false,
 "paddingBottom": 0,
 "cursor": "hand"
},
{
 "class": "Image",
 "maxHeight": 1000,
 "maxWidth": 2000,
 "id": "Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397",
 "left": "0%",
 "width": "100%",
 "paddingRight": 0,
 "url": "skin/Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397.jpg",
 "minHeight": 1,
 "horizontalAlign": "center",
 "top": "0%",
 "verticalAlign": "bottom",
 "paddingLeft": 0,
 "height": "100%",
 "minWidth": 1,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "scaleMode": "fit_outside",
 "data": {
  "name": "Image"
 },
 "shadow": false,
 "paddingBottom": 0
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
 "width": "100%",
 "scrollBarVisible": "rollOver",
 "layout": "horizontal",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 0,
 "horizontalAlign": "right",
 "paddingLeft": 0,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": 60,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "propagateClick": false,
 "gap": 0,
 "scrollBarOpacity": 0.5,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container space"
 },
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
 "children": [
  "this.HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
  "this.Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "vertical",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 520,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 100,
 "height": "100%",
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#E73B2C",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.79,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "Container text"
 },
 "paddingBottom": 30,
 "shadow": false,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_06C42BA5_1140_A63F_4195_037A0687532F",
 "width": 370,
 "scrollBarVisible": "rollOver",
 "layout": "horizontal",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "left",
 "paddingLeft": 0,
 "verticalAlign": "top",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": 40,
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container space"
 },
 "paddingBottom": 0,
 "gap": 10,
 "shadow": false,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "id": "HTMLText_062AD830_1140_E215_41B0_321699661E7F",
 "width": "100%",
 "paddingRight": 10,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "paddingLeft": 10,
 "height": "100%",
 "minWidth": 1,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#04A3E1",
 "paddingTop": 0,
 "propagateClick": false,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.67vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.66vh;font-family:'Bebas Neue Bold';\">Virtual tour</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.33vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:2.75vh;font-family:'Bebas Neue Bold';\">Elevate your business with our captivating virtual tours, showcasing your products and services in stunning 3D detail. Engage customers like never before and leave a lasting impression.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#333333;font-size:1.74vh;font-family:'Roboto Slab ExtraLight';\"><B>Step into a world of immersive experiences with our captivating virtual tours. Our expert team utilizes cutting-edge technology to create stunning virtual tours that allow your audience to explore and engage with spaces like never before. Whether it's showcasing real estate properties, event venues, or travel destinations, our virtual tours provide an interactive and realistic experience that captivates and entices viewers. Let us transport your audience to a new dimension and leave a lasting impression with our exceptional virtual tour services.</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText"
 },
 "paddingBottom": 20,
 "shadow": false,
 "scrollBarVisible": "rollOver"
},
{
 "iconWidth": 32,
 "class": "Button",
 "id": "Button_062AF830_1140_E215_418D_D2FC11B12C47",
 "width": "46%",
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 1,
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "fontFamily": "Bebas Neue Bold",
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "paddingLeft": 0,
 "backgroundColor": [
  "#04A3E1"
 ],
 "minWidth": 1,
 "mode": "push",
 "height": "9%",
 "backgroundOpacity": 0.7,
 "fontSize": "3vh",
 "iconHeight": 32,
 "label": "Learn more",
 "borderRadius": 0,
 "borderColor": "#000000",
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 5,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0
 ],
 "fontStyle": "normal",
 "paddingBottom": 0,
 "shadow": false,
 "layout": "horizontal",
 "data": {
  "name": "Button"
 },
 "textDecoration": "none",
 "cursor": "hand",
 "shadowSpread": 1,
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "class": "IconButton",
 "maxHeight": 150,
 "id": "IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD",
 "maxWidth": 150,
 "width": "12%",
 "paddingRight": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD_pressed.png",
 "minHeight": 70,
 "iconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD.png",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "height": "8%",
 "minWidth": 70,
 "mode": "push",
 "backgroundOpacity": 0,
 "rollOverIconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "transparencyActive": true,
 "data": {
  "name": "IconButton <"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_23F7D7B7_0C0A_6293_4195_312C9CAEABE4",
 "width": "80%",
 "layout": "absolute",
 "paddingRight": 0,
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "height": "30%",
 "minWidth": 1,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "data": {
  "name": "Container separator"
 },
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "scroll",
 "scrollBarVisible": "rollOver"
},
{
 "class": "IconButton",
 "maxHeight": 150,
 "id": "IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4",
 "maxWidth": 150,
 "width": "12%",
 "paddingRight": 0,
 "horizontalAlign": "center",
 "pressedIconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4_pressed.png",
 "minHeight": 70,
 "iconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4.png",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "height": "8%",
 "minWidth": 70,
 "mode": "push",
 "backgroundOpacity": 0,
 "rollOverIconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4_rollover.png",
 "borderRadius": 0,
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "transparencyActive": true,
 "data": {
  "name": "IconButton >"
 },
 "paddingBottom": 0,
 "shadow": false,
 "cursor": "hand"
},
{
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "id": "HTMLText_23F067B8_0C0A_629D_41A9_1A1C797BB055",
 "width": "100%",
 "paddingRight": 10,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "paddingLeft": 10,
 "height": "100%",
 "minWidth": 1,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#04A3E1",
 "paddingTop": 0,
 "propagateClick": false,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.67vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.66vh;font-family:'Bebas Neue Bold';\">More of our immersive works</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.33vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.33vh;font-family:'Bebas Neue Bold';\">consectetur adipiscing elit. Morbi bibendum pharetra lorem, accumsan san nulla.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Integer gravida dui quis euismod placerat. Maecenas quis accumsan ipsum. Aliquam gravida velit at dolor mollis, quis luctus mauris vulputate. Proin condimentum id nunc sed sollicitudin.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.46vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.46vh;font-family:'Bebas Neue Bold';\"><B>Donec feugiat:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\"> \u2022 Nisl nec mi sollicitudin facilisis </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\"> \u2022 Nam sed faucibus est.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\"> \u2022 Ut eget lorem sed leo.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\"> \u2022 Sollicitudin tempor sit amet non urna. </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\"> \u2022 Aliquam feugiat mauris sit amet.</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText"
 },
 "paddingBottom": 20,
 "shadow": false,
 "scrollBarVisible": "rollOver"
},
{
 "iconWidth": 32,
 "class": "Button",
 "id": "Button_23F057B8_0C0A_629D_41A2_CD6BDCDB0145",
 "width": "46%",
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 1,
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "fontFamily": "Bebas Neue Bold",
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "horizontalAlign": "center",
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "paddingLeft": 0,
 "backgroundColor": [
  "#04A3E1"
 ],
 "minWidth": 1,
 "mode": "push",
 "height": "9%",
 "backgroundOpacity": 0.7,
 "fontSize": "3vh",
 "iconHeight": 32,
 "label": "lorem ipsum",
 "borderRadius": 0,
 "borderColor": "#000000",
 "borderSize": 0,
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 5,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1,
 "backgroundColorRatios": [
  0
 ],
 "fontStyle": "normal",
 "paddingBottom": 0,
 "shadow": false,
 "layout": "horizontal",
 "data": {
  "name": "Button"
 },
 "textDecoration": "none",
 "cursor": "hand",
 "shadowSpread": 1,
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "id": "HTMLText_221B6648_0C06_E5FD_41A0_77851DC2C548",
 "width": "100%",
 "paddingRight": 10,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "paddingLeft": 10,
 "height": "100%",
 "minWidth": 1,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#04A3E1",
 "paddingTop": 0,
 "propagateClick": false,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.67vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.66vh;font-family:'Bebas Neue Bold';\">location</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.74vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.33vh;font-family:'Bebas Neue Bold';\">address line 1</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.33vh;font-family:'Bebas Neue Bold';\">address line 2</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:5.21vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac.</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText"
 },
 "paddingBottom": 20,
 "shadow": false,
 "scrollBarVisible": "rollOver"
},
{
 "iconWidth": 32,
 "class": "Button",
 "id": "Button_221B5648_0C06_E5FD_4198_40C786948FF0",
 "width": 207,
 "shadowColor": "#000000",
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 1,
 "pressedBackgroundColorRatios": [
  0
 ],
 "paddingRight": 0,
 "fontFamily": "Bebas Neue Bold",
 "shadowBlurRadius": 6,
 "minHeight": 1,
 "horizontalAlign": "center",
 "borderColor": "#000000",
 "paddingLeft": 0,
 "verticalAlign": "middle",
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#04A3E1"
 ],
 "minWidth": 1,
 "mode": "push",
 "height": 59,
 "backgroundOpacity": 0.7,
 "fontSize": 34,
 "iconHeight": 32,
 "label": "lorem ipsum",
 "borderRadius": 0,
 "shadowSpread": 1,
 "borderSize": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "backgroundColorRatios": [
  0
 ],
 "pressedBackgroundColor": [
  "#000000"
 ],
 "pressedBackgroundOpacity": 1,
 "fontStyle": "normal",
 "paddingBottom": 0,
 "gap": 5,
 "shadow": false,
 "layout": "horizontal",
 "visible": false,
 "data": {
  "name": "Button"
 },
 "textDecoration": "none",
 "cursor": "hand",
 "fontWeight": "normal",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "id": "HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "paddingLeft": 0,
 "height": "45%",
 "minWidth": 1,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#04A3E1",
 "paddingTop": 0,
 "propagateClick": false,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.67vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.08vh;font-family:'Bebas Neue Bold';\">ENVIDOX</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.08vh;font-family:'Bebas Neue Bold';\">SOLUTIONS</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText18899"
 },
 "paddingBottom": 10,
 "shadow": false,
 "scrollBarVisible": "rollOver"
},
{
 "scrollBarMargin": 2,
 "class": "Container",
 "id": "Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C",
 "children": [
  "this.HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE"
 ],
 "scrollBarVisible": "rollOver",
 "layout": "horizontal",
 "width": "100%",
 "paddingRight": 0,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "horizontalAlign": "left",
 "verticalAlign": "top",
 "paddingLeft": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "minWidth": 1,
 "height": "80%",
 "backgroundOpacity": 0.3,
 "contentOpaque": false,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "propagateClick": false,
 "gap": 10,
 "scrollBarOpacity": 0.5,
 "backgroundColorRatios": [
  0,
  1
 ],
 "data": {
  "name": "- content"
 },
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "scroll",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "class": "HTMLText",
 "id": "HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE",
 "width": "75%",
 "paddingRight": 10,
 "scrollBarWidth": 10,
 "minHeight": 1,
 "paddingLeft": 10,
 "height": "100%",
 "minWidth": 1,
 "backgroundOpacity": 0,
 "borderRadius": 0,
 "borderSize": 0,
 "scrollBarColor": "#04A3E1",
 "paddingTop": 0,
 "propagateClick": false,
 "scrollBarOpacity": 0.5,
 "html": "<div style=\"text-align:left; color:#000; \"><p STYLE=\"margin:0; line-height:3.33vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.74vh;font-family:'Bebas Neue Bold';\">Ashwath L</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.74vh;font-family:'Bebas Neue Bold';\">Tlf.: +91 8098339571</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.74vh;font-family:'Bebas Neue Bold';\">Sreejith R</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.74vh;font-family:'Bebas Neue Bold';\">Tlf.: +91 8838190703</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.74vh;font-family:'Bebas Neue Bold';\">Mithun S</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.74vh;font-family:'Bebas Neue Bold';\">Tlf.: +91 6382088440</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.74vh;font-family:'Bebas Neue Bold';\">lightworkzmedia@gmail.com</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.74vh;font-family:'Bebas Neue Bold';\">https://lightworkz-solutions.github.io/</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:0.87vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.74vh;font-family:'Bahnschrift SemiBold';\">Envidox Solutions is a top-notch digital service company specializing in immersive AR/VR experiences. </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.74vh;font-family:'Bahnschrift SemiBold';\">\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009\u0009Our expertise lies in AR/VR development, web development, 3D design, architectural visualization, and virtual tours. With a strong focus on delivering exceptional digital experiences, we leverage the power of cutting-edge AR/VR technology to create captivating and engaging solutions for diverse industries. Our talented team of experts is dedicated to pushing the boundaries of innovation and providing our clients with seamless and immersive digital experiences that leave a lasting impact. Partner with us to unlock the full potential of AR/VR and transform your digital presence</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText19460"
 },
 "paddingBottom": 10,
 "shadow": false,
 "scrollBarVisible": "rollOver"
}],
 "scrollBarColor": "#000000",
 "desktopMipmappingEnabled": false,
 "paddingTop": 0,
 "propagateClick": true,
 "gap": 10,
 "mouseWheelEnabled": true,
 "backgroundPreloadEnabled": true,
 "scrollBarOpacity": 0.5,
 "mobileMipmappingEnabled": false,
 "data": {
  "name": "Player468"
 },
 "paddingBottom": 0,
 "shadow": false,
 "overflow": "visible",
 "vrPolyfillScale": 0.5
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
