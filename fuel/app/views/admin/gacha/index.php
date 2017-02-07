<?php echo Asset::css('paginate.css'); ?>
<h2>Listing gacha</h2>
<br>
<?php if ($gacha): ?>
<section class="paginate">
	<nav class="pagination">
		<?php for($i = 1; $i <= $maxpage; $i++): ?>
			<a href="gacha?page=<?php echo $i; ?>"><?php echo $i; ?></a>
		<?php endfor; ?>
	</nav>
</section>
<table class="table table-striped">
	<thead>
		<tr>
			<th>Id</th>
			<th>Item_name</th>
			<th>Item_image</th>
			<th>Ratio</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
<?php foreach ($gacha as $item): ?>		<tr>

			<td><?php echo $item['id']; ?></td>
			<td><?php echo $item['item_name']; ?></td>
			<td><?php echo Asset::img('chara/'.$item['item_image'], array(
			            'width'     => '50px',
			            'height'    => '75px')); ?></td>
			<td><?php echo $item['ratio']; ?></td>
			<td>
				<?php echo Html::anchor('admin/gacha/view/'.$item['id'], 'View'); ?> |
				<?php echo Html::anchor('admin/gacha/edit/'.$item['id'], 'Edit'); ?> |
				<?php echo Html::anchor('admin/gacha/delete/'.$item['id'], 'Delete', array('onclick' => "return confirm('Are you sure?')")); ?>
			</td>
		</tr>
<?php endforeach; ?>	</tbody>
</table>

<?php else: ?>
<p>No gacha.</p>

<?php endif; ?><p>
	<?php echo Html::anchor('admin/gacha/create', 'Add new Gacha', array('class' => 'btn btn-success')); ?>

</p>
