<?php echo Asset::css('paginate.css'); ?>
<h2>Listing scene</h2>
<br>
<?php if ($scene): ?>
<section class="paginate">
	<nav class="pagination">
		<?php for($i = 1; $i <= $maxpage; $i++): ?>
			<a href="scene?page=<?php echo $i; ?>"><?php echo $i; ?></a>
		<?php endfor; ?>
	</nav>
</section>
<table class="table table-striped">
	<thead>
		<tr>
			<th>id</th>
			<th>story_id</th>
			<th>bg_img</th>
			<th>bg_change_flg</th>
			<th>comment</th>
			<th>created_at</th>
			<th>updated_at</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
<?php foreach ($scene as $item): ?>		<tr>

			<td><?php echo $item['id']; ?></td>
			<td><?php echo $item['story_id']; ?></td>
			<td><?php if (isset($item['bg_img']) && $item['bg_img'] != NULL) {
					echo Asset::img('chara/'.$item['bg_img'], array(
			            'width'     => '50px',
			            'height'    => '75px')); 
			          } else {
			        echo $item['bg_img'];
			          	}?></td>
			<td><?php echo $item['bg_change_flg']; ?></td>
			<td><?php echo $item['comment']; ?></td>
			<td><?php echo $item['created_at']; ?></td>
			<td><?php echo $item['updated_at']; ?></td>
			<td>
				<?php echo Html::anchor('admin/scene/view/'.$item['id'], 'View'); ?> |
				<?php echo Html::anchor('admin/scene/edit/'.$item['id'], 'Edit'); ?> |
				<?php echo Html::anchor('admin/scene/delete/'.$item['id'], 'Delete', array('onclick' => "return confirm('Are you sure?')")); ?>

			</td>
		</tr>
<?php endforeach; ?>	</tbody>
</table>

<?php else: ?>
<p>No scene.</p>

<?php endif; ?><p>
	<?php echo Html::anchor('admin/scene/create', 'Add new Scene', array('class' => 'btn btn-success')); ?>

</p>
