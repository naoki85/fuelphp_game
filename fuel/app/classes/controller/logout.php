<?php
class Controller_Logout extends Controller
{
    public function action_index()
    {
        //ログイン用のオブジェクト生成
        $auth = Auth::instance();
        $auth->logout();
        Response::redirect('/toppage');
    }
}