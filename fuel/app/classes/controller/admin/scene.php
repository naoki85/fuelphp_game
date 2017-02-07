<?php
class Controller_Admin_Scene extends Controller_Admin
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
            ->from('scene')
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
            ->from('scene')
            ->limit(30)
            ->offset($start)
            ->execute()
            ->as_array();

        $data['scene'] = $sql;
        
		$this->template->title = "Scene";
		$this->template->content = View::forge('admin/scene/index', $data);

	}

	public function action_view($id = null)
	{
		$data['scene'] = Model_Scene::find($id);

		$this->template->title = "Scene";
		$this->template->content = View::forge('admin/scene/view', $data);

	}

	public function action_create()
	{
		if (Input::method() == 'POST')
		{
			$val = Model_Scene::validate('create');

			if ($val->run())
			{
				$scene = Model_Scene::forge(array(
					'scene' => Input::post('scene'),
					'memo' => Input::post('memo'),
				));

				if ($scene and $scene->save())
				{
					Session::set_flash('success', e('Added scene #'.$scene->id.'.'));

					Response::redirect('admin/scene');
				}

				else
				{
					Session::set_flash('error', e('Could not save scene.'));
				}
			}
			else
			{
				Session::set_flash('error', $val->error());
			}
		}

		$this->template->title = "Scene";
		$this->template->content = View::forge('admin/scene/create');

	}

	public function action_edit($id = null)
	{
		$scene = Model_Scene::find($id);
		$val = Model_Scene::validate('edit');

		if ($val->run())
		{
			$scene->scene = Input::post('scene');
			$scene->memo = Input::post('memo');

			if ($scene->save())
			{
				Session::set_flash('success', e('Updated scene #' . $id));

				Response::redirect('admin/scene');
			}

			else
			{
				Session::set_flash('error', e('Could not update scene #' . $id));
			}
		}

		else
		{
			if (Input::method() == 'POST')
			{
				$scene->scene = $val->validated('scene');
				$scene->memo = $val->validated('memo');

				Session::set_flash('error', $val->error());
			}

			$this->template->set_global('scene', $scene, false);
		}

		$this->template->title = "Scene";
		$this->template->content = View::forge('admin/scene/edit');

	}

	public function action_delete($id = null)
	{
		if ($scene = Model_Scene::find($id))
		{
			$scene->delete();

			Session::set_flash('success', e('Deleted scene #'.$id));
		}

		else
		{
			Session::set_flash('error', e('Could not delete scene #'.$id));
		}

		Response::redirect('admin/scene');

	}

}
