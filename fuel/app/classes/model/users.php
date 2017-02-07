<?php

class Model_Users extends \Orm\Model {

    protected static $_table_name = 'users';

    protected static $_properties = array(
        'id',
        'username',
        'password',
        'group',
        'email',
        'story_id',
        'last_login',
        'login_hash',
        'profile_fields',
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
        //$val->add_field('username', 'Username', 'required|max_length[50]');
        $val->add_field('password', 'Password', 'required|max_length[255]');
        $val->add_field('email', 'Email', 'required|valid_email|max_length[50]');
        //$val->add_field('last_login', 'Last_login', 'required|max_length[25]');

        return $val;
    }

    /*
    // 使用するテーブル名
    protected static $_table_name = 'users';
    // 作成日時
    protected static $_created_at = 'created_at';
    // 更新日時
    protected static $_updated_at = 'updated_at';
    */
}