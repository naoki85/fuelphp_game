<?php
class Model_User_Get extends \Orm\Model
{
	protected static $_table_name = 'user_get';

	protected static $_properties = array(
		'id',
		'user_id',
		'story_id',
		'item_id',
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

}
