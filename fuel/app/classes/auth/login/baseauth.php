<?php
class Auth_Login_BaseAuth extends Auth\Auth_Login_Driver {

    protected $config = array('drivers' => array(
                                            'group' => array(
                                                'BaseAuth')
                                            )
                        );
 
    protected $user;
 
    protected function perform_check() {
        $current_user = Session::get('current_user');
 
        if (!is_null($current_user) && is_array($current_user)) {
            if (isset($current_user['id']) && isset($current_user['salt'])) {
 
            $dlt_flg = Util_Const::DB_DLT_OFF;
 
            $users = DB::query(
                'SELECT * FROM tb_users WHERE id = :id AND salt = :salt AND dlt_flg = :dlt_flg'
            )
                ->bind('id', $current_user['id'])
                ->bind('salt' , $current_user['salt'])
                ->bind('dlt_flg' , $dlt_flg)
                ->as_object('Model_Userinfo')
                ->execute()
                ->as_array();
 
                if (!is_null($users) && count($users) === 1) {
                    $this->user = reset($users);
                    return true;
                }
 
            }
 
        }
        return false;
    }
 
    public function validate_user($nickname = '', $password = '') {
 
        if(empty($nickname) || empty($password)) return false;
 
        $nickname = trim($nickname);
        $password = trim($password);
 
        $password = $this->hash_password($password);
        $dlt_flg = Util_Const::DB_DLT_OFF;
 
        $users = DB::query(
            'SELECT * FROM user_info WHERE (nickname = :nickname AND password = :password AND dlt_flg = :dlt_flg'
        )
        ->bind('nickname', $nickname)
        ->bind('password' , $password)
        ->bind('dlt_flg' , $dlt_flg)
        ->as_object('Model_Userinfo')
        ->execute()
        ->as_array();
 
        if (!is_null($users) && count($users) === 1){
 
            $this->user = reset($users);
            $this->user->last_login = Date::forge()->get_timestamp();
            $this->user->salt = $this->create_salt();
            $this->user->save();
 
            Session::set('current_user', array('id' => $this->user->id,'salt' => $this->user->salt));
 
            return true;
        }
 
        return false;
    }
 
    public function login($nickname = '', $password = '') {
        return $this->validate_user($nickname, $password);
    }
 
    public function logout() {
        Session::delete('current_user');
        return true;
    }
 
    public function get_user_id() {
        if (!empty($this->user) && isset($this->user['id'])) {
        return array($this->id, (int)$this->user['id']);
        }
 
    return null;
    }
 
    public function get_groups() {
        if (!empty($this->user) && isset($this->user['group'])) {
        return array(array('BaseAuth', $this->user['group']));
        }
    return null;
    }

    public function get_email() {
        /*
        if (!empty($this->user) && isset($this->user['email'])) {
        return $this->user['email'];
        }
    return null;
    */
    }

    public function get_screen_name() {
        if (!empty($this->user) && isset($this->user['nickname'])) {
            return $this->user['nickname'];
        }
    return null;
    }
 
    public function has_access($condition, $driver = null, $entity = null) {
        if (is_null($entity) && !empty($this->user)) {
            $groups = $this->get_groups();
            $entity = reset($groups);
        }
    return parent::has_access($condition, $driver, $entity);
    }
 
    public function create_salt()
    {
        if (empty($this->user)) throw new Exception();
        return sha1(Config::get('baseauth.login_hash_salt').$this->user->username.$this->user->last_login);
    }

    public function create_user($name, $nickname, $password)
    {
    $password = trim($password);
    //$email = filter_var(trim($email), FILTER_VALIDATE_EMAIL);
 
    if (empty($name) or empty($nickname) or empty($password))
        throw new Exception('Nickname or password is not given, or password is invalid');
 
    $user = new Model_Userinfo();
    $user->name = $name;
    $user->nickname = $nickname;
    $user->password = $this->hash_password((string) $password);
    $user->story_id = 1;
    // $user->email = $email;
    // $user->group = $group;
    // $user->auth_type = $auth_type;
    // $user->last_login = '';
    // $user->salt = '';
    // $user->dlt_flg = $dlt_flg;
 
    try{
        $user->save();
    }catch(Exception $e){
        throw new Exception('create user registry error');
    }
    return 1;
    }
}
