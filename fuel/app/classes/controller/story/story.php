<?php
class Controller_Story_Story extends Controller_Template {

    public $template = 'template';

    public function before()
    {
        parent::before();
        //未ログインの場合、ログインページへリダイレクト
        if(!Auth::check()){
            Response::redirect('login/login/login');
        }
    }

    public function action_story() {
        // ユーザーのストーリーIDを+1する
        // これは自作のストーリークラスで管理？
        $user       = Auth::get_user_id();
        $data['id'] = $user[1];
        $story_id = intval($_POST['story_id']);
        $ins_story = strval($story_id);
        // storybuilder
        $data['story'] = htmlentities($this->storybuilder($story_id));

        // user_getテーブルにログがなければインサート
        $get_story = DB::select()
            ->from('user_get')
            ->where('user_id', '=', $data['id'])
            ->where('story_id', '=', $ins_story)
            ->execute()
            ->as_array();

        if(empty($get_story)) {
            $ins_get_story = \DB::insert('user_get')
                ->set(array(
                'user_id'       => $data['id'],
                'story_id'      => $ins_story,
                'created_at'    => time(),
                'updated_at'    => time(),
                ))
                ->execute();
        }


        // マイページからの遷移であれば、story_idを+1する
        if (strpos($_SERVER['HTTP_REFERER'],'mypage') !== false) {
        $story_id = strval($story_id + 1);
        }
        // UPDATE `users` SET `story_id` = '{$story_id}' WHERE `id` = '{$data['id]}';
        $update = \DB::update('users')
            ->value('story_id', $story_id)
            ->where('id', '=', $data['id'])
            ->execute();
        
        // 画像ファイル名の呼び出し
        $data['image'] = Model_Image::find('all');

        //ビューテンプレートを呼び出し
        $this->template->title = '';
        $this->template->content = View::forge('story/story', $data);
        return;
    }

    public function storybuilder($story_id = 1) {
        //$query = 'SELECT * FROM scene WHERE story_id = '.$story_id;
        $scene_first = DB::select()
            ->from('scene')
            ->where('story_id', '=', $story_id)
            ->order_by('id', 'asc')
            ->limit(1)
            ->execute();

        $scene_other = DB::select()
            ->from('scene')
            ->where('story_id', '=', $story_id)
            ->order_by('id', 'asc')
            ->limit(100)
            ->offset(1)
            ->execute();

        $story  = "this.hideSimpleText('start');";
        foreach($scene_first as $value):
                $story  .= "this.changeBgImg('".$value['bg_img']."');";
                $story  .= "this.showBackground();";
        endforeach;
            $story  .= "var mainData = {";
            $story  .= "    name: 'main',";
            $story  .= "    flag: null,";
            $story  .= "    story: null,";
            $story  .= "    data: [";
        foreach($scene_first as $value):
            $story  .= "        { type: 'createSimpleText', param: [";
            $story  .= "            '".$value['comment']."',";
            $story  .= "            'main".$value['id']."',";
            $story  .= "                {";
            $story  .= "                    loc: [0, 350],";
            $story  .= "                    style: 'color: #DCDCDC; font-size: 20px; padding: 0 5px',";
            $story  .= "                    shadow: true";
            $story  .= "                 }";
            $story  .= "        ] },";
        endforeach;
        foreach($scene_other as $value):
            $story  .= "        { type: 'createSimpleText', param: [";
            $story  .= "            '".$value['comment']."',";
            $story  .= "            'main".$value['id']."',";
            $story  .= "                {";
            $story  .= "                    loc: [0, 350],";
            $story  .= "                    style: 'color: #DCDCDC; font-size: 20px; padding: 0 5px',";
            $story  .= "                    shadow: true";
            $story  .= "                 }";
            $story  .= "        ] },";
        endforeach;
            $story  .= "        { type: 'showText'},";
        foreach($scene_first as $value):
            $story  .= "        { type: 'typeSimpleText', param: 'main".$value['id']."'},";
            $story  .= "        { type: 'waitUntilClick', param: this.disp },";
            $story  .= "        { type: 'hideSimpleText', param: 'main".$value['id']."'},";
        endforeach;
        foreach($scene_other as $value):
            if($value['bg_change_flg'] == 1):
                $story  .= "        { type: 'changeBgImg', param: [";
                $story  .= "            '".$value['bg_img']."',";
                $story  .= "            'main',";
                $story  .= "        ] },";
            endif;
            $story  .= "        { type: 'typeSimpleText', param: 'main".$value['id']."'},";
            $story  .= "        { type: 'waitUntilClick', param: this.disp },";
            $story  .= "        { type: 'hideSimpleText', param: 'main".$value['id']."'},";
        endforeach;
            $story  .= "        ]};  ";
            $story  .= "        if (!this.GData.eventData) this.GData.eventData = [];";
            $story  .= "        this.GData.eventData.push(mainData);  ";
            $story  .= "        this.addScene('main');  ";

        return $story;
    }

}