<!DOCTYPE html>
<html lang="ja" manifest="cache.manifest">
    <head>
        <meta charset="UTF-8">
        <meta name="Description" content="">
        <meta name="Keywords" content="">
        <meta name="author" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
        <meta name="format-detection" content="telephone=no">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black">   <!-- black/black-translucent/defaultいずれか選択 -->

        <title><?php //echo $title; ?>
            技術発表会</title>

        <!-- CSS -->
        <?php echo Asset::css('iphone.css'); ?>
        <?php echo Asset::css('my_template.css'); ?>

        <!-- JQuery -->
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"></script>
        <?php echo Asset::js('iphone.js'); ?>
    </head>

    <body>
        <div id="content">
            <?php echo $content; ?>
        </div>
            <hr>     <!-- 水平線 -->
            <p class="footer">
                Powered by <?php echo Html::anchor('http://fuelphp.com/','FuelPHP'); ?>
            </p>

        <!-- footer -->
        <footer>
            <nav>
                <ul>
                    <li class="btn1"><?php echo Html::anchor('login/login','ログイン'); ?></li>
                    <li class="btn1"><?php echo Html::anchor('mypage','ホーム'); ?></li>
                    <li class="btn1"><?php echo Html::anchor('','ヘルプ'); ?></li>
                </ul>
            </nav>
            <p class="copyright"><small>Copyright &copy; Naoki Yoneyama All Rights Reserved.</small></p>
        </footer>

        <!-- スクリプトが動作しないブラウザにて代わりに表示 -->
        <noscript><p id="msgNoscript">当サイトは、ブラウザのJavaScript設定を有効にしてご覧ください。</p></noscript>
    </body>
</html>