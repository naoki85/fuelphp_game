<h2>Editing Gacha</h2>
<br>

<?php echo render('admin/gacha/_form'); ?>
<p>
	<?php echo Html::anchor('admin/gacha/view/'.$gacha->id, 'View'); ?> |
	<?php echo Html::anchor('admin/gacha', 'Back'); ?></p>
