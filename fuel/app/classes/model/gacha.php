<?php
class Model_Gacha extends \Orm\Model
{
	protected static $_table_name = 'gacha';

	protected static $_properties = array(
		'id',
		'item_id',
		'ratio',
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
