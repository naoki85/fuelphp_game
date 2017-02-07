<h2>Editing Story</h2>
<br>

<?php echo render('admin/story/_form'); ?>
<p>
	<?php echo Html::anchor('admin/story/view/'.$story->id, 'View'); ?> |
	<?php echo Html::anchor('admin/story', 'Back'); ?></p>
