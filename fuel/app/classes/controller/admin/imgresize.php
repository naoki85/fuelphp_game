<?php
class Controller_Admin_Imgresize extends Controller_Admin {

	public function action_index() {
        // ページャー実装
        if(!isset($_REQUEST['page']) || $_REQUEST['page'] === '') {
            $page = 1;
        } else {
            $page = $_REQUEST['page'];
        }
        // $pageか1の大きい値を$pageに格納する
        $page = max($page, 1);

        // 最終ページを取得する
        $sql = \DB::select('*')
            ->from('image')
            ->execute()
            ->as_array();
        
        $data['num_page'] = count($sql);

        $maxPage = ceil($data['num_page'] / 10);
        $data['page'] = $page = min($page, $maxPage);
        $data['maxpage'] = $maxPage;

        // 現在のページ番号を判定し、投稿を取得する
        $start = ($page - 1) * 10;
        $start = max(0, $start);

        $sql = \DB::select()
            ->from('image')
            ->limit(10)
            ->offset($start)
            ->execute()
            ->as_array();

        $data['image'] = $sql;

        if(isset($_FILES["upload_file"])) {
            var_dump($_FILES['upload_file']);
        } 
		if(isset($_FILES['upload_file']) && $_FILES["upload_file"]["error"] == 0) {
			// ファイルの受け取り
			$upload_file = $_FILES["upload_file"];
			// アップロードされたファイルの移動
			//move_uploaded_file($upload_file["tmp_name"], '/mnt/fuelphp/public/assets/img/chara/$upload_file["name"]');

			if($this->resize($upload_file["tmp_name"], 300, 400, $upload_file["name"])) {

                $this->template->title = "画像アップロード完了です！";
                $this->template->content = View::forge('admin/imgresize/index', $data);
                return;
            } else {

                $this->template->title = "画像アップロードエラー...やり直してください...";
                $this->template->content = View::forge('admin/imgresize/index', $data);
                return;
            }
		} else {

    	$this->template->title = "Resize Image";
    	$this->template->content = View::forge('admin/imgresize/index', $data);
        return;
    }
	}


/*array (size=5)
  'name' => string 'haruhiSuzumiya.jpg' (length=18)
  'type' => string 'image/jpeg' (length=10)
  'tmp_name' => string '/tmp/phpJx8WAy' (length=14)
  'error' => int 0
  'size' => int 80141
  */

public function resize($orig_file, $resize_width, $resize_height, $new_name) {
            // GDライブラリがインストールされているか
            if (!extension_loaded('gd')) {
                // エラー処理
                return 1;
            }

            // 画像情報取得
            $result = getimagesize($orig_file);
            list($orig_width, $orig_height, $image_type) = $result;
            
            // 画像をコピー
            switch ($image_type) {
                // 1 IMAGETYPE_GIF
                // 2 IMAGETYPE_JPEG
                // 3 IMAGETYPE_PNG
                case 1: $im = imagecreatefromgif($orig_file); break;
                case 2: $im = imagecreatefromjpeg($orig_file);  break;
                case 3: $im = imagecreatefrompng($orig_file); break;
                default: return 2;
            }

            // コピー先となる空の画像作成
            $new_image = imagecreatetruecolor($resize_width, $resize_height);
            if (!$new_image) {
                // エラー処理 
                // 不要な画像リソースを保持するメモリを解放する
                imagedestroy($im);
                return 3;
            }

           // GIF、PNGの場合、透過処理の対応を行う
            if(($image_type == 1) OR ($image_type == 3)) {
                imagealphablending($new_image, false);
                imagesavealpha($new_image, true);
                $transparent = imagecolorallocatealpha($new_image, 255, 255, 255, 127);
                imagefilledrectangle($new_image, 0, 0, $resize_width, $resize_height, $transparent);
            }

            // コピー画像を指定サイズで作成
            if (!imagecopyresampled($new_image, $im, 0, 0, 0, 0, $resize_width, $resize_height, $orig_width, $orig_height)) {
            // エラー処理
            // 不要な画像リソースを保持するメモリを解放する
            imagedestroy($im);
            imagedestroy($new_image);
            return 4;
            }

            // コピー画像を保存
            // $new_image : 画像データ
            // $new_fname : 保存先と画像名
            // クオリティ（マニュアルを見ると第3引数のクオリティは使わない？）

            switch ($image_type) {
            // 1 IMAGETYPE_GIF
            // 2 IMAGETYPE_JPEG
            // 3 IMAGETYPE_PNG
                case 1: $result = imagegif($new_image, '/mnt/fuelphp/public/assets/img/chara/'.$new_name.''); break;
                case 2: $result = imagejpeg($new_image, '/mnt/fuelphp/public/assets/img/chara/'.$new_name.''); break;
                case 3: $result = imagepng($new_image, '/mnt/fuelphp/public/assets/img/chara/'.$new_name.''); break;
                default: //エラー処理 
                        return 5;
            }

            if (!$result) {
            // エラー処理 
            // 不要な画像リソースを保持するメモリを解放する
            imagedestroy($im);
            imagedestroy($new_image);
            return 6;
            }

            $image = Model_Image::forge(array(
                    'name' => $new_name,
                    'memo' => $new_name,
                ));

            $image->save();

            // 不要になった画像データ削除
            imagedestroy($im);
            imagedestroy($new_image);
            return true;
    }

}
