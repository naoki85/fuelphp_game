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
            { name: 'rei',       url: 'http://localhost:8000/assets/img/chara/reiAyanami.jpg' },  
            { name: 'asuka',      url: 'http://localhost:8000/assets/img/chara/asukaShikinami2.jpg' },  
            { name: 'mari',      url: 'http://localhost:8000/assets/img/chara/mariShikinami2.jpg' }
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
          //テキストを隠す  
        this.hideSimpleText('start');  

        //背景画像を設定  
        this.changeBgImg('rei');  
        //背景画像を表示  
        this.showBackground();  
        
        //明朝体のフォント  
        var fontFamily = '"ヒラギノ明朝 Pro W3", "Hiragino Mincho Pro", "ＭＳ Ｐ明朝", Verdana, sans-serif';  

        var mainData = {  
            name: 'main',  
            flag: null,  
            story: null,  
            data: [  
                { type: 'createSimpleText', param: [  
                    '綾波レイ',
                    'main1',  
                    {  
                        loc: [0, 350],  
                        style: 'color: #DCDCDC; font-size: 25px;',  
                        shadow: true  
                    }  
                ] },
                { type: 'createSimpleText', param: [  
                    'メガネバージョン',
                    'main2',  
                    {  
                        loc: [0, 350],  
                        style: 'color: #DCDCDC; font-size: 25px;',  
                        shadow: true  
                    }  
                ] },
                { type: 'createSimpleText', param: [  
                    'テスト',
                    'main3',  
                    {  
                        loc: [0, 350],  
                        style: 'color: #DCDCDC; font-size: 25px;',  
                        shadow: true  
                    }  
                ] },
                { type: 'showText'},
                { type: 'typeSimpleText', param: 'main1'},
                { type: 'waitUntilClick', param: this.disp }, 
                { type: 'hideSimpleText', param: 'main1' },
                { type: 'typeSimpleText', param: 'main2' },  
                { type: 'waitUntilClick', param: this.disp },  
                { type: 'hideSimpleText', param: 'main2' },
                { type: 'typeSimpleText', param: 'main3' },  
                { type: 'waitUntilClick', param: this.disp },  
                { type: 'hideSimpleText', param: 'main3' }
        ]};  
        
        if (!this.GData.eventData) this.GData.eventData = [];
        this.GData.eventData.push(mainData);  
        this.addScene('main');  
          
    },  
    /* 
     * ゲームの進行状況を監視するメソッド 
     * 監視中はisMouseClickやonceMouseDown、isKeyPressなどのメソッドでマウスやキーイベントをチェックできる 
     */  
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
  
//これはイメージのプリローダー  
//The constructor for the ImagePreloader takes an array of image URLs and a call-back function as arguments.  
function ImagePreloader(images, callBack) {  
  
    // store the callBack  
    this.callBack = callBack;  
  
    // initialize internal state.  
    this.nLoaded = 0;  
    this.nProcessed = 0;  
    this.aImages = new Array;  
  
    // record the number of images.  
    this.nImages = images.length;  
  
    // for each image, call preload()  
    for ( var i = 0; i < images.length; i++ ) {  
        this.preload(images[i]);  
    }  
      
}  
  
//The call-back function is stored for later use, then each image URL is passed  
//into the preload() method.  
  
ImagePreloader.prototype.preload = function(image) {  
  
    // create new Image object and add to array  
    var oImage = new Image;  
    this.aImages.push(oImage);  
  
    // set up event handlers for the Image object  
    oImage.onload = ImagePreloader.prototype.onload;  
    oImage.onerror = ImagePreloader.prototype.onerror;  
    oImage.onabort = ImagePreloader.prototype.onabort;  
  
    // assign pointer back to this.  
    oImage.oImagePreloader = this;  
    oImage.bLoaded = false;  
  
    // assign the .src property of the Image object  
  
    oImage.src = image;  
      
};  
  
//The preload function creates an Image object and assigns functions for the three Image events;  
//onload, onerror and onabort. The onload event is raised when the image has been loaded into memory,  
//the onerror event is raised when an error occurs while loading the image and the onabort event  
//is raised if the user cancels the load by clicking the Stop button on the browser.  
  
//A pointer to the ImagePreloader object is stored in each Image object to facilitate thcallBackck  
//mechanism. An optional boolean flag can be added here to indicate whether the image loads properly or not.  
  
//Finally, the “src” attribute is assigned to start the loading of the image.  
  
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