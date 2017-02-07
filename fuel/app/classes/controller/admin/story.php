<?php
class Controller_Admin_Story extends Controller_Admin
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
            ->from('story')
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
            ->from('story')
            ->limit(30)
            ->offset($start)
            ->execute()
            ->as_array();

        $data['story'] = $sql;
        
		$this->template->title = "Story";
		$this->template->content = View::forge('admin/story/index', $data);

	}

	public function action_view($id = null)
	{
		$data['story'] = Model_Story::find($id);

		$this->template->title = "Story";
		$this->template->content = View::forge('admin/story/view', $data);

	}

	public function action_create()
	{
		if (Input::method() == 'POST')
		{
			$val = Model_Story::validate('create');

			if ($val->run())
			{
				$story = Model_Story::forge(array(
					'story' => Input::post('story'),
					'memo' => Input::post('memo'),
				));

				if ($story and $story->save())
				{
					Session::set_flash('success', e('Added story #'.$story->id.'.'));

					Response::redirect('admin/story');
				}

				else
				{
					Session::set_flash('error', e('Could not save story.'));
				}
			}
			else
			{
				Session::set_flash('error', $val->error());
			}
		}

		$this->template->title = "Story";
		$this->template->content = View::forge('admin/story/create');

	}

	public function action_edit($id = null)
	{
		$story = Model_Story::find($id);
		$val = Model_Story::validate('edit');

		if ($val->run())
		{
			$story->story = Input::post('story');
			$story->memo = Input::post('memo');

			if ($story->save())
			{
				Session::set_flash('success', e('Updated story #' . $id));

				Response::redirect('admin/story');
			}

			else
			{
				Session::set_flash('error', e('Could not update story #' . $id));
			}
		}

		else
		{
			if (Input::method() == 'POST')
			{
				$story->story = $val->validated('story');
				$story->memo = $val->validated('memo');

				Session::set_flash('error', $val->error());
			}

			$this->template->set_global('story', $story, false);
		}

		$this->template->title = "Story";
		$this->template->content = View::forge('admin/story/edit');

	}

	public function action_delete($id = null)
	{
		if ($story = Model_Story::find($id))
		{
			$story->delete();

			Session::set_flash('success', e('Deleted story #'.$id));
		}

		else
		{
			Session::set_flash('error', e('Could not delete story #'.$id));
		}

		Response::redirect('admin/story');

	}

}
