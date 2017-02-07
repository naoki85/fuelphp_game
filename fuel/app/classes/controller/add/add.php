<?php

class Controller_Add_Add extends Controller_Template {

    public $template = 'template';

    public function before() {
        parent::before();
    }

    public function action_add() {
        // submitが押されたとき
        if (Input::post('submit1')) {
            $value = array(
            'username'      => $_REQUEST['username'],
            'email'  => $_REQUEST['email'],
            'password'  => $_REQUEST['password']
            );
        } else {
            $value = array(
            'username'      => null,
            'email'  => null,
            'password'  => null
            );
            }

        if(isset($value)) {
            $this->template->title = '会員登録';
            $this->template->content = View::forge('add/add', $value);
        } else {
            $this->template->title = '会員登録';
            $this->template->content = View::forge('add/add');
        }
    }

    public function action_confirm() {
        $val = $this->forge_validation();
        $value = array(
            'username'      => $_REQUEST['username'],
            'email'  => $_REQUEST['email'],
            'password'  => $_REQUEST['password']
            );
        
        // run()メソッドで検証を実行
        if($val->run($value)) {
            // validatted: 検証済みの入力データを返す
            $data['input'] = $val->validated();
            $this->template->title = '登録内容確認';
            $this->template->content = View::forge('add/confirm', $data);
        } else {
            $this->template->title = '登録内容に不備があります';
            $this->template->content = View::forge('add/add', $value);
            // HTMLエスケープしないようにset_safeでビューにshow_errors()を渡す
            $this->template->content->set_safe('html_error',$val->show_errors());
            //$this->template->content->set_safe('html_form',$form->build('add/confirm'));
        }


        /*
        //データ用の配列初期化
        $data = array();
        var_dump($_POST['name']);
        $data['name'] = Input::post('name');
        
        //入力のときに保存したセッションデータを配列に保存
        foreach ($this->fields as $field) {
            /*
            $data[$field] = Session::get_flash($field);
            //セッション変数を次のリクエストを維持
            Session::keep_flash($field);
            
            var_dump($field);
            var_dump(Input::post($field));
            $data[$field] = Input::post($field);

    }
        //データをビューに渡す
        var_dump($data);
        return View::forge('add/confirm',$data);
        */
        // $this->template->title = '会員登録';
        // $this->template->content = View::forge('add/confirm');
    }

    public function action_done() {
        /*
        // CSRF対策
        if(!Security::check_token()) {
            throw new HttpInvalidInputException('ページ遷移が正しくありません。');
        }
        */
        $username   = $_REQUEST['username'];
        $password   = $_REQUEST['password'];
        $email      = $_REQUEST['email'];

        Auth::create_user($username, $password, $email);
        /*
        $value = array(
            'username'          => $_REQUEST['username'],
            'password'      => $_REQUEST['password'],
            'group'         => '1',
            'email'      => $_REQUEST['email'],
            'last_login'    => Date::time(),
            'login_hash'    => 'jshdyrokosidkvnchxtiosdjkck',
            'profile_fields' => 'abc',
            // 'story_id'      => '1',
            // 'last_login'    => NOW(),
            );


        //入力チェックのためのvalidationオブジェクトを呼び出す
        $val = Validation::forge();

        if($val->run($value)) {
            // validatted: 検証済みの入力データを返す
            $data = $val->validated();

            // データベースへ保存
            $model_users = Model_Users::forge()->set($value);
            list($id, $rows) = $model_users->save();

            if(!$rows) {
                Log::error('データベース保存エラー', __METHOD__);

                //$form->repopulate();
                $this->template->title = 'コンタクトフォーム: サーバーエラー';
                $this->template->content = View::forge('add/add');
                $html_error = '<p>サーバでエラーが発生しました。</p>';
                // $this->template->content->set_safe('html_error', $html_error);
                // $this->template->content->set_safe('html_error', $form->build('form/confirm'));
            }
        } else {
                $this->template->title = 'コンタクトフォーム: サーバーエラー';
                $this->template->content = View::forge('add/add');
                $html_error = '<p>サーバでエラーが発生しました。</p>';
                return;
        }
        */

        $this->template->title = '登録完了しました';
        $this->template->content = View::forge('add/done');
        return;
    }

    // 検証ルールの定義
    public function forge_validation() {

        $val = Validation::forge();

        $val->add('username','ユーザーネーム')
            ->add_rule('trim')
            ->add_rule('required')
            ->add_rule('max_length', 50);

        $val->add('email','メールアドレス')
            ->add_rule('trim')
            ->add_rule('required')
            ->add_rule('max_length', 50);
            
        $val->add('password','パスワード')
            ->add_rule('required')
            ->add_rule('min_length', 8);

        // $val->add('story_id','story_id');

        return $val;
    }
}