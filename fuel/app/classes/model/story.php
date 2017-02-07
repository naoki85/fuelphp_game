<?php
class Model_Story extends \Orm\Model
{
	protected static $_table_name = 'story';

	protected static $_properties = array(
		'id',
		'story',
		'memo',
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
		$val->add_field('story', 'Story', 'required|max_length[255]');
		$val->add_field('memo', 'Memo', 'required|max_length[255]');

		return $val;
	}

}
