<h2>Viewing #<?php echo $story->id; ?></h2>

<p>
	<strong>Story:</strong>
	<?php echo $story->story; ?></p>
<p>
	<strong>Memo:</strong>
	<?php echo $story->memo; ?></p>

<?php echo Html::anchor('admin/story/edit/'.$story->id, 'Edit'); ?> |
<?php echo Html::anchor('admin/story', 'Back'); ?>