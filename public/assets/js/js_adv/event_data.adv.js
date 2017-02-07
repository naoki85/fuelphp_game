jsGame.dataBase = Object.extend(jsGame.dataBase, {
    eventData: [
     
         /* イベントデータはシーン毎にまとめられます */
         // シーンオブジェクト
        {
            name: 'scene_name',
            flag: null,
            story: null,
            data: [
                // イベントオブジェクト
                 /* 各シーンはこのようにイベント群としてまとめられます */
                 // イベント名のみの形式
                { type: 'eventType1' },

                // 引数が一つのときはparamプロパティにそのまま渡す
                { type: 'eventType2', param: 'eventParam1' },

                // 複数の引数があるときは配列に入れて渡す
                { type: 'eventType3', param: [
                    'eventParam1',
                    'eventParam2',
                    'eventParam3'
                ] },

                // イベントの種類によってはオプションを設定する場合も
                // オプションはオブジェクト形式で渡す（今回は第2引数にオプション）
                { type: 'eventType4', param: [
                    'eventParam1',
                    {
                        delay: 3.0,
                        duration: 2.0
                    }
                ] },
            ]
        },
        {
            name: 'scene_name1'
        }
    ]
});
