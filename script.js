(function(){
    var script = {
 "scrollBarMargin": 2,
 "data": {
  "name": "Player468"
 },
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
 "id": "rootPlayer",
 "buttonToggleMute": "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "width": "100%",
 "mobileMipmappingEnabled": false,
 "defaultVRPointer": "laser",
 "borderSize": 0,
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0].forEach(function(component) { component.set('visible', false); }) }",
 "paddingRight": 0,
 "buttonToggleFullscreen": "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "paddingLeft": 0,
 "class": "Player",
 "verticalAlign": "top",
 "contentOpaque": false,
 "scripts": {
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } return this.playGlobalAudio(audio, endCallback); },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "unregisterKey": function(key){  delete window[key]; },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "setOverlayBehaviour": function(overlay, media, action){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 2000); }; if(window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "getPlayListWithMedia": function(media, onlySelected){  var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) return playList; } return undefined; },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "existsKey": function(key){  return key in window; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "registerKey": function(key, value){  window[key] = value; },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "getKey": function(key){  return window[key]; },
  "keepComponentVisibility": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; var mediaDispatcherByParam = mediaDispatcher != undefined; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = mediaDispatcher ? this.getPlayListWithMedia(mediaDispatcher, true) : undefined; if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } if(player != itemDispatcher.get('player') || !mediaDispatcherByParam){ item.bind('begin', onBeginFunction, self); } this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } }
 },
 "minHeight": 20,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "downloadEnabled": false,
 "borderRadius": 0,
 "minWidth": 20,
 "height": "100%",
 "propagateClick": true,
 "gap": 10,
 "definitions": [{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -12.2,
  "pitch": -8.13,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "150%",
 "hfov": 360,
 "label": "1",
 "id": "panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5",
 "thumbnailUrl": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E",
   "yaw": -1.06,
   "backwardYaw": -81.64,
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_A6AC5C5B_AB45_750E_41E4_BDF6FB34071F",
  "this.overlay_A5E92D80_AB5D_57FA_41E0_2936A00F6AA4"
 ],
 "partial": false
},
{
 "hfovMin": "150%",
 "hfov": 360,
 "label": "2",
 "id": "panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E",
 "thumbnailUrl": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2",
   "yaw": 97.17,
   "backwardYaw": -48.29,
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5",
   "yaw": -81.64,
   "backwardYaw": -1.06,
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2",
   "yaw": -3.89,
   "backwardYaw": 29.69,
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_BB5B9FB8_AB5F_530A_41DF_3056CDDBC49B",
  "this.overlay_A4616790_AB5E_D31A_41DE_E97994B329E1",
  "this.overlay_A44D4A0E_AB42_DD06_41E3_63E895288841",
  "this.overlay_A4D5D28A_AB43_4D0E_41E2_9CE45970F78A"
 ],
 "partial": false
},
{
 "items": [
  {
   "media": "this.panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5",
   "camera": "this.panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E",
   "camera": "this.panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2",
   "camera": "this.panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A060534A_AB47_530E_41DC_BA65238B3835",
   "camera": "this.panorama_A060534A_AB47_530E_41DC_BA65238B3835_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2",
   "camera": "this.panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61",
   "camera": "this.panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')"
  }
 ],
 "id": "mainPlayList",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 162.74,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_89D47FDC_ABCD_530B_41DB_A0672200CE85",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -18.86,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_89B74FBD_ABCD_530A_417D_FC31D4FE6DB6",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "150%",
 "hfov": 360,
 "label": "6",
 "id": "panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61",
 "thumbnailUrl": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2",
   "yaw": 137.36,
   "backwardYaw": 161.14,
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_BA446548_AB7D_F70A_41C6_958EC4FE37A7",
  "this.overlay_B8085396_AB46_D307_41D1_85B148B7B2BF"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 98.36,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_89A4EFCD_ABCD_5305_41D9_67227BAB77B0",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "150%",
 "hfov": 360,
 "label": "4",
 "id": "panorama_A060534A_AB47_530E_41DC_BA65238B3835",
 "thumbnailUrl": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2",
   "yaw": 163.63,
   "backwardYaw": -17.26,
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E",
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_BF53D822_AB43_DD3E_41E2_8EC65E7D151E",
  "this.overlay_B8FC3823_AB42_BD3E_41E1_AFD15D279412"
 ],
 "partial": false
},
{
 "closeButtonBackgroundColorRatios": [],
 "id": "window_B8FD50EA_AB47_CD0E_41C6_6D887EBFDB2B",
 "width": 400,
 "shadowSpread": 1,
 "headerPaddingRight": 10,
 "titlePaddingLeft": 5,
 "horizontalAlign": "center",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "headerVerticalAlign": "middle",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "closeButtonBorderRadius": 11,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "bodyBackgroundColorDirection": "vertical",
 "verticalAlign": "middle",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "minHeight": 20,
 "modal": true,
 "bodyPaddingTop": 5,
 "titleFontSize": "1.29vmin",
 "veilColorRatios": [
  0,
  1
 ],
 "height": 400,
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "titleFontColor": "#000000",
 "title": "",
 "backgroundColor": [],
 "veilColorDirection": "horizontal",
 "minWidth": 20,
 "closeButtonPressedIconColor": "#FFFFFF",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "propagateClick": false,
 "titleFontWeight": "normal",
 "headerBackgroundColorDirection": "vertical",
 "headerBorderSize": 0,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "veilOpacity": 0.4,
 "overflow": "scroll",
 "headerBackgroundOpacity": 1,
 "shadowVerticalLength": 0,
 "titlePaddingTop": 5,
 "shadow": true,
 "footerHeight": 5,
 "bodyPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "scrollBarMargin": 2,
 "footerBackgroundColorDirection": "vertical",
 "shadowHorizontalLength": 3,
 "children": [
  "this.image_uid8A259EFB_ABCD_550D_41C4_191C5714DFE8_0",
  "this.htmlText_B8FF50EA_AB47_CD0E_41AF_AB690FECE63B",
  {
   "backgroundColorDirection": "vertical",
   "insetBorder": false,
   "width": "100%",
   "borderSize": 0,
   "scrollEnabled": true,
   "paddingRight": 0,
   "paddingLeft": 0,
   "backgroundOpacity": 1,
   "class": "WebFrame",
   "url": "https://www.instagram.com/reel/CrtPzKhO6WL/?utm_source=ig_web_copy_link&igshid=MzRlODBiNWFlZA==",
   "borderRadius": 0,
   "backgroundColor": [],
   "minHeight": 0,
   "backgroundColorRatios": [],
   "minWidth": 0,
   "height": "33%",
   "propagateClick": false,
   "paddingTop": 0,
   "data": {
    "name": "WebFrame21774"
   },
   "paddingBottom": 0,
   "shadow": false
  }
 ],
 "titlePaddingRight": 5,
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "shadowBlurRadius": 6,
 "bodyPaddingLeft": 5,
 "shadowColor": "#000000",
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "closeButtonIconLineWidth": 2,
 "borderSize": 0,
 "paddingRight": 0,
 "bodyBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "class": "Window",
 "titleFontStyle": "normal",
 "contentOpaque": false,
 "shadowOpacity": 0.5,
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "titleFontFamily": "Arial",
 "borderRadius": 5,
 "scrollBarWidth": 10,
 "bodyBackgroundOpacity": 1,
 "closeButtonIconWidth": 12,
 "backgroundColorRatios": [],
 "headerPaddingLeft": 10,
 "bodyPaddingRight": 5,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "headerPaddingTop": 10,
 "gap": 10,
 "headerBorderColor": "#000000",
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "paddingTop": 0,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "titleTextDecoration": "none",
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "headerPaddingBottom": 10,
 "bodyBorderColor": "#000000",
 "layout": "vertical",
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarOpacity": 0.5,
 "closeButtonIconColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "scrollBarVisible": "rollOver",
 "closeButtonIconHeight": 12,
 "data": {
  "name": "Window21049"
 },
 "titlePaddingBottom": 5
},
{
 "buttonToggleHotspots": "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "buttonToggleGyroscope": "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "touchControlMode": "drag_rotation",
 "class": "PanoramaPlayer",
 "buttonCardboardView": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270"
 ],
 "mouseControlMode": "drag_acceleration",
 "id": "MainViewerPanoramaPlayer",
 "viewerArea": "this.MainViewer",
 "displayPlaybackBar": true,
 "gyroscopeVerticalDraggingEnabled": true
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 176.11,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_8A708F51_ABCD_531D_41DB_1894C1D8BF68",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -42.64,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_8A472F3A_ABCD_530E_41D8_69B0DFCCB63F",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "closeButtonBackgroundColorRatios": [],
 "id": "window_BACBA2BA_AB7D_CD0E_41DE_72A489EBE7F6",
 "width": 400,
 "shadowSpread": 1,
 "headerPaddingRight": 10,
 "titlePaddingLeft": 5,
 "horizontalAlign": "center",
 "headerBackgroundColorRatios": [
  0,
  0.1,
  1
 ],
 "headerVerticalAlign": "middle",
 "veilColor": [
  "#000000",
  "#000000"
 ],
 "closeButtonBorderRadius": 11,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "bodyBackgroundColorDirection": "vertical",
 "verticalAlign": "middle",
 "closeButtonRollOverBackgroundColorRatios": [
  0
 ],
 "minHeight": 20,
 "modal": true,
 "bodyPaddingTop": 5,
 "titleFontSize": "1.29vmin",
 "veilColorRatios": [
  0,
  1
 ],
 "height": 400,
 "closeButtonRollOverBackgroundColor": [
  "#C13535"
 ],
 "titleFontColor": "#000000",
 "title": "",
 "backgroundColor": [],
 "veilColorDirection": "horizontal",
 "minWidth": 20,
 "closeButtonPressedIconColor": "#FFFFFF",
 "showEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "propagateClick": false,
 "titleFontWeight": "normal",
 "headerBackgroundColorDirection": "vertical",
 "headerBorderSize": 0,
 "veilHideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "veilOpacity": 0.4,
 "overflow": "scroll",
 "headerBackgroundOpacity": 1,
 "shadowVerticalLength": 0,
 "titlePaddingTop": 5,
 "shadow": true,
 "footerHeight": 5,
 "bodyPaddingBottom": 5,
 "backgroundColorDirection": "vertical",
 "footerBackgroundColor": [
  "#FFFFFF",
  "#EEEEEE",
  "#DDDDDD"
 ],
 "scrollBarMargin": 2,
 "footerBackgroundColorDirection": "vertical",
 "shadowHorizontalLength": 3,
 "children": [
  "this.image_uid8A277EFC_ABCD_550B_41E5_6A0C8610B026_0",
  "this.htmlText_BACDE2BA_AB7D_CD0E_41D0_FD19D3C593FD"
 ],
 "titlePaddingRight": 5,
 "veilShowEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeInEffect"
 },
 "shadowBlurRadius": 6,
 "bodyPaddingLeft": 5,
 "shadowColor": "#000000",
 "closeButtonPressedBackgroundColorRatios": [
  0
 ],
 "closeButtonIconLineWidth": 2,
 "borderSize": 0,
 "paddingRight": 0,
 "bodyBorderSize": 0,
 "closeButtonBackgroundColor": [],
 "class": "Window",
 "titleFontStyle": "normal",
 "contentOpaque": false,
 "shadowOpacity": 0.5,
 "footerBackgroundColorRatios": [
  0,
  0.9,
  1
 ],
 "titleFontFamily": "Arial",
 "borderRadius": 5,
 "scrollBarWidth": 10,
 "bodyBackgroundOpacity": 1,
 "closeButtonIconWidth": 12,
 "backgroundColorRatios": [],
 "headerPaddingLeft": 10,
 "bodyPaddingRight": 5,
 "bodyBackgroundColor": [
  "#FFFFFF",
  "#DDDDDD",
  "#FFFFFF"
 ],
 "headerPaddingTop": 10,
 "gap": 10,
 "headerBorderColor": "#000000",
 "closeButtonPressedBackgroundColor": [
  "#3A1D1F"
 ],
 "hideEffect": {
  "duration": 500,
  "easing": "cubic_in_out",
  "class": "FadeOutEffect"
 },
 "paddingTop": 0,
 "footerBackgroundOpacity": 1,
 "headerBackgroundColor": [
  "#DDDDDD",
  "#EEEEEE",
  "#FFFFFF"
 ],
 "footerBorderSize": 0,
 "titleTextDecoration": "none",
 "scrollBarColor": "#000000",
 "paddingBottom": 0,
 "headerPaddingBottom": 10,
 "bodyBorderColor": "#000000",
 "layout": "vertical",
 "closeButtonRollOverIconColor": "#FFFFFF",
 "scrollBarOpacity": 0.5,
 "closeButtonIconColor": "#000000",
 "bodyBackgroundColorRatios": [
  0,
  0.5,
  1
 ],
 "scrollBarVisible": "rollOver",
 "closeButtonIconHeight": 12,
 "data": {
  "name": "Window18630"
 },
 "titlePaddingBottom": 5,
 "footerBorderColor": "#000000"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "items": [
  {
   "media": "this.panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5",
   "camera": "this.panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E",
   "camera": "this.panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2",
   "camera": "this.panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A060534A_AB47_530E_41DC_BA65238B3835",
   "camera": "this.panorama_A060534A_AB47_530E_41DC_BA65238B3835_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2",
   "camera": "this.panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer"
  },
  {
   "media": "this.panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61",
   "camera": "this.panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_camera",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 5, 0)",
   "player": "this.MainViewerPanoramaPlayer"
  }
 ],
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "class": "PlayList"
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -16.37,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_8A677F78_ABCD_530B_41DC_A81D920725A8",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 178.94,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_898EEF98_ABCD_530B_41B7_8268D64CBC56",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -150.31,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_89BB0FA9_ABCD_530A_41D1_4DC00093D6E0",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "150%",
 "hfov": 360,
 "label": "3",
 "id": "panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2",
 "thumbnailUrl": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61",
   "yaw": 161.14,
   "backwardYaw": 137.36,
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E",
   "yaw": 29.69,
   "backwardYaw": -3.89,
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_A060534A_AB47_530E_41DC_BA65238B3835",
   "yaw": -17.26,
   "backwardYaw": 163.63,
   "distance": 1,
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_A060534A_AB47_530E_41DC_BA65238B3835",
   "yaw": -17.26,
   "backwardYaw": 163.63,
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_BB464CFC_AB45_750B_41E3_2EB132A51DAD",
  "this.overlay_BB5001B3_AB43_4F1E_41CD_0C0A58878EED",
  "this.overlay_BBE8ECF1_AB42_B51D_41C0_B940003F0C7D",
  "this.overlay_A4B625A9_AB4F_F70A_41D4_750B2A24E888",
  "this.overlay_B9FBD148_AB47_4F0A_4189_FEDFF03B6A6E"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -16.37,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_8A6C9F65_ABCD_5305_41C8_5271F3B537C7",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_A060534A_AB47_530E_41DC_BA65238B3835_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "hfovMin": "150%",
 "hfov": 360,
 "label": "5",
 "id": "panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2",
 "thumbnailUrl": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_t.jpg",
 "pitch": 0,
 "hfovMax": 130,
 "frames": [
  {
   "front": {
    "levels": [
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/f/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/f/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/f/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "top": {
    "levels": [
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/u/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/u/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/u/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/r/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/r/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/r/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "class": "CubicPanoramaFrame",
   "back": {
    "levels": [
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/b/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/b/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/b/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/d/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/d/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/d/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/l/0/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1536,
      "colCount": 3,
      "rowCount": 3,
      "height": 1536
     },
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/l/1/{row}_{column}.jpg",
      "tags": "ondemand",
      "class": "TiledImageResourceLevel",
      "width": 1024,
      "colCount": 2,
      "rowCount": 2,
      "height": 1024
     },
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_0/l/2/{row}_{column}.jpg",
      "tags": [
       "ondemand",
       "preload"
      ],
      "class": "TiledImageResourceLevel",
      "width": 512,
      "colCount": 1,
      "rowCount": 1,
      "height": 512
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_t.jpg"
  }
 ],
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E",
   "yaw": -48.29,
   "backwardYaw": 97.17,
   "distance": 1,
   "class": "AdjacentPanorama"
  }
 ],
 "vfov": 180,
 "class": "Panorama",
 "overlays": [
  "this.overlay_BB10E520_AB46_B73A_41E2_001CC4F9DC49"
 ],
 "partial": false
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 0,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_camera",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": 131.71,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_8993BF89_ABCD_530A_41E5_137CA9D1D43F",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "class": "PanoramaCamera",
 "initialPosition": {
  "yaw": -82.83,
  "pitch": 0,
  "class": "PanoramaCameraPosition"
 },
 "id": "camera_8A4D1F23_ABCD_533E_41D6_A33D03AFFC56",
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "movements": [
   {
    "yawSpeed": 7.96,
    "easing": "cubic_in",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "linear",
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement"
   },
   {
    "yawSpeed": 7.96,
    "easing": "cubic_out",
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement"
   }
  ],
  "restartMovementOnUserInteraction": false
 },
 "automaticZoomSpeed": 10
},
{
 "duration": 5000,
 "class": "Photo",
 "label": "lightworkz_media-removebg-preview (1)",
 "id": "photo_BACE580C_AB7D_5D0A_41DD_3B31A6C427B5",
 "thumbnailUrl": "media/photo_BACE580C_AB7D_5D0A_41DD_3B31A6C427B5_t.png",
 "width": 661,
 "image": {
  "levels": [
   {
    "url": "media/photo_BACE580C_AB7D_5D0A_41DD_3B31A6C427B5.png",
    "class": "ImageResourceLevel"
   }
  ],
  "class": "ImageResource"
 },
 "height": 377
},
{
 "playbackBarHeadWidth": 6,
 "playbackBarHeight": 10,
 "id": "MainViewer",
 "left": 0,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "width": "100%",
 "progressBarBorderSize": 6,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "paddingLeft": 0,
 "minHeight": 50,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 0,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "minWidth": 100,
 "toolTipFontFamily": "Georgia",
 "playbackBarProgressOpacity": 1,
 "height": "100%",
 "propagateClick": true,
 "toolTipTextShadowOpacity": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#000000",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "toolTipFontColor": "#FFFFFF",
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "shadow": false,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "progressBottom": 55,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 10,
 "borderSize": 0,
 "toolTipBorderSize": 1,
 "paddingRight": 0,
 "toolTipPaddingLeft": 10,
 "toolTipPaddingTop": 7,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "class": "ViewerArea",
 "vrPointerColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "progressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "top": 0,
 "progressBorderRadius": 0,
 "playbackBarHeadHeight": 15,
 "transitionDuration": 500,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
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
 "playbackBarHeadShadowVerticalLength": 0,
 "paddingBottom": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 0.5,
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": 13,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipPaddingBottom": 7,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipBorderColor": "#767676",
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "data": {
  "name": "Main Viewer"
 },
 "progressBackgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "children": [
  "this.Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
  "this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE"
 ],
 "id": "Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
 "width": 115.05,
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "height": 641,
 "minHeight": 1,
 "top": "0%",
 "minWidth": 1,
 "propagateClick": true,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "--SETTINGS"
 }
},
{
 "scrollBarMargin": 2,
 "children": [
  "this.Label_0DD14F09_1744_0507_41AA_D8475423214A",
  "this.Label_0DD1AF09_1744_0507_41B4_9F5A60B503B2"
 ],
 "id": "Container_0DD1BF09_1744_0507_41B3_29434E440055",
 "left": 30,
 "width": 573,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": 15,
 "borderRadius": 0,
 "height": 133,
 "minHeight": 1,
 "minWidth": 1,
 "propagateClick": true,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "visible",
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "--STICKER"
 }
},
{
 "scrollBarMargin": 2,
 "children": [
  "this.Image_1B99DD00_16C4_0505_41B3_51F09727447A",
  "this.Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
  "this.IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270"
 ],
 "id": "Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
 "left": "0%",
 "backgroundImageUrl": "skin/Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48.png",
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.64,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "borderRadius": 0,
 "height": 118,
 "minHeight": 1,
 "minWidth": 1,
 "horizontalAlign": "left",
 "bottom": 0,
 "propagateClick": true,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "paddingTop": 0,
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "--MENU"
 }
},
{
 "scrollBarMargin": 2,
 "shadow": false,
 "children": [
  "this.Container_062A782F_1140_E20B_41AF_B3E5DE341773",
  "this.Container_062A9830_1140_E215_41A7_5F2BBE5C20E4"
 ],
 "id": "Container_062AB830_1140_E215_41AF_6C9D65345420",
 "left": "0%",
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.6,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "0%",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "backgroundColorDirection": "vertical",
 "data": {
  "name": "--INFO photo"
 }
},
{
 "scrollBarMargin": 2,
 "shadow": false,
 "children": [
  "this.Container_23F7B7B7_0C0A_6293_4197_F931EEC6FA48",
  "this.Container_23F097B8_0C0A_629D_4176_D87C90BA32B6"
 ],
 "id": "Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8",
 "left": "0%",
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.6,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "0%",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8, false, 0, null, null, false)",
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "backgroundColorDirection": "vertical",
 "data": {
  "name": "--INFO photoalbum"
 }
},
{
 "scrollBarMargin": 2,
 "shadow": false,
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "left": "0%",
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.6,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "0%",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "backgroundColorDirection": "vertical",
 "data": {
  "name": "--PANORAMA LIST"
 }
},
{
 "scrollBarMargin": 2,
 "shadow": false,
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "left": "0%",
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.6,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "0%",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "backgroundColorDirection": "vertical",
 "data": {
  "name": "--LOCATION"
 }
},
{
 "scrollBarMargin": 2,
 "shadow": false,
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "left": "0%",
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.6,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "0%",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "backgroundColorDirection": "vertical",
 "data": {
  "name": "--FLOORPLAN"
 }
},
{
 "scrollBarMargin": 2,
 "shadow": false,
 "children": [
  "this.Container_28215A13_0D5D_5B97_4198_A7CA735E9E0A"
 ],
 "id": "Container_2820BA13_0D5D_5B97_4192_AABC38F6F169",
 "left": "0%",
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.6,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "0%",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_2820BA13_0D5D_5B97_4192_AABC38F6F169, true, 0, null, null, false)",
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "backgroundColorDirection": "vertical",
 "data": {
  "name": "--PHOTOALBUM + text"
 }
},
{
 "scrollBarMargin": 2,
 "shadow": false,
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "left": "0%",
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.6,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "0%",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "backgroundColorDirection": "vertical",
 "data": {
  "name": "--PHOTOALBUM"
 }
},
{
 "scrollBarMargin": 2,
 "shadow": false,
 "children": [
  "this.Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
  "this.Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F"
 ],
 "id": "Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC",
 "left": "0%",
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.6,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "0%",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "bottom": "0%",
 "creationPolicy": "inAdvance",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "propagateClick": true,
 "gap": 10,
 "scrollBarColor": "#04A3E1",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "backgroundColorDirection": "vertical",
 "data": {
  "name": "--REALTOR"
 }
},
{
 "maxWidth": 58,
 "id": "IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "maxHeight": 58,
 "width": 58,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "pressedIconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed.png",
 "minHeight": 1,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "height": 58,
 "transparencyActive": true,
 "mode": "toggle",
 "minWidth": 1,
 "propagateClick": true,
 "iconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton MUTE"
 },
 "cursor": "hand",
 "shadow": false
},
{
 "maxWidth": 58,
 "id": "IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "maxHeight": 58,
 "width": 58,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "pressedIconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed.png",
 "minHeight": 1,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "height": 58,
 "transparencyActive": true,
 "mode": "toggle",
 "minWidth": 1,
 "propagateClick": true,
 "iconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "cursor": "hand",
 "shadow": false
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E, this.camera_89A4EFCD_ABCD_5305_41D9_67227BAB77B0); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 04c"
 },
 "maps": [
  {
   "hfov": 22.45,
   "yaw": -1.06,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_1_HS_0_0_0_map.gif",
      "width": 38,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -24.69,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 22.45,
   "image": "this.AnimatedImageResource_BFD9047B_AB5E_F50D_41B9_C0C07513FAD6",
   "pitch": -24.69,
   "yaw": -1.06,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A6AC5C5B_AB45_750E_41E4_BDF6FB34071F",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 25.97,
   "yaw": 178.95,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_1_HS_1_0_0_map.gif",
      "width": 18,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.41,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 25.97,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_1_HS_1_0.png",
      "width": 296,
      "height": 260,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 178.95,
   "pitch": -13.41
  }
 ],
 "id": "overlay_A5E92D80_AB5D_57FA_41E0_2936A00F6AA4",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5, this.camera_898EEF98_ABCD_530B_41B7_8268D64CBC56); this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06c Left-Up"
 },
 "maps": [
  {
   "hfov": 17.69,
   "yaw": -81.64,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_1_HS_0_0_0_map.gif",
      "width": 41,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -48.65,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 17.69,
   "image": "this.AnimatedImageResource_BFDA547D_AB5E_F505_41E4_F66C10D02280",
   "pitch": -48.65,
   "yaw": -81.64,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_BB5B9FB8_AB5F_530A_41DF_3056CDDBC49B",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2, this.camera_89BB0FA9_ABCD_530A_41D1_4DC00093D6E0); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 04a"
 },
 "maps": [
  {
   "hfov": 16.35,
   "yaw": -3.89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_1_HS_1_0_0_map.gif",
      "width": 22,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -37.39,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 16.35,
   "image": "this.AnimatedImageResource_BFDA047E_AB5E_F507_41E2_D0B2C7DEB2A6",
   "pitch": -37.39,
   "yaw": -3.89,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_A4616790_AB5E_D31A_41DE_E97994B329E1",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2, this.camera_8993BF89_ABCD_530A_41E5_137CA9D1D43F); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 30.55,
   "yaw": 97.17,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_1_HS_2_0_0_map.gif",
      "width": 16,
      "height": 17,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -11.41,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 30.55,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_1_HS_2_0.png",
      "width": 346,
      "height": 379,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 97.17,
   "pitch": -11.41
  }
 ],
 "id": "overlay_A44D4A0E_AB42_DD06_41E3_63E895288841",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 29.54,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_1_HS_3_0.png",
      "width": 381,
      "height": 98,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -30.59,
   "yaw": 98.32,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Bathroom"
 },
 "maps": [
  {
   "hfov": 29.54,
   "yaw": 98.32,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_1_HS_3_0_map.gif",
      "width": 62,
      "height": 15,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -30.59,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_A4D5D28A_AB43_4D0E_41E2_9CE45970F78A",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_BACBA2BA_AB7D_CD0E_41DE_72A489EBE7F6, null, false)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Info 01"
 },
 "maps": [
  {
   "hfov": 9.97,
   "yaw": -6.53,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 15.64,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 9.97,
   "image": "this.AnimatedImageResource_BFC5D48A_AB5E_F50E_41BC_01328CCCFB92",
   "pitch": 15.64,
   "yaw": -6.53,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_BA446548_AB7D_F70A_41C6_958EC4FE37A7"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2, this.camera_89B74FBD_ABCD_530A_417D_FC31D4FE6DB6); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 26.19,
   "yaw": 137.36,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0_HS_2_0_0_map.gif",
      "width": 18,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.83,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 26.19,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_0_HS_2_0.png",
      "width": 291,
      "height": 248,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 137.36,
   "pitch": 2.83
  }
 ],
 "id": "overlay_B8085396_AB46_D307_41D1_85B148B7B2BF",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06b Right-Up"
 },
 "maps": [
  {
   "hfov": 15.85,
   "yaw": 102.54,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_1_HS_0_0_0_map.gif",
      "width": 34,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -44.73,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 15.85,
   "image": "this.AnimatedImageResource_BFC31489_AB5E_F50A_41E0_C1090E8F8026",
   "pitch": -44.73,
   "yaw": 102.54,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_BF53D822_AB43_DD3E_41E2_8EC65E7D151E",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2, this.camera_89D47FDC_ABCD_530B_41DB_A0672200CE85); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06c"
 },
 "maps": [
  {
   "hfov": 20.47,
   "yaw": 163.63,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0_HS_2_0_0_map.gif",
      "width": 32,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -19.84,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 20.47,
   "image": "this.AnimatedImageResource_BC3D9010_ABC5_4D1A_41D9_035D815951D7",
   "pitch": -19.84,
   "yaw": 163.63,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B8FC3823_AB42_BD3E_41E1_AFD15D279412",
 "enabledInCardboard": true
},
{
 "id": "image_uid8A259EFB_ABCD_550D_41C4_191C5714DFE8_0",
 "width": "100%",
 "horizontalAlign": "center",
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "class": "Image",
 "url": "media/photo_BACE580C_AB7D_5D0A_41DD_3B31A6C427B5.png",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "borderRadius": 0,
 "height": "33%",
 "minHeight": 0,
 "minWidth": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "data": {
  "name": "Image38908"
 },
 "scaleMode": "fit_inside",
 "paddingBottom": 0,
 "shadow": false
},
{
 "scrollBarMargin": 2,
 "id": "htmlText_B8FF50EA_AB47_CD0E_41AF_AB690FECE63B",
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 10,
 "paddingLeft": 10,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "class": "HTMLText",
 "borderRadius": 0,
 "height": "33%",
 "minHeight": 0,
 "minWidth": 0,
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "paddingTop": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\">Check our other services</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText21050"
 },
 "scrollBarOpacity": 0.5,
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver",
 "shadow": false
},
{
 "maxWidth": 58,
 "id": "IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "maxHeight": 58,
 "width": 58,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "pressedIconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96_pressed.png",
 "minHeight": 1,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "height": 58,
 "transparencyActive": true,
 "mode": "toggle",
 "minWidth": 1,
 "propagateClick": true,
 "iconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton HS "
 },
 "cursor": "hand",
 "shadow": false
},
{
 "maxWidth": 58,
 "id": "IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "maxHeight": 58,
 "width": 58,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "pressedIconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed.png",
 "minHeight": 1,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "height": 58,
 "transparencyActive": true,
 "mode": "toggle",
 "minWidth": 1,
 "propagateClick": true,
 "iconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton GYRO"
 },
 "cursor": "hand",
 "shadow": false
},
{
 "maxWidth": 58,
 "id": "IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "maxHeight": 58,
 "width": 58,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "minHeight": 1,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "height": 58,
 "transparencyActive": true,
 "mode": "push",
 "minWidth": 1,
 "rollOverIconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB_rollover.png",
 "propagateClick": true,
 "iconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton VR"
 },
 "visible": false,
 "cursor": "hand",
 "shadow": false
},
{
 "maxWidth": 49,
 "id": "IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270",
 "maxHeight": 37,
 "width": 100,
 "right": 30,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "pressedIconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270_pressed.png",
 "minHeight": 1,
 "horizontalAlign": "center",
 "height": 75,
 "borderRadius": 0,
 "mode": "push",
 "transparencyActive": true,
 "minWidth": 1,
 "rollOverIconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270_rollover.png",
 "bottom": 8,
 "propagateClick": true,
 "iconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton VR"
 },
 "cursor": "hand",
 "shadow": false
},
{
 "id": "image_uid8A277EFC_ABCD_550B_41E5_6A0C8610B026_0",
 "width": "100%",
 "horizontalAlign": "center",
 "paddingRight": 0,
 "borderSize": 0,
 "backgroundOpacity": 0,
 "class": "Image",
 "url": "media/photo_BACE580C_AB7D_5D0A_41DD_3B31A6C427B5.png",
 "verticalAlign": "middle",
 "paddingLeft": 0,
 "borderRadius": 0,
 "height": "50%",
 "minHeight": 0,
 "minWidth": 0,
 "propagateClick": false,
 "paddingTop": 0,
 "data": {
  "name": "Image38909"
 },
 "scaleMode": "fit_inside",
 "paddingBottom": 0,
 "shadow": false
},
{
 "scrollBarMargin": 2,
 "id": "htmlText_BACDE2BA_AB7D_CD0E_41D0_FD19D3C593FD",
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 10,
 "paddingLeft": 10,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "class": "HTMLText",
 "borderRadius": 0,
 "height": "50%",
 "minHeight": 0,
 "minWidth": 0,
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "paddingTop": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\">Elevate your business with our captivating virtual tours, showcasing your products and services in stunning 3D detail. Engage customers like never before and leave a lasting impression</SPAN></DIV></div>",
 "data": {
  "name": "HTMLText18631"
 },
 "scrollBarOpacity": 0.5,
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver",
 "shadow": false
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E, this.camera_8A708F51_ABCD_531D_41DB_1894C1D8BF68); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Arrow 06c Right-Up"
 },
 "maps": [
  {
   "hfov": 24.58,
   "yaw": 29.69,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_1_HS_0_0_0_map.gif",
      "width": 41,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -23.32,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 24.58,
   "image": "this.AnimatedImageResource_BFDB447F_AB5E_F505_41C6_26BA783130D9",
   "pitch": -23.32,
   "yaw": 29.69,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "id": "overlay_BB464CFC_AB45_750B_41E3_2EB132A51DAD",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A060534A_AB47_530E_41DC_BA65238B3835, this.camera_8A677F78_ABCD_530B_41DC_A81D920725A8); this.mainPlayList.set('selectedIndex', 3); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 13.57,
   "yaw": -17.26,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_1_HS_1_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.69,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.57,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_1_HS_1_0.png",
      "width": 150,
      "height": 150,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -17.26,
   "pitch": 2.69
  }
 ],
 "id": "overlay_BB5001B3_AB43_4F1E_41CD_0C0A58878EED",
 "enabledInCardboard": true
},
{
 "items": [
  {
   "hfov": 17.81,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_1_HS_2_0.png",
      "width": 199,
      "height": 80,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.29,
   "yaw": -16.92,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50
  }
 ],
 "rollOverDisplay": true,
 "data": {
  "label": "Kitchen"
 },
 "maps": [
  {
   "hfov": 17.81,
   "yaw": -16.92,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_1_HS_2_0_map.gif",
      "width": 39,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.29,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "areas": [
  {
   "mapColor": "#FF0000",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "id": "overlay_BBE8ECF1_AB42_B51D_41C0_B940003F0C7D",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61, this.camera_8A472F3A_ABCD_530E_41D8_69B0DFCCB63F); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 12.46,
   "yaw": 161.14,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_1_HS_3_0_0_map.gif",
      "width": 17,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.08,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 12.46,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_1_HS_3_0.png",
      "width": 138,
      "height": 129,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": 161.14,
   "pitch": -4.08
  }
 ],
 "id": "overlay_A4B625A9_AB4F_F70A_41D4_750B2A24E888",
 "enabledInCardboard": true
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.showWindow(this.window_B8FD50EA_AB47_CD0E_41C6_6D887EBFDB2B, null, false)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Info 01"
 },
 "maps": [
  {
   "hfov": 10.32,
   "yaw": -169.33,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_1_HS_4_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -4.4,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "hfov": 10.32,
   "image": "this.AnimatedImageResource_BFDC7480_AB5E_F5FB_41C0_B495E9ECC1C0",
   "pitch": -4.4,
   "yaw": -169.33,
   "class": "HotspotPanoramaOverlayImage",
   "distance": 100
  }
 ],
 "id": "overlay_B9FBD148_AB47_4F0A_4189_FEDFF03B6A6E"
},
{
 "areas": [
  {
   "mapColor": "#FF0000",
   "click": "this.startPanoramaWithCamera(this.panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E, this.camera_8A4D1F23_ABCD_533E_41D6_A33D03AFFC56); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea"
  }
 ],
 "rollOverDisplay": false,
 "data": {
  "label": "Image"
 },
 "maps": [
  {
   "hfov": 13.41,
   "yaw": -48.29,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_1_HS_0_0_0_map.gif",
      "width": 16,
      "height": 16,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -9.32,
   "class": "HotspotPanoramaOverlayMap"
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "hfov": 13.41,
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_A061AADD_AB47_5D0A_41D5_4D2CA2B24AB2_1_HS_0_0.png",
      "width": 151,
      "height": 151,
      "class": "ImageResourceLevel"
     }
    ],
    "class": "ImageResource"
   },
   "yaw": -48.29,
   "pitch": -9.32
  }
 ],
 "id": "overlay_BB10E520_AB46_B73A_41E2_001CC4F9DC49",
 "enabledInCardboard": true
},
{
 "scrollBarMargin": 2,
 "children": [
  "this.IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329"
 ],
 "id": "Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
 "width": 110,
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "Container",
 "verticalAlign": "middle",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "height": 110,
 "minHeight": 1,
 "top": "0%",
 "minWidth": 1,
 "propagateClick": true,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "visible",
 "paddingBottom": 0,
 "layout": "horizontal",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "button menu sup"
 }
},
{
 "scrollBarMargin": 2,
 "children": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
  "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
  "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
  "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
  "this.IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
  "this.IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521"
 ],
 "id": "Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE",
 "width": "91.304%",
 "right": "0%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "height": "85.959%",
 "minHeight": 1,
 "minWidth": 1,
 "bottom": "0%",
 "propagateClick": true,
 "gap": 3,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "layout": "vertical",
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "visible": false,
 "shadow": false,
 "data": {
  "name": "-button set"
 }
},
{
 "textShadowBlurRadius": 10,
 "fontFamily": "Bebas Neue Bold",
 "id": "Label_0DD14F09_1744_0507_41AA_D8475423214A",
 "left": 0,
 "width": 454,
 "fontColor": "#FFFFFF",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "text": "LightWorkz",
 "verticalAlign": "top",
 "class": "Label",
 "horizontalAlign": "left",
 "textShadowVerticalLength": 0,
 "top": 5,
 "borderRadius": 0,
 "height": 86,
 "minHeight": 1,
 "minWidth": 1,
 "textShadowColor": "#000000",
 "propagateClick": true,
 "textShadowHorizontalLength": 0,
 "fontSize": 90,
 "paddingTop": 0,
 "fontStyle": "normal",
 "textShadowOpacity": 1,
 "textDecoration": "none",
 "paddingBottom": 0,
 "fontWeight": "bold",
 "shadow": false,
 "data": {
  "name": "text 1"
 }
},
{
 "fontFamily": "Bebas Neue Book",
 "id": "Label_0DD1AF09_1744_0507_41B4_9F5A60B503B2",
 "left": 0,
 "width": 388,
 "fontColor": "#FFFFFF",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "text": "Demo",
 "verticalAlign": "top",
 "class": "Label",
 "horizontalAlign": "left",
 "textShadowVerticalLength": 0,
 "borderRadius": 0,
 "height": 46,
 "minHeight": 1,
 "textShadowBlurRadius": 10,
 "minWidth": 1,
 "textShadowColor": "#000000",
 "bottom": 0,
 "propagateClick": true,
 "textShadowHorizontalLength": 0,
 "fontSize": 41,
 "paddingTop": 0,
 "fontStyle": "normal",
 "textShadowOpacity": 1,
 "textDecoration": "none",
 "paddingBottom": 0,
 "fontWeight": "normal",
 "shadow": false,
 "data": {
  "name": "text 2"
 }
},
{
 "maxWidth": 3000,
 "id": "Image_1B99DD00_16C4_0505_41B3_51F09727447A",
 "left": "0%",
 "maxHeight": 2,
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "Image",
 "url": "skin/Image_1B99DD00_16C4_0505_41B3_51F09727447A.png",
 "verticalAlign": "middle",
 "minHeight": 1,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "height": 2,
 "minWidth": 1,
 "bottom": 53,
 "propagateClick": true,
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "white line"
 },
 "scaleMode": "fit_outside",
 "shadow": false
},
{
 "scrollBarMargin": 2,
 "children": [
  "this.Button_1B998D00_16C4_0505_41AD_67CAA4AAEFE0",
  "this.Button_1B999D00_16C4_0505_41AB_D0C2E7857448",
  "this.Button_1B9A4D00_16C4_0505_4193_E0EA69B0CBB0",
  "this.Button_1B9A5D00_16C4_0505_41B0_D18F25F377C4",
  "this.Button_1B9A3D00_16C4_0505_41B2_6830155B7D52"
 ],
 "id": "Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
 "left": "0%",
 "width": 1199,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 30,
 "backgroundOpacity": 0,
 "class": "Container",
 "verticalAlign": "middle",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "height": 51,
 "minHeight": 1,
 "minWidth": 1,
 "bottom": "0%",
 "propagateClick": true,
 "gap": 3,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "layout": "horizontal",
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "-button set container"
 }
},
{
 "scrollBarMargin": 2,
 "shadowHorizontalLength": 0,
 "shadowVerticalLength": 0,
 "children": [
  "this.Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
  "this.Container_062A082F_1140_E20A_4193_DF1A4391DC79"
 ],
 "left": "10%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "id": "Container_062A782F_1140_E20B_41AF_B3E5DE341773",
 "right": "10%",
 "paddingRight": 0,
 "shadowColor": "#000000",
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "class": "Container",
 "contentOpaque": false,
 "minHeight": 1,
 "shadowOpacity": 0.3,
 "horizontalAlign": "left",
 "top": "5%",
 "borderRadius": 0,
 "bottom": "5%",
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "horizontal",
 "scrollBarOpacity": 0.5,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": true,
 "data": {
  "name": "Global"
 }
},
{
 "scrollBarMargin": 2,
 "children": [
  "this.IconButton_062A8830_1140_E215_419D_3439F16CCB3E"
 ],
 "id": "Container_062A9830_1140_E215_41A7_5F2BBE5C20E4",
 "left": "10%",
 "right": "10%",
 "paddingRight": 20,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "Container",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "top": "5%",
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "minWidth": 1,
 "bottom": "80%",
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "paddingTop": 20,
 "paddingBottom": 0,
 "layout": "vertical",
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "Container X global"
 }
},
{
 "scrollBarMargin": 2,
 "shadowHorizontalLength": 0,
 "shadowVerticalLength": 0,
 "children": [
  "this.Container_23F797B7_0C0A_6293_41A7_EC89DBCDB93F",
  "this.Container_23F027B7_0C0A_6293_418E_075FCFAA8A19"
 ],
 "id": "Container_23F7B7B7_0C0A_6293_4197_F931EEC6FA48",
 "left": "10%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "shadowColor": "#000000",
 "right": "10%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "shadowOpacity": 0.3,
 "horizontalAlign": "left",
 "top": "5%",
 "borderRadius": 0,
 "bottom": "5%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "horizontal",
 "scrollBarOpacity": 0.5,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": true,
 "data": {
  "name": "Global"
 }
},
{
 "scrollBarMargin": 2,
 "children": [
  "this.IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA"
 ],
 "id": "Container_23F097B8_0C0A_629D_4176_D87C90BA32B6",
 "left": "10%",
 "right": "10%",
 "paddingRight": 20,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "top": "5%",
 "borderRadius": 0,
 "minHeight": 1,
 "minWidth": 1,
 "bottom": "80%",
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "overflow": "visible",
 "paddingBottom": 0,
 "layout": "vertical",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "Container X global"
 }
},
{
 "scrollBarMargin": 2,
 "shadowHorizontalLength": 0,
 "shadowVerticalLength": 0,
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "left": "15%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "right": "15%",
 "paddingRight": 0,
 "shadowColor": "#000000",
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "class": "Container",
 "contentOpaque": false,
 "minHeight": 1,
 "shadowOpacity": 0.3,
 "horizontalAlign": "center",
 "top": "7%",
 "borderRadius": 0,
 "bottom": "7%",
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "visible",
 "paddingBottom": 0,
 "layout": "vertical",
 "scrollBarOpacity": 0.5,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": true,
 "data": {
  "name": "Global"
 }
},
{
 "scrollBarMargin": 2,
 "shadowHorizontalLength": 0,
 "shadowVerticalLength": 0,
 "children": [
  "this.Container_221C0648_0C06_E5FD_4193_12BCE1D6DD6B",
  "this.Container_221C9648_0C06_E5FD_41A1_A79DE53B3031"
 ],
 "left": "10%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "right": "10%",
 "paddingRight": 0,
 "shadowColor": "#000000",
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "class": "Container",
 "contentOpaque": false,
 "minHeight": 1,
 "shadowOpacity": 0.3,
 "horizontalAlign": "left",
 "top": "5%",
 "borderRadius": 0,
 "bottom": "5%",
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "horizontal",
 "scrollBarOpacity": 0.5,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": true,
 "data": {
  "name": "Global"
 }
},
{
 "scrollBarMargin": 2,
 "children": [
  "this.IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF"
 ],
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "left": "10%",
 "right": "10%",
 "paddingRight": 20,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "Container",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "top": "5%",
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "minWidth": 1,
 "bottom": "80%",
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "paddingTop": 20,
 "paddingBottom": 0,
 "layout": "vertical",
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "Container X global"
 }
},
{
 "scrollBarMargin": 2,
 "shadowHorizontalLength": 0,
 "shadowVerticalLength": 0,
 "children": [
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
  "this.HTMLText_B25CE068_ABC7_CD0A_41C6_990B00E49E0E"
 ],
 "left": "15%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "right": "15%",
 "paddingRight": 0,
 "shadowColor": "#000000",
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "class": "Container",
 "contentOpaque": false,
 "minHeight": 1,
 "shadowOpacity": 0.3,
 "horizontalAlign": "center",
 "top": "7%",
 "borderRadius": 0,
 "bottom": "7%",
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "visible",
 "paddingBottom": 0,
 "layout": "vertical",
 "scrollBarOpacity": 0.5,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": true,
 "data": {
  "name": "Global"
 }
},
{
 "scrollBarMargin": 2,
 "shadowHorizontalLength": 0,
 "shadowVerticalLength": 0,
 "children": [
  "this.Container_28214A13_0D5D_5B97_4193_B631E1496339",
  "this.Container_2B0BF61C_0D5B_2B90_4179_632488B1209E"
 ],
 "id": "Container_28215A13_0D5D_5B97_4198_A7CA735E9E0A",
 "left": "15%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "shadowColor": "#000000",
 "right": "15%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "shadowOpacity": 0.3,
 "horizontalAlign": "center",
 "top": "7%",
 "borderRadius": 0,
 "bottom": "7%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "visible",
 "paddingBottom": 0,
 "layout": "vertical",
 "scrollBarOpacity": 0.5,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": true,
 "data": {
  "name": "Global"
 }
},
{
 "scrollBarMargin": 2,
 "shadowHorizontalLength": 0,
 "shadowVerticalLength": 0,
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "left": "15%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "shadowColor": "#000000",
 "right": "15%",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "shadowOpacity": 0.3,
 "horizontalAlign": "center",
 "top": "7%",
 "borderRadius": 0,
 "bottom": "7%",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "visible",
 "paddingBottom": 0,
 "layout": "vertical",
 "scrollBarOpacity": 0.5,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": true,
 "data": {
  "name": "Global"
 }
},
{
 "scrollBarMargin": 2,
 "shadowHorizontalLength": 0,
 "shadowVerticalLength": 0,
 "children": [
  "this.Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
  "this.Container_06C58BA5_1140_A63F_419D_EC83F94F8C54"
 ],
 "left": "10%",
 "shadowBlurRadius": 25,
 "shadowSpread": 1,
 "id": "Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
 "right": "10%",
 "paddingRight": 0,
 "shadowColor": "#000000",
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "class": "Container",
 "contentOpaque": false,
 "minHeight": 1,
 "shadowOpacity": 0.3,
 "horizontalAlign": "left",
 "top": "5%",
 "borderRadius": 0,
 "bottom": "5%",
 "verticalAlign": "top",
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "scrollBarWidth": 10,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "horizontal",
 "scrollBarOpacity": 0.5,
 "backgroundColorDirection": "vertical",
 "scrollBarVisible": "rollOver",
 "shadow": true,
 "data": {
  "name": "Global"
 }
},
{
 "scrollBarMargin": 2,
 "children": [
  "this.IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81"
 ],
 "id": "Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F",
 "left": "10%",
 "right": "10%",
 "paddingRight": 20,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "Container",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "top": "5%",
 "borderRadius": 0,
 "minHeight": 1,
 "verticalAlign": "top",
 "minWidth": 1,
 "bottom": "80%",
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "overflow": "visible",
 "paddingTop": 20,
 "paddingBottom": 0,
 "layout": "vertical",
 "scrollBarOpacity": 0.5,
 "shadow": false,
 "scrollBarVisible": "rollOver",
 "data": {
  "name": "Container X global"
 }
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_BFD9047B_AB5E_F50D_41B9_C0C07513FAD6",
 "levels": [
  {
   "url": "media/panorama_A7FEB5DB_AB47_570E_41DA_5C8ECE51F1E5_1_HS_0_0.png",
   "width": 480,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 21
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_BFDA547D_AB5E_F505_41E4_F66C10D02280",
 "levels": [
  {
   "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_1_HS_0_0.png",
   "width": 520,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_BFDA047E_AB5E_F507_41E2_D0B2C7DEB2A6",
 "levels": [
  {
   "url": "media/panorama_A06661C4_AB47_4F7A_41DF_692304E40A8E_1_HS_1_0.png",
   "width": 480,
   "height": 510,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 21
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_BFC5D48A_AB5E_F50E_41BC_01328CCCFB92",
 "levels": [
  {
   "url": "media/panorama_A062B3A7_AB47_B306_41DE_BCEDC633FA61_1_HS_1_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 22
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_BFC31489_AB5E_F50A_41E0_C1090E8F8026",
 "levels": [
  {
   "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_1_HS_0_0.png",
   "width": 520,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_BC3D9010_ABC5_4D1A_41D9_035D815951D7",
 "levels": [
  {
   "url": "media/panorama_A060534A_AB47_530E_41DC_BA65238B3835_0_HS_2_0.png",
   "width": 480,
   "height": 360,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_BFDB447F_AB5E_F505_41C6_26BA783130D9",
 "levels": [
  {
   "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_1_HS_0_0.png",
   "width": 520,
   "height": 300,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 24
},
{
 "rowCount": 6,
 "class": "AnimatedImageResource",
 "colCount": 4,
 "frameDuration": 41,
 "id": "AnimatedImageResource_BFDC7480_AB5E_F5FB_41C0_B495E9ECC1C0",
 "levels": [
  {
   "url": "media/panorama_A061BAC1_AB47_7D7A_41DC_2514CC91EBE2_1_HS_4_0.png",
   "width": 460,
   "height": 690,
   "class": "ImageResourceLevel"
  }
 ],
 "frameCount": 22
},
{
 "maxWidth": 60,
 "id": "IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329",
 "maxHeight": 60,
 "width": 60,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "pressedIconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329_pressed.png",
 "minHeight": 1,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "height": 60,
 "transparencyActive": true,
 "mode": "toggle",
 "minWidth": 1,
 "click": "if(!this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE.get('visible')){ this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, false, 0, null, null, false) }",
 "propagateClick": true,
 "iconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "image button menu"
 },
 "cursor": "hand",
 "shadow": false
},
{
 "maxWidth": 58,
 "id": "IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
 "maxHeight": 58,
 "width": 58,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "minHeight": 1,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "height": 58,
 "transparencyActive": true,
 "mode": "push",
 "minWidth": 1,
 "rollOverIconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC_rollover.png",
 "propagateClick": true,
 "click": "this.shareTwitter(window.location.href)",
 "iconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton TWITTER"
 },
 "cursor": "hand",
 "shadow": false
},
{
 "maxWidth": 58,
 "id": "IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521",
 "maxHeight": 58,
 "width": 58,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "minHeight": 1,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "height": 58,
 "transparencyActive": true,
 "mode": "push",
 "minWidth": 1,
 "rollOverIconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521_rollover.png",
 "propagateClick": true,
 "click": "this.shareFacebook(window.location.href)",
 "iconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton FB"
 },
 "cursor": "hand",
 "shadow": false
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColorDirection": "vertical",
 "data": {
  "name": "Button Service Info"
 },
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, true, 0, null, null, false)",
 "id": "Button_1B998D00_16C4_0505_41AD_67CAA4AAEFE0",
 "shadowBlurRadius": 15,
 "width": 120,
 "fontFamily": "Montserrat",
 "paddingRight": 0,
 "borderSize": 0,
 "rollOverShadow": false,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "Button",
 "verticalAlign": "middle",
 "iconHeight": 0,
 "shadowSpread": 1,
 "rollOverBackgroundColorRatios": [
  0.01
 ],
 "horizontalAlign": "center",
 "pressedBackgroundColorRatios": [
  0
 ],
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 40,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "backgroundColor": [
  "#000000"
 ],
 "minWidth": 1,
 "backgroundColorRatios": [
  0
 ],
 "propagateClick": true,
 "label": "VIRTUAL TOUR",
 "borderColor": "#000000",
 "fontSize": 12,
 "paddingTop": 0,
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "gap": 5,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "iconWidth": 0,
 "cursor": "hand",
 "shadow": false,
 "fontWeight": "bold",
 "paddingBottom": 0
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColorDirection": "vertical",
 "data": {
  "name": "Button panorama list"
 },
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "id": "Button_1B999D00_16C4_0505_41AB_D0C2E7857448",
 "shadowBlurRadius": 15,
 "width": 130,
 "fontFamily": "Montserrat",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "Button",
 "verticalAlign": "middle",
 "iconHeight": 32,
 "shadowSpread": 1,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "horizontalAlign": "center",
 "pressedBackgroundColorRatios": [
  0
 ],
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 40,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "label": "PANORAMA LIST",
 "borderColor": "#000000",
 "fontSize": 12,
 "paddingTop": 0,
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "gap": 5,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "iconWidth": 32,
 "cursor": "hand",
 "shadow": false,
 "fontWeight": "bold",
 "paddingBottom": 0
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColorDirection": "vertical",
 "data": {
  "name": "Button floorplan"
 },
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, true, 0, null, null, false)",
 "id": "Button_1B9A4D00_16C4_0505_4193_E0EA69B0CBB0",
 "shadowBlurRadius": 15,
 "width": 103,
 "fontFamily": "Montserrat",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "Button",
 "verticalAlign": "middle",
 "iconHeight": 32,
 "shadowSpread": 1,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "horizontalAlign": "center",
 "pressedBackgroundColorRatios": [
  0
 ],
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 40,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "label": "SERVICES",
 "borderColor": "#000000",
 "fontSize": 12,
 "paddingTop": 0,
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "gap": 5,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "iconWidth": 32,
 "cursor": "hand",
 "shadow": false,
 "fontWeight": "bold",
 "paddingBottom": 0
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColorDirection": "vertical",
 "data": {
  "name": "Button photoalbum"
 },
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, true, 0, null, null, false)",
 "id": "Button_1B9A5D00_16C4_0505_41B0_D18F25F377C4",
 "shadowBlurRadius": 15,
 "width": 112,
 "fontFamily": "Montserrat",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "Button",
 "verticalAlign": "middle",
 "iconHeight": 32,
 "shadowSpread": 1,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "horizontalAlign": "center",
 "pressedBackgroundColorRatios": [
  0
 ],
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 40,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "label": "PHOTOALBUM",
 "borderColor": "#000000",
 "fontSize": 12,
 "paddingTop": 0,
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "gap": 5,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "iconWidth": 32,
 "cursor": "hand",
 "shadow": false,
 "fontWeight": "bold",
 "paddingBottom": 0
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 0.8,
 "backgroundColorDirection": "vertical",
 "data": {
  "name": "Button realtor"
 },
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, true, 0, null, null, false)",
 "id": "Button_1B9A3D00_16C4_0505_41B2_6830155B7D52",
 "shadowBlurRadius": 15,
 "width": 90,
 "fontFamily": "Montserrat",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "Button",
 "verticalAlign": "middle",
 "iconHeight": 32,
 "shadowSpread": 1,
 "rollOverBackgroundColorRatios": [
  0
 ],
 "horizontalAlign": "center",
 "pressedBackgroundColorRatios": [
  0
 ],
 "borderRadius": 0,
 "shadowColor": "#000000",
 "height": 40,
 "minHeight": 1,
 "iconBeforeLabel": true,
 "mode": "push",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "minWidth": 1,
 "backgroundColorRatios": [
  0,
  1
 ],
 "propagateClick": true,
 "label": "ABOUT US",
 "borderColor": "#000000",
 "fontSize": 12,
 "paddingTop": 0,
 "fontStyle": "normal",
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "gap": 5,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "iconWidth": 32,
 "cursor": "hand",
 "shadow": false,
 "fontWeight": "bold",
 "paddingBottom": 0
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "children": [
  "this.Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A"
 ],
 "id": "Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
 "width": "85%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "class": "Container",
 "verticalAlign": "middle",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "backgroundColor": [
  "#000000"
 ],
 "backgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "height": "100%",
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "-left"
 }
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "children": [
  "this.Container_062A3830_1140_E215_4195_1698933FE51C",
  "this.Container_062A2830_1140_E215_41AA_EB25B7BD381C",
  "this.Container_062AE830_1140_E215_4180_196ED689F4BD"
 ],
 "id": "Container_062A082F_1140_E20A_4193_DF1A4391DC79",
 "width": "50%",
 "borderSize": 0,
 "paddingRight": 50,
 "paddingLeft": 50,
 "backgroundOpacity": 1,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 460,
 "height": "100%",
 "propagateClick": false,
 "gap": 0,
 "scrollBarColor": "#0069A3",
 "paddingTop": 20,
 "overflow": "visible",
 "paddingBottom": 20,
 "layout": "vertical",
 "scrollBarOpacity": 0.51,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "-right"
 }
},
{
 "maxWidth": 60,
 "id": "IconButton_062A8830_1140_E215_419D_3439F16CCB3E",
 "maxHeight": 60,
 "width": "25%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "pressedIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed.jpg",
 "minHeight": 50,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "height": "75%",
 "transparencyActive": false,
 "mode": "push",
 "minWidth": 50,
 "rollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_rollover.jpg",
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "iconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E.jpg",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "X"
 },
 "cursor": "hand",
 "shadow": false
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "children": [
  "this.ViewerAreaLabeled_23F787B7_0C0A_6293_419A_B4B58B92DAFC",
  "this.Container_23F7F7B7_0C0A_6293_4195_D6240EBAFDC0"
 ],
 "id": "Container_23F797B7_0C0A_6293_41A7_EC89DBCDB93F",
 "width": "85%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "class": "Container",
 "verticalAlign": "middle",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "backgroundColor": [
  "#000000"
 ],
 "backgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "height": "100%",
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "-left"
 }
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "children": [
  "this.Container_23F017B8_0C0A_629D_41A5_DE420F5F9331",
  "this.Container_23F007B8_0C0A_629D_41A3_034CF0D91203",
  "this.Container_23F047B8_0C0A_629D_415D_F05EF8619564"
 ],
 "id": "Container_23F027B7_0C0A_6293_418E_075FCFAA8A19",
 "width": "50%",
 "borderSize": 0,
 "paddingRight": 50,
 "paddingLeft": 50,
 "backgroundOpacity": 1,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 460,
 "height": "100%",
 "propagateClick": false,
 "gap": 0,
 "scrollBarColor": "#0069A3",
 "paddingTop": 20,
 "overflow": "visible",
 "paddingBottom": 20,
 "layout": "vertical",
 "scrollBarOpacity": 0.51,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "-right"
 }
},
{
 "maxWidth": 60,
 "id": "IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA",
 "maxHeight": 60,
 "width": "25%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "pressedIconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA_pressed.jpg",
 "minHeight": 50,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "height": "75%",
 "transparencyActive": false,
 "mode": "push",
 "minWidth": 50,
 "rollOverIconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA_rollover.jpg",
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8, false, 0, null, null, false)",
 "iconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA.jpg",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "X"
 },
 "cursor": "hand",
 "shadow": false
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "children": [
  "this.HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "height": 140,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "header"
 }
},
{
 "rollOverItemLabelFontColor": "#04A3E1",
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "rollOverItemThumbnailShadowColor": "#04A3E1",
 "itemMaxHeight": 1000,
 "width": "100%",
 "horizontalAlign": "center",
 "itemLabelFontFamily": "Montserrat",
 "selectedItemLabelFontColor": "#04A3E1",
 "paddingLeft": 70,
 "backgroundOpacity": 0.05,
 "verticalAlign": "middle",
 "selectedItemThumbnailShadowBlurRadius": 16,
 "itemBorderRadius": 0,
 "minHeight": 1,
 "selectedItemLabelFontWeight": "bold",
 "itemHorizontalAlign": "center",
 "itemLabelPosition": "bottom",
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "backgroundColor": [
  "#000000"
 ],
 "itemThumbnailBorderRadius": 0,
 "height": "100%",
 "itemPaddingLeft": 3,
 "minWidth": 1,
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "propagateClick": false,
 "itemBackgroundColor": [],
 "itemWidth": 220,
 "itemPaddingTop": 3,
 "itemMinHeight": 50,
 "itemBackgroundColorRatios": [],
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "backgroundColorDirection": "vertical",
 "itemThumbnailShadow": false,
 "shadow": false,
 "itemVerticalAlign": "top",
 "scrollBarMargin": 2,
 "itemLabelTextDecoration": "none",
 "borderSize": 0,
 "paddingRight": 70,
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "class": "ThumbnailGrid",
 "itemLabelFontWeight": "normal",
 "itemThumbnailOpacity": 1,
 "itemLabelFontSize": 14,
 "scrollBarWidth": 10,
 "selectedItemThumbnailShadow": true,
 "rollOverItemThumbnailShadow": true,
 "itemThumbnailScaleMode": "fit_outside",
 "borderRadius": 5,
 "itemOpacity": 1,
 "itemThumbnailHeight": 125,
 "itemMinWidth": 50,
 "backgroundColorRatios": [
  0
 ],
 "itemBackgroundColorDirection": "vertical",
 "itemHeight": 156,
 "itemLabelFontColor": "#666666",
 "gap": 26,
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "scrollBarColor": "#04A3E1",
 "paddingTop": 10,
 "itemLabelGap": 7,
 "paddingBottom": 70,
 "itemThumbnailWidth": 220,
 "data": {
  "name": "ThumbnailList"
 },
 "itemLabelFontStyle": "normal",
 "itemMaxWidth": 1000,
 "itemPaddingBottom": 3,
 "scrollBarVisible": "rollOver",
 "itemLabelHorizontalAlign": "center",
 "scrollBarOpacity": 0.5,
 "selectedItemThumbnailShadowVerticalLength": 0,
 "itemBackgroundOpacity": 0,
 "itemMode": "normal",
 "itemPaddingRight": 3
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA"
 ],
 "id": "Container_221C0648_0C06_E5FD_4193_12BCE1D6DD6B",
 "width": "85%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "class": "Container",
 "verticalAlign": "middle",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "backgroundColor": [
  "#000000"
 ],
 "backgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "height": "100%",
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "-left"
 }
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "children": [
  "this.Container_221C8648_0C06_E5FD_41A0_8247B2B7DEB0",
  "this.Container_221B7648_0C06_E5FD_418B_12E57BBFD8EC",
  "this.Container_221B4648_0C06_E5FD_4194_30EDC4E7D1B6"
 ],
 "id": "Container_221C9648_0C06_E5FD_41A1_A79DE53B3031",
 "width": "15%",
 "borderSize": 0,
 "paddingRight": 50,
 "paddingLeft": 50,
 "backgroundOpacity": 1,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 400,
 "height": "100%",
 "propagateClick": false,
 "gap": 0,
 "scrollBarColor": "#0069A3",
 "paddingTop": 20,
 "overflow": "visible",
 "paddingBottom": 20,
 "layout": "vertical",
 "scrollBarOpacity": 0.51,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "-right"
 }
},
{
 "maxWidth": 60,
 "id": "IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF",
 "maxHeight": 60,
 "width": "25%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "pressedIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed.jpg",
 "minHeight": 50,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "height": "75%",
 "transparencyActive": false,
 "mode": "push",
 "minWidth": 50,
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.jpg",
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.jpg",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "X"
 },
 "cursor": "hand",
 "shadow": false
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "children": [
  "this.HTMLText_2F8A4686_0D4F_6B71_4183_10C1696E2923",
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
  "this.Container_B06B0CB5_ABC2_D51A_41B7_8074ED1B7A65"
 ],
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "height": 140,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "header"
 }
},
{
 "scrollBarMargin": 2,
 "shadowHorizontalLength": 0,
 "id": "HTMLText_B25CE068_ABC7_CD0A_41C6_990B00E49E0E",
 "shadowBlurRadius": 7,
 "shadowSpread": 1,
 "shadowVerticalLength": 3,
 "shadowColor": "#000000",
 "borderSize": 0,
 "paddingRight": 20,
 "paddingLeft": 18,
 "backgroundOpacity": 0.81,
 "class": "HTMLText",
 "width": "38.932%",
 "minHeight": 1,
 "shadowOpacity": 0.45,
 "backgroundColor": [
  "#000000"
 ],
 "borderRadius": 0,
 "backgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "scrollBarWidth": 10,
 "height": "22.886%",
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "paddingBottom": 20,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#ffffff;font-size:20px;\"><B>Website building</B></SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:33px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:12px;\"><BR STYLE=\"letter-spacing:0px;color:#000000;font-size:12px;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:justify;\"><SPAN STYLE=\"letter-spacing:0px;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#cccccc;font-size:14px;font-family:Tahoma, Geneva, sans-serif;\">Website development is the process of creating and designing websites for the internet. It involves various tasks such as web design, coding, content creation, and website maintenance. Website development aims to deliver a user-friendly, visually appealing, and functional website that meets the specific needs and goals of businesses or individuals. It encompasses both the technical aspects of website building and the strategic planning to ensure an effective online presence.</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText53815"
 },
 "scrollBarOpacity": 0.5,
 "shadow": true,
 "scrollBarVisible": "rollOver",
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "children": [
  "this.HTMLText_28217A13_0D5D_5B97_419A_F894ECABEB04",
  "this.IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3"
 ],
 "id": "Container_28214A13_0D5D_5B97_4193_B631E1496339",
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "height": 140,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "header"
 }
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "children": [
  "this.ViewerAreaLabeled_281D2361_0D5F_E9B0_41A1_A1F237F85FD7",
  "this.IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D",
  "this.IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14"
 ],
 "id": "Container_2B0BF61C_0D5B_2B90_4179_632488B1209E",
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "height": "100%",
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "visible",
 "paddingBottom": 0,
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "Container photo"
 }
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "height": "100%",
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "visible",
 "paddingBottom": 0,
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "Container photo"
 }
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "children": [
  "this.Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397"
 ],
 "id": "Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
 "width": "55%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "class": "Container",
 "verticalAlign": "middle",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "backgroundColor": [
  "#000000"
 ],
 "backgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "height": "100%",
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "-left"
 }
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "children": [
  "this.Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
  "this.Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
  "this.Container_06C42BA5_1140_A63F_4195_037A0687532F"
 ],
 "id": "Container_06C58BA5_1140_A63F_419D_EC83F94F8C54",
 "width": "45%",
 "borderSize": 0,
 "paddingRight": 60,
 "paddingLeft": 60,
 "backgroundOpacity": 1,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 460,
 "height": "100%",
 "propagateClick": false,
 "gap": 0,
 "scrollBarColor": "#0069A3",
 "paddingTop": 20,
 "overflow": "visible",
 "paddingBottom": 20,
 "layout": "vertical",
 "scrollBarOpacity": 0.51,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "-right"
 }
},
{
 "maxWidth": 60,
 "id": "IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81",
 "maxHeight": 60,
 "width": "25%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "pressedIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_pressed.jpg",
 "minHeight": 50,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "height": "75%",
 "transparencyActive": false,
 "mode": "push",
 "minWidth": 50,
 "rollOverIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_rollover.jpg",
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "iconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81.jpg",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "X"
 },
 "cursor": "hand",
 "shadow": false
},
{
 "maxWidth": 2000,
 "id": "Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A",
 "left": "0%",
 "maxHeight": 1000,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "Image",
 "url": "skin/Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A.jpg",
 "verticalAlign": "middle",
 "minHeight": 1,
 "horizontalAlign": "center",
 "top": "0%",
 "borderRadius": 0,
 "height": "100%",
 "minWidth": 1,
 "propagateClick": false,
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "Image"
 },
 "scaleMode": "fit_outside",
 "shadow": false
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_062A3830_1140_E215_4195_1698933FE51C",
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "borderRadius": 0,
 "height": 60,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "gap": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "horizontal",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "Container space"
 }
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "children": [
  "this.HTMLText_062AD830_1140_E215_41B0_321699661E7F",
  "this.Button_062AF830_1140_E215_418D_D2FC11B12C47"
 ],
 "id": "Container_062A2830_1140_E215_41AA_EB25B7BD381C",
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 520,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 100,
 "height": "100%",
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#E73B2C",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 30,
 "layout": "vertical",
 "scrollBarOpacity": 0.79,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "Container text"
 }
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_062AE830_1140_E215_4180_196ED689F4BD",
 "width": 370,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "height": 40,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "horizontal",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "Container space"
 }
},
{
 "playbackBarHeadWidth": 6,
 "playbackBarHeight": 10,
 "id": "ViewerAreaLabeled_23F787B7_0C0A_6293_419A_B4B58B92DAFC",
 "left": 0,
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "right": 0,
 "progressBarBorderSize": 6,
 "playbackBarBackgroundColorDirection": "vertical",
 "toolTipShadowColor": "#333333",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "minWidth": 1,
 "toolTipFontFamily": "Arial",
 "playbackBarProgressOpacity": 1,
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "toolTipFontColor": "#606060",
 "toolTipShadowHorizontalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "shadow": false,
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowVerticalLength": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "paddingRight": 0,
 "borderSize": 0,
 "toolTipBorderSize": 1,
 "toolTipPaddingRight": 6,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "class": "ViewerArea",
 "vrPointerColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "progressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "top": 0,
 "progressBorderRadius": 0,
 "playbackBarHeadHeight": 15,
 "transitionDuration": 500,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "bottom": 0,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "progressBarBorderColor": "#0066FF",
 "progressBackgroundColorRatios": [
  0.01
 ],
 "progressBarBackgroundColorRatios": [
  0
 ],
 "paddingTop": 0,
 "playbackBarHeadOpacity": 1,
 "playbackBarBottom": 0,
 "playbackBarHeadShadowVerticalLength": 0,
 "paddingBottom": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": 12,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipBorderColor": "#767676",
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "data": {
  "name": "Viewer info 1"
 },
 "progressBackgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "children": [
  "this.IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD",
  "this.Container_23F7D7B7_0C0A_6293_4195_312C9CAEABE4",
  "this.IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4"
 ],
 "id": "Container_23F7F7B7_0C0A_6293_4195_D6240EBAFDC0",
 "left": "0%",
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "Container",
 "verticalAlign": "middle",
 "contentOpaque": false,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "0%",
 "borderRadius": 0,
 "minHeight": 1,
 "height": "100%",
 "minWidth": 1,
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "layout": "horizontal",
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "Container arrows"
 }
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_23F017B8_0C0A_629D_41A5_DE420F5F9331",
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "borderRadius": 0,
 "height": 60,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "gap": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "horizontal",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "Container space"
 }
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "children": [
  "this.HTMLText_23F067B8_0C0A_629D_41A9_1A1C797BB055",
  "this.Button_23F057B8_0C0A_629D_41A2_CD6BDCDB0145"
 ],
 "id": "Container_23F007B8_0C0A_629D_41A3_034CF0D91203",
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 520,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 100,
 "height": "100%",
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#E73B2C",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 30,
 "layout": "vertical",
 "scrollBarOpacity": 0.79,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "Container text"
 }
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_23F047B8_0C0A_629D_415D_F05EF8619564",
 "width": 370,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "height": 40,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "horizontal",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "Container space"
 }
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
 "left": "0%",
 "width": "77.115%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 80,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "scrollBarWidth": 10,
 "top": "0%",
 "borderRadius": 0,
 "minHeight": 100,
 "height": "100%",
 "minWidth": 1,
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.21vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.21vh;font-family:'Bebas Neue Bold';\">Panorama list:</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 },
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false
},
{
 "maxWidth": 60,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "maxHeight": 60,
 "width": "100%",
 "right": 20,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "verticalAlign": "top",
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "minHeight": 50,
 "horizontalAlign": "right",
 "top": 20,
 "borderRadius": 0,
 "mode": "push",
 "height": "36.14%",
 "transparencyActive": false,
 "minWidth": 50,
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg",
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton X"
 },
 "cursor": "hand",
 "shadow": false
},
{
 "shadow": false,
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
 "left": "0%",
 "insetBorder": false,
 "right": "0%",
 "paddingRight": 0,
 "borderSize": 0,
 "scrollEnabled": true,
 "paddingLeft": 0,
 "backgroundOpacity": 1,
 "class": "WebFrame",
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14377.55330038866!2d-73.99492968084243!3d40.75084469078082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9f775f259%3A0x999668d0d7c3fd7d!2s400+5th+Ave%2C+New+York%2C+NY+10018!5e0!3m2!1ses!2sus!4v1467271743182\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen>",
 "minHeight": 1,
 "top": "0%",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "bottom": "0%",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "propagateClick": false,
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "WebFrame48191"
 },
 "backgroundColorDirection": "vertical"
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_221C8648_0C06_E5FD_41A0_8247B2B7DEB0",
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "borderRadius": 0,
 "height": 60,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "gap": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "horizontal",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "Container space"
 }
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "children": [
  "this.HTMLText_221B6648_0C06_E5FD_41A0_77851DC2C548",
  "this.Button_221B5648_0C06_E5FD_4198_40C786948FF0"
 ],
 "id": "Container_221B7648_0C06_E5FD_418B_12E57BBFD8EC",
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 520,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 100,
 "height": "100%",
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#E73B2C",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 30,
 "layout": "vertical",
 "scrollBarOpacity": 0.79,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "Container text"
 }
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_221B4648_0C06_E5FD_4194_30EDC4E7D1B6",
 "width": 370,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "height": 40,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "horizontal",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "Container space"
 }
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_2F8A4686_0D4F_6B71_4183_10C1696E2923",
 "left": "0%",
 "width": "77.115%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 80,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "scrollBarWidth": 10,
 "top": "0%",
 "borderRadius": 0,
 "minHeight": 100,
 "height": "100%",
 "minWidth": 1,
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.21vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.21vh;font-family:'Bebas Neue Bold';\">Other Services:</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 },
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false
},
{
 "maxWidth": 60,
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "maxHeight": 60,
 "width": "100%",
 "right": 20,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "verticalAlign": "top",
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg",
 "minHeight": 50,
 "horizontalAlign": "right",
 "top": 20,
 "borderRadius": 0,
 "mode": "push",
 "height": "36.14%",
 "transparencyActive": false,
 "minWidth": 50,
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.jpg",
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.jpg",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton X"
 },
 "cursor": "hand",
 "shadow": false
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_B06B0CB5_ABC2_D51A_41B7_8074ED1B7A65",
 "left": "8.88%",
 "width": "22.422%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "top": "0%",
 "borderRadius": 0,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "height": "100%",
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "Container33852"
 }
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_28217A13_0D5D_5B97_419A_F894ECABEB04",
 "left": "0%",
 "width": "77.115%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 80,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "scrollBarWidth": 10,
 "top": "0%",
 "borderRadius": 0,
 "minHeight": 100,
 "height": "100%",
 "minWidth": 1,
 "propagateClick": false,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.21vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.21vh;font-family:'Bebas Neue Bold';\">PHOTOALBUM:</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText54192"
 },
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false
},
{
 "maxWidth": 60,
 "id": "IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3",
 "maxHeight": 60,
 "width": "100%",
 "right": 20,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "verticalAlign": "top",
 "pressedIconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3_pressed.jpg",
 "minHeight": 50,
 "horizontalAlign": "right",
 "top": 20,
 "borderRadius": 0,
 "mode": "push",
 "height": "36.14%",
 "transparencyActive": false,
 "minWidth": 50,
 "rollOverIconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3_rollover.jpg",
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_2820BA13_0D5D_5B97_4192_AABC38F6F169, false, 0, null, null, false)",
 "iconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3.jpg",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton X"
 },
 "cursor": "hand",
 "shadow": false
},
{
 "playbackBarHeadWidth": 6,
 "playbackBarHeight": 10,
 "id": "ViewerAreaLabeled_281D2361_0D5F_E9B0_41A1_A1F237F85FD7",
 "left": "0%",
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "width": "100%",
 "progressBarBorderSize": 6,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "minWidth": 1,
 "toolTipFontFamily": "Arial",
 "playbackBarProgressOpacity": 1,
 "height": "100%",
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "toolTipFontColor": "#606060",
 "toolTipShadowHorizontalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowVerticalLength": 0,
 "shadow": false,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "borderSize": 0,
 "toolTipBorderSize": 1,
 "paddingRight": 0,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "class": "ViewerArea",
 "vrPointerColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "progressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "top": "0%",
 "progressBorderRadius": 0,
 "playbackBarHeadHeight": 15,
 "transitionDuration": 500,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
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
 "playbackBarHeadShadowVerticalLength": 0,
 "paddingBottom": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": 12,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipBorderColor": "#767676",
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "data": {
  "name": "Viewer photoalbum + text 1"
 },
 "progressBackgroundColorDirection": "vertical"
},
{
 "maxWidth": 60,
 "id": "IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D",
 "left": 10,
 "maxHeight": 60,
 "width": "14.22%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "pressedIconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D_pressed.png",
 "horizontalAlign": "center",
 "top": "20%",
 "minHeight": 50,
 "borderRadius": 0,
 "mode": "push",
 "transparencyActive": false,
 "minWidth": 50,
 "rollOverIconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D_rollover.png",
 "bottom": "20%",
 "propagateClick": false,
 "iconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton <"
 },
 "cursor": "hand",
 "shadow": false
},
{
 "maxWidth": 60,
 "id": "IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14",
 "maxHeight": 60,
 "width": "14.22%",
 "right": 10,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "pressedIconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14_pressed.png",
 "horizontalAlign": "center",
 "top": "20%",
 "minHeight": 50,
 "borderRadius": 0,
 "mode": "push",
 "transparencyActive": false,
 "minWidth": 50,
 "rollOverIconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14_rollover.png",
 "bottom": "20%",
 "propagateClick": false,
 "iconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton >"
 },
 "cursor": "hand",
 "shadow": false
},
{
 "playbackBarHeadWidth": 6,
 "playbackBarHeight": 10,
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "left": "0%",
 "playbackBarRight": 0,
 "toolTipFontWeight": "normal",
 "toolTipShadowColor": "#333333",
 "width": "100%",
 "progressBarBorderSize": 6,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "paddingLeft": 0,
 "minHeight": 1,
 "playbackBarBorderRadius": 0,
 "toolTipShadowOpacity": 1,
 "toolTipFontStyle": "normal",
 "playbackBarProgressBorderColor": "#000000",
 "playbackBarHeadBorderRadius": 0,
 "playbackBarHeadBorderColor": "#000000",
 "minWidth": 1,
 "toolTipFontFamily": "Arial",
 "playbackBarProgressOpacity": 1,
 "height": "100%",
 "propagateClick": false,
 "toolTipTextShadowOpacity": 0,
 "playbackBarBorderSize": 0,
 "playbackBarHeadBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "playbackBarBackgroundOpacity": 1,
 "progressLeft": 0,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "toolTipFontColor": "#606060",
 "toolTipShadowHorizontalLength": 0,
 "firstTransitionDuration": 0,
 "progressOpacity": 1,
 "progressRight": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "toolTipShadowVerticalLength": 0,
 "shadow": false,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarOpacity": 1,
 "playbackBarHeadShadowOpacity": 0.7,
 "toolTipPaddingRight": 6,
 "borderSize": 0,
 "toolTipBorderSize": 1,
 "paddingRight": 0,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingTop": 4,
 "progressBarOpacity": 1,
 "toolTipDisplayTime": 600,
 "class": "ViewerArea",
 "vrPointerColor": "#FFFFFF",
 "displayTooltipInTouchScreens": true,
 "progressBorderSize": 0,
 "transitionMode": "blending",
 "toolTipBorderRadius": 3,
 "borderRadius": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "top": "0%",
 "progressBorderRadius": 0,
 "playbackBarHeadHeight": 15,
 "transitionDuration": 500,
 "playbackBarLeft": 0,
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBackgroundColorRatios": [
  0.01
 ],
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
 "playbackBarHeadShadowVerticalLength": 0,
 "paddingBottom": 0,
 "toolTipShadowBlurRadius": 3,
 "progressBorderColor": "#FFFFFF",
 "toolTipTextShadowColor": "#000000",
 "toolTipOpacity": 1,
 "toolTipShadowSpread": 0,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "toolTipFontSize": 12,
 "progressBarBackgroundColor": [
  "#3399FF"
 ],
 "toolTipPaddingBottom": 4,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipBorderColor": "#767676",
 "playbackBarHeadShadowHorizontalLength": 0,
 "toolTipTextShadowBlurRadius": 3,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "data": {
  "name": "Viewer photoalbum 1"
 },
 "progressBackgroundColorDirection": "vertical"
},
{
 "maxWidth": 60,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "left": 10,
 "maxHeight": 60,
 "width": "14.22%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "horizontalAlign": "center",
 "top": "20%",
 "minHeight": 50,
 "borderRadius": 0,
 "mode": "push",
 "transparencyActive": false,
 "minWidth": 50,
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "bottom": "20%",
 "propagateClick": false,
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton <"
 },
 "cursor": "hand",
 "shadow": false
},
{
 "maxWidth": 60,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "maxHeight": 60,
 "width": "14.22%",
 "right": 10,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "horizontalAlign": "center",
 "top": "20%",
 "minHeight": 50,
 "borderRadius": 0,
 "mode": "push",
 "transparencyActive": false,
 "minWidth": 50,
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "bottom": "20%",
 "propagateClick": false,
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton >"
 },
 "cursor": "hand",
 "shadow": false
},
{
 "maxWidth": 60,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "maxHeight": 60,
 "width": "10%",
 "right": 20,
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "verticalAlign": "top",
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.jpg",
 "minHeight": 50,
 "horizontalAlign": "right",
 "top": 20,
 "borderRadius": 0,
 "mode": "push",
 "height": "10%",
 "transparencyActive": false,
 "minWidth": 50,
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.jpg",
 "propagateClick": false,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.jpg",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton X"
 },
 "cursor": "hand",
 "shadow": false
},
{
 "maxWidth": 2000,
 "id": "Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397",
 "left": "0%",
 "maxHeight": 1000,
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "Image",
 "url": "skin/Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397.jpg",
 "verticalAlign": "bottom",
 "minHeight": 1,
 "horizontalAlign": "center",
 "top": "0%",
 "borderRadius": 0,
 "height": "100%",
 "minWidth": 1,
 "propagateClick": false,
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "Image"
 },
 "scaleMode": "fit_outside",
 "shadow": false
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 0,
 "scrollBarWidth": 10,
 "horizontalAlign": "right",
 "borderRadius": 0,
 "height": 60,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "gap": 0,
 "scrollBarColor": "#000000",
 "paddingTop": 20,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "horizontal",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "Container space"
 }
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "children": [
  "this.HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
  "this.Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C"
 ],
 "id": "Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 520,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 100,
 "height": "100%",
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#E73B2C",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 30,
 "layout": "vertical",
 "scrollBarOpacity": 0.79,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "Container text"
 }
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "id": "Container_06C42BA5_1140_A63F_4195_037A0687532F",
 "width": 370,
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "height": 40,
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "horizontal",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "Container space"
 }
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_062AD830_1140_E215_41B0_321699661E7F",
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 10,
 "paddingLeft": 10,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "class": "HTMLText",
 "borderRadius": 0,
 "height": "100%",
 "minHeight": 1,
 "minWidth": 1,
 "propagateClick": false,
 "scrollBarColor": "#04A3E1",
 "paddingTop": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.81vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.66vh;font-family:'Bebas Neue Bold';\">Virtual tour</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.47vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:2.89vh;font-family:'Bebas Neue Bold';\">Elevate your business with our captivating virtual tours, showcasing your products and services in stunning 3D detail. Engage customers like never before and leave a lasting impression.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#333333;font-size:1.88vh;font-family:'Roboto Slab ExtraLight';\"><B>Step into a world of immersive experiences with our captivating virtual tours. Our expert team utilizes cutting-edge technology to create stunning virtual tours that allow your audience to explore and engage with spaces like never before. Whether it's showcasing real estate properties, event venues, or travel destinations, our virtual tours provide an interactive and realistic experience that captivates and entices viewers. Let us transport your audience to a new dimension and leave a lasting impression with our exceptional virtual tour services.</B></SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText"
 },
 "scrollBarOpacity": 0.5,
 "paddingBottom": 20,
 "scrollBarVisible": "rollOver",
 "shadow": false
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 1,
 "backgroundColorDirection": "vertical",
 "data": {
  "name": "Button"
 },
 "id": "Button_062AF830_1140_E215_418D_D2FC11B12C47",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Bebas Neue Bold",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.7,
 "class": "Button",
 "verticalAlign": "middle",
 "iconHeight": 32,
 "width": "46%",
 "minHeight": 1,
 "horizontalAlign": "center",
 "shadowColor": "#000000",
 "backgroundColor": [
  "#04A3E1"
 ],
 "borderRadius": 0,
 "iconBeforeLabel": true,
 "mode": "push",
 "backgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "height": "9%",
 "propagateClick": false,
 "label": "lorem ipsum",
 "gap": 5,
 "fontSize": "3vh",
 "paddingTop": 0,
 "fontStyle": "normal",
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "iconWidth": 32,
 "cursor": "hand",
 "shadow": false,
 "fontWeight": "normal"
},
{
 "maxWidth": 150,
 "id": "IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD",
 "maxHeight": 150,
 "width": "12%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "pressedIconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD_pressed.png",
 "minHeight": 70,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "height": "8%",
 "transparencyActive": true,
 "mode": "push",
 "minWidth": 70,
 "rollOverIconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD_rollover.png",
 "propagateClick": false,
 "iconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton <"
 },
 "cursor": "hand",
 "shadow": false
},
{
 "scrollBarMargin": 2,
 "id": "Container_23F7D7B7_0C0A_6293_4195_312C9CAEABE4",
 "width": "80%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "verticalAlign": "top",
 "contentOpaque": false,
 "class": "Container",
 "horizontalAlign": "left",
 "borderRadius": 0,
 "height": "30%",
 "minHeight": 1,
 "minWidth": 1,
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "paddingBottom": 0,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "Container separator"
 }
},
{
 "maxWidth": 150,
 "id": "IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4",
 "maxHeight": 150,
 "width": "12%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "class": "IconButton",
 "verticalAlign": "middle",
 "pressedIconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4_pressed.png",
 "minHeight": 70,
 "horizontalAlign": "center",
 "borderRadius": 0,
 "height": "8%",
 "transparencyActive": true,
 "mode": "push",
 "minWidth": 70,
 "rollOverIconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4_rollover.png",
 "propagateClick": false,
 "iconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4.png",
 "paddingTop": 0,
 "paddingBottom": 0,
 "data": {
  "name": "IconButton >"
 },
 "cursor": "hand",
 "shadow": false
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_23F067B8_0C0A_629D_41A9_1A1C797BB055",
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 10,
 "paddingLeft": 10,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "class": "HTMLText",
 "borderRadius": 0,
 "height": "100%",
 "minHeight": 1,
 "minWidth": 1,
 "propagateClick": false,
 "scrollBarColor": "#04A3E1",
 "paddingTop": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.81vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.66vh;font-family:'Bebas Neue Bold';\">Lorem ipsum</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.66vh;font-family:'Bebas Neue Bold';\">dolor sit amet</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.47vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.47vh;font-family:'Bebas Neue Bold';\">consectetur adipiscing elit. Morbi bibendum pharetra lorem, accumsan san nulla.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Integer gravida dui quis euismod placerat. Maecenas quis accumsan ipsum. Aliquam gravida velit at dolor mollis, quis luctus mauris vulputate. Proin condimentum id nunc sed sollicitudin.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.6vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.6vh;font-family:'Bebas Neue Bold';\"><B>Donec feugiat:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\"> \u2022 Nisl nec mi sollicitudin facilisis </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\"> \u2022 Nam sed faucibus est.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\"> \u2022 Ut eget lorem sed leo.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\"> \u2022 Sollicitudin tempor sit amet non urna. </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\"> \u2022 Aliquam feugiat mauris sit amet.</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText"
 },
 "scrollBarOpacity": 0.5,
 "paddingBottom": 20,
 "scrollBarVisible": "rollOver",
 "shadow": false
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 1,
 "backgroundColorDirection": "vertical",
 "data": {
  "name": "Button"
 },
 "id": "Button_23F057B8_0C0A_629D_41A2_CD6BDCDB0145",
 "shadowBlurRadius": 6,
 "shadowSpread": 1,
 "fontFamily": "Bebas Neue Bold",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.7,
 "class": "Button",
 "verticalAlign": "middle",
 "iconHeight": 32,
 "width": "46%",
 "minHeight": 1,
 "horizontalAlign": "center",
 "shadowColor": "#000000",
 "backgroundColor": [
  "#04A3E1"
 ],
 "borderRadius": 0,
 "iconBeforeLabel": true,
 "mode": "push",
 "backgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "borderColor": "#000000",
 "pressedBackgroundColorRatios": [
  0
 ],
 "height": "9%",
 "propagateClick": false,
 "label": "lorem ipsum",
 "gap": 5,
 "fontSize": "3vh",
 "paddingTop": 0,
 "fontStyle": "normal",
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "iconWidth": 32,
 "cursor": "hand",
 "shadow": false,
 "fontWeight": "normal"
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_221B6648_0C06_E5FD_41A0_77851DC2C548",
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 10,
 "paddingLeft": 10,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "class": "HTMLText",
 "borderRadius": 0,
 "height": "100%",
 "minHeight": 1,
 "minWidth": 1,
 "propagateClick": false,
 "scrollBarColor": "#04A3E1",
 "paddingTop": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.81vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.66vh;font-family:'Bebas Neue Bold';\">location</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.88vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.47vh;font-family:'Bebas Neue Bold';\">address line 1</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.47vh;font-family:'Bebas Neue Bold';\">address line 2</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:5.21vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.16vh;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac.</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText"
 },
 "scrollBarOpacity": 0.5,
 "paddingBottom": 20,
 "scrollBarVisible": "rollOver",
 "shadow": false
},
{
 "fontColor": "#FFFFFF",
 "rollOverBackgroundOpacity": 1,
 "backgroundColorDirection": "vertical",
 "data": {
  "name": "Button"
 },
 "id": "Button_221B5648_0C06_E5FD_4198_40C786948FF0",
 "shadowBlurRadius": 6,
 "width": 207,
 "fontFamily": "Bebas Neue Bold",
 "paddingRight": 0,
 "borderSize": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.7,
 "class": "Button",
 "verticalAlign": "middle",
 "iconHeight": 32,
 "shadowSpread": 1,
 "minHeight": 1,
 "horizontalAlign": "center",
 "pressedBackgroundColorRatios": [
  0
 ],
 "shadowColor": "#000000",
 "height": 59,
 "borderRadius": 0,
 "iconBeforeLabel": true,
 "mode": "push",
 "backgroundColorRatios": [
  0
 ],
 "minWidth": 1,
 "borderColor": "#000000",
 "backgroundColor": [
  "#04A3E1"
 ],
 "propagateClick": false,
 "label": "lorem ipsum",
 "gap": 5,
 "fontSize": 34,
 "paddingTop": 0,
 "fontStyle": "normal",
 "paddingBottom": 0,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "layout": "horizontal",
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "iconWidth": 32,
 "visible": false,
 "cursor": "hand",
 "shadow": false,
 "fontWeight": "normal"
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "class": "HTMLText",
 "borderRadius": 0,
 "height": "45%",
 "minHeight": 1,
 "minWidth": 1,
 "propagateClick": false,
 "scrollBarColor": "#04A3E1",
 "paddingTop": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.81vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.08vh;font-family:'Bebas Neue Bold';\">LIGHTWORKZ</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.08vh;font-family:'Bebas Neue Bold';\">SOLUTIONS</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText18899"
 },
 "scrollBarOpacity": 0.5,
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver",
 "shadow": false
},
{
 "scrollBarMargin": 2,
 "backgroundColorDirection": "vertical",
 "children": [
  "this.HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE"
 ],
 "id": "Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C",
 "width": "100%",
 "borderSize": 0,
 "paddingRight": 0,
 "paddingLeft": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "verticalAlign": "top",
 "contentOpaque": false,
 "minHeight": 1,
 "scrollBarWidth": 10,
 "horizontalAlign": "left",
 "borderRadius": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "backgroundColorRatios": [
  0,
  1
 ],
 "minWidth": 1,
 "height": "80%",
 "propagateClick": false,
 "gap": 10,
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "scroll",
 "paddingBottom": 0,
 "layout": "horizontal",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "data": {
  "name": "- content"
 }
},
{
 "scrollBarMargin": 2,
 "id": "HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE",
 "width": "75%",
 "borderSize": 0,
 "paddingRight": 10,
 "paddingLeft": 10,
 "backgroundOpacity": 0,
 "scrollBarWidth": 10,
 "class": "HTMLText",
 "borderRadius": 0,
 "height": "100%",
 "minHeight": 1,
 "minWidth": 1,
 "propagateClick": false,
 "scrollBarColor": "#04A3E1",
 "paddingTop": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><p STYLE=\"margin:0; line-height:3.47vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.88vh;font-family:'Bebas Neue Bold';\">Ashwath L</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.88vh;font-family:'Bebas Neue Bold';\">Tlf.: +91 8098339571</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.88vh;font-family:'Bebas Neue Bold';\">Sreejith R</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.88vh;font-family:'Bebas Neue Bold';\">Tlf.: +91 8838190703</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.88vh;font-family:'Bebas Neue Bold';\">Mithun S</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.88vh;font-family:'Bebas Neue Bold';\">Tlf.: +91 6382088440</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.88vh;font-family:'Bebas Neue Bold';\">lightworkzmedia@gmail.com</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.88vh;font-family:'Bebas Neue Bold';\">https://lightworkz-solutions.github.io/</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:1.16vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.01vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.74vh;font-family:'Bahnschrift SemiBold';\">LightWorkz Solutions is an innovative digital service company specializing in immersive experiences through the power of AR/VR technology. Our team of experts utilizes cutting-edge technology to create seamless and stunning virtual tours, websites, and other digital solutions that captivate audiences</SPAN></SPAN></DIV></div>",
 "data": {
  "name": "HTMLText19460"
 },
 "scrollBarOpacity": 0.5,
 "paddingBottom": 10,
 "scrollBarVisible": "rollOver",
 "shadow": false
}],
 "scrollBarColor": "#000000",
 "paddingTop": 0,
 "overflow": "visible",
 "paddingBottom": 0,
 "backgroundPreloadEnabled": true,
 "layout": "absolute",
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "mouseWheelEnabled": true,
 "shadow": false,
 "vrPolyfillScale": 0.5,
 "desktopMipmappingEnabled": false
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
