<?php
class Model_Scene extends \Orm\Model
{
	protected static $_table_name = 'scene';

	protected static $_properties = array(
		'id',
		'story_id',
		'bg_img',
		'bg_change_flg',
		'comment',
		'created_at',
		'updated_at',
	);

	protected static $_observers = array(
		'Orm\Observer_CreatedAt' => array(
			'events' => array('before_insert'),
			'mysql_timestamp' => false,
		),
		'Orm\Observer_UpdatedAt' => array(
			'events' => array('before_save'),
			'mysql_timestamp' => false,
		),
	);

	public static function validate($factory)
	{
		$val = Validation::forge($factory);
		$val->add_field('bg_img', 'Bg_img', 'required|max_length[255]');
		$val->add_field('comment', 'Comment', 'required|max_length[255]');

		return $val;
	}

}
