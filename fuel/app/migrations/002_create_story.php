<?php

namespace Fuel\Migrations;

class Create_story
{
	public function up()
	{
		\DBUtil::create_table('story', array(
			'id' => array('constraint' => 11, 'type' => 'int', 'auto_increment' => true, 'unsigned' => true),
			'title' => array('constraint' => 200, 'type' => 'varchar'),
			'memo' => array('constraint' => 200, 'type' => 'varchar'),
			'created_at' => array('constraint' => 11, 'type' => 'int'),
			'updated_at' => array('constraint' => 11, 'type' => 'int'),

		), array('id'));
	}

	public function down()
	{
		\DBUtil::drop_table('story');
	}
}