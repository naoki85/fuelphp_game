<?php
class Controller_Mypage extends Controller_Template
{
    public $template = 'template';

    public function before()
    {
        parent::before();

        //未ログインの場合、ログインページへリダイレクト
        if(!Auth::check()){
            Response::redirect('login/login/login');
        }
    }

    public function action_index() {
        // ログインユーザーの情報を取得
        $admin = Auth::get_user_id();

        // usersテーブルからデータを取得
        // SELECT * FROM `users` INNER JOIN `story` ON `users`.`story_id` = `story`.`id` WHERE `users`.`id` = `{$user[1]}`;
        $users = \DB::select()
            ->where('users.id', '=', $admin[1])            //->and_where('u.story_id', '=', 's.id')
            ->from('users')
            ->join('story', 'INNER')->on('users.story_id', '=', 'story.id')
            ->execute()
            ->as_array();
// var_dump($users);
        foreach($users as $user) {
            $data['id']         = $admin[1];
            $data['username']   = $user['username'];
            $data['story_id']   = $user['story_id'];
            $data['story']      = $user['story'];
        }

        //ビューテンプレートを呼び出し
        $this->template->title = $data['username'].'さんのマイページ';
        $this->template->content = View::forge('mypage', $data);
        return;
        //エラーメッセージをビューにセット
        // $view->set('error', $error);
    }

}