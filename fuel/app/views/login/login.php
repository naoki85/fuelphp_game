<div class="container">
<div class="row">

<h3>ログイン画面</h3>


<?php echo Form::open(array('class' => 'form-horizontal'));?>

<?php if (isset($error)): ?>
<p class="alert alert-warning"><?php echo $error ?></p>
<?php endif ?>


<div class="form-group">
<label for="form_name" class="col-sm-4 control-label">ユーザ名</label>
<div class="col-sm-8">
<?php echo Form::input('username');?>
</div>
</div>

<div class="form-group">
<label for="form_name" class="col-sm-4 control-label">パスワード</label>
<div class="col-sm-8">
<?php echo Form::password('password');?>
</div>
</div>

 <div class="form-group">
<div class="col-sm-offset-4 col-sm-8">
<?php echo Form::submit('submit', 'ログイン', array('class' => 'btn3'));?>

</div>
</div>
<?php echo Form::close();?>

</div>
</div>