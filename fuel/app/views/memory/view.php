<?php foreach($item as $value): ?>
<h4><?php echo $value['item_name']; ?></h4>
<div><?php echo Asset::img('chara/'.$value['item_image']); ?></div>
<p class="comment"><?php echo $value['memo']; ?></p>
<?php endforeach; ?>
<?php echo Html::anchor('memory/memory', 'Memories'); ?>