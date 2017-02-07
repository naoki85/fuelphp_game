<h2>Viewing #<?php echo $gacha->id; ?></h2>

<p>
	<strong>Gacha:</strong>
	<?php echo $gacha->item_id; ?></p>
<p>
	<strong>Memo:</strong>
	<?php echo $gacha->ratio; ?></p>

<?php echo Html::anchor('admin/gacha/edit/'.$gacha->id, 'Edit'); ?> |
<?php echo Html::anchor('admin/gacha', 'Back'); ?>