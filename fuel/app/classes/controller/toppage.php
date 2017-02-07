<?php

class Controller_Toppage extends Controller_Template {

    public $template = 'template';

    public function before() {
        parent::before();
    }

    public function action_index() {
        
        $this->template->title = '米山のなく頃に　トップページ';
        $this->template->content = View::forge('toppage');
        return;
    }
}