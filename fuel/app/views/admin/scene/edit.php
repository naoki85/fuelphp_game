<h2>Editing Scene</h2>
<br>

<?php echo render('admin/scene/_form'); ?>
<p>
	<?php echo Html::anchor('admin/scene/view/'.$scene->id, 'View'); ?> |
	<?php echo Html::anchor('admin/scene', 'Back'); ?></p>
