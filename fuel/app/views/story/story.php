<!DOCTYPE html>
<html>
    <head>
        <!-- prototype.jsとscriptaculous.js-->
        <?php echo Asset::js('js_adv/prototype.js'); ?> 
        <?php echo Asset::js('js_adv/effects.js'); ?>

        <!-- JS Adventure　2.0のJSファイル -->
        <?php echo Asset::js('js_adv/js_adv.v2.0.js'); ?>

        <!-- CSSファイル -->
        <?php echo Asset::css('js_adv.v1.0.css'); ?>

        <!-- 自作のScript -->
        <script>
            if (typeof jsGame == "undefined") var jsGame = {};  
  
            document.observe('dom:loaded', function() {  
                //DOMがロードされたらゲーム用のコンストラクタを呼び出す。引数にHTMLに記述したID名を渡す  
                jsGame.adventure = new jsGame.Adventure('s1');  
            });  
            jsGame.Adventure = Class.create(jsGame.Base, {  
                initialize: function($super, element) {  
                      
                    /* jsGame.Baseクラスのメソッド・プロパティを継承する */  
                    $super(element);  
                      
                    //キーイベントとマウスイベントの管理。keyManagerメソッドとmouseEventsメソッドはセットで呼び出す  
                    /* keyManagerメソッドにtrueを渡すと、タブキーと矢印キーのデフォルトアクションがストップする（たとえば矢印キーを押しても画面がスクロールしなくなる）ので通常は何も渡さない */  
                    this.keyManager();  
                    /* 
                     * mouseEventsメソッドにセレクタか、$()で拡張された要素を渡すとクリック検知の範囲を限定できる 
                     * 何も渡さないとdocument（画面全体）が指定される。ここではゲーム画面の外枠のDIV要素を指定 
                     */  
                    this.mouseEvents(this.disp.up());  
                      
                    //ゲーム中で使用する画像はすべてこのオブジェクトに格納する  
                    this.imgObj = {};  
                    /* 画像のIDとパスを配列形式にしてまとめる */  
                    var imgList = [  
                        <?php foreach($image as $value): ?>
                                    { name: '<?php echo $value["name"]; ?>',       url: 'http://localhost:8000/assets/img/chara/<?php echo $value["name"]; ?>' },  
                                    <?php endforeach; ?>
                    ];  
                      
                    //画像をプリロードするクラス。このコールバック内に続く処理を記述する。  
                    new ImagePreloader(imgList.pluck('url'), function(aImages, nLoaded) {  
                        aImages.each(function(image, index) {  
                            this.imgObj[imgList[index].name] = image;  
                        }.bind(this));  
                          
                        /* 
                         * IE PNG FIXを使用したIE6の透過PNG対策 
                         * 画像の読み込みがページのロード後なので動的に適用させている 
                         */  
                        if (Prototype.Browser.IE) {  
                            $$('head').first().insert(new Element('LINK', {  
                                href: 'http://wiz-code.digick.jp/css/ie_png_fix.css',  
                                type: 'text/css',  
                                rel: 'stylesheet'  
                            }) );  
                        }  
                          
                        //現在のゲームの進行状況を設定  
                        this.state = 'ready';  
                        //ゲーム進行状況の監視するメソッドを呼び出す  
                        this.stateObserver();  
                    }.bind(this));  
                },  
                  
                /* 最初のスタート画面を設定する */  
                start: function() {  
                      
                    //表示するテキストを作成  
                    this.createSimpleText(  
                        '開始',   //テキスト内容  
                        'start',    //適当なIDを振る  
                        {  
                            // loc[左から, 上から]
                            loc: [120, 200], //オプションの設定  
                            style: 'color: #DCDCDC; font-size: 32px; z-index: 1000',  
                            outline: true  
                        }  
                    );  
                    //テキストを表示  
                    this.dispSimpleText('start');  

                      
                },  

                main: function() {  
                    <?php echo html_entity_decode($story, ENT_QUOTES); ?>
                },

                 // ゲームの進行状況を監視するメソッド 
                stateObserver: function() {  
                    //Prototype.jsのPeriodicalExecuterクラスはsetIntervalとほぼ同じ機能  
                    new PeriodicalExecuter(function(pe) {  
                        switch(this.state) {  
                              
                            case 'ready':  
                                this.start();  
                                this.state = 'main';  
                                break;  
                                  
                            case 'main':  
                                //エンターキーか画面がクリックされたら次に進む  
                                if (this.isKeyPress('KEY_RETURN') || this.isMouseClick(this.disp)) {  
                                    this.main();
                                    this.state = 'clear';  
                                }
                                break;
                            case 'clear':
                                pe.stop();
                        }
                    }.bind(this), 0.5);  
                }  
                  
            });  
              
            // イメージのプリローダー  
            function ImagePreloader(images, callBack) {  
              
                this.callBack = callBack;  

                this.nLoaded = 0;  
                this.nProcessed = 0;  
                this.aImages = new Array;  
              
                this.nImages = images.length;  

                for ( var i = 0; i < images.length; i++ ) {  
                    this.preload(images[i]);  
                }  
                  
            }
              
            ImagePreloader.prototype.preload = function(image) {  
              
                var oImage = new Image;  
                this.aImages.push(oImage);

                oImage.onload = ImagePreloader.prototype.onload;  
                oImage.onerror = ImagePreloader.prototype.onerror;  
                oImage.onabort = ImagePreloader.prototype.onabort;  
              
                oImage.oImagePreloader = this;  
                oImage.bLoaded = false;
              
                oImage.src = image;  
                  
            };  
              

            ImagePreloader.prototype.onComplete = function() {  
              
                this.nProcessed++;  
                if ( this.nProcessed == this.nImages ) {  
                    this.callBack(this.aImages, this.nLoaded);  
                }  
                  
            };  
              
            ImagePreloader.prototype.onload = function() {  
              
                this.bLoaded = true;  
                this.oImagePreloader.nLoaded++;  
                this.oImagePreloader.onComplete();  
                  
            };  
              
            ImagePreloader.prototype.onerror = function() {  
              
                this.bError = true;  
                this.oImagePreloader.onComplete();  
              
            };  
              
            ImagePreloader.prototype.onabort = function() {  
              
                this.bAbort = true;  
                this.oImagePreloader.onComplete();  
              
            };
        </script>

    </head>
    <body>
        <div class="js_game">
            <div id="s1" class="disp">&nbsp;</div>
        </div>
    </body>
</html>