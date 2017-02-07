<?php

namespace Fuel\Migrations;

class Create_stories
{
	public function up()
	{
		\DBUtil::create_table('stories', array(
			'id' => array('constraint' => 11, 'type' => 'int', 'auto_increment' => true, 'unsigned' => true),
			'story' => array('constraint' => 255, 'type' => 'varchar'),
			'memo' => array('constraint' => 255, 'type' => 'varchar'),
			'created_at' => array('constraint' => 11, 'type' => 'int', 'null' => true),
			'updated_at' => array('constraint' => 11, 'type' => 'int', 'null' => true),

		), array('id'));
	}

	public function down()
	{
		\DBUtil::drop_table('stories');
	}
}