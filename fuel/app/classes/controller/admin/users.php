<?php
class Controller_Admin_Users extends Controller_Admin
{

    public function action_index()
    {
        $data['users'] = Model_Users::find('all');
        $this->template->title = "Users";
        $this->template->content = View::forge('admin/users/index', $data);

    }

    public function action_view($id = null)
    {
        $data['users'] = Model_Users::find($id);

        $this->template->title = "Users";
        $this->template->content = View::forge('admin/users/view', $data);

    }

    public function action_create()
    {
        if (Input::method() == 'POST')
        {
            $val = Model_Users::validate('create');

            if ($val->run())
            {
                $users = Model_Users::forge(array(
                    'users' => Input::post('users'),
                    'memo' => Input::post('memo'),
                ));

                if ($users and $users->save())
                {
                    Session::set_flash('success', e('Added users #'.$users->id.'.'));

                    Response::redirect('admin/users');
                }

                else
                {
                    Session::set_flash('error', e('Could not save users.'));
                }
            }
            else
            {
                Session::set_flash('error', $val->error());
            }
        }

        $this->template->title = "Users";
        $this->template->content = View::forge('admin/users/create');

    }

    public function action_edit($id = null)
    {
        $users = Model_Users::find($id);
        $val = Model_Users::validate('edit');

        if ($val->run())
        {
            $users->username = Input::post('username');
            $users->story_id = Input::post('story_id');

            if ($users->save())
            {
                Session::set_flash('success', e('Updated users #' . $id));

                Response::redirect('admin/users');
            }

            else
            {
                Session::set_flash('error', e('Could not update users #' . $id));
            }
        }

        else
        {
            if (Input::method() == 'POST')
            {
                $users->users = $val->validated('users');
                $users->memo = $val->validated('memo');

                Session::set_flash('error', $val->error());
            }

            $this->template->set_global('users', $users, false);
        }

        $this->template->title = "Users";
        $this->template->content = View::forge('admin/users/edit');

    }

    public function action_delete($id = null)
    {
        if ($users = Model_Users::find($id))
        {
            $users->delete();

            Session::set_flash('success', e('Deleted users #'.$id));
        }

        else
        {
            Session::set_flash('error', e('Could not delete users #'.$id));
        }

        Response::redirect('admin/users');

    }

}
