<?php echo Form::open(array("class"=>"form-horizontal")); ?>

	<fieldset>
		<div class="form-group">
			<?php echo Form::label('Item_name', 'item_name', array('class'=>'control-label')); ?>

				<?php echo Form::input('item_name', Input::post('item_name', isset($item_name) ? $gacha->item_name : ''), array('class' => 'col-md-4 form-control', 'placeholder'=>'Item_name')); ?>

		</div>
		<div class="form-group">
			<?php echo Form::label('Item_image', 'item_image', array('class'=>'control-label')); ?>

				<?php echo Form::input('item_image', Input::post('item_image', isset($item_image) ? $gacha->item_image : ''), array('class' => 'col-md-4 form-control', 'placeholder'=>'Item_image')); ?>
		</div>
		<div class="form-group">
			<?php echo Form::label('Memo', 'memo', array('class'=>'control-label')); ?>

				<?php echo Form::input('memo', Input::post('memo', isset($memo) ? $gacha->memo : ''), array('class' => 'col-md-4 form-control', 'placeholder'=>'Memo')); ?>
		</div>
		<div class="form-group">
			<label class='control-label'>&nbsp;</label>
			<?php echo Form::submit('submit', 'Save', array('class' => 'btn btn-primary')); ?>		</div>
	</fieldset>
<?php echo Form::close(); ?>