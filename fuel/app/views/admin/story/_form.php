<?php echo Form::open(array("class"=>"form-horizontal")); ?>

	<fieldset>
		<div class="form-group">
			<?php echo Form::label('Story', 'story', array('class'=>'control-label')); ?>

				<?php echo Form::input('story', Input::post('story', isset($story) ? $story->story : ''), array('class' => 'col-md-4 form-control', 'placeholder'=>'Story')); ?>

		</div>
		<div class="form-group">
			<?php echo Form::label('Memo', 'memo', array('class'=>'control-label')); ?>

				<?php echo Form::input('memo', Input::post('memo', isset($story) ? $story->memo : ''), array('class' => 'col-md-4 form-control', 'placeholder'=>'Memo')); ?>

		</div>
		<div class="form-group">
			<label class='control-label'>&nbsp;</label>
			<?php echo Form::submit('submit', 'Save', array('class' => 'btn btn-primary')); ?>		</div>
	</fieldset>
<?php echo Form::close(); ?>