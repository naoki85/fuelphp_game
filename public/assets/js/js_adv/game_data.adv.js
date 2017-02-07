if (typeof jsGame == "undefined") var jsGame = {};
if (!jsGame.dataBase) jsGame.dataBase = {};

jsGame.dataBase = Object.extend(jsGame.dataBase, {
    
    image: {
        
        background: [
            { name: 'rei',       url: 'chara/reiAyanami.jpg' },  
            { name: 'asuka',      url: 'chara/asukaShikinami2.jpg' },  
            { name: 'mari',      url: 'chara/mariShikinami2.jpg' }
        ],
        
        photo: [/*
            { name: 'cherry_blossom_02',    url: 'photo/cherry-blossom_beiz.jp_S08298.jpg' },
            { name: 'blackcat_01',          url: 'photo/blackcat01.png' }*/
        ],
        
        charFace: [/*
            { name: 'Actor34',  url: 'charFace/Actor34.png' },
            { name: 'Actor37',  url: 'charFace/Actor37.png' },
            { name: 'Actor38',  url: 'charFace/Actor38.png' },
            { name: 'Actor55',  url: 'charFace/Actor55.png' }*/
        ],
        
        icon: [
            { name: 'music',        url: 'icon/music.png' },
            { name: 'mute',         url: 'icon/mute.png' },
            { name: 'start01',      url: 'icon/start01.png' },
            { name: 'enter06',      url: 'icon/enter06.png' }
        ]
        
    },
    music: {
        
        BGM: [/*
            
            { name: 'evolution',    url: 'evolution.mp3' },
            { name: 'tamhe06',      url: 'tamhe06.mp3' },
            { name: 'music01',      url: 'music01.mp3' },
            { name: 'tamsp14',      url: 'tamsp14.mp3' }*/
            
        ],
        
        sound: [/*
            
            { name: 'button-0',     url: 'button-0.mp3' },
            { name: 'b_006',        url: 'b_006.mp3' },
            { name: 'be2',          url: 'be2.mp3' },
            { name: 'b_044',        url: 'b_044.mp3' },
            { name: 'b_067',        url: 'b_067.mp3' }*/
            
        ]
    }
});