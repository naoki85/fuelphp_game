<?php
class Controller_Login_Login extends Controller_Template
{

    public $template = 'template';

    public function before()
    {
        parent::before();
    }
    
    public function action_login() {
        //すでにログイン済であればログイン後のページへリダイレクト
        Auth::check() and Response::redirect('mypage');
        //エラーメッセージ用変数初期化
        $error = null;
        //ログイン用のオブジェクト生成
        $auth = Auth::instance();
        //ログインボタンが押されたら、ユーザ名、パスワードをチェックする
        if (Input::post()) {
            if ($auth->login(Input::post('username'), Input::post('password'))) {
                // ログイン成功時、ログイン後のページへリダイレクト
                Response::redirect('mypage/');
            }else{
                // ログイン失敗時、エラーメッセージ作成
                $error = 'ユーザ名かパスワードに誤りがあります';
            }
        }
        //ビューテンプレートを呼び出し
        $this->template->title = 'ログイン画面';
        $this->template->content = View::forge('login/login');
        //エラーメッセージをビューにセット
        $this->template->content->set_safe('error', $error);
        return;
    }

/*
        if(Auth::check()) Response::redirect($this->get_groups_redirect_path());
 
        $val = Validation::forge();
 
        if (Input::method() == 'POST')
        {
            $val->add('nickname', 'Nickname')
                ->add_rule('required');
            $val->add('password', 'Password')
                ->add_rule('required');
 
            if ($val->run())
            {
                if (Auth::instance()->login(Input::post('nickname'), Input::post('password')))
                {
                    $current_user = Model_Userinfo::find_by_nickname(Auth::get_screen_name());
                    Session::set_flash('success', e('Welcome, '.$current_user->nickname));
 
                    Response::redirect($this->get_groups_redirect_path());
                }
 
                // login failure
                Session::set_flash('error', e('login error. please try agein'));
                     
            }
        }
 
        $this->template->title = 'ログイン画面';
        $this->template->content = View::forge('login/login')->set('val', $val, false);
    }
 
    public function action_logout()
    {
        if(!Auth::logout())
        {
            Session::set_flash('info', e('logout success'));
            Response::redirect('sign/login');
        }   
    }
 
    public function get_groups_redirect_path()
    {
        $groups = Auth::instance()->get_groups();
        $group = $groups[0][1];
 
        $group == Util_Const::GROUP_ADMINISTRATOR_KEY and $redirect_path = 'mypage';
        $group == Util_Const::GROUP_USER_KEY and $redirect_path = 'mypage';
 
        return empty($redirect_path) ? '':$redirect_path;
    }
    */
}