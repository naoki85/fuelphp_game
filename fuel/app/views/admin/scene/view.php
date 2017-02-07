<h2>Viewing #<?php echo $scene->id; ?></h2>

<p>
	<strong>ID:</strong>
	<?php echo $scene->id; ?></p>
<p>
	<strong>Story_id:</strong>
	<?php echo $scene->story_id; ?></p>
<p>
    <strong>bg_img:</strong>
    <?php echo $scene->bg_img; ?></p>
<p>
    <strong>bg_change_flg:</strong>
    <?php echo $scene->bg_change_flg; ?></p>
<p>
    <strong>Comment:</strong>
    <?php echo $scene->comment; ?></p>
<p>
    <strong>Comment:</strong>
    <?php echo $scene->created_at; ?></p>
<p>
    <strong>Comment:</strong>
    <?php echo $scene->updated_at; ?></p>

<?php echo Html::anchor('admin/scene/edit/'.$scene->id, 'Edit'); ?> |
<?php echo Html::anchor('admin/scene', 'Back'); ?>