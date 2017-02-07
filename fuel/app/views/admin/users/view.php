<h2>Viewing #<?php echo $users->id; ?></h2>

<p>
	<strong>Username:</strong>
	<?php echo $users->username; ?></p>
<p>
	<strong>Email:</strong>
	<?php echo $users->email; ?></p>
<p>
    <strong>Password:</strong>
    <?php echo $users->password; ?></p>
<p>
    <strong>Story_id:</strong>
    <?php echo $users->story_id; ?></p>
<p>
    <strong>Last_login:</strong>
    <?php echo $users->last_login; ?></p>

<?php echo Html::anchor('admin/users/edit/'.$users->id, 'Edit'); ?> |
<?php echo Html::anchor('admin/users', 'Back'); ?>