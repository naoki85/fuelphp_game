<?php if (isset($html_error)):
    echo $html_error; 
endif;?>
<?php echo Form::open('add/add/confirm'); ?>

    <?php echo Form::label('ユーザーネーム', 'username'); ?>：
    <?php echo Form::input('username', $username); ?><br />

    <?php echo Form::label('メールアドレス', 'email'); ?>：
    <?php echo Form::input('email', $email); ?><br />

    <?php echo Form::label('パスワード', 'password'); ?>：
    <?php echo Form::input('password', $password); ?><br />

    <?php echo Form::submit('submit', '登録する'); ?>

<?php echo Form::close(); ?>


