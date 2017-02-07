<?php
class Controller_Admin_Gacha extends Controller_Admin
{

	public function action_index()
	{
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
            ->from('gacha')
            ->execute()
            ->as_array();
        
        $data['num_page'] = count($sql);

        $maxPage = ceil($data['num_page'] / 30);
        $data['page'] = $page = min($page, $maxPage);
        $data['maxpage'] = $maxPage;

        // 現在のページ番号を判定し、投稿を取得する
        $start = ($page - 1) * 30;
        $start = max(0, $start);

        $sql = \DB::select()
            ->from('gacha')
            ->join('item', 'INNER')->on('gacha.item_id', '=', 'item.id')
            ->limit(30)
            ->offset($start)
            ->execute()
            ->as_array();

        $data['gacha'] = $sql;
        
		$this->template->title = "Gacha";
		$this->template->content = View::forge('admin/gacha/index', $data);
	}

	public function action_view($id = null)
	{
		$data['gacha'] = Model_Gacha::find($id);

		$this->template->title = "Gacha";
		$this->template->content = View::forge('admin/gacha/view', $data);

	}

	public function action_create()
	{
		if (Input::method() == 'POST')
		{
			$val = Model_Gacha::validate('create');

			if ($val->run())
			{
				$gacha = Model_Gacha::forge(array(
					'gacha' => Input::post('gacha'),
					'memo' => Input::post('memo'),
				));

				if ($gacha and $gacha->save())
				{
					Session::set_flash('success', e('Added gacha #'.$gacha->id.'.'));

					Response::redirect('admin/gacha');
				}

				else
				{
					Session::set_flash('error', e('Could not save gacha.'));
				}
			}
			else
			{
				Session::set_flash('error', $val->error());
			}
		}

		$this->template->title = "Gacha";
		$this->template->content = View::forge('admin/gacha/create');

	}

	public function action_edit($id = null)
	{
		$gacha = Model_Gacha::find($id);
		$val = Model_Gacha::validate('edit');

		if ($val->run())
		{
			$gacha->gacha = Input::post('gacha');
			$gacha->memo = Input::post('memo');

			if ($gacha->save())
			{
				Session::set_flash('success', e('Updated gacha #' . $id));

				Response::redirect('admin/gacha');
			}

			else
			{
				Session::set_flash('error', e('Could not update gacha #' . $id));
			}
		}

		else
		{
			if (Input::method() == 'POST')
			{
				$gacha->gacha = $val->validated('gacha');
				$gacha->memo = $val->validated('memo');

				Session::set_flash('error', $val->error());
			}

			$this->template->set_global('gacha', $gacha, false);
		}

		$this->template->title = "Gacha";
		$this->template->content = View::forge('admin/gacha/edit');

	}

	public function action_delete($id = null)
	{
		if ($gacha = Model_Gacha::find($id))
		{
			$gacha->delete();

			Session::set_flash('success', e('Deleted gacha #'.$id));
		}

		else
		{
			Session::set_flash('error', e('Could not delete gacha #'.$id));
		}

		Response::redirect('admin/gacha');

	}

}
