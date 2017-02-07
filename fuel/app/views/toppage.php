<style type="text/css">
    #title {
        margin-left: auto;
        margin-right: auto;
        background-image: url("http://localhost:8000/assets/img/chara/apple2.jpg");
        width: 300px;
        height: 450px;
    }
    #title_name {
        color: #ffffff ;
        font-size: 24pt ;
        line-height: 1;
        margin:10px 0px;
        padding: 10px 5px 10px 5px;
        border-radius: 5px;
        text-shadow: 5px 5px 1px #999999;
    }
</style>

<div id="title">
    <div id="title_name">FuelPHPでスマホのポチポチゲー風な<br />なにか</div>
    <div class="button_wrapper">
        <button class="btn4" type="button" onclick="location.href='<?php echo Uri::create('add/add/add'); ?>'">
            会員登録をして始める！
        </button><br />
    </div>
    <div class="button_wrapper">
        <button class="btn5" type="button" onclick="location.href='<?php echo Uri::create('login/login/login'); ?>'">
            ログインして始める！
        </button>
    </div>
</div>