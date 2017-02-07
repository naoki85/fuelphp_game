<?php
class Controller_Memory_Memory extends Controller_Template {

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
        $user       = Auth::get_user_id();
        $data['id'] = $user[1];

        // user_getテーブルから参照
        $data['get_story'] = DB::select()
            ->from('user_get')
            ->where('user_id', '=', $data['id'])
            ->join('story', 'INNER')->on('user_get.story_id', '=', 'story.id')
            ->order_by('story.id', 'asc')
            ->execute();

        $get_item = DB::select('item_id')
            ->from('user_get')
            ->where('user_id', '=', $data['id'])
            ->distinct(true)
            ->execute()
            ->as_array();

        $data['get_item'] = array();
        for($i = 0; $i < count($get_item); $i++) {
            if(isset($get_item[$i]['item_id'])) {
            $select_item = DB::select()
                ->from('item')
                ->where('id', '=', $get_item[$i])
                ->order_by('id', 'asc')
                ->execute()
                ->as_array();
                if(!empty($select_item)) {
                    array_push($data['get_item'], $select_item[0]);
                }
            }
        }
        //ビューテンプレートを呼び出し
        $this->template->title = '';
        $this->template->content = View::forge('memory/index', $data);
        return;
    }

    public function action_view() {
        $item_id = Input::post('item_id');

        $data['item'] = DB::select()
            ->from('item')
            ->where('id', '=', $item_id)
            ->execute()
            ->as_array();

        $this->template->title = '';
        $this->template->content = View::forge('memory/view', $data);
        return;
    }
}