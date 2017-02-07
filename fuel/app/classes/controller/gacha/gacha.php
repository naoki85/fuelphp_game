<?php
class Controller_Gacha_Gacha extends Controller_Template {

    public $template = 'template';

    public function before()
    {
        parent::before();
        //未ログインの場合、ログインページへリダイレクト
        if(!Auth::check()){
            Response::redirect('login/login/login');
        }
    }

    public function action_gacha() {

        //ビューテンプレートを呼び出し
        $this->template->title = '';
        $this->template->content = View::forge('gacha/gacha');
        return;
    }

    public function action_gachagacha() {
        $user       = Auth::get_user_id();
        $data['id'] = $user[1];

        if (strpos($_SERVER['HTTP_REFERER'],'gacha') == false) {
            Response::redirect('gacha/gacha/error');
        } else {
        // 中身 
        $gacha = DB::select()
            ->from('gacha')
            ->execute()
            ->as_array();

        //ratioの合計を算出
        $sumRate = 0;
        foreach($gacha as $v) {
            $sumRate += $v['ratio'];
        }

        // 乱数を生成
        $hitRand = rand(0, $sumRate);

        // 初期化 
        $tmpRate = 0; 
        for ($i = 0; $i < count($gacha); $i++) { 
            $tmpRate += $gacha[$i]['ratio']; 
            $gacha_result = $gacha[$i]; 
            if ($hitRand < $tmpRate) {
                break;
            } 
        }

        // user_getテーブルにインサート
        $ins_get_item = \DB::insert('user_get')
            ->set(array(
                'user_id'       => $data['id'],
                'item_id'       => $gacha_result['item_id'],
                'created_at'    => time(),
                'updated_at'    => time(),
            ))
            ->execute();

            Response::redirect('gacha/gacha/result');
        }
    }

    public function action_result() {
        $user       = Auth::get_user_id();
        $data['id'] = $user[1];

        $data['gacha_result'] = DB::select()
            ->from('user_get')
            ->where('user_id', '=', $data['id'])
            ->join('item', 'INNER')->on('user_get.item_id', '=', 'item.id')
            ->order_by('user_get.id', 'desc')
            ->limit(1)
            ->execute()
            ->as_array();

        $this->template->title = '';
        $this->template->content = View::forge('gacha/result', $data);
        return;
}

    public function action_error() {
        $this->template->title = '';
        $this->template->content = View::forge('gacha/error');
        return;
    }

}