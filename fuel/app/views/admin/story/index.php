<?php echo Asset::css('paginate.css'); ?>
<h2>Listing story</h2>
<br>
<?php if ($story): ?>
<section class="paginate">
	<nav class="pagination">
		<?php for($i = 1; $i <= $maxpage; $i++): ?>
			<a href="story?page=<?php echo $i; ?>"><?php echo $i; ?></a>
		<?php endfor; ?>
	</nav>
</section>
<table class="table table-striped">
	<thead>
		<tr>
			<th>Story</th>
			<th>Memo</th>
			<th></th>
		</tr>
	</thead>
	<tbody>
<?php foreach ($story as $item): ?>		<tr>

			<td><?php echo $item['story']; ?></td>
			<td><?php echo $item['memo']; ?></td>
			<td>
				<?php echo Html::anchor('admin/story/view/'.$item['id'], 'View'); ?> |
				<?php echo Html::anchor('admin/story/edit/'.$item['id'], 'Edit'); ?> |
				<?php echo Html::anchor('admin/story/delete/'.$item['id'], 'Delete', array('onclick' => "return confirm('Are you sure?')")); ?>
			</td>
		</tr>
<?php endforeach; ?>	</tbody>
</table>

<?php else: ?>
<p>No story.</p>

<?php endif; ?><p>
	<?php echo Html::anchor('admin/story/create', 'Add new Story', array('class' => 'btn btn-success')); ?>

</p>
