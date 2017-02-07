<h3>こちらで登録してよろしいですか？</h3>
<p>ユーザーネーム：<?php echo $input['username']; ?></p>
<p>メールアドレス：<?php echo $input['email']; ?></p>
<p>パスワード：<?php echo $input['password']; ?></p>

<?php
echo Form::open(array('action' => 'add/add/add'));
echo Form::hidden('username',$input['username']);
echo Form::hidden('email',$input['email']);
echo Form::hidden('password',$input['password']);
echo Form::submit('submit1','修正', array('class' => 'btn3'));
echo Form::close();
?>

<?php
echo Form::open(array('action' => 'add/add/done'));
// CSRF対策
// echo Form::csrf();
// <input type='hidden' name='name' value=echo $name; id='name' />
echo Form::hidden('username', $input['username'], array('id' => 'username'));
echo Form::hidden('email', $input['email'], array('id' => 'email'));
echo Form::hidden('password', $input['password'], array('id' => 'password'));
// <input type='submit' value='送信' name='submit2' id='form_submit2' />
echo Form::submit('submit2','送信', array('class' => 'btn3'));
echo Form::close();
?>