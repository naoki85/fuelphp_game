<?php echo Form::open(array("class"=>"form-horizontal")); ?>

	<fieldset>
		<div class="form-group">
			<?php echo Form::label('Story_id', 'story_id', array('class'=>'control-label')); ?>

				<?php echo Form::input('story_id', Input::post('story_id', isset($scene) ? $scene->story_id : ''), array('class' => 'col-md-4 form-control', 'placeholder'=>'Story_id')); ?>

		</div>
		<div class="form-group">
			<?php echo Form::label('bg_img', 'bg_img', array('class'=>'control-label')); ?>

				<?php echo Form::input('bg_img', Input::post('bg_img', isset($scene) ? $scene->bg_img : ''), array('class' => 'col-md-4 form-control', 'placeholder'=>'Bg_img')); ?>

		</div>
		<div class="form-group">
			<?php echo Form::label('Bg_change_flg', 'bg_change_flg', array('class'=>'control-label')); ?>

				<?php echo Form::input('scene', Input::post('bg_change_flg', isset($scene) ? $scene->bg_change_flg : ''), array('class' => 'col-md-4 form-control', 'placeholder'=>'Bg_change_flg')); ?>

		</div>
		<div class="form-group">
			<?php echo Form::label('Comment', 'comment', array('class'=>'control-label')); ?>

				<?php echo Form::input('comment', Input::post('comment', isset($scene) ? $scene->comment : ''), array('class' => 'col-md-4 form-control', 'placeholder'=>'Comment')); ?>

		</div>
		<div class="form-group">
			<label class='control-label'>&nbsp;</label>
			<?php echo Form::submit('submit', 'Save', array('class' => 'btn btn-primary')); ?>		</div>
	</fieldset>
<?php echo Form::close(); ?>