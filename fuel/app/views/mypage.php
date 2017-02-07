<h2><?php echo $username; ?>さんのマイページ</h2>
<button class="btn2" type="button" onclick="location.href='<?php echo Uri::create('logout'); ?>'">
    ログアウト
</button>

<div id="chara">
    <?php $flg = rand(); ?>
    <?php if($flg % 2 == 0) {
        echo Asset::img('chara/asukaShikinami2.jpg');
    } elseif($flg % 3 == 0) {
        echo Asset::img('chara/kakegurui4.jpg');
    } elseif($flg % 5 == 0) {
        echo Asset::img('chara/asukaAndMari.jpg');
        /* 第3引数で画像サイズの指定もできる
        echo Asset::img('chara/mariShikinami2.jpg',array(
            'width'     => '200px',
            'height'    => '200px')); */
    } elseif($flg % 7 == 0) {
        echo Asset::img('chara/asukaShikinami.jpg');
    } else {
        echo Asset::img('chara/reiAyanami.jpg');
    } 
    ?>
</div>

<table>
    <tr>
        <th class="t_top">ユーザーネーム</th>
        <td class="t_top"><?php echo $username; ?>さん</td>
    </tr>
    <tr>
        <th>現在のストーリー</th>
        <td><?php echo $story; ?></td>
    </tr>
</table>

<?php echo Form::open('gacha/gacha/gacha'); ?>
    <?php echo Form::button('submit', 'がちゃ', array('class' => 'btn2', 'style' => 'margin-bottom: 10px;')); ?>
<?php echo Form::close(); ?>
<?php echo Form::open('memory/memory'); ?>
    <?php echo Form::button('submit', '思い出', array('class' => 'btn2', 'style' => 'margin-bottom: 10px;')); ?>
<?php echo Form::close(); ?>
<?php echo Form::open('story/story/story'); ?>
    <?php echo Form::hidden('id', $id); ?>
    <?php echo Form::hidden('story_id', 1); ?>
    <?php echo Form::button('submit', '最初から読む', array('class' => 'btn2')); ?>
<?php echo Form::close(); ?>
<?php echo Form::open('story/story/story'); ?>
    <?php echo Form::hidden('id', $id); ?>
    <?php echo Form::hidden('story_id', $story_id); ?>
    <?php echo Form::button('submit', '続きから読む', array('class' => 'btn2')); ?>
<?php echo Form::close(); ?>