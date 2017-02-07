/*JavaScript file js_adv.js v2.0 last modified 10/10/25
 * 
 * 繧ｨ繝輔ぉ繧ｯ繝医く繝･繝ｼ縺ｫ繧医ｋ繧､繝吶Φ繝育ｮ｡逅��蟒�ｭ｢
 * clickToContinue縲『aitUntilClick縲『aitToChoose縺ｮ繝｡繧ｽ繝�ラ蛹�
 * 
 * 陦ｨ遉ｺ繝ｻ髱櫁｡ｨ遉ｺ邉ｻ繝｡繧ｽ繝�ラ縺翫ｈ縺ｳ繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ邉ｻ繝｡繧ｽ繝�ラ縺ｫ繧ｪ繝励す繝ｧ繝ｳ縺ｮnext繝励Ο繝代ユ繧｣繧定ｨｭ螳�
 * 縺薙ｌ繧稚rue縺ｫ縺吶ｋ縺ｨ迴ｾ蝨ｨ縺ｮ繧ｨ繝輔ぉ繧ｯ繝医′邨ゆｺ�☆繧九�繧貞ｾ�◆縺壹↓谺｡縺ｮ繧ｲ繝ｼ繝�繧､繝吶Φ繝医↓遘ｻ繧�
 * 
 * 10/25縲逕ｻ髱｢繧ｵ繧､繧ｺ縺ｪ縺ｩ縺ｮ繧ｳ繝ｳ繝輔ぅ繧ｰ險ｭ螳壹′縺ｧ縺阪ｋ繧医≧菫ｮ豁｣
 */

if (typeof jsGame === "undefined") var jsGame = {};

jsGame.Base = Class.create({
    
    dimensions: {
        faceImg: [96, 96],
        message: [
            [592, 120, 14, 14],
            [592, 96, 14, 38],
            [467, 120, 140, 14],
            [467, 96, 140, 38]
        ],
        charName: [
            [592, 14, 14],
            [467, 140, 14]
        ],
        answer: [
            [[14, 50], [14, 62]],
            [[14, 78], [14, 87]],
            [[14, 106], [14, 112]]
        ],
        pageNext: [24, 24, 604, 322]
    },
    
    style: {
        passage: { paddingLeft: '10px', paddingTop: '15px' },
        pageNext: { backgroundImage: 'url(http://wiz-code.digick.jp/image/icon/enter06.png)' }
    },
    
    initialize: function(element, path) {
        var elementId = element;
        
        //閾ｪ繧ｵ繧､繝医�逕ｻ蜒上�浹讌ｽ繝輔か繝ｫ繝縺ｪ縺ｩ縺ｮ繝代せ繧偵％縺薙〒險ｭ螳壹ゅ∪縺溘�縲）sGame.Base繧ｯ繝ｩ繧ｹ繧貞他縺ｳ蜃ｺ縺吶→縺榊ｼ墓焚縺ｫ貂｡縺励※繧ゅ＞縺��
        this.path = Object.extend({
            image: 'image/',
            smSWF: 'swf/',
            BGM: 'bgm/',
            snd: 'snd/'
        }, path || {});
        
        //繧ｲ繝ｼ繝�逕ｻ髱｢縺ｮDOM隕∫ｴ�
        this.disp = $(elementId);
        this.dispOffset = this.disp.cumulativeOffset();
        
        //繧ｲ繝ｼ繝�縺ｧ菴ｿ逕ｨ縺吶ｋ逕ｻ蜒上ｄBGM縺ｪ縺ｩ縺ｮ繝��繧ｿ繝吶�繧ｹ
        this.GData = jsGame.dataBase || {};
        
        //繧ｲ繝ｼ繝�蜀�〒菴ｿ逕ｨ縺吶ｋ螟画焚繧�ユ繝ｳ繝励Ξ繝ｼ繝医↑縺ｩ縺ｮ繝��繧ｿ
        this.MData = {
            gameVars: {},
            systemVars: {
                SE: {
                    onContinue: null,
                    onSelectChoice: null,
                    onTimeup: null
                }
            },
            template: []
        };
        
        //繧ｲ繝ｼ繝�繝｢繝ｼ繝峨�險ｭ螳�
        this.mode = 'adventure';
        
        //繝輔Λ繧ｰ縺ｨ繧ｹ繝医�繝ｪ繝ｼ繝ｬ繝吶Ν縺ｮ蛻晄悄險ｭ螳�
        this.flag = [];
        this.story = 0;
        
        //繝悶Λ繧ｦ繧ｶ縺ｫ荳諱ｯ縺､縺九○繧矩≦蟒ｶ譎る俣
        this.defer = 0.00;
        
        //ID閾ｪ蜍慕函謌舌↓菴ｿ縺�分蜿ｷ
        this.currentId = 1;
        
        //BGM縲∝柑譫憺浹縺ｮ險ｭ螳�
        this.mute = true;
        this.flash = false;
        this.trackList = [];
        this.playingNumber = {};
        this.disp.insert( this.bgmTracks = new Element('DIV', { className: 'track' }) );
        this.disp.insert( this.soundTracks = new Element('DIV', { className: 'track' }) );
        
        if (navigator.plugins && navigator.mimeTypes['application/x-shockwave-flash']) {
            var plugin = navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin,
                flashplayer_ver = parseInt(plugin.description.match(/\d+\.\d+/));
            if (plugin)
                this.setupSoundManager();
        }
        else if (Prototype.Browser.IE) {
            if (new ActiveXObject("ShockwaveFlash.ShockwaveFlash"))
                this.setupSoundManager();
        }
        
        //繝｢繝ｼ繝繝ｫ鬚ｨ繧ｦ繧｣繝ｳ繝峨え
        this.disp.insert( this.modal = new Element('DIV', { className: 'modal' })
            .setOpacity(0.8).hide() );
        
        //繝繧､繧｢繝ｭ繧ｰ縺ｮ蜈･蜉帙ョ繝ｼ繧ｿ螟画焚
        this.dialogResult = {
            inputText: null,
            command: null
        };
        this.disp.insert( this.dialogWin = new Element('DIV', { className: 'dialog_win' })
            .setOpacity(0.8).hide() );
        
        for (var i = 0; i < 3; i++) {
            var newNode = new Element('DIV', { className: 'window' + (i + 1) });
            if (i === 0) this.dialogWin.insert(newNode);
            else prevPar.insert(newNode);
            var prevPar = newNode;
            
            if (i == 2)
                prevPar.insert( this.dialogText = new Element('DIV', { className: 'dialog_text' }) );
        }
        this.dialogText.update('<form id="dialog_form' + elementId + '"><label for="dialog_text' + elementId + '"><span class="dialog_msg"></span></label><input type="text" id="dialog_text' + elementId + '" name="dialog_text' + elementId + '" class="input_text" /><br /><input type="button" name="ok" class="input_ok" value="OK" /><input type="button" name="cancel" class="input_cancel" value="CANCEL" /></form>');
        this.dialogForm = $('dialog_form' + elementId);
        this.dialogMsg = $$('span.dialog_msg').first();
        
        this.inputText = this.dialogForm.findFirstElement();
        this.commandOk = this.dialogForm.getInputs('button', 'ok').first();
        this.commandCancel = this.dialogForm.getInputs('button', 'cancel').first();
        
        //縲繧ｿ繧､繝医Ν繧ｦ繧｣繝ｳ繝峨え
        this.disp.insert( this.titleWin = new Element('DIV', { className: 'title_win' })
            .setOpacity(0.8).hide() );
        
        for (var i = 0; i < 3; i++) {
            var newNode = new Element('DIV', { className: 'window' + (i + 1) });
            if (i === 0) this.titleWin.insert(newNode);
            else prevPar.insert(newNode);
            
            var prevPar = newNode;
            if (i == 2)
                prevPar.insert( this.titleText = new Element('DIV', { className: 'title_text' }) );
        }
        
        //縲隴ｦ蜻翫え繧｣繝ｳ繝峨え
        this.disp.insert( this.warnWin = new Element('DIV', { className: 'warn_win' })
            .setOpacity(0.8).hide() );
        
        for (var i = 0; i < 3; i++) {
            var newNode = new Element('DIV', { className: 'window' + (i + 1) });
            if (i === 0) this.warnWin.insert(newNode);
            else prevPar.insert(newNode);
            var prevPar = newNode;
            
            if (i == 2)
                prevPar.insert( this.warnText = new Element('DIV', { className: 'warn_text' }) );
        }
        
        //縲繝｡繧､繝ｳ繧ｦ繧｣繝ｳ繝峨え
        this.disp.insert( this.mainWin = new Element('DIV', { className: 'main_win' })
            .setOpacity(0.8).hide() );
        
        for (var i = 0; i < 3; i++) {
            var newNode = new Element('DIV', { className: 'window' + (i + 1) });
            if (i === 0) this.mainWin.insert(newNode);
            else prevPar.insert(newNode);
            var prevPar = newNode;

            if (i == 2)
                prevPar.insert( this.mainText = new Element('DIV', { className: 'main_text' }) );
        }
        
        //縲繝｡繧､繝ｳ繧ｦ繧｣繝ｳ繝峨え蜀��繧ｳ繝ｳ繝�Φ繝�
        this.mainText.insert( this.imgFrm = new Element('DIV', { className: 'img_frm' })
            .insert( this.charImg = new Element('IMG', { name: 'char_img', className: 'char_img' }) ).hide() )
            .insert( this.charName = new Element('DIV', { className: 'char_name' }) )
            .insert( this.message = new Element('DIV', { className: 'message' }) );
        
        this.selectedItem = null;
        this.mainText.insert( this.question = new Element('DIV', { className: 'question' }).hide() );
        
        this.winAns = [
            new Element('DIV', { className: 'answer' }),
            new Element('DIV', { className: 'answer' }),
            new Element('DIV', { className: 'answer' })
        ];
        this.winAns.each(function(element) {
            this.mainText.insert(element.hide());
        }.bind(this));
        
        this.mainText.insert( this.winConfWrapper = new Element('DIV')
            .setStyle({
                position: 'relative',
                left: '0px',
                top: '75px'
            })
            .update('<table class="conf_table" align="center" cellspacing="0" cellpadding="0">\r\n<tbody>\r\n<tr>\r\n<td class="ok"></td>\r\n<td width="50"></td>\r\n<td class="cancel"></td>\r\n</tr>\r\n</tbody>\r\n</table>')
            .hide() );
        
        this.winConf = [
            $$('table.conf_table td.ok').first(),
            $$('table.conf_table td.cancel').first()
        ];
        
        this.disp.insert( this.blackSheet = new Element('DIV', { className: 'black_sheet' }).hide() );
        this.disp.insert( this.pageNext = new Element('DIV', { className: 'page_next' }).hide() );
        
        //繝弱�繝ｫ鬚ｨ繝�く繧ｹ繝郁｡ｨ遉ｺ
        this.disp.insert( this.textWin = new Element('DIV', { className: 'text_win' })
            .setOpacity(0.7).hide() );
        
        //閭梧勹逕ｻ蜒�
        this.bgImage = {};
        this.disp.insert( this.bgImage.main = new Element('DIV', { className: 'bg_frm' })
            .insert(new Element('IMG', { className: 'bg_img' }) ).hide() );
        this.disp.insert( this.bgImage.sub = new Element('DIV', { className: 'bg_frm' })
            .insert(new Element('IMG', { className: 'bg_img' }) ).hide() );
        
        //豎守畑逕ｻ蜒上�縺ｲ縺ｪ蠖｢繧ｪ繝悶ず繧ｧ繧ｯ繝�
        this.images = {};
        this.imgTemp = new Element('DIV', { className: 'fg_frm' })
            .insert( new Element('IMG', { className: 'fg_img' }) );
        
        //addScene繝｡繧ｽ繝�ラ邨檎罰縺ｧ蜻ｼ縺ｳ蜃ｺ縺輔ｌ繧九う繝吶Φ繝亥錐縺ｮ逋ｻ骭ｲ縲�
        this.eventType = {
            initVars: 'initVars',
            createSimpleText: 'createSimpleText',
            dispSimpleText: 'dispSimpleText',
            typeSimpleText: 'typeSimpleText',
            animateText: 'animateSimpleText',
            hideSimpleText: 'hideSimpleText',
            
            showDialog: 'showDialog',
            showWin: 'showWindow',
            hideWin: 'hideWindow',
            
            dispMsg: 'dispMessage',
            typeMsg: 'typeMessage',
            showQuestion: 'showQuestion',
            showAnswer: 'showAnswer',
            showConfirm: 'showConfirm',
            clearMsg: 'clearMessage',
            
            changeScene: 'changeScene',
            toSelectedScene: 'toSelectedScene',
            insertValue: 'insertSelectedValue',
            insertResult: 'insertDialogResult',
            calculateValue: 'insertCalculatedValue',
            executeCode: 'executeCode',
            
            showText: 'showTextWin',
            hideText: 'hideTextWin',
            dispText: 'dispText',
            typeText: 'typeText',
            clearText: 'clearText',
            
            initFlag: 'initFlagData',
            setFlag: 'setFlag',
            flagCheck: 'flagCheck',
            setStory: 'setStory',
            storyCheck: 'storyCheck',
            
            createImage: 'createImage',
            showImage: 'showImage',
            hideImage: 'hideImage',
            addImageMap: 'addImageMap',
            animateImage: 'animateImage',
            
            changeBgImg: 'changeBgImg',
            showBgImage: 'showBackground',
            hideBgImage: 'hideBackground',
            crossfadeBg: 'crossfadeBackground',
            
            delayTime: 'delayTime',
            playMusic: 'playEventMusic',
            stopMusic: 'stopEventMusic',
            
            showModal: 'showModalWindow',
            hideModal: 'hideModalWindow',
            
            showDungeon: 'showDungeon',
            hideDungeon: 'hideDungeon',         
            enableDungeon: 'enableDungeon',
            disableDungeon: 'disableDungeon',
            warpTo: 'warpTo',
            
            clickToContinue: 'clickToContinue',
            waitUntilClick: 'waitUntilClick',
            waitToChoose: 'waitToChoose'
        };
        
    },
    
    setupSoundManager: function() {
        if (typeof soundManager == 'undefined') return;
        
        var sm = soundManager;
        sm.flashVersion = 8;
        sm.url = this.path.smSWF;
        sm.flashLoadTimeout = 1000;
        sm.debugMode = false;
        sm.useConsole = false;
        
        if (this.GData.music)
            this.trackManager();
    },
    
    trackManager: function() {
        soundManager.onload = function() {
            var track = {};
            this.flash = true;
            this.GData.music.BGM.each(function(attr) {
                track[attr.name] = soundManager.createSound({
                    id: attr.name,
                    url: this.path.BGM + attr.url,
                    volume: 30
                });
            }.bind(this));
            this.GData.music.sound.each(function(attr) {
                track[attr.name] = soundManager.createSound({
                    id: attr.name,
                    url: this.path.snd + attr.url,
                    volume: 50
                });
            }.bind(this));
            jsGame.track = track;
            
        }.bind(this);
        
        soundManager.onerror = function() {
            this.flash = false;
        };
    },
    
    playMusic: function() {
        var trackName = arguments[0],
            type = arguments[1],
            options = arguments[2] || {};
        
        if (type == 'bgm') this.playingNumber = { name: trackName, loop: options.loop };
        if (this.mute) return;
        
        if (options.skip && type == 'snd' && !(this.flash || Prototype.Browser.IE)) return;
        
        if (!this.flash) {
            var mute = (options.mute) ? (Prototype.Browser.IE ? -10000 : false) : Prototype.Browser.IE ? 0 : true,
                loop = (options.loop) ? [true, -1] : [false, 1];
            
            if (type == 'bgm')
                var data = this.GData.music.BGM, tracks = this.bgmTracks;
            else
                var data = this.GData.music.sound, tracks = this.soundTracks;
            var trackUrl = (type == 'bgm' ? this.path.BGM : this.path.snd) + data.find(function(tr) {
                return (tr.name == trackName);
            }).url;
            
            if (Prototype.Browser.Gecko && navigator.userAgent.indexOf("Win") > 0) {
                if (navigator.plugins &&
                $A(navigator.plugins).detect(function(p){
                    return p.name.indexOf('QuickTime') != -1;
                })) {
                    var objTag = new Element('OBJECT', {
                        type: 'audio/mpeg',
                        data: trackUrl,
                        width: 0,
                        height: 0
                    });
                    var prmTag1 = new Element('param'), prmTag2 = new Element('param');
                    prmTag1.setAttribute('name', 'loop');
                    prmTag1.setAttribute('value', loop[0]);
                    prmTag2.setAttribute('name', 'autostart');
                    prmTag2.setAttribute('value', mute);
                    objTag.insert(prmTag1);
                    objTag.insert(prmTag2);
                    tracks.insert(objTag);
                    return;
                }
            }
            if (Prototype.Browser.IE) {
                var bgTag = new Element('BGSOUND', {
                    src: trackUrl,
                    loop: loop[1],
                    volume: mute,
                    width: 0,
                    height: 0
                });
                tracks.insert(bgTag);
            }
            else  {
                tracks.update('<embed src="' + trackUrl + '" autostart="' + mute +
                    '" hidden="true" loop="' + loop[0] + '" type="audio/mpeg" \/>');
            }
        }
        else {
            var mute = options.mute ? true : false,
                loop = options.loop ? true : false;
            
            if (mute) {
                jsGame.track[trackName].load();
                return;
            }
            jsGame.track[trackName].play({
                onplay: function() {
                    this.trackList.push(trackName);
                }.bind(this),
                
                onfinish: function() {
                    if (loop) 
                        jsGame.track[trackName].play();
                }
            });
        }
    },
    
    stopMusic: function() {
        var type = arguments[0] || 'both',
            options = !Object.isString(arguments[0]) ? arguments[0] : arguments[1] || {};
        
        if (!this.flash) {
            switch (type) {
                case 'bgm':
                    this.bgmTracks.immediateDescendants().invoke('remove');
                    break;
                case 'snd':
                    this.soundTracks.immediateDescendants().invoke('remove');
                    break;
                default:
                    this.bgmTracks.immediateDescendants().invoke('remove');
                    this.soundTracks.immediateDescendants().invoke('remove');
            }
        }
        else {
            if (type == 'bgm' || type == 'both') {
                var bgmList = this.GData.music.BGM.pluck('name').findAll(function(element){
                    return this.trackList.indexOf(element) != -1;
                }.bind(this));
                
                if (bgmList) {
                    bgmList.each(function(tr){
                        jsGame.track[tr].stop();
                    });
                }
            }
            if (type == 'snd' || type == 'both') {
                var sndList = this.GData.music.sound.pluck('name').findAll(function(element){
                    return this.trackList.indexOf(element) != -1;
                }.bind(this));
                
                if (sndList) {
                    sndList.each(function(tr){
                        jsGame.track[tr].stop();
                    });
                }
            }
            this.trackList = this.trackList.without(bgmList.concat(sndList));
        }
    },
    
    //繧ｭ繝ｼ繧､繝吶Φ繝医�邂｡逅�ょｼ墓焚縺ｫtrue繧呈ｸ｡縺吶→縲√ち繝悶く繝ｼ縺ｨ遏｢蜊ｰ繧ｭ繝ｼ縺ｮ繝�ヵ繧ｩ繝ｫ繝医い繧ｯ繧ｷ繝ｧ繝ｳ繧呈椛豁｢縺吶ｋ縲�
    keyManager: function(stopKeyAction) {
        
        this.key = [];
        this.keyPress = [];
        this.keyCount = 256;
        for (var i = 0; i < this.keyCount; i++) {
            this.key[i] = false;
            this.keyPress[i] = false;
        }
        
        this.stopKeyAction = stopKeyAction || false;
        
        document.observe('keydown', function(e) {
            
            // Mozilla(Firefox, NN) and Opera
            if (typeof event == 'undefined') {
                var code = e.which;
                this.key[code] = true;
                
                if (this.stopKeyAction && (code == Event.KEY_TAB ||
                    code == Event.KEY_LEFT || code == Event.KEY_RIGHT ||
                    code == Event.KEY_DOWN || code == Event.KEY_UP)) {
                    e.preventDefault();
                }
            }
            // Internet Explorer
            else {
                var code = event.keyCode;
                this.key[code] = true;
                
                if (this.stopKeyAction && (code == Event.KEY_TAB ||
                    code == Event.KEY_LEFT || code == Event.KEY_RIGHT ||
                    code == Event.KEY_DOWN || code == Event.KEY_UP)) {
                    event.returnValue = false;
                }
            }
            
            this.keyPress[code] = true;
        }.bind(this));
        
        document.observe('keyup', function(e) {
            
            // Mozilla(Firefox, NN) and Opera
            if (typeof event == 'undefined') {
                var code = e.which;
                this.key[code] = false;
            }
            // Internet Explorer
            else {
                var code = event.keyCode;
                this.key[code] = false;
            }
        }.bind(this));
        
        document.observe('keypress', function(e) {
            
            // Opera
            if (Prototype.Browser.Opera) {
                var code = event.keyCode;
                if (code == Event.KEY_RETURN ||
                    code == Event.KEY_LEFT || code == Event.KEY_RIGHT ||
                    code == Event.KEY_DOWN || code == Event.KEY_UP) {
                    event.preventDefault();
                }
            }
            // Mozilla(Firefox, NN)
            else if (typeof event == 'undefined') {
                var code = e.which;
                if (code == Event.KEY_RETURN) {
                    e.preventDefault();
                }
                
            // Internet Explorer
            } else {
                var code = event.keyCode;
                if (code == Event.KEY_RETURN) {
                    event.returnValue = false;
                }
            }
        }.bind(this));
    },
    
    isKeyUp: function(keyName) {
        if (Object.isNumber(keyName))
            return !this.key[keyName];
        else
            return !this.key[Event[keyName]];
    },
    
    isKeyDown: function(keyName) {
        if (Object.isNumber(keyName))
            return this.key[keyName];
        else
            return this.key[Event[keyName]];
    },
    
    //謚ｼ縺励※縺�◆繧ｭ繝ｼ繧帝屬縺励◆迸ｬ髢薙ｒ讀懃衍縺吶ｋ繝｡繧ｽ繝�ラ縲ＴetInterval縺ｪ縺ｩ縺ｧ繧､繝吶Φ繝医ｒ逶｣隕悶＠縺ｦ縺�ｋ縺ｨ縺阪↓譛牙柑縲�
    isKeyPress: function(keyName) {
        if (Object.isNumber(keyName)) {
            if (this.keyPress[keyName] && !this.isKeyDown(keyName)) {
                this.keyPress[keyName] = false;
                return true;
            }
            else
                return false;
        }
        else
            if (this.keyPress[Event[keyName]] && !this.isKeyDown(keyName)) {
                this.keyPress[Event[keyName]] = false;
                return true;
            }
            else
                return false;
    },
    
    //繝槭え繧ｹ繧､繝吶Φ繝医ｒ邂｡逅�☆繧九Γ繧ｽ繝�ラ縲ょｼ墓焚縺ｫ隕∫ｴ�繧呈欠螳壹＠縺ｦ蟇ｾ雎｡繧帝剞螳壼庄縲ょｼ墓焚縺ｪ縺励□縺ｨ逕ｻ髱｢蜈ｨ菴難ｼ�document繧ｪ繝悶ず繧ｧ繧ｯ繝茨ｼ峨′蟇ｾ雎｡縺ｫ縺ｪ繧九�
    mouseEvents: function(element) {
        this.mouseElement = Object.isElement(element) ? $(element) : document;
        
        this.x = 0;
        this.y = 0;
        this.target = null;
        this.mouseDown = false;
        
        this.mouseBtn = {
            left: false,
            center: false,
            right: false
        };
        
        this.mouseElement.observe('mousemove', function(e) {
            this.x = Event.pointerX(e) - this.dispOffset.left;
            this.y = Event.pointerY(e) - this.dispOffset.top;
        }.bind(this));
        
        this.mouseElement.observe('resize', function(e) {
            this.dispOffset = this.disp.cumulativeOffset();
        }.bind(this));
        
        this.mouseElement.observe('mousedown', function(e) {
            this.mouseDown = true;
            this.target = e.element();
            this.eventObj = e;
            if (Event.isLeftClick(e)) this.mouseBtn.left = true;
            if (Event.isMiddleClick(e)) this.mouseBtn.center = true;
            if (Event.isRightClick(e)) this.mouseBtn.right = true;
        }.bind(this));

        this.mouseElement.observe('mouseup', function(e) {
            if (Event.isLeftClick(e)) this.mouseBtn.left = false;
            if (Event.isMiddleClick(e)) this.mouseBtn.center = false;
            if (Event.isRightClick(e)) this.mouseBtn.right = false;
        }.bind(this));
        
        this.mouseElement.observe('selectstart', function(e) {
            e.preventDefault();
        }.bind(this));
        
    },

    getMouseX: function() {
        return this.x;
    },

    getMouseY: function() {
        return this.y;
    },

    getMouseXY: function() {
        var coord = [this.x, this.y];
        coord.x = this.x;
        coord.y = this.y;       
        return coord;
    },
    
    getTarget: function() {
        return this.target;
    },

    getEventObj: function() {
        return this.eventObj;
    },
    
    isMouseBtn: function(btnName) {
        return this.mouseBtn[btnName];
    },
    
    //繝槭え繧ｹ縺後け繝ｪ繝�け縺輔ｌ縺溘→縺阪∽ｸ蠎ｦ縺�縺奏rue繧定ｿ斐☆縲ょｼ墓焚縺ｫ蟇ｾ雎｡縺ｮ隕∫ｴ�繧呈欠螳壼庄縲ＴetInterval縺ｪ縺ｩ縺ｧ繧､繝吶Φ繝医ｒ逶｣隕悶＠縺ｦ縺�ｋ縺ｨ縺阪↓譛牙柑縲�
    isMouseClick: function(element) {
        if (!this.getTarget()) return false;
        
        var element = Object.isElement(element) ? $(element) : null;
        if (element && ( element != this.getTarget() && !(this.getTarget().ancestors().include(element)) )) return false;
        
        if (this.mouseDown && !this.isMouseBtn('left')) {
            this.mouseDown = false;
            return true;
        }
        else
            return false;
    },
    
    //繝槭え繧ｹ繝懊ち繝ｳ繧呈款縺励◆縺ｨ縺阪∽ｸ蠎ｦ縺�縺奏rue繧定ｿ斐☆縲ょｼ墓焚縺ｫ蟇ｾ雎｡縺ｮ隕∫ｴ�繧呈欠螳壼庄縲ＴetInterval縺ｪ縺ｩ縺ｧ繧､繝吶Φ繝医ｒ逶｣隕悶＠縺ｦ縺�ｋ縺ｨ縺阪↓譛牙柑縲�
    onceMouseDown: function(element) {
        if (!this.getTarget()) return false;
        
        var element = Object.isElement(element) ? $(element) : null;
        if (element && ( element != this.getTarget() && !(this.getTarget().ancestors().include(element)) )) return false;
        
        if (this.mouseDown && this.isMouseBtn('left')) {
            this.mouseDown = false;
            return true;
        }
        return false;
    },
    
    
    /* 縺薙％縺九ｉ繧ｲ繝ｼ繝�繧､繝吶Φ繝医�繝｡繧ｽ繝�ラ鄒､ */
    
    //繧ｲ繝ｼ繝�蜀�〒菴ｿ逕ｨ縺吶ｋ螟画焚縺ｮ險ｭ螳�
    initVars: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                dataObj = param[0],
                options = param[1] || {};
        }
        else {
            var dataObj = arguments[0],
                options = arguments[1] || {};
        }
        
        if (options.next) this.eventUpdated = false;
        
        var copyObj = Object.toJSON(dataObj);
        copyObj = copyObj.evalJSON();
        
        if (dataObj.gameVars) {
            $H(dataObj.gameVars).each(function(pair) {
                if (Object.isString(pair.value) && pair.value.match(/^function.*?\{/)) {
                    var value = pair.value;
                    value = value.replace(/function.*?\{/, '').replace(/\}\W*$/, '').strip();
                    value = new Function(value);
                    pair.value = value;
                }
                if (Object.isFunction(pair.value))
                    copyObj.gameVars[pair.key] = pair.value;
            });
        }
        
        new Effect.Event(Object.extend({
            delay: this.defer,
            afterFinish: function() {
                this.MData = Object.extend(this.MData, copyObj);
                this.delayTime(this.defer);
                
                if (!options.next) this.eventUpdated = false;
            }.bind(this)
        }, options));
    },
    
    /*
     * 繝�く繧ｹ繝郁｡ｨ遉ｺ逕ｨ繝｡繧ｽ繝�ラ縲ゅユ繧ｭ繧ｹ繝亥�螳ｹ繧偵Λ繝��縺励◆DIV隕∫ｴ�繧定ｿ斐☆縲�
     * 隨ｬ1蠑墓焚縺後ユ繧ｭ繧ｹ繝亥�螳ｹ縲らｬｬ2蠑墓焚縺ｯ繝�く繧ｹ繝郁ｦ∫ｴ�縺ｮ隴伜挨ID縲∫怐逡･縺吶ｋ縺ｨ"text***"縺ｨ縺�≧ID繧定�蜍穂ｽ懈�縺吶ｋ縲�
     * 隨ｬ3蠑墓焚縺ｯ繧ｪ繝励す繝ｧ繝ｳ縲〕oc縺ｯ陦ｨ遉ｺ蠎ｧ讓兌x, y]蠖｢蠑上�驟榊�縺ｧ縲�
     * style縺ｯMorph繧ｨ繝輔ぉ繧ｯ繝医↓縺ｪ繧峨▲縺ｦ縲√け繝ｩ繧ｹ蜷� or 繧､繝ｳ繝ｩ繧､繝ｳ縺ｮ繧ｹ繧ｿ繧､繝ｫ螳夂ｾｩ or CSS繝励Ο繝代ユ繧｣縺ｮ繝上ャ繧ｷ繝･縺ｧ謖�ｮ壼庄縲�
     * shadow繧稚rue縺ｫ縺吶ｋ縺ｨ蠖ｱ莉倥″譁�ｭ励↓縲｛utline繧稚rue縺ｫ縺吶ｋ縺ｨ逋ｽ謚懊″譁�ｭ励↓縺ｪ繧九�
     * temp縺ｫ繝輔ぅ繝ｼ繝ｫ繝牙､繧呈戟縺､繧ｪ繝悶ず繧ｧ繧ｯ繝医ｒ謖�ｮ壹☆繧九→縲￣rototype.js縺ｮTemplate繧ｯ繝ｩ繧ｹ繧貞茜逕ｨ縺ｧ縺阪ｋ縲�
     */
    createSimpleText: function() {
        var defaultOptions = { loc: [0, 0], style: {} };
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                text = param[0],
                textId = Object.isString(param[1]) ?
                    param[1] : 'text' + (this.currentId++).toPaddedString(3);
                options = Object.isString(param[1]) ?
                    Object.extend(defaultOptions, param[2] || {}) :
                    Object.extend(defaultOptions, param[1] || {});
        }
        else {
            var text = arguments[0],
                textId = Object.isString(arguments[1]) ?
                    arguments[1] : 'text' + (this.currentId++).toPaddedString(3);
                options = Object.isString(arguments[1]) ?
                    Object.extend(defaultOptions, arguments[2] || {}) :
                    Object.extend(defaultOptions, arguments[1] || {});
        }
        
        var element = new Element('DIV', { id: textId })
            .setStyle({
                zIndex: 200,
                position: 'absolute',
                left: options.loc[0] + 'px',
                top: options.loc[1] + 'px'
            }).hide();
        this.disp.insert(element);
        
        if (options.shadow) {
            if (Prototype.Browser.IE)
                element.setStyle('filter:progid:DXImageTransform.Microsoft.Shadow(Color=#333333, Direction=135, Strength=2);');
            else
                element.setStyle({ textShadow: '#000 2px 2px 2px' });
        }
        
        if (options.outline) {
            if (Prototype.Browser.IE)
                element.setStyle('filter:progid:DXImageTransform.Microsoft.Glow(color=#000000,strength=1);');
            else
                element.setStyle({ textShadow: '#000 0px -1px, #000 1px 0px, #000 0px 1px, #000 -1px 0px' });
        }
        
        if (!Object.isString(options.style))
            element.setStyle(options.style);
        else {
            if (options.style.include(':'))
                element.setStyle(options.style);
            else 
                element.addClassName(options.style);
        }
        
        new Effect.Event(Object.extend({
            delay: this.defer,
            afterFinish: function() {
                if (options.temp) {
                    if (options.temp == 'gameVars') {
                        var tpl = new Template(text);
                        text = tpl.evaluate(this.MData.gameVars);
                    }
                    else {
                        var parameter = this.findData(this.MData.template, options.temp) || {},
                            tpl = new Template(text);
                        text = tpl.evaluate(parameter);
                    }
                }
                element.update(text);
                
                this.eventUpdated = false;
            }.bind(this)
        }, options));
        
        return element;
    },
    
    /*
     * createSimpleText繝｡繧ｽ繝�ラ縺ｧ逋ｻ骭ｲ縺励◆繝�く繧ｹ繝医ｒ陦ｨ遉ｺ縲�
     * 隨ｬ1蠑墓焚縺ｯ逋ｻ骭ｲ縺励◆繝�く繧ｹ繝�ID蜷阪らｬｬ2蠑墓焚縺ｯ繧ｪ繝励す繝ｧ繝ｳ縲‥elay縺ｯ繧ｨ繝輔ぉ繧ｯ繝医ｒ驕�ｉ縺帙ｋ譎る俣縲�
     * effect縺ｯ"Appear"縺ｪ縺ｩ繧ｨ繝輔ぉ繧ｯ繝亥柑譫懊ｒ莉ｻ諢上〒謖�ｮ壹ＦffectOpt縺ｧ縺昴�繧ｨ繝輔ぉ繧ｯ繝医�繧ｪ繝励す繝ｧ繝ｳ繧呈欠螳壼庄縲�
     */
    dispSimpleText: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                name = param[0],
                options = param[1] || {};
        }
        else {
            var name = arguments[0],
                options = arguments[1] || {};
        }
        
        if (options.next) this.eventUpdated = false;
                
        var element = $(name),
            effect =  options.effect ?
                options.effect === true ? 'Appear' : options.effect.capitalize() : null;
        
        if (effect)
            Effect[effect](element, Object.extend({
                afterFinish: function() { if (!options.next) this.eventUpdated = false; }.bind(this)
            }, options.effectOpt || options));
        else {
            new Effect.Event(Object.extend({
                afterFinish: function() {
                    element.show();
                    if (!options.next) this.eventUpdated = false;
                }.bind(this)
            }, options));
        }
    },
    
    /*
     * createSimpleText繝｡繧ｽ繝�ラ縺ｧ逋ｻ骭ｲ縺励◆繝�く繧ｹ繝医ｒ繧ｿ繧､繝苓｡ｨ遉ｺ縲�
     * 隨ｬ1蠑墓焚縺ｯ逋ｻ骭ｲ縺励◆繝�く繧ｹ繝�ID蜷阪らｬｬ2蠑墓焚縺ｯ繧ｪ繝励す繝ｧ繝ｳ縲�
     */
    typeSimpleText: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                name = param[0],
                options = param[1] || {};
        }
        else {
            var name = arguments[0],
                options = arguments[1] || {};           
        }
        
        var element = $(name);
        new Effect.Event(Object.extend({
            delay: this.defer,
            afterFinish: function() {
                element.show();
                this.initType(element, this.disp);
            }.bind(this)
        }, options));
    },
    
    /*
     * createSimpleText繝｡繧ｽ繝�ラ縺ｧ逋ｻ骭ｲ縺励◆繝�く繧ｹ繝医↓繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ繧偵▽縺代ｋ縲�
     * 隨ｬ1蠑墓焚縺ｯ逋ｻ骭ｲ縺励◆繝�く繧ｹ繝�ID蜷阪らｬｬ2蠑墓焚縺ｫ繧ｨ繝輔ぉ繧ｯ繝郁ｩｳ邏ｰ繧帝�蛻励〒謖�ｮ壹�
     * 驟榊�縺ｮ隨ｬ1隕∫ｴ�縺ｫ繧ｨ繝輔ぉ繧ｯ繝亥錐縲∫ｬｬ2隕∫ｴ�縺ｯ蝓ｺ譛ｬ逧�↓繧ｨ繝輔ぉ繧ｯ繝医�繧ｪ繝励す繝ｧ繝ｳ縺悟�繧九�
     * 縺溘□縺励ヾcale縺ｪ縺ｩ蠢��亥ｼ墓焚縺悟ｿ�ｦ√↑繧ゅ�縺ｯ縲√お繝輔ぉ繧ｯ繝医〒豎ゅａ繧峨ｌ繧矩��分縺ｫ謖�ｮ壹＠縺ｪ縺代ｌ縺ｰ縺ｪ繧峨↑縺��
     * 縺ｾ縺溘￣arallel繧ｨ繝輔ぉ繧ｯ繝医�迚ｹ谿翫〒縲∫ｬｬ1蠑墓焚縺ｫ繧ｨ繝輔ぉ繧ｯ繝磯未謨ｰ縺九う繝ｳ繧ｹ繧ｿ繝ｳ繧ｹ繧帝�蛻励↓縺励※謖�ｮ夲ｼ�sync繝励Ο繝代ユ繧｣繧稚rue縺ｫ縺吶ｋ縺ｮ縺ｯ蠢倥ｌ縺壹↓�峨らｬｬ2蠑墓焚縺悟�騾壹�繧ｪ繝励す繝ｧ繝ｳ縺ｨ縺ｪ繧九�
     */
    animateSimpleText: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0];
            if (Object.isString(param[0])) {
                var textId = param[0],
                    argArray = param[1],
                    options = param[2] || {};
            }
            else {
                if (Object.isArray(param[0])) {
                    var effectArray = [],
                        argArray = param[1],
                        options = param[2] || {};
                    
                    (param[0].length).times(function(n) {
                        effectArray.push(param[0][n]);
                    });
                }
                else {
                    var effectArray = [],
                        argArray = arguments[1],
                        options = arguments[2] || {};
                    
                    (param.length).times(function(n) {
                        effectArray.push(param[n]);
                    });
                }
            }
        }
        else {
            var textId = arguments[0],
                argArray = arguments[1],
                options = arguments[2] || {};
        }
        
        if (options.next) this.eventUpdated = false;
        
        var defaultOptions = { afterFinish: function() { if (!options.next) this.eventUpdated = false; }.bind(this) };
        
        if (textId) var element = $(textId);
        
        var irregularEffects = ['Parallel', 'Scale', 'Tween'],
            effectName = argArray[0].capitalize();
        
        if (irregularEffects.include(effectName)) {
            switch (effectName) {
                case 'Parallel':
                    var effectOpt = Object.extend(defaultOptions, argArray[1] || {});
                        
                    new Effect.Parallel(effectArray, effectOpt);
                    
                    break;
                case 'Scale':
                    var scaleTo = argArray[1],
                        effectOpt = Object.extend(defaultOptions, argArray[2] || {});
                    
                    new Effect.Scale(element, scaleTo, effectOpt);
                    
                    break;
                case 'Tween':
                    var from = argArray[1],
                        to = argArray[2],
                        effectOpt = Object.isFunction(argArray[3]) || Object.isString(argArray[3]) ?
                            defaultOptions : Object.extend(defaultOptions, argArray[3] || {}),
                        propertyOrMethodNameOrCallback = Object.isFunction(argArray[3]) || Object.isString(argArray[3]) ? argArray[3] : argArray[4];
                    
                    new Effect.Tween(element, from, to, effectOpt, propertyOrMethodNameOrCallback);
                    
                    break;
            }
        }
        else {
            var otherCoreEffects = ['Highlight', 'Move', 'Opacity', 'Morph'],
                effectOpt = Object.extend(defaultOptions, argArray[1] || {});
            
            if (otherCoreEffects.include(effectName))
                new Effect[effectName](element, effectOpt);
            else
                Effect[effectName](element, effectOpt);
        }
    },
    
    /*
     * 陦ｨ遉ｺ荳ｭ縺ｮ繝�く繧ｹ繝医ｒ髫�縺吶Γ繧ｽ繝�ラ縲�
     * 隨ｬ1蠑墓焚縺ｯ逋ｻ骭ｲ縺励◆繝�く繧ｹ繝亥錐縲らｬｬ2蠑墓焚縺ｯ繧ｪ繝励す繝ｧ繝ｳ縲‥elay縺ｯ繧ｨ繝輔ぉ繧ｯ繝医ｒ驕�ｉ縺帙ｋ譎る俣縲�
     * effect縺ｯ"Fade"縺ｪ縺ｩ繧ｨ繝輔ぉ繧ｯ繝亥柑譫懊ｒ莉ｻ諢上〒謖�ｮ壹ＦffectOpt縺ｧ縺昴�繧ｨ繝輔ぉ繧ｯ繝医�繧ｪ繝励す繝ｧ繝ｳ繧呈欠螳壼庄縲�
     */
    hideSimpleText: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                name = param[0],
                options = param[1] || {};
        }
        else {
            var name = arguments[0],
                options = arguments[1] || {};
        }
        
        if (options.next) this.eventUpdated = false;
        
        var element = $(name),
            effect =  options.effect
                ? options.effect === true ? 'Fade' : options.effect.capitalize() : null;
        
        if (effect)
            Effect[effect](element, Object.extend({
                afterFinish: function() { if (!options.next) this.eventUpdated = false; }.bind(this)
            }, options.effectOpt || options));
        else {
            new Effect.Event({
                afterFinish: function() {
                    element.hide();
                    if (!options.next) this.eventUpdated = false;
                }.bind(this)
            });
        }
    },
    
    /*
     * 繝繧､繧｢繝ｭ繧ｰ繧定｡ｨ遉ｺ縺吶ｋ縲�
     * 隨ｬ1蠑墓焚縺ｯ繝繧､繧｢繝ｭ繧ｰ縺ｮ繝｡繝�そ繝ｼ繧ｸ蜀�ｮｹ縲らｬｬ2蠑墓焚縺ｯ繧ｪ繝励す繝ｧ繝ｳ縺ｧtype繧定ｨｭ螳壹〒縺阪ｋ縲ら怐逡･縺吶ｋ縺ｨalert縺ｫ縺ｪ繧九�
     * type繧段nput縺ｮ蝣ｴ蜷医》his.dialogResult縺ｫ蜈･蜉帛�螳ｹ縺御ｻ｣蜈･縺輔ｌ繧九�
     * type縺径lert縺ｮ蝣ｴ蜷医》his.dialogResult縺ｫtrue莉｣蜈･縺輔ｌ繧九ゅ↑縺翫‘nableCancel繧稚rue縺ｫ縺吶ｋ縺ｨ縲√く繝｣繝ｳ繧ｻ繝ｫ繝懊ち繝ｳ縺瑚｡ｨ遉ｺ縺輔ｌ繧九′縲√く繝｣繝ｳ繧ｻ繝ｫ繧帝∈縺ｶ縺ｨthis.dialogResult縺ｫfalse縺御ｻ｣蜈･縺輔ｌ繧九�
     */
    showDialog: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                dialogMsg = param[0],
                options = Object.extend({
                    type: 'alert'
                }, param[1] || {});
        }
        else {
            var dialogMsg = arguments[0],
                options = arguments[1] || {};
        }
        
        new Effect.Event(Object.extend({
            delay: this.defer,
            afterFinish: function() {
                this.dialogResult = Object.extend(this.dialogResult, {
                    inputText: null,
                    command: null
                });
                
                if (options.temp) {
                    if (options.temp == 'gameVars') {
                        var tpl = new Template(dialogMsg);
                        dialogMsg = tpl.evaluate(this.MData.gameVars);
                    }
                    else {
                        var parameter = this.findData(this.MData.template, options.temp) || {},
                            tpl = new Template(dialogMsg);
                        dialogMsg = tpl.evaluate(parameter);
                    }
                }
                
                this.dialogMsg.update(dialogMsg);
                
                this.modal.appear({
                    from: 0.2,
                    to: 0.8,
                    duration: 0.6,
                    afterFinishInternal: function() {
                        this.dialogWin.show();
                        
                        if (options.type == 'input') {
                            if (options.initValue)
                                this.inputText.setValue(options.initValue);
                            
                            this.inputText.show().activate();
                        }
                        else {
                            this.inputText.hide();
                        }
                        
                        if (options.enableCancel)
                            this.commandCancel.show();
                        else
                            this.commandCancel.hide();
                        
                    }.bind(this)
                } );
                
                this.waitForDialog(options.type);
            }.bind(this)
        }, options));
    },
    
    /*
     * 蜷�ｨｮ繧ｦ繧｣繝ｳ繝峨え繧定｡ｨ遉ｺ縺吶ｋ縲�
     * 隨ｬ1蠑墓焚縺ｯ繧ｦ繧｣繝ｳ繝峨え蜷阪〒逕ｻ髱｢荳企Κ縺ｮtitle縲∽ｸｭ螟ｮ縺ｮwarn縲∽ｸ矩Κ縺ｮmain縺九ｉ謖�ｮ壹☆繧九ら怐逡･譎ゅ�main縺瑚｡ｨ遉ｺ縺輔ｌ繧九らｬｬ2蠑墓焚縺ｯ繧ｪ繝励す繝ｧ繝ｳ縲‥elay縺ｯ繧ｨ繝輔ぉ繧ｯ繝医ｒ驕�ｉ縺帙ｋ譎る俣縲�
     */
    showWindow: function() {
        var defaultOptions = {
            delay: this.defer,
            from: 0.2,
            to: 0.8,
            duration: 0.6,
            afterFinish: function() { this.eventUpdated = false; }.bind(this)
        };
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                type = param[0] || 'main',
                options = Object.extend(defaultOptions, param[1] || {});
        }
        else {
            var type = arguments[0] || 'main',
                options = Object.extend(defaultOptions, arguments[1] || {});
        }
        
        switch (type) {
            case 'main':
                Effect.Appear(this.mainWin, options);
                break;
            case 'warn':
                Effect.Appear(this.warnWin, options);
                break;
            case 'title':
                Effect.Appear(this.titleWin, options);
                break;
        }
    },
    
    /*
     * 蜷�ｨｮ繧ｦ繧｣繝ｳ繝峨え繧帝撼陦ｨ遉ｺ縺ｫ縺吶ｋ縲�
     * 隨ｬ1蠑墓焚縺ｯ繧ｦ繧｣繝ｳ繝峨え蜷阪〒逕ｻ髱｢荳企Κ縺ｮtitle縲∽ｸｭ螟ｮ縺ｮwarn縲∽ｸ矩Κ縺ｮmain縺九ｉ謖�ｮ壹☆繧九ら怐逡･譎ゅ�main繧帝國縺吶らｬｬ2蠑墓焚縺ｯ繧ｪ繝励す繝ｧ繝ｳ縲‥elay縺ｯ繧ｨ繝輔ぉ繧ｯ繝医ｒ驕�ｉ縺帙ｋ譎る俣縲�
     */
    hideWindow: function() {
        var defaultOptions = {
            delay: this.defer,
            from: 0.8,
            to: 0.0,
            duration: 0.6
        };
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                type = param[0] || 'main',
                options = Object.extend(defaultOptions, param[1] || {});
        }
        else {
            var type = arguments[0] || 'main',
                options = Object.extend(defaultOptions, arguments[1] || {});
        }
        
        switch (type) {
            case 'main':
                Effect.Fade(this.mainWin, Object.extend({
                    beforeSetup: function() {
                        this.blackSheet.hide();
                    }.bind(this),
                    afterFinish: function() {
                        this.message.hide();
                        this.charName.hide();
                        this.charImg.setAttribute('src', '');
                        this.imgFrm.hide();
                        
                        this.eventUpdated = false;
                    }.bind(this)
                }, options));
                break;
            case 'warn':
                Effect.Fade(this.warnWin, Object.extend({
                    afterFinish: function() { this.eventUpdated = false; }.bind(this)
                }, options));
                break;
            case 'title':
                Effect.Fade(this.titleWin, Object.extend({
                    afterFinish: function() { this.eventUpdated = false; }.bind(this)
                }, options));
                break;
        }
    },
    
    /*
     * 繝｡繝�そ繝ｼ繧ｸ繧ｦ繧｣繝ｳ繝峨え縺ｫ繝�く繧ｹ繝医ｒ陦ｨ遉ｺ縺吶ｋ縲�
     * 隨ｬ1蠑墓焚縺ｯ繝�く繧ｹ繝亥�螳ｹ縲らｬｬ2蠑墓焚縺ｯ繧ｦ繧｣繝ｳ繝峨え縺ｮ繧ｿ繧､繝励〒逵∫払蜿ｯ縲�
     */
    dispMessage: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                msg = param[0],
                type = Object.isString(param[1]) ? param[1] : 'main',
                options = (Object.isString(param[1]) ? param[2] : param[1]) || {};
        }
        else {
            var msg = arguments[0],
                type = Object.isString(arguments[1]) ? arguments[1] : 'main',
                options = (Object.isString(arguments[1]) ? arguments[2] : arguments[1]) || {};
        }
        
        new Effect.Event(Object.extend({
            delay: this.defer,
            afterFinish: function() {
                if (options.temp) {
                    if (options.temp == 'gameVars') {
                        var tpl = new Template(msg);
                        msg = tpl.evaluate(this.MData.gameVars);
                    }
                    else {
                        var parameter = this.findData(this.MData.template, options.temp) || {},
                            tpl = new Template(msg);
                        msg = tpl.evaluate(parameter);
                    }
                }
                
                if (options.alignToCenter) {
                    this.message.setStyle({ textAlign: 'center' });
                }
                else {
                    this.message.setStyle({ textAlign: 'left' });
                }
                
                switch (type) {
                    case 'main':
                        this.message.setStyle({
                            width: this.dimensions.message[0][0] + 'px',
                            height: this.dimensions.message[0][1] + 'px',
                            left: this.dimensions.message[0][2] + 'px',
                            top: this.dimensions.message[0][3] + 'px'
                        });
                        
                        this.message.update(msg).show();
                        break;
                    case 'warn':
                        this.warnText.update(msg);
                        break;
                    case 'title':
                        this.titleText.update(msg);
                        break;
                }
                
                this.eventUpdated = false;
            }.bind(this)
        }, options));
    },
    
    /*
     * 繝｡繝�そ繝ｼ繧ｸ繧ｦ繧｣繝ｳ繝峨え縺ｫ繝�く繧ｹ繝医ｒ繧ｿ繧､繝苓｡ｨ遉ｺ縺吶ｋ縲�
     * 隨ｬ1蠑墓焚縺ｯ繝�く繧ｹ繝亥�螳ｹ縲らｬｬ2蠑墓焚縺ｫ隧ｱ縺玲焔繧呈欠螳壼庄縲らｬｬ3蠑墓焚縺ｯ繧ｪ繝励す繝ｧ繝ｳ縺�縺後∬ｩｱ縺玲焔縺ｮ鬘斐げ繝ｩ繝輔ぅ繝�け繧呈欠螳壹〒縺阪ｋ縲�
     * 繧ｪ繝励す繝ｧ繝ｳ縺ｮimage縺ｫ繝ｭ繝ｼ繝画凾逋ｻ骭ｲ縺励◆逕ｻ蜒丞錐繧呈欠螳壹√げ繝ｩ繝輔ぅ繝�け縺ｮ繧ｵ繧､繧ｺ縺ｯ96*96縲ゅ＞縺上▽繧ゅ�陦ｨ諠�ｒ荳ｦ縺ｹ縺溽判蜒上ｒ菴ｿ逕ｨ縺吶ｋ縺ｨ縺阪�offset縺ｫ謨ｴ謨ｰ蛟､��[x, y]縺ｮ驟榊�蠖｢蠑擾ｼ峨ｒ蜈･繧後※縺壹ｉ縺吶％縺ｨ縺後〒縺阪ｋ��1.0=96px�峨�
     * 縺ｾ縺溘∥lignToCenter繧稚rue縺ｫ縺吶ｋ縺ｨ繝悶Λ繧ｦ繧ｶ萓晏ｭ倥□縺後ユ繧ｭ繧ｹ繝医ｒ荳ｭ螟ｮ縺ｫ陦ｨ遉ｺ縺ｧ縺阪ｋ縲�
     */
    typeMessage: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                msg = param[0];
            
            if (param[1] && Object.isString(param[1])) 
                var chara = param[1], options = param[2] || {};
            else
                var chara = null, options = param[1] || {};
        }
        else {
            var msg = arguments[0];
            
            if (arguments[1] && Object.isString(arguments[1])) 
                var chara = arguments[1], options = arguments[2] || {};
            else
                var chara = null, options = arguments[1] || {};
        }
        
        new Effect.Event(Object.extend({
            delay: this.defer,
            afterFinish: function() {
                if (options.temp) {
                    if (options.temp == 'gameVars') {
                        var tpl = new Template(msg);
                        msg = tpl.evaluate(this.MData.gameVars);
                    }
                    else {
                        var parameter = this.findData(this.MData.template, options.temp) || {},
                            tpl = new Template(msg);
                        msg = tpl.evaluate(parameter);
                    }
                }
                
                if (options.alignToCenter)
                    this.message.setStyle({ textAlign: 'center' });
                else
                    this.message.setStyle({ textAlign: 'left' });
                
                if (options.image) {
                    var offset = options.offset || [0, 0];
                    this.charImg.writeAttribute({ src: '' });
                    if (chara) {
                        this.message.setStyle({
                            width: this.dimensions.message[3][0] + 'px',
                            height: this.dimensions.message[3][1] + 'px',
                            left: this.dimensions.message[3][2] + 'px',
                            top: this.dimensions.message[3][3] + 'px'
                        });
                        this.charName.setStyle({
                            width: this.dimensions.charName[1][0] + 'px',
                            left: this.dimensions.charName[1][1] + 'px',
                            top: this.dimensions.charName[1][2] + 'px'
                        });
                        this.charName.update(chara);
                        this.charName.show();
                    } else {
                        this.message.setStyle({
                            width: this.dimensions.message[2][0] + 'px',
                            height: this.dimensions.message[2][1] + 'px',
                            left: this.dimensions.message[2][2] + 'px',
                            top: this.dimensions.message[2][3] + 'px'
                        });
                        this.charName.hide();
                    }
                    this.charImg.setStyle({
                        top: offset[1] * -this.dimensions.faceImg[0] + 'px',
                        left: offset[0] * -this.dimensions.faceImg[1] + 'px'
                    });
                    
                    var imgUrl = this.imgObj[options.image].src;
                    this.charImg.writeAttribute({ src: imgUrl });
                    this.message.update(msg);
                    this.message.show();
                    this.imgFrm.show();
                    this.blackSheet.show();
                    
                } else {
                    if (chara) {
                        this.message.setStyle({
                            width: this.dimensions.message[1][0] + 'px',
                            height: this.dimensions.message[1][1] + 'px',
                            left: this.dimensions.message[1][2] + 'px',
                            top: this.dimensions.message[1][3] + 'px'
                        });
                        this.charName.setStyle({
                            width: this.dimensions.charName[0][0] + 'px',
                            left: this.dimensions.charName[0][1] + 'px',
                            top: this.dimensions.charName[0][2] + 'px'
                        });
                        this.charName.update(chara);
                        this.charName.show();
                    } else {
                        this.message.setStyle({
                            width: this.dimensions.message[0][0] + 'px',
                            height: this.dimensions.message[0][1] + 'px',
                            left: this.dimensions.message[0][2] + 'px',
                            top: this.dimensions.message[0][3] + 'px'
                        });
                        this.charName.hide();
                    }
                    this.message.update(msg);
                    this.message.show();
                    this.imgFrm.hide();
                    this.blackSheet.hide();
                }
                
                this.initType(this.message, this.mainWin);
            }.bind(this)
        }, options));
    },
    
    /*
     * 縺吶∋縺ｦ縺ｮ繧ｦ繧｣繝ｳ繝峨え縺ｮ蜀�ｮｹ繧呈ｶ亥悉縺吶ｋ縲ゅえ繧｣繝ｳ繝峨え閾ｪ菴薙�縺昴�縺ｾ縺ｾ谿九ｋ縲�
     */
    clearMessage: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                options = param[0] || {};
        }
        else {
            var options = arguments[0] || {};
        }
        new Effect.Event(Object.extend({
            delay: this.defer,
            afterFinish: function(){
                this.titleText.update('');
                this.warnText.update('');
                
                this.charImg.writeAttribute({ src: '' });
                this.imgFrm.hide();
                this.blackSheet.hide();
                this.charName.hide().update('');
                this.message.hide().update('');
                this.question.hide().update('');
                this.winAns.invoke('hide');
                this.winAns.invoke('update', '');
                this.winConf.invoke('hide');
                this.winConf.invoke('update', '');
                
                this.eventUpdated = false;
            }.bind(this)
        }, options));
    },
    
    /*
     * 驕ｸ謚櫁い縺ｮ蝠城｡後ｒ陦ｨ遉ｺ縲らｬｬ1蠑墓焚縺ｫ蝠城｡後�蜀�ｮｹ繧貞�繧後ｋ縲ＴhowAnswer縺虐howConfirm縺ｨ繧ｻ繝�ヨ縺ｧ菴ｿ逕ｨ縺吶ｋ縲�
     */
    showQuestion: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                question = param[0],
                options = param[1] || {};
        }
        else {
            var question = arguments[0],
                options = arguments[1] || {};
        }
        
        new Effect.Event(Object.extend({
            delay: this.defer,
            afterFinish: function() {
                if (options.temp) {
                    if (options.temp == 'gameVars') {
                        var tpl = new Template(question);
                        question = tpl.evaluate(this.MData.gameVars);
                    }
                    else {
                        var parameter = this.findData(this.MData.template, options.temp) || {},
                            tpl = new Template(question);
                        question = tpl.evaluate(parameter);
                    }
                }
                
                this.question.update(question).show();
                this.initType(this.question, this.mainWin);
            }.bind(this)
        }, options));
    },
    
    /*
     * 3縺､縺ｾ縺ｧ驕ｸ謚櫁い繧定｡ｨ遉ｺ縺ｧ縺阪ｋ縲らｬｬ1蠑墓焚縺ｯ驕ｸ謚櫁い縺ｮ蜀�ｮｹ繧帝�蛻励↓縺励◆繧ゅ�繧貞�繧後ｋ縲８aitToChoose繧､繝吶Φ繝医ｒ蠕後↓邯壹￠繧句ｿ�ｦ√′縺ゅｋ縲�
     * 繧ｪ繝励す繝ｧ繝ｳ縺ｫ縺ｯ縲�∈謚櫁い縺ｫ逡ｪ蜿ｷ繧呈険繧九°縺ｩ縺�°繧呈欠螳壹☆繧詰istNum�医ョ繝輔か繝ｫ繝医�true�峨→縲∝撫鬘梧枚縺碁聞縺吶℃縺ｦ繝ｬ繧､繧｢繧ｦ繝医′蟠ｩ繧後ｋ蝣ｴ蜷医�∈謚櫁い繧剃ｸ区婿蜷代↓縺壹ｉ縺吶°縺ｩ縺�°繧呈欠螳壹☆繧蟻lignToBtm縺後≠繧九�
     */
    showAnswer: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                answers = Object.isArray(param[0]) ? param[0] : param,
                options = Object.extend({
                    listNum: true,
                    alignToBtm: false
                }, param[1] || {});
        }
        else {
            var answers = arguments[0],
                options = Object.extend({
                    listNum: true,
                    alignToBtm: false
                }, arguments[1] || {});
        }
        
        if (options.listNum) {
            answers = answers.zip(['��', '��', '��'], function(tuple) {
                return tuple.reverse().join('縲�');
            });
        }
        
        new Effect.Event(Object.extend({
            delay: this.defer,
            afterFinish: function() {
                if (!options.alignToBtm) {
                    this.winAns.each(function(element, index) {
                        element.setStyle({
                            left: this.dimensions.answer[index][0][0] + 'px',
                            top: this.dimensions.answer[index][0][1] + 'px'
                        });
                    }.bind(this));
                }
                else {
                    this.winAns.each(function(element, index) {
                        element.setStyle({
                            left: this.dimensions.answer[index][0][0] + 'px',
                            top: this.dimensions.answer[index][1][1] + 'px'
                        });
                    }.bind(this));
                }
                
                if (options.temp) {
                    if (options.temp == 'gameVars') {
                        answers = answers.map(function(answer){
                            var tpl = new Template(answer);
                            return tpl.evaluate(this.MData.gameVars);
                        }.bind(this));
                    }
                    else {
                        var parameter = this.findData(this.MData.template, options.temp) || {};
                        answers = answers.map(function(answer){
                            var tpl = new Template(answer);
                            return tpl.evaluate(parameter);
                        }.bind(this));
                    }
                }
                
                this.winAns.each(function(element, index) {
                    element.update(answers[index]).setStyle({ color: '#FFF' })
                        .appear({
                            duration: 0.6
                        });
                });
                
                this.eventUpdated = false;
            }.bind(this)
        }, options));
    },
    
    //莠瑚�萱荳縺ｮ驕ｸ謚櫁い繧定｡ｨ遉ｺ縲らｬｬ1蠑墓焚縺ｯ驕ｸ謚櫁い縺ｮ蜀�ｮｹ繧帝�蛻励↓縺励◆繧ゅ�繧貞�繧後ｋ縲８aitToChoose繧､繝吶Φ繝医ｒ蠕後↓邯壹￠繧句ｿ�ｦ√′縺ゅｋ縲�
    showConfirm: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                confirm = Object.isArray(param[0]) ? param[0] : param,
                options = param[1] || {};
        }
        else {
            var confirm = arguments[0],
                options = arguments[1] || {};
        }
        
        new Effect.Event(Object.extend({
            delay: this.defer,
            afterFinish: function() {
                if (options.temp) {
                    if (options.temp == 'gameVars') {
                        var tpl = new Template(confirm);
                        confirm = tpl.evaluate(this.MData.gameVars);
                    }
                    else {
                        var parameter = this.findData(this.MData.template, options.temp) || {},
                            tpl = new Template(confirm);
                        confirm = tpl.evaluate(parameter);
                    }
                }
                
                this.winConfWrapper.show();
                this.winConf.each(function(element, index) {
                    element.stopObserving();
                    element.update(confirm[index]).setOpacity(0).appear({
                        duration: 0.6
                    });
                }.bind(this));
                
                this.eventUpdated = false;
            }.bind(this)
        }, options));
    },
    
    //驕ｸ謚櫁い縺ｮ繧､繝ｳ繝�ャ繧ｯ繧ｹ逡ｪ蜿ｷ��0��2�峨↓蠢懊§縺ｦ縲∝挨縺ｮ繧ｷ繝ｼ繝ｳ縺ｸ鬟帙�縺吶らｬｬ1蠑墓焚縺ｫ縺ｯ鬟帙�縺励◆縺�す繝ｼ繝ｳ蜷阪ｒ繧､繝ｳ繝�ャ繧ｯ繧ｹ逡ｪ蜿ｷ鬆�↓驟榊�縺ｫ縺励※蜈･繧後ｋ縲�
    toSelectedScene: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                scenes = Object.isArray(param[0]) ? param[0].map() : param.map();
        }
        else {
            var scenes = $A(arguments).map();
        }
        
        new Effect.Event({
            delay: this.defer,
            afterFinish: function() {
                if (this.selectedItem === null) return;
                
                var selectedScene = scenes.find(function(value, index) {
                    return this.selectedItem == index;
                }.bind(this));
                
                this.changeScene(selectedScene);
                this.selectedItem = null;
                
                this.eventUpdated = false;
            }.bind(this)
        });
    },
    
    /*
     * 謖�ｮ壹＠縺溘ご繝ｼ繝�蜀�､画焚縺ｫ縲�∈謚櫁い縺ｮ繧､繝ｳ繝�ャ繧ｯ繧ｹ逡ｪ蜿ｷ縺ｫ蠢懊§縺溷､繧剃ｻ｣蜈･縺吶ｋ縲らｬｬ1蠑墓焚縺ｯinitVars繧､繝吶Φ繝医〒險ｭ螳壹＠縺溷､画焚蜷阪�
     * 隨ｬ2蠑墓焚縺ｯ驟榊�縲る∈謚櫁い縺ｫ繧､繝ｳ繝�ャ繧ｯ繧ｹ逡ｪ蜿ｷ鬆��蛟､繧定ｨｭ螳壹☆繧九�"+1"縲�"-5"縺ｮ繧医≧縺ｫ貍皮ｮ怜ｭ舌ｒ蜈磯�ｭ縺ｫ縺､縺代◆譁�ｭ怜�縺ｫ縺吶ｋ縺薙→縺ｧ莉｣蜈･蜈医�螟画焚縺ｮ蛟､縺ｨ貍皮ｮ励′蜿ｯ閭ｽ縲�
     */
    insertSelectedValue: function() {
        var values = [];
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                changeVar = param[0],
                values = param[1];
            
            if (!Object.isArray(values)) {
                values = [];
                param.length.times(function(n) {
                    values.push(param[n + 1]);
                });
                if (Object.prototype.toString.apply(values.last()) == '[object Object]') values.pop();
            }
        }
        else {
            var changeVar = arguments[0],
                values = arguments[1];
        }
        new Effect.Event({
            delay: this.defer,
            afterFinish: function() {
                if (this.selectedItem === null) return;
                
                var value = values.find(function(val, index) {
                    return this.selectedItem == index;
                }.bind(this)).toString();
                var reg = /^[\+\-\*\/%]\d+/;
                if (value.match(reg))
                    this.MData.gameVars[changeVar] = eval(this.MData.gameVars[changeVar] + value).round();
                else
                    this.MData.gameVars[changeVar] = value;
                
                this.selectedItem = null;
                
                this.eventUpdated = false;
            }.bind(this)
        });
    },
    
    //繝繧､繧｢繝ｭ繧ｰ縺ｮ邨先棡繧偵∵欠螳壹＠縺溘ご繝ｼ繝�蜀�､画焚縺ｫ莉｣蜈･縺吶ｋ縲�
    insertDialogResult: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                changeVar = param[0];
        }
        else
            var changeVar = arguments[0];
        
        new Effect.Event({
            delay: this.defer,
            afterFinish: function() {
                if (this.dialogResult.command === null) return;
                
                this.MData.gameVars[changeVar] = this.dialogResult.inputText !== null ?
                    this.dialogResult.inputText : this.dialogResult.command;
                
                this.dialogResult = Object.extend(this.dialogResult, {
                    inputText: null,
                    command: null
                });
                
                this.eventUpdated = false;
            }.bind(this)
        });
    },
    
    //驕ｸ謚櫁い繧�ム繧､繧｢繝ｭ繧ｰ縺ｨ髢｢菫ゅ↑縺上√ご繝ｼ繝�蜀�､画焚縺ｫ蛟､繧剃ｻ｣蜈･縺励◆縺��ｴ蜷医↓菴ｿ縺�らｬｬ1蠑墓焚縺ｫ蛟､繧定ｨｭ螳壹☆繧九′縲�"+1"縲�"-5"縺ｮ繧医≧縺ｫ貍皮ｮ怜ｭ舌ｒ蜈磯�ｭ縺ｫ縺､縺代◆譁�ｭ怜�縺ｫ縺吶ｋ縺薙→縺ｧ莉｣蜈･蜈医�螟画焚縺ｮ蛟､縺ｨ貍皮ｮ励′蜿ｯ閭ｽ縲�
    insertCalculatedValue: function() {
        var values = [];
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                changeVar = param[0],
                value = param[1];
            
        }
        else {
            var changeVar = arguments[0],
                value = arguments[1];
        }
        
        new Effect.Event({
            delay: this.defer,
            afterFinish: function() {
                var reg = /^[\+\-\*\/%]\d+/;
                if (Object.isString(value) && value.match(reg))
                    this.MData.gameVars[changeVar] = eval(this.MData.gameVars[changeVar] + value).round();
                else
                    this.MData.gameVars[changeVar] = value;
                
                this.eventUpdated = false;
            }.bind(this)
        });
    },
    
    //繧ｲ繝ｼ繝�蜀��繝輔Λ繧ｰ繧貞�譛溷喧縺吶ｋ縲らｬｬ1蠑墓焚縺ｯ縲√ヵ繝ｩ繧ｰID�域枚蟄怜��峨→繝輔Λ繧ｰ蛟､��true/false�峨ｒ谺｡縺ｮ繧医≧縺ｫ繧ｪ繝悶ず繧ｧ繧ｯ繝亥ｽ｢蠑上↓縺励※驟榊�縺ｫ蜈･繧後ｋ縲ゑｼ井ｾ具ｼ閲 id: 'flag1', value: false }
    initFlagData: function() {
        var param = arguments[0];
        if (Object.isString(param[0])) {
            var ids = [], values = [];
            param.each(function(value, index) {
                if (index % 2 === 0)
                    ids.push(value);
                else
                    values.push(value);
            });
            
            var flagArray = ids.map(function(value, index) {
                return { id: ids[index], value: values[index] };
            });
        }
        else
            var flagArray = param;
        
        new Effect.Event({
            delay: this.defer,
            afterFinish: function() {
                flagArray.each(function(obj) {
                    this.flag.push(obj);
                }.bind(this));
                
                this.eventUpdated = false;
            }.bind(this)
        });
    },
    
    getFlagValue: function(flagId) {
        return this.findData(this.flag, flagId).value;
    },
    
    //繝輔Λ繧ｰ縺ｮ蛟､繧貞､画峩縺吶ｋ縲らｬｬ1蠑墓焚縺ｫ繝輔Λ繧ｰID縲∫ｬｬ2蠑墓焚縺ｫ繝輔Λ繧ｰ蛟､��true/false�峨ｒ蜈･繧後ｋ縲�
    setFlag: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                flagId = param[0],
                value = param[1];
        }
        else
            var flagId = arguments[0],
                value = arguments[1];
        
        new Effect.Event({
            delay: this.defer,
            afterFinish: function() {
                var flagObj = this.findData(this.flag, flagId);
                flagObj.value = value;
                
                this.eventUpdated = false;
            }.bind(this)
        });
    },
    
    //繝輔Λ繧ｰ縺ｮ蛟､繧偵メ繧ｧ繝�け縺励※true縺�縺｣縺溘→縺阪�縺ｿ蛻･縺ｮ繧ｷ繝ｼ繝ｳ縺ｫ鬟帙�縺吶らｬｬ1蠑墓焚縺ｫ繝輔Λ繧ｰID縲∫ｬｬ2蠑墓焚縺ｫ繧ｷ繝ｼ繝ｳ蜷阪ｒ蜈･繧後ｋ縲ょ､縺掲alse縺�縺｣縺溘→縺阪�菴輔ｂ縺励↑縺��
    flagCheck: function(flagId, sceneName) {
        new Effect.Event({
            delay: this.defer,
            afterFinish: function() {
                var flagObj = this.findData(this.flag, flagId);
                if (flagObj.value === true)
                    this.addScene(sceneName);
                
                this.eventUpdated = false;
            }.bind(this)
        });
    },
    
    getStoryLevel: function() {
        return this.story;
    },
    
    //繧ｹ繝医�繝ｪ繝ｼ繝ｬ繝吶Ν繧定ｨｭ螳壹☆繧九らｬｬ1蠑墓焚縺ｫ0莉･荳翫�謨ｴ謨ｰ蛟､繧貞�繧後ｋ縲�
    setStory: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                storyLevel = param[0];
        }
        else
            var storyLevel = arguments[0];
        
        new Effect.Event({
            delay: this.defer,
            afterFinish: function() {
                this.story = storyLevel;
                
                this.eventUpdated = false;
            }.bind(this)
        });
    },
    
    //繧ｹ繝医�繝ｪ繝ｼ繝ｬ繝吶Ν縺ｫ蠢懊§縺ｦ蛻･繧ｷ繝ｼ繝ｳ縺ｫ鬟帙�縺吶ら樟蝨ｨ縺ｮ繧ｹ繝医�繝ｪ繝ｼ繝ｬ繝吶Ν縺携reaterThan莉･荳翫〕essThan譛ｪ貅縺ｧ縺ゅｌ縺ｰ襍ｷ蜍輔りｩｲ蠖薙＠縺ｪ縺代ｌ縺ｰ菴輔ｂ縺励↑縺��
    storyCheck: function(sceneName, greaterThan, lessThan) {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                sceneName = param[0],
                greaterThan = param[1],
                lessThan = param[2];
        }
        else
            var sceneName = arguments[0],
                greaterThan = arguments[1],
                lessThan = arguments[2];
        
        new Effect.Event({
            delay: this.defer,
            afterFinish: function() {
                if (!lessThan) {
                    if (greaterThan <= this.story)
                        this.addScene(sceneName);
                }
                else {
                    if (greaterThan <= this.story && lessThan > this.story)
                        this.addScene(sceneName);
                }
                
                this.eventUpdated = false;
            }.bind(this)
        });
    },
    
    //蜊倡ｴ斐↓隨ｬ1蠑墓焚縺ｧ蜿励￠蜿悶▲縺溘す繝ｼ繝ｳ蜷阪↓鬟帙�縺吶�
    changeScene: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                sceneName = param[0],
                index = param[1] || 0;
        }
        else
            var sceneName = arguments[0],
                index = arguments[1] || 0;
        
        new Effect.Event({
            delay: this.defer,
            afterFinish: function() {
                this.addScene(sceneName, index);
                this.eventUpdated = false;
            }.bind(this)
        });
    },
    
    //蠑墓焚縺ｨ縺励※荳弱∴繧峨ｌ縺滄未謨ｰ繧貞ｮ溯｡後☆繧九らｬｬ1蠑墓焚縺ｫ髢｢謨ｰ繝ｪ繝�Λ繝ｫ繧呈ｸ｡縺吶′縲∵枚蟄怜�縺ｫ縺ｪ縺｣縺ｦ縺�※繧ょ庄縲�
    executeCode: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                userFunc = param[0],
                options = param[1] || {};
            if (Object.isString(userFunc) && userFunc.match(/^function.*?\{/)) {
                userFunc = userFunc.replace(/function.*?\{/, '').replace(/\}\W*$/, '').strip();
                userFunc = new Function(userFunc);
            }
        }
        else {
            var userFunc = arguments[0],
                options = arguments[1] || {};
            if (Object.isString(userFunc) && userFunc.match(/^function.*?\{/)) {
                var userFunc = arguments[0],
                    options = arguments[1] || {};
                userFunc = userFunc.replace(/function.*?\{/, '').replace(/\}\W*$/, '').strip();
                userFunc = new Function(userFunc);
            }
        }
        
        if (options.next) this.eventUpdated = false;
        
        userFunc = userFunc.bind(this);
        
        new Effect.Event(Object.extend({
            delay: this.defer,
            afterFinish: function() { userFunc(); if (!options.next) this.eventUpdated = false; }.bind(this)
        }, options));
    },
        
    /*
     * 逕ｻ蜒丈ｽ懈�繝｡繧ｽ繝�ラ縲ゅ◆縺�縺励√％縺ｮ繝｡繧ｽ繝�ラ繧貞ｮ溯｡後＠縺溘□縺代〒縺ｯ陦ｨ遉ｺ縺輔ｌ縺ｪ縺��縺ｧ豕ｨ諢上�
     * 隨ｬ1蠑墓焚縺ｫ逋ｻ骭ｲ縺輔ｌ縺溽判蜒丞錐縲∫ｬｬ2蠑墓焚縺ｫ逕ｻ蜒終D繧呈ｸ｡縺吶らｬｬ3蠑墓焚縺ｯ繧ｪ繝励す繝ｧ繝ｳ縺ｧ繧ｪ繝悶ず繧ｧ繧ｯ繝亥ｽ｢蠑上〒貂｡縺吶ＥivSize縺ｫ繝輔Ξ繝ｼ繝�縺ｮ繧ｵ繧､繧ｺ縲（mgSize縺ｫ逕ｻ蜒上�繧ｵ繧､繧ｺ縲�
     * loc縺ｫ繝輔Ξ繝ｼ繝�縺ｮ蠎ｧ讓吶｝arent縺ｫ隕ｪ隕∫ｴ��育怐逡･縺輔ｌ縺溷�ｴ蜷医》his.disp縺ｫ�峨ｒ謖�ｮ壹〒縺吶ｋ縲ＪmgSize縺ｯ逵∫払蜿ｯ縺�縺後！E縺ｧ荳榊�蜷医′蜃ｺ繧九こ繝ｼ繧ｹ縺後≠繧翫‥ivSize縺ｨ繧ｵ繧､繧ｺ繧貞粋繧上○繧区婿縺後＞縺��
     * 萓具ｼ嘴 divSize: [100, 100], imgSize: [50, 50], loc: [50, 100], parent: obj }
     */
    createImage: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                name = param[0],
                imageId = Object.isString(param[1]) ? param[1] :
                    'image' + (this.currentId++).toPaddedString(3),
                options = (!Object.isString(param[1]) ? param[1] : param[2]) || {};
        }
        else {
            var name = arguments[0],
                imageId = Object.isString(arguments[1]) ? arguments[1] :
                    'image' + (this.currentId++).toPaddedString(3),
                options = (!Object.isString(arguments[1]) ? arguments[1] : arguments[2]) || {};
        }
        
        var imgDiv = this.images[imageId] = $(this.imgTemp.cloneNode(true)).hide();
        imgDiv.identify();
        if (options) {
            if (options.divSize) {
                imgDiv.setStyle({
                    width: options.divSize[0] + 'px',
                    height: options.divSize[1] + 'px'
                });
            }
            if (options.loc) {
                imgDiv.setStyle({
                    left: options.loc[0] + 'px',
                    top: options.loc[1] + 'px'
                });
            }
            if (options.imgSize) {
                imgDiv.firstDescendant().setStyle({
                    width: options.imgSize[0] + 'px',
                    height: options.imgSize[1] + 'px'
                });
            }
            if (options.zIndex && Object.isNumber(options.zIndex))
                imgDiv.setStyle({ zIndex: options.zIndex });
        }
        
        var imgUrl = this.imgObj[name].src;
        imgDiv.firstDescendant().writeAttribute('src', imgUrl);
        
        if (options && options.parent)
            options.parent.insert(imgDiv);
        else
            this.disp.insert(imgDiv);
        
        new Effect.Event(Object.extend({
            delay: this.defer,
            afterFinish: function() { this.eventUpdated = false; }.bind(this)
        }));
        
        return imgDiv;
    },
    
    //逕ｻ蜒上ｒ陦ｨ遉ｺ縺輔○繧九Γ繧ｽ繝�ラ縲らｬｬ1蠑墓焚縺ｫ逋ｻ骭ｲ縺励◆逕ｻ蜒終D繧呈ｸ｡縺吶り｡ｨ遉ｺ縺ｫ縺ｯ繝�ヵ繧ｩ繝ｫ繝医〒繝輔ぉ繝ｼ繝峨′縺九°繧九らｬｬ2蠑墓焚縺ｮnoEffect繧ｪ繝励す繝ｧ繝ｳ繧稚rue縺ｫ縺励※繧ｨ繝輔ぉ繧ｯ繝医↑縺励↓縺吶ｋ縺薙→繧ゅ〒縺阪ｋ縲�
    showImage: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                imageId = param[0],
                options = param[1] || {};
        }
        else {
            var imageId = arguments[0],
                options = arguments[1] || {};
        }
        
        if (options.next) this.eventUpdated = false;
        
        var duration = options.noEffect ? 0.0 : options.duration ? options.duration : 0.6;
        
        Effect.Appear(this.images[imageId], Object.extend({
            delay: this.defer,
            duration: duration,
            afterFinish: function() { if (!options.next) this.eventUpdated = false; }.bind(this)
        }, options));
    },
    
    //逕ｻ蜒上ｒ髫�縺吶Γ繧ｽ繝�ラ縲らｬｬ1蠑墓焚縺ｫ逋ｻ骭ｲ縺励◆逕ｻ蜒終D繧呈ｸ｡縺吶り｡ｨ遉ｺ縺ｫ縺ｯ繝�ヵ繧ｩ繝ｫ繝医〒繝輔ぉ繝ｼ繝峨′縺九°繧九らｬｬ2蠑墓焚縺ｮnoEffect繧ｪ繝励す繝ｧ繝ｳ繧稚rue縺ｫ縺励※繧ｨ繝輔ぉ繧ｯ繝医↑縺励↓縺吶ｋ縺薙→繧ゅ〒縺阪ｋ縲�
    hideImage: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                imageId = param[0],
                options = param[1] || {};
        }
        else {
            var imageId = arguments[0],
                options = arguments[1] || {};
        }
        
        if (options.next) this.eventUpdated = false;
        
        var duration = options.noEffect ?
            0.0 : options.duration ? options.duration : 0.6;
        
        Effect.Fade(this.images[imageId], Object.extend({
            delay: this.defer,
            duration: duration,
            afterFinish: function() { if (!options.next) this.eventUpdated = false; }.bind(this)
        }, options));
    },
    
    //逕ｻ蜒上↓繧｢繝九Γ繝ｼ繧ｷ繝ｧ繝ｳ繧偵￥繧上∴繧九Γ繧ｽ繝�ラ縲らｬｬ1蠑墓焚縺ｫ逋ｻ骭ｲ縺励◆逕ｻ蜒終D繧呈ｸ｡縺吶ゅ◎繧御ｻ･螟悶�險ｭ螳壹�animateSimpleText縺ｨ蜷後§縲�
    animateImage: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0];
            if (Object.isString(param[0])) {
                var imageId = param[0],
                    argArray = param[1],
                    options = param[2] || {};
            }
            else {
                if (Object.isArray(param[0])) {
                    var effectArray = [],
                        argArray = param[1],
                        options = param[2] || {};
                    
                    (param[0].length).times(function(n) {
                        effectArray.push(param[0][n]);
                    });
                }
                else {
                    var effectArray = [],
                        argArray = arguments[1],
                        options = arguments[2] || {};
                    
                    (param.length).times(function(n) {
                        effectArray.push(param[n]);
                    });
                }
            }
        }
        else {
            var imageId = arguments[0],
                argArray = arguments[1],
                options = arguments[2];
        }
        
        if (options.next) this.eventUpdated = false;
        var defaultOptions = { afterFinish: function() { if (!options.next) this.eventUpdated = false; }.bind(this) };
        
        var irregularEffects = ['Parallel', 'Scale', 'Tween'],
            effectName = argArray[0].capitalize();
        
        if (irregularEffects.include(effectName)) {
            switch (effectName) {
                case 'Parallel':
                    var effectOpt = Object.extend(defaultOptions, argArray[1] || {});
                        
                    new Effect.Parallel(effectArray, effectOpt);
                    
                    break;
                case 'Scale':
                    var scaleTo = argArray[1],
                        effectOpt = Object.extend(defaultOptions, argArray[2] || {});
                    
                    new Effect.Scale(this.images[imageId], scaleTo, effectOpt);
                    
                    break;
                case 'Tween':
                    var from = argArray[1],
                        to = argArray[2],
                        effectOpt = Object.isFunction(argArray[3]) || Object.isString(argArray[3]) ?
                            defaultOptions : Object.extend(defaultOptions, argArray[3] || {}),
                        propertyOrMethodNameOrCallback = Object.isFunction(argArray[3]) || Object.isString(argArray[3]) ? argArray[3] : argArray[4];
                    
                    new Effect.Tween(this.images[imageId], from, to, effectOpt, propertyOrMethodNameOrCallback);
                    
                    break;
            }
        }
        else {
            var otherCoreEffects = ['Highlight', 'Move', 'Opacity', 'Morph'],
                effectOpt = Object.extend(defaultOptions, argArray[1] || {});
            
            if (otherCoreEffects.include(effectName))
                new Effect[effectName](this.images[imageId], effectOpt);
            else
                Effect[effectName](this.images[imageId], effectOpt);
        }
    },
    
    /*
     * 逕ｻ蜒上↓繧ｯ繝ｪ繝�き繝悶Ν繝槭ャ繝励ｒ縺上ｏ縺医ｋ繝｡繧ｽ繝�ラ縲ゆｺ句燕縺ｫ繧ｨ繝ｪ繧｢蠎ｧ讓吶ｒezHTML縺ｪ縺ｩ縺ｮ繝��繝ｫ縺ｧ蜿門ｾ励＠縺ｦ縺翫￥蠢�ｦ√′縺ゅｋ縲�
     * 隨ｬ1蠑墓焚縺ｫ逋ｻ骭ｲ縺励◆逕ｻ蜒終D縲∫ｬｬ2蠑墓焚縺ｯ繧ｪ繝励す繝ｧ繝ｳ縺ｧ繧ｪ繝悶ず繧ｧ繧ｯ繝亥ｽ｢蠑上〒貂｡縺吶ＮapArea縺ｯshape繝励Ο繝代ユ繧｣縺ｨcoords繝励Ο繝代ユ繧｣繧呈戟縺､繧ｪ繝悶ず繧ｧ繧ｯ繝医�
     * shape縺ｫ"rect"縲�"circle"縲�"poly"縺ｮ縺�★繧後°繧偵…oords縺ｫ"100,50,200,150"縺ｮ繧医≧縺ｪ蠎ｧ讓吶ｒ繧ｳ繝ｳ繝槭〒蛹ｺ蛻�▲縺滓枚蟄怜�繧呈ｸ｡縺吶�
     * callback縺ｫ縺ｯ繧ｯ繝ｪ繝�け譎ゅ↓蜻ｼ縺ｳ蜃ｺ縺咎未謨ｰ繧定ｨｭ螳壹☆繧九�
     */
    addImageMap: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                imageId = param[0],
                options = param[1] || {};
        }
        else {
            var imageId = arguments[0],
                options = arguments[1] || {};
        }
        
        this.images[imageId].down('IMG').writeAttribute({ useMap: '#' + imageId });
        
        if (options.mapArea)
            this.disp.insert('<map name="' + imageId + '"><area nohref="nohref" shape="' + options.mapArea.shape + '" coords="' + options.mapArea.coords + '" /></map>');
        else
            this.disp.insert('<map name="' + imageId + '"><area nohref="nohref" shape="default" /></map>');
        
        var callback = options.callback || Prototype.emptyFunction;
        if (Object.isString(callback) && callback.match(/^function.*?\{/)) {
            callback = callback.replace(/^function.*?\{/, '').replace(/\}\W*$/, '').strip();
            callback = new Function(callback);
        }
        
        $$('map[name=' + imageId + '] area').first().setStyle({ cursor: 'pointer' })
            .observe('click', callback.bindAsEventListener(this));
        
        new Effect.Event(Object.extend({
            delay: this.defer,
            afterFinish: function() { this.eventUpdated = false; }.bind(this)
        }));
    },
    
    /*
     * 閭梧勹逕ｻ蜒上ｒ險ｭ螳壹☆繧九Γ繧ｽ繝�ラ縲ゅ％縺ｮ繝｡繧ｽ繝�ラ繧貞ｮ溯｡後＠縺溘□縺代〒縺ｯ菴輔ｂ陦ｨ遉ｺ縺輔ｌ縺ｪ縺��縺ｧ豕ｨ諢上ゅΓ繧､繝ｳ縺ｨ繧ｵ繝悶�蛻�ｊ譖ｿ縺医′蜿ｯ閭ｽ縲らｬｬ1蠑墓焚縺ｫ逋ｻ骭ｲ縺励◆逕ｻ蜒丞錐縲∫ｬｬ2蠑墓焚縺ｯ"main"縺�"sub"縺ｫ縲ら怐逡･縺吶ｋ縺ｨ"main"縺ｫ縺ｪ繧九�
     * 隨ｬ3蠑墓焚縺後が繝励す繝ｧ繝ｳ縲ら判蜒上�菴咲ｽｮ螟画峩縺ｯloc��[x, y]�峨〒縲√し繧､繧ｺ螟画峩縺ｯsize�亥ｮ滄圀縺ｯCSS縺ｧ縺ｪ縺上（mg隕∫ｴ�縺ｮwidth螻樊ｧ繧貞､画峩縺吶ｋ縲ゅョ繝輔か繝ｫ繝医�auto縲�100%縺ｫ螟画峩縺吶ｋ縺ｨ縺阪↑縺ｩ縺ｫ菴ｿ縺�ｼ峨〒險ｭ螳壹☆繧九�
     */ 
    changeBgImg: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                imgUrl = this.imgObj[param[0]].src,
                witch = param[1] || 'main',
                options = Object.extend({
                    loc: [0, 0],
                    size: 'auto'
                }, param[2] || {});
        }
        else {
            var imgUrl = this.imgObj[arguments[0]].src,
                witch = arguments[1] || 'main',
                options = Object.extend({
                    loc: [0, 0],
                    size: 'auto'
                }, arguments[2] || {});
        }
        
        new Effect.Event({
            delay: this.defer,
            afterFinish: function() {
                this.bgImage[witch].setStyle({
                    top: options.loc[1] + 'px',
                    left: options.loc[0] + 'px'
                })
                .down('IMG')
                    .setStyle({ width: options.size })
                    .writeAttribute({ src: imgUrl });
                
                this.eventUpdated = false;
            }.bind(this)
        });
    },
    
    /*
     * 閭梧勹逕ｻ蜒上ｒ陦ｨ遉ｺ縺吶ｋ繝｡繧ｽ繝�ラ縲らｬｬ1蠑墓焚縺ｯ繝｡繧､繝ｳ縺九し繝悶�繧ｦ繧｣繝ｳ繝峨え繧呈欠螳壹ら怐逡･縺吶ｋ縺ｨ"main"縺ｫ縲�
     * 隨ｬ2蠑墓焚縺ｯ繧ｪ繝励す繝ｧ繝ｳ縲］oEffect繧稚rue縺ｫ縺励※繝輔ぉ繝ｼ繝峨お繝輔ぉ繧ｯ繝医↑縺励↓縺吶ｋ縺薙→繧ゅ〒縺阪ｋ縲�
     */
    showBackground: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                witch = param[0] || 'main',
                options = param[1] || {};
        }
        else {
            var witch = arguments[0] || 'main',
                options = arguments[1] || {};
        }
        
        if (options.next) this.eventUpdated = false;
        
        var duration = options.noEffect ?
            0.0 : options.duration ? options.duration : 0.6;
        
        Effect.Appear(this.bgImage[witch], Object.extend({
            delay: this.defer,
            from: 0.2,
            to: 1.0,
            duration: duration,
            afterFinish: function() { if (!options.next) this.eventUpdated = false; }.bind(this)
        }, options));
    },
    
    //閭梧勹逕ｻ蜒上ｒ髫�縺吶Γ繧ｽ繝�ラ縲らｬｬ1蠑墓焚縺ｯ繝｡繧､繝ｳ縺九し繝悶�繧ｦ繧｣繝ｳ繝峨え繧呈欠螳壹ら怐逡･縺吶ｋ縺ｨ"main"縺ｫ縲�
    hideBackground: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                witch = param[0] || 'main',
                options = param[1] || {};
        }
        else {
            var witch = arguments[0] || 'main',
                options = arguments[1] || {};
        }
        
        if (options.next) this.eventUpdated = false;
            
        var duration = options.noEffect ?
            0.0 : options.duration ? options.duration : 0.6;
        
        Effect.Fade(this.bgImage[witch], Object.extend({
            delay: this.defer,
            duration: duration,
            afterFinish: function() { if (!options.next) this.eventUpdated = false; }.bind(this)
        }, options));
    },
    
    //繝｡繧､繝ｳ縺ｨ繧ｵ繝悶�閭梧勹逕ｻ蜒上ｒ繧ｯ繝ｭ繧ｹ繝輔ぉ繝ｼ繝峨＆縺帙ｋ繝｡繧ｽ繝�ラ縲らｬｬ1蠑墓焚縺ｯ蜈ｱ騾壹が繝励す繝ｧ繝ｳ縺ｧdelay縲‥uration縺ｪ縺ｩ繧偵そ繝�ヨ縺吶ｋ縲�
    crossfadeBackground: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                options = Object.extend({
                    duration: 1.5,
                    afterFinish: function() { if (!options.next) this.eventUpdated = false; }.bind(this)
                }, param[0] || {});
        }
        else {
            var options = Object.extend({
                duration: 1.5,
                afterFinish: function() { if (!options.next) this.eventUpdated = false; }.bind(this)
            }, arguments[0] || {});
        }
        
        if (options.next) this.eventUpdated = false;
        
        new Effect.Event({
            delay: this.defer,
            afterFinish: function() {
                var mainEffect = this.bgImage.main.visible() ? 'Fade' : 'Appear',
                    subEffect = mainEffect == 'Fade' ? 'Appear' : 'Fade';
                
                new Effect.Parallel([
                    Effect[mainEffect](this.bgImage.main, { sync: true }),
                    Effect[subEffect](this.bgImage.sub, { sync: true })
                ], options);
            }.bind(this)
        });
    },
    
    
    
    //謖�ｮ壹�繧ｿ繧､繝溘Φ繧ｰ縺ｧ髻ｳ讌ｽ蜀咲函縺輔○繧九Γ繧ｽ繝�ラ縲らｬｬ1蠑墓焚縺ｫ逋ｻ骭ｲ縺励◆譖ｲ蜷阪∫ｬｬ2蠑墓焚縺ｫ"bgm"縺�"snd"繧帝∈謚槭�
    playEventMusic: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                trackName = param[0],
                type = param[1] || 'bgm',
                options = param[2] || {};
        }
        else {
            var trackName = arguments[0],
                type = arguments[1] || 'bgm',
                options = arguments[2] || {};
        }
        
        new Effect.Event(Object.extend({
            delay: this.defer,
            afterFinish: function() {
                var musicOpt = type == 'bgm' ? Object.extend({ loop: true }, options) : options;
                this.playMusic(trackName, type, musicOpt);
                this.eventUpdated = false;
            }.bind(this)
        }, options));
    },
    
    //謖�ｮ壹�繧ｿ繧､繝溘Φ繧ｰ縺ｧ髻ｳ讌ｽ繧貞●豁｢縺輔○繧九Γ繧ｽ繝�ラ縲ょｼ墓焚縺ｯ謖�ｮ壹＠縺ｪ縺上※繧ょ庄縲�
    stopEventMusic: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                type = param[0] || 'bgm',
                options = param[1] || {};
        }
        else {
            var type = arguments[0] || 'bgm',
                options = arguments[1] || {};
        }
        
        new Effect.Event(Object.extend({
            delay: this.defer,
            afterFinish: function() {
                this.stopMusic(type, options);
                this.eventUpdated = false;
            }.bind(this)
        }, options));
    },
    
    //繝弱�繝ｫ鬚ｨ繧ｦ繧｣繝ｳ繝峨え繧定｡ｨ遉ｺ縺吶ｋ縲�
    showTextWin: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                options = param[0] || {};
        }
        else {
            var options = arguments[0] || {};
        }
        
        if (options.next) this.eventUpdated = false;
        
        Effect.Appear(this.textWin, Object.extend({
            delay: this.defer,
            from: 0.2,
            to: 0.8,
            duration: 0.6,
            afterFinish: function() { if (!options.next) this.eventUpdated = false; }.bind(this)
        }, options));
    },
    
    //繝弱�繝ｫ鬚ｨ繧ｦ繧｣繝ｳ繝峨え繧帝國縺吶�
    hideTextWin: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                options = param[0] || {};
        }
        else {
            var options = arguments[0] || {};
        }
        
        if (options.next) this.eventUpdated = false;
        
        Effect.Fade(this.textWin, Object.extend({
            delay: this.defer,
            from: 0.8,
            to: 0.0,
            duration: 0.6,
            afterFinish: function() { if (!options.next) this.eventUpdated = false; }.bind(this)
        }, options));
    },
    
    /*
     * 繝弱�繝ｫ鬚ｨ繧ｦ繧｣繝ｳ繝峨え縺ｫ繝�く繧ｹ繝医ｒ陦ｨ遉ｺ縺吶ｋ縲らｬｬ1蠑墓焚縺ｫ繝�く繧ｹ繝亥�螳ｹ繧呈欠螳壹ゅユ繧ｭ繧ｹ繝医ｒ陦ｨ遉ｺ縺吶ｋ縺溘�縺ｫ谿ｵ關ｽ縺ｧ蛹ｺ蛻�ｉ繧後※縺�￥縲�
     * 隨ｬ2蠑墓焚縺ｯ繧ｪ繝励す繝ｧ繝ｳ縺ｧ縲∥lignToCenter繧稚rue縺ｫ縺吶ｋ縺ｨ繝悶Λ繧ｦ繧ｶ萓晏ｭ倥□縺後ユ繧ｭ繧ｹ繝医ｒ荳ｭ螟ｮ縺ｫ陦ｨ遉ｺ縺ｧ縺阪ｋ縲�
     */
    dispText: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                psg = param[0],
                options = param[1] || {};
        }
        else {
            var psg = arguments[0],
                options = arguments[1] || {};
        }
        
        if (options.next) this.eventUpdated = false;
        
        new Effect.Event(Object.extend({
            delay: this.defer,
            afterFinish: function() {
                if (options.temp) {
                    if (options.temp == 'gameVars') {
                        var tpl = new Template(psg);
                        psg = tpl.evaluate(this.MData.gameVars);
                    }
                    else {
                        var parameter = this.findData(this.MData.template, options.temp) || {},
                            tpl = new Template(psg);
                        psg = tpl.evaluate(parameter);
                    }
                }
                
                var passage = new Element('DIV', { className: 'passage' }).update(psg);
                passage.setStyle(this.style.passage);
                if (options.alignToCenter)
                    passage.setStyle({ textAlign: 'center' });
                else
                    passage.setStyle({ textAlign: 'left' });
                
                this.textWin.insert(passage);
                
                if (!options.next) this.eventUpdated = false;
            }.bind(this)
        }, options));
    },
    
    /*
     * 繝弱�繝ｫ鬚ｨ繧ｦ繧｣繝ｳ繝峨え縺ｫ繝�く繧ｹ繝医ｒ繧ｿ繧､繝苓｡ｨ遉ｺ縺吶ｋ縲らｬｬ1蠑墓焚縺ｫ繝�く繧ｹ繝亥�螳ｹ繧呈欠螳壹�
     * 隨ｬ2蠑墓焚縺ｯ繧ｪ繝励す繝ｧ繝ｳ縺ｧ縲∥lignToCenter繧稚rue縺ｫ縺吶ｋ縺ｨ繝悶Λ繧ｦ繧ｶ萓晏ｭ倥□縺後ユ繧ｭ繧ｹ繝医ｒ荳ｭ螟ｮ縺ｫ陦ｨ遉ｺ縺ｧ縺阪ｋ縲�
     */
    typeText: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                psg = param[0], options = param[1] || {};
        }
        else {
            var psg = arguments[0], options = arguments[1] || {};
        }
        
        new Effect.Event(Object.extend({
            delay: this.defer,
            afterFinish: function() {
                if (options.temp) {
                    if (options.temp == 'gameVars') {
                        var tpl = new Template(psg);
                        psg = tpl.evaluate(this.MData.gameVars);
                    }
                    else {
                        var parameter = this.findData(this.MData.template, options.temp) || {},
                            tpl = new Template(psg);
                        psg = tpl.evaluate(parameter);
                    }
                }
                
                var passage = new Element('DIV', { className: 'passage' }).update(psg);
                passage.setStyle(this.style.passage);
                if (options.alignToCenter)
                    passage.setStyle({ textAlign: 'center' });
                else
                    passage.setStyle({ textAlign: 'left' });
                
                this.textWin.insert(passage);
                
                this.initType(passage, this.textWin);
            }.bind(this)
        }, options));
    },
    
    //陦ｨ遉ｺ縺輔ｌ縺ｦ縺�ｋ繝�く繧ｹ繝医ｒ縺吶∋縺ｦ豸亥悉縺吶ｋ縲ゅえ繧｣繝ｳ繝峨え閾ｪ菴薙�谿九ｋ縲�
    clearText: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                options = param[0] || {};
        }
        else {
            var options = arguments[0] || {};
        }
        
        new Effect.Event(Object.extend({
            delay: this.defer,
            afterFinish: function(){
                this.textWin.immediateDescendants().invoke('remove');
                this.eventUpdated = false;
            }.bind(this)
        }, options));
    },
    
    //莉ｻ諢上�譎る俣繧､繝吶Φ繝医ｒ驕�ｉ縺帙ｋ繝｡繧ｽ繝�ラ縲らｬｬ1蠑墓焚縺ｫ驕�ｉ縺帙ｋ遘呈焚繧貞�繧後ｋ縲�
    delayTime: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                delay = param[0] || 0,
                options = param[1] || {};
        }
        else {
            var delay = arguments[0] || 0,
                options = arguments[1] || {};
        }
        
        new Effect.Event(Object.extend({
            delay: delay,
            afterFinish: function() { this.eventUpdated = false; }.bind(this)
        }, options));
    },
    
    //繝｢繝ｼ繝繝ｫ繧ｦ繧｣繝ｳ繝峨え繧定｡ｨ遉ｺ縺吶ｋ縲�
    showModalWindow: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                options = param[0] || {};
        }
        else {
            var options = arguments[0] || {};
        }
        
        if (options.next) this.eventUpdated = false;
        
        Effect.Appear(this.modal, Object.extend({
            delay: this.defer,
            from: 0.2,
            to: 0.8,
            duration: 0.3,
            afterFinish: function() { if (!options.next) this.eventUpdated = false; }.bind(this)
        }, options));
    },
    
    //繝｢繝ｼ繝繝ｫ繧ｦ繧｣繝ｳ繝峨え繧帝國縺吶�
    hideModalWindow: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                options = param[0] || {};
        }
        else {
            var options = arguments[0] || {};
        }
        
        if (options.next) this.eventUpdated = false;
        
        Effect.Fade(this.modal, Object.extend({
            delay: this.defer,
            from: 0.8,
            to: 0.0,
            duration: 0.3,
            afterFinish: function() { if (!options.next) this.eventUpdated = false; }.bind(this)
        }, options));
    },
    
    /*
     * 繝繝ｳ繧ｸ繝ｧ繝ｳ逕ｻ髱｢繧定｡ｨ遉ｺ縺吶ｋ縲ゆｺ句燕縺ｫjsGame.CanvasDungeon繧ｯ繝ｩ繧ｹ繧貞他縺ｳ蜃ｺ縺励》his.dgn縺ｫ縺昴�繧､繝ｳ繧ｹ繧ｿ繝ｳ繧ｹ繧呈�ｼ邏阪＠縺ｦ縺翫￥蠢�ｦ√′縺ゅｋ縲�
     * 縺ｪ縺翫√％縺ｮ繝｡繧ｽ繝�ラ縺ｯ繝繝ｳ繧ｸ繝ｧ繝ｳ繧定｡ｨ遉ｺ縺吶ｋ縺�縺代〒縲√ム繝ｳ繧ｸ繝ｧ繝ｳ蜀�桃菴懊�蛻�ｊ譖ｿ縺医↓縺､縺�※縺ｯenableDungeon繝｡繧ｽ繝�ラ縺ｪ縺ｩ繧剃ｽｿ逕ｨ縺吶ｋ縲�
     */
    showDungeon: function() {
        new Effect.Event({
            delay: this.defer,
            afterFinish: function() {
                if (this.dgn && !this.dgn.wrapper.visible()) {
                    this.dgn.wrapper.appear({
                        duration: 0.6,
                        afterFinish: function() { this.eventUpdated = false; }.bind(this)
                    });
                }
            }.bind(this)
        });
    },
    
    //繝繝ｳ繧ｸ繝ｧ繝ｳ逕ｻ髱｢繧帝國縺吶�
    hideDungeon: function() {
        new Effect.Event({
            delay: this.defer,
            afterFinish: function() {
                if (this.dgn && this.dgn.wrapper.visible()) {
                    this.dgn.wrapper.fade({
                        duration: 0.6,
                        afterFinish: function() { this.eventUpdated = false; }.bind(this)
                    });
                }
            }.bind(this)
        });
    },
    
    //繧｢繝峨�繝ｳ繝√Ε繝ｼ繝｢繝ｼ繝峨°繧峨ム繝ｳ繧ｸ繝ｧ繝ｳ繝｢繝ｼ繝峨↓蛻�ｊ譖ｿ縺医ｋ繝｡繧ｽ繝�ラ縲�
    enableDungeon: function() {
        new Effect.Event({
            delay: this.defer,
            afterFinish: function() {
                if (this.mode == 'adventure') {
                    this.mode = 'dungeon';
                    if (this.dgn && this.dgn.wrapper.getOpacity() != 1) {
                        new Effect.Opacity(this.dgn.wrapper, {
                            from: 0.6,
                            to: 1.0,
                            duration: 0.6,
                            afterFinish: function() { this.eventUpdated = false; }.bind(this)
                        });
                    }
                }
            }.bind(this)
        });
    },
    
    //繝繝ｳ繧ｸ繝ｧ繝ｳ繝｢繝ｼ繝峨°繧峨い繝峨�繝ｳ繝√Ε繝ｼ繝｢繝ｼ繝峨↓蛻�ｊ譖ｿ縺医ｋ繝｡繧ｽ繝�ラ縲�
    disableDungeon: function() {
        new Effect.Event({
            delay: this.defer,
            afterFinish: function() {
                if (this.mode == 'dungeon') {
                    this.mode = 'adventure';
                    if (this.dgn && this.dgn.wrapper.getOpacity() == 1) {
                        new Effect.Opacity(this.dgn.wrapper, {
                            from: 1.0,
                            to: 0.6,
                            duration: 0.6,
                            afterFinish: function() { this.eventUpdated = false; }.bind(this)
                        });
                    }
                }
            }.bind(this)
        });
    },
    
    /*
     * 繝繝ｳ繧ｸ繝ｧ繝ｳ蜀��迴ｾ蝨ｨ菴咲ｽｮ繧堤ｧｻ蜍輔＆縺帙ｋ繝｡繧ｽ繝�ラ縲らｬｬ1蠑墓焚縺ｯ繧ｪ繝悶ず繧ｧ繧ｯ繝医〒貂｡縺励∝ｺｧ讓吶�loc�域ｬ｡縺ｮ繧医≧縺ｫ繧ｪ繝悶ず繧ｧ繧ｯ繝亥ｽ｢蠑旬 x: 3, y: 3 }�峨→縲�
     * 譁ｹ蜷代�dir�医％縺｡繧峨�謨ｰ蛟､縲ょ漉/隘ｿ/蛹�/譚ｱ縺�0/1/2/3縺ｫ蟇ｾ蠢懊☆繧具ｼ峨ｒ險ｭ螳壹☆繧九�
     */
    warpTo: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                obj = param[0],
                loc = obj.loc || { x: 3, y: 3 },
                dir = obj.dir || 0;
        }
        else {
            var obj = arguments[0],
                loc = obj.loc,
                dir = obj.dir || 0;
        }
        
        new Effect.Event({
            delay: this.defer,
            afterFinish: function() {
                if (this.dgn) {
                    this.dgn.loc = Object.extend(this.dgn.loc, loc);
                    this.dgn.dir = dir;
                    
                    this.dgn.setupDungeon();
                }
                
                this.eventUpdated = false;
            }.bind(this)
        });
    },
    
    /*
     * 蛻･縺ｮ繝繝ｳ繧ｸ繝ｧ繝ｳ繝槭ャ繝励∈遘ｻ蜍輔☆繧九Γ繧ｽ繝�ラ縲らｬｬ1蠑墓焚縺ｯmapData縺ｫ逋ｻ骭ｲ縺励◆繝槭ャ繝怜錐縲らｬｬ2蠑墓焚縺ｯ繧ｪ繝悶ず繧ｧ繧ｯ繝医〒貂｡縺励∝ｺｧ讓吶�loc�域ｬ｡縺ｮ繧医≧縺ｫ繧ｪ繝悶ず繧ｧ繧ｯ繝亥ｽ｢蠑旬 x: 3, y: 3 }�峨→縲�
     * 譁ｹ蜷代�dir�医％縺｡繧峨�謨ｰ蛟､縲ょ漉/隘ｿ/蛹�/譚ｱ縺�0/1/2/3縺ｫ蟇ｾ蠢懊☆繧具ｼ峨ｒ險ｭ螳壹☆繧九�
     */
    moveMap: function() {
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                mapName = param[0],
                obj = param[1],
                loc = obj.loc,
                dir = obj.dir || 0;
        }
        else {
            var mapName = arguments[0],
                obj = arguments[1],
                loc = obj.loc,
                dir = obj.dir || 0;
        }
        
        new Effect.Event({
            delay: this.defer,
            afterFinish: function() {
                if (this.dgn) {
                    this.dgn.mapName = mapName;
                    this.dgn.mapData = this.findData(this.GData.mapData, this.dgn.mapName).data;
                    this.dgn.config = Object.extend(this.dgn.config, obj.config || {});
                    
                    this.dgn.loc = Object.extend(this.dgn.loc, loc || { x: 3, y: 3 });
                    this.dgn.dir = dir;
                    
                    this.setColor();
                    this.dgn.setupDungeon();
                }
                
                this.eventUpdated = false;
            }.bind(this)
        });
    },
    
    //JSON蠖｢蠑上�驟榊�縺九ｉ繝��繧ｿ繧呈歓蜃ｺ縺吶ｋ縲らｬｬ1蠑墓焚縺ｫ蟇ｾ雎｡縺ｮ驟榊�繧呈ｸ｡縺励∫ｬｬ2蠑墓焚縺ｫ謗｢縺励◆縺�が繝悶ず繧ｧ繧ｯ繝医�id繝励Ο繝代ユ繧｣縺ｫ荳閾ｴ縺吶ｋ譁�ｭ怜�繧呈ｸ｡縺吶�
    findDataById: function(array, param) {
        if (Object.isArray(array)) {
            return ( array.find(function(obj) {
                if (obj.id) return obj.name == param;
            }) );
        }
        else return false;
    },
    
    //JSON蠖｢蠑上�驟榊�縺九ｉ繝��繧ｿ繧呈歓蜃ｺ縺吶ｋ縲らｬｬ1蠑墓焚縺ｫ蟇ｾ雎｡縺ｮ驟榊�繧呈ｸ｡縺励∫ｬｬ2蠑墓焚縺ｫ謗｢縺励◆縺�が繝悶ず繧ｧ繧ｯ繝医�name繝励Ο繝代ユ繧｣縺ｫ荳閾ｴ縺吶ｋ譁�ｭ怜�繧呈ｸ｡縺吶�
    findDataByName: function(array, param) {
        if (Object.isArray(array)) {
            return ( array.find(function(obj) {
                if (obj.name) return obj.name == param;
            }) );
        }
        else return false;
    },
    
    //JSON蠖｢蠑上�驟榊�縺九ｉ繝��繧ｿ繧呈歓蜃ｺ縺吶ｋ縲らｬｬ1蠑墓焚縺ｫ蟇ｾ雎｡縺ｮ驟榊�繧呈ｸ｡縺励∫ｬｬ2蠑墓焚縺ｫ謗｢縺励◆縺�が繝悶ず繧ｧ繧ｯ繝医�name縺ｾ縺溘�id繝励Ο繝代ユ繧｣縺ｫ荳閾ｴ縺吶ｋ譁�ｭ怜�繧呈ｸ｡縺吶�
    findData: function(array, param) {
        if (Object.isArray(array)) {
            return ( array.find(function(obj) {
                if (obj.id) return obj.id == param;
                else if (obj.name) return obj.name == param;
            }) );
        }
        else return false;
    },
    
    //findData縺梧怙蛻昴↓隕九▽縺代◆繧ｪ繝悶ず繧ｧ繧ｯ繝医□縺代ｒ霑斐☆縺ｮ縺ｫ蟇ｾ縺励√％縺｡繧峨�荳閾ｴ縺励◆繧ｪ繝悶ず繧ｧ繧ｯ繝医☆縺ｹ縺ｦ繧定ｿ斐☆縲�
    findAllData: function(array, param) {
        if (Object.isArray(array)) {
            return ( array.findAll(function(obj) {
                if (obj.id) return obj.id == param;
                else if (obj.name) return obj.name == param;
            }) );
        }
        else return false;
    },
    
    //eventData縺ｫ逋ｻ骭ｲ縺励◆繧､繝吶Φ繝医ｒ襍ｷ蜍輔☆繧九らｬｬ1蠑墓焚縺ｫ繧ｷ繝ｼ繝ｳ蜷阪ｒ蜈･繧後ｋ縲�
    addScene: function(scene, index) {
        if (!this.GData.eventData) return;
        
        if (Object.isArray(arguments[0])) {
            var param = arguments[0],
                sceneName = param[0];
        }
        else {
            var sceneName = arguments[0];
        }
        
        this.sceneObj = this.findData(this.GData.eventData, sceneName);
        this.eventsObjs = this.sceneObj.data;
        
        this.eventUpdated = false;
        this.eventIndex = index || 0;
        
        new PeriodicalExecuter(function(pe) {
            if (this.eventUpdated) return;
            this.eventUpdated = true;
            
            if (this.eventsObjs.length > this.eventIndex) {
                var eventObj = this.eventsObjs[this.eventIndex++];
                this[this.eventType[eventObj.type]](eventObj.param);
            }
            else pe.stop();
        }.bind(this), 0.1);
    },
    
    //繧ｿ繧､繝斐Φ繧ｰ蜃ｦ逅�ｒ陦後≧繝｡繧ｽ繝�ラ
    initType: function(element, eventElement) {
        if ((typeof element == 'object' ||
            Object.isFunction(element)) && 
            element.length)
            var elements = element;
        else {
            Effect.tagifyText(element);
            if (Prototype.Browser.WebKit)
                element.descendants().invoke('setStyle', { 'float': 'left' });
            
            elements = element.immediateDescendants();
            elements.invoke('setStyle', { visibility: 'hidden' });
        }
        
        this.isTyping = true;
        var eventHandler = function(e) {
            e.preventDefault();
            this.isTyping = false;
            eventElement.stopObserving('mousedown', eventHandler);
        }.bindAsEventListener(this);
        
        eventElement.observe('mousedown', eventHandler);
        this.recursivelyTyping(elements);
        
    },
    
    recursivelyTyping: function(elements, step) {
        var step = step ? step : 0;
        if (this.typeTimer) clearTimeout(this.typeTimer);
        
        if (!this.isTyping || this.isKeyPress('KEY_RETURN') || elements.length - 1 < step) {
            elements.invoke('setStyle', { visibility: 'visible' });
            this.eventUpdated = false;
            return;
        }
        else {
            elements[step++].setStyle({ visibility: 'visible' });
            if (elements[step])
                elements[step++].setStyle({ visibility: 'visible' });
            this.typeTimer = setTimeout(this.recursivelyTyping.curry(elements, step).bind(this), 100);
        }
    },
    
    //隕∫ｴ�縺後け繝ｪ繝�け縺輔ｌ繧九∪縺ｧ繝壹�繧ｸ騾√ｊ繧｢繧､繧ｳ繝ｳ繧定｡ｨ遉ｺ縺吶ｋ繝｡繧ｽ繝�ラ
    clickToContinue: function(element) {
        var element = Object.isString(element) ? this[element] : element;
        this.clicked = false;
        
        if (element.hasClassName('main_win')) {
            this.pageNext
                .setStyle({
                    backgroundImage: this.style.pageNext.backgroundImage,
                    width: this.dimensions.pageNext[0] + 'px',
                    height: this.dimensions.pageNext[1] + 'px',
                    left: this.dimensions.pageNext[2] + 'px',
                    top: this.dimensions.pageNext[3] + 'px'
                });
        }
        else if (element.hasClassName('text_win')) {
            this.pageNext
                .setStyle({
                    backgroundImage: this.style.pageNext.backgroundImage,
                    width: this.dimensions.pageNext[0] + 'px',
                    height: this.dimensions.pageNext[1] + 'px'
                });
            Try.these(function() {
                var elements = element.immediateDescendants(),
                    lastElement =  elements.last(),
                    elementsHeight = elements.invoke('getHeight'),
                    accumulator = elementsHeight.inject(0, function(acc, n) { return acc + n + 10; });
                
                this.pageNext
                    .setStyle({
                        left: (parseInt(lastElement.getStyle('paddingLeft'), 10) + lastElement.getWidth() - 5) + 'px',
                        top: accumulator + 'px'
                    });
            }.bind(this));
        }
        
        var eventHandler = function(e) {
            e.preventDefault();
            this.clicked = true;
            element.stopObserving('mousedown', eventHandler);
        }.bindAsEventListener(this);
        
        element.observe('mousedown', eventHandler);
        this.recursivelyWaiting('next');
    },
    
    //隕∫ｴ�縺後け繝ｪ繝�け縺輔ｌ繧九∪縺ｧ蠕�ｩ溘＆縺帙ｋ繝｡繧ｽ繝�ラ
    waitUntilClick: function(element) {
        var element = Object.isString(element) ? this[element] : element;
        this.clicked = false;
        
        var eventHandler = function(e) {
            e.preventDefault();
            this.clicked = true;
            element.stopObserving('mousedown', eventHandler);
        }.bindAsEventListener(this);
        
        element.observe('mousedown', eventHandler);
        this.recursivelyWaiting('wait');
    },
    
    //驕ｸ謚櫁い蝠城｡後〒蝗樒ｭ斐＆繧後ｋ縺ｾ縺ｧ蠕�ｩ溘☆繧九Γ繧ｽ繝�ラ
    waitToChoose: function(elements) {
        var elements = Object.isString(elements) ? this[elements] : elements;
        this.clicked = false;
        
        elements.each(function(element, index) {
            if (elements == this.winAns) {
                element.observe('click', function(e) {
                    e.stop();
                    this.clicked = true;
                    this.selectedItem = index;
                    element.setStyle({ color: '#FF8C00' }).stopObserving();
                }.bind(this))
                .observe('mouseover', function() {
                    element.setStyle({ color: '#00BFFF', backgroundColor: '#333' });
                })
                .observe('mouseout', function() {
                    element.setStyle({ color: '#FFF', backgroundColor: '#000' });
                });
            }
            else if (elements == this.winConf) {
                element.observe('click', function(e) {
                    e.stop();
                    this.clicked = true;
                    this.selectedItem = index;
                    element.setStyle({ color: '#00BFFF' }).stopObserving();
                }.bind(this))
                .observe('mouseover', function() {
                    element.morph({ backgroundColor: '#333' }, { duration: 0.3 });
                }.bind(this))
                .observe('mouseout', function() {
                    element.morph({ color: '#FF8C00', backgroundColor: '#000' }, { duration: 0.3 });
                }.bind(this));
            }
        }.bind(this));
        
        this.recursivelyWaiting('choice');
    },
    
    //繝繧､繧｢繝ｭ繧ｰ縺ｧ繝懊ち繝ｳ繧ｯ繝ｪ繝�け縺句�蜉帙′縺ゅｋ縺ｾ縺ｧ蠕�ｩ溘☆繧九�
    waitForDialog: function(type) {
        this.clicked = false;
        
        this.dialogType = type;
        this.commandResult = null;
        
        this.commandOk.observe('click', function(e) {
            e.stop();
            this.clicked = true;
            this.commandResult = true;
        }.bind(this));
        this.commandCancel.observe('click', function(e) {
            e.stop();
            this.clicked = true;
            this.commandResult = false;
        }.bind(this));
        
        this.recursivelyWaiting('dialog');
    },
    
    recursivelyWaiting: function(type, step) {
        var type = type,
            step = step ? step : 0;
        
        if (this.typeTimer) clearTimeout(this.typeTimer);
        
        if (this.clicked || this.isKeyPress('KEY_RETURN')) {
            if (type == 'next') {
                this.pageNext.hide();
                this.eventUpdated = false;
                return;
            }
            else if (type == 'wait') {
                this.eventUpdated = false;
                return;
            }
            else if (type == 'choice') {
                if (this.selectedItem !== null) {
                    if (this.MData.systemVars.SE.onSelectChoice)
                        this.playMusic(this.MData.systemVars.SE.onSelectChoice, 'snd', { skip: true });
                    this.winAns.invoke('setStyle', { backgroundColor: '#000' }).invoke('hide');
                    this.winConf.invoke('setStyle', { backgroundColor: '#000' }).invoke('hide');
                    this.eventUpdated = false;
                    return;
                }
            }
            else if (type == 'dialog') {
                if (this.dialogType == 'input' && !this.inputText.present()) {
                    this.clicked = false;
                    this.commandResult = null;
                }
                else {
                    if (this.MData.systemVars.SE.onSelectChoice)
                        this.playMusic(this.MData.systemVars.SE.onSelectChoice, 'snd', { skip: true });
                    
                    this.commandResult = this.commandResult === null ? true : this.commandResult;
                    this.dialogResult = Object.extend(this.dialogResult, {
                        inputText: this.inputText.getValue(),
                        command: this.commandResult
                    });
                    
                    this.commandOk.stopObserving();
                    this.commandCancel.stopObserving();
                    
                    this.modal.fade({ duration: 0.6 });
                    this.dialogWin.fade({
                        duration: 0.6,
                        afterFinish: function() {
                            this.dialogMsg.update('');
                            this.inputText.clear();
                        }.bind(this)
                    });
                    
                    this.eventUpdated = false;
                    return;
                }
            }
            
        }
        
        if (type == 'next' && step % 3 === 0)
            this.pageNext.toggle();
        this.typeTimer = setTimeout(this.recursivelyWaiting.curry(type, ++step).bind(this), 100);
    },
    
    last: {}
});