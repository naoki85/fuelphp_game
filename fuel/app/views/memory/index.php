<style>
    .submit {
        border-style: none;
        background-color: white;
        cursor: pointer;
        text-decoration: underline;
        color: blue;
        font-size: 20px;
    }

    .btn6 {
        margin: 10px, 0;
        width: 200px;
        font-size: 16px;
        color: black;

        background: -moz-linear-gradient(top,#BFD9E5, #3D95B7 50%,#0080B3 50%,#0099CC);
        background: -webkit-gradient(linear, left top, left bottom, from(#BFD9E5), color-stop(0.5,#3D95B7), color-stop(0.5,#0080B3), to(#0099CC));
        color: #FFF;
        border-radius: 4px;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        -moz-box-shadow: 1px 1px 1px rgba(000,000,000,0.3),inset 0px 0px 3px rgba(255,255,255,0.5);
        -webkit-box-shadow: 1px 1px 1px rgba(000,000,000,0.3),inset 0px 0px 3px rgba(255,255,255,0.5);
        text-shadow: 0px 0px 3px rgba(0,0,0,0.5);
    }

    .active {
        -webkit-box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.6);
        -moz-box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.6);
        box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.6);
        background: #2E5481;
        border: solid 1px #203E5F;
    }

    #story {

    }

    #item {
        display: none;
    }
</style>
<script>
    $(function() {
        $('#itemButton').click(function() {
            $('#itemButton').addClass('active');
            $('#storyButton').removeClass('active');
            $('#story').hide();
            $('#item').show();
        });
        $('#storyButton').click(function() {
            $('#storyButton').addClass('active');
            $('#itemButton').removeClass('active');
            $('#story').show();
            $('#item').hide();
        });
    });
</script>
<h4>Memories</h4>
<button id="storyButton" class="btn6 active" type="button">
        ストーリー
</button>
<button id="itemButton" class="btn6" type="button">
        アイテム
</button>

<div id="story">
    <p class="comment">もう1度読みたい話を選んでね</p>
    <?php foreach($get_story as $value): ?>
        <?php echo Form::open(array(
                'method'    => 'post',
                'action'    => 'story/story/story')); ?>
        <?php echo Form::hidden('story_id', $value['story_id']); ?>
        <?php echo Form::submit('submit', $value['story'], array('class' => 'submit')); ?>
        <?php echo Form::close(); ?>
    <?php endforeach; ?>
</div>
<div id="item">
    <p class="comment">手に入れたアイテムを選んでね</p>
    <?php foreach($get_item as $value): ?>
        <?php echo Form::open(array(
                'method'    => 'post',
                'action'    => 'memory/memory/view')); ?>
        <?php echo Form::hidden('item_id', $value['id']); ?>
        <?php echo Form::submit('submit', $value['item_name'], array('class' => 'submit')); ?>
        <?php echo Form::close(); ?>
    <?php endforeach; ?>
</div>