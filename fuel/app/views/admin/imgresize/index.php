<?php echo Asset::css('paginate.css'); ?>
<h2>Resize Image</h2>
<br>
<!-- <form action="" method="post" enctype="multipart/form-data"> -->
   <!-- <input type="file" name="upload_file" /> -->
   <!-- <input type="submit" value="アップロード" style="margin: 10px 0;" /> -->
<!-- </form> -->
<?php echo Form::open(array(
		'action'	=> 'admin/imgresize/index',
		'method'	=> 'post',
		'enctype'	=> 'multipart/form-data')); ?>
<?php echo Form::file('upload_file'); ?>
<?php echo Form::submit('submit', 'アップロード', array('style'	=> 'margin: 10px 0;')); ?>
<?php echo Form::close(); ?>

<?php if ($image): ?>
<section class="paginate">
	<nav class="pagination">
		<?php for($i = 1; $i <= $maxpage; $i++): ?>
			<a href="http://localhost:8000/admin/imgresize/index.php?page=<?php echo $i; ?>"><?php echo $i; ?></a>
		<?php endfor; ?>
	</nav>
</section>
<table class="table table-striped">
	<thead>
		<tr>
			<th>Image</th>
			<th>Memo</th>
		</tr>
	</thead>
	<tbody>
<?php foreach ($image as $value): ?>		
	<tr>
			<td><?php echo Asset::img('chara/'.$value['name'], array(
            'width'     => '100px',
            'height'    => '150px')); ?></td>
			<td><?php echo $value['memo']; ?></td>
	</tr>
<?php endforeach; ?>
	</tbody>
</table>
<?php endif; ?>
