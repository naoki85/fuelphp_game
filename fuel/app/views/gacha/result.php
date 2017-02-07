<script>
    // ゆらゆら揺れる関数の定義
    $(function () {
        $.fn.yurayura = function( config ) {
            var obj = this;
            var i = 0;
            var defaults = {
                'move' : 5,         // 動く量
                'duration' : 1000,  // 移動にかける時間
                'delay' : 0         // 両端で停止する時間
            };
            var setting = $.extend( defaults, config );
            return obj.each( function() {
                ( function move() {
                    i = i > 0 ? -1 : 1;
                    var p = obj.position().top;
                    $( obj )
                        .delay( setting.delay )
                        .animate( { top : p + i * setting.move }, {
                            duration : setting.duration,
                            complete : move
                        } );
                    } )();
                } );
            };
        } );

    // ゆらゆら関数の適応
    $(function(){
        $('#rect').yurayura( {
            'move' : 5,
            'delay' : 100,
            'duration' : 1000
        } );
    });
</script>

<?php foreach($gacha_result as $value): ?>
<h4><?php echo $value['item_name']; ?></h4>
<div style="position: relative;width: 300px; height: 430px;margin-left: auto;margin-right: auto;">
<div id="rect" style="position: absolute; top: 10px; left: 0;"><?php echo Asset::img('chara/'.$value['item_image']); ?></div>
</div>
<div>
<p class="comment"><?php echo $value['memo']; ?></p></div>
<?php endforeach; ?>

<button class="btn2" type="button" onclick="location.href='<?php echo Uri::create('gacha/gacha/gacha'); ?>'">
        もう1度がちゃを引く！
</button>

<button class="btn2" type="button" onclick="location.href='<?php echo Uri::create('memory/memory'); ?>'">
        思い出に行く！
</button>

