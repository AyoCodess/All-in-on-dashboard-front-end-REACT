import React, { useEffect, useState } from 'react';
import Modal from '../../../components/Modal';
import StandardBtn from '../../../components/StandardBtn';
import StandardBtnOnClick from '../../../components/StandardBtnOnClick';
import StandardInput from '../../../components/StandardInput';
import TaskBtn from '../../../components/TaskBtn';

import TaskStatus from '../../../components/TaskStatus';

function TaskInternal({
  tasks,
  setTasks,
  setSelectedTask,
  selectedTask,
  taskTitle,
  setTaskTitle,
  taskDescription,
  setTaskDescription,
  API_BASE,
}) {
  const [isInvalid, setIsInvalid] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setTaskTitle('');
    setTaskDescription('');
    setSelectedTask('');

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const cancelUpdate = () => {
    setSelectedTask('');
    setIsUpdating(false);
  };

  const createTaskHandler = async () => {
    //. BACKEND IMPLEMENTATION
    if (taskTitle.trim().length > 0 && taskDescription.trim().length > 0) {
      try {
        const data = await fetch(API_BASE + '/task/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: taskTitle,
            task: taskDescription,
          }),
        });

        const response = await data.json();

        setTasks([response, ...tasks]);
      } catch (err) {
        console.log(err);
      }
    } else {
      setIsInvalid(true);
    }

    //. FRONT-END ONLY IMPLEMENTATION
    // if (taskTitle.trim().length > 0 || taskDescription.length > 0) {
    //   setTasks((prev) => {
    //     return [
    //       {
    //         _id: Date.now().valueOf(),
    //         title: taskTitle,
    //         task: taskDescription,
    //         status: false,
    //       },
    //       ...prev,
    //     ];
    //   });
    //   setIsUpdating(false);
    // } else {
    //   setIsInvalid(true);
    // }
  };

  const updateTaskHandler = async (item) => {
    //. BACKEND IMPLEMENTATION
    // if (taskTitle.trim().length > 0 && taskDescription.length > 0) {
    //   try {
    //     const data = await fetch(API_BASE + '/task/update/' + item._id, {
    //       method: 'PUT',
    //       headers: {
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         _id: item._id,
    //         title: taskTitle,
    //         task: taskDescription,
    //         timestamp: Date.now().valueOf(),
    //       }),
    //     });

    //     const response = await data.json();

    //     setTasks((prev) =>
    //       prev.map((task) =>
    //         task._id === response._id
    //           ? { _id: task._id, title: taskTitle, task: taskDescription }
    //           : task
    //       )
    //     );
    //   } catch (err) {
    //     console.log(err);
    //   }
    // } else {
    //   setIsInvalid(true);
    // }

    //. FRONT-END ONLY IMPLEMENTATION
    if (taskTitle.trim().length > 0 || taskDescription.length > 0) {
      setTasks((prev) =>
        prev.map((t) =>
          t._id === item._id
            ? {
                ...t,
                title: taskTitle ? taskTitle : t.title,
                task: taskDescription ? taskDescription : t.task,
              }
            : t
        )
      );

      setIsUpdating(false);
    } else {
      setIsInvalid(true);
    }
  };

  const updateStatusTaskHandler = async (item) => {
    //. BACKEND IMPLEMENTATION
    // try {
    //   const data = await fetch(API_BASE + '/task/update/' + item._id, {
    //     method: 'PUT',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       _id: item._id,
    //       title: item.title,
    //       task: item.task,
    //       status: !item.status,
    //       timestamp: Date.now().valueOf(),
    //     }),
    //   });

    //   const response = await data.json();

    //   setTasks((prev) =>
    //     prev.map((task) =>
    //       task._id === response._id
    //         ? { ...task, status: response.status }
    //         : task
    //     )
    //   );
    // } catch (err) {
    //   console.log(err);
    // }

    //. FRONT-END ONLY IMPLEMENTATION
    setTasks((prev) =>
      prev.map((t) =>
        t._id === item._id
          ? {
              ...t,
              title: taskTitle ? taskTitle : t.title,
              task: taskDescription ? taskDescription : t.task,
              status: !t.status,
            }
          : t
      )
    );

    setIsUpdating(false);
  };

  const deleteTaskHandler = async (item) => {
    //. BACKEND IMPLEMENTATION
    // try {
    //   const data = await fetch(API_BASE + '/task/delete/' + item._id, {
    //     method: 'DELETE',
    //   });
    //   const response = await data.json();

    //   setTasks((prev) =>
    //     prev.filter((t) => {
    //       return t._id !== item._id;
    //     })
    //   );
    // } catch (err) {
    //   console.log(err);
    // }

    //. FRONT-END ONLY IMPLEMENTATION.
    setTasks((prev) => prev.filter((t) => t._id !== item._id));
  };

  const clearFields = () => {
    setTaskTitle('');
    setTaskDescription('');
    setSelectedTask('');
    setIsUpdating(false);
  };

  return (
    <>
      <Modal
        title={'error'}
        content={'You have not entered any information in one or both fields.'}
        open={isInvalid}
        setOpen={setIsInvalid}
      />
      <div className='max-w-xl mx-auto mt-4'>
        <div className='flex items-center justify-between'>
          <div className='w-full'>
            <div className='flex justify-between items-center mt-4 mb-2'>
              <div className='text-2xl '>Add Task</div>
              <StandardBtn text={'Back'} to={'/'} />
            </div>
            <div className='flex flex-col mt-10 sm:flex-row items-center gap-1 w-full mb-4 border border-gray-200 p-2 rounded-md shadow'>
              {!isUpdating && (
                <div className='flex flex-wrap gap-2 '>
                  <StandardInput
                    value={taskTitle}
                    placeholder={'Task title'}
                    onChange={(e) => setTaskTitle(e.target.value)}
                  />
                  <StandardInput
                    value={taskDescription}
                    placeholder={'Task description'}
                    onChange={(e) => setTaskDescription(e.target.value)}
                  />
                </div>
              )}
              {isUpdating && (
                <div className='flex flex-wrap gap-2 border-green-500 border rounded-md '>
                  <StandardInput
                    placeholder={'Task title'}
                    onChange={(e) => setTaskTitle(e.target.value)}
                  />
                  <StandardInput
                    placeholder={'Task description'}
                    onChange={(e) => setTaskDescription(e.target.value)}
                  />
                </div>
              )}
            </div>
            <div className='text-gray-500 mt-2 mb-4'>
              Click on any task to update it
            </div>
            <div className='flex gap-2'>
              <StandardBtnOnClick
                text={'Create Task'}
                onClick={createTaskHandler}
              />
              <StandardBtnOnClick text={'Clear'} onClick={clearFields} />
            </div>
          </div>
        </div>
        <ul className='divide-y divide-gray-200 mt-6 cursor-pointer'>
          {tasks.map((item) => (
            <li key={item._id} className='py-4'>
              <div className='flex space-x-3'>
                {item.status}
                <div className='flex flex-col gap-1 w-full '>
                  <div
                    onClick={() => {
                      setSelectedTask(item._id);
                      setIsUpdating(true);
                    }}
                    className='flex justify-between'>
                    <div className='flex-col gap-1'>
                      <h3 className='text-sm font-medium'>{item.title}</h3>
                      <p className='text-sm text-gray-500'>{item.task}</p>
                    </div>
                    <TaskStatus item={item} />
                  </div>
                  {item._id === selectedTask && (
                    <>
                      <div>
                        <div className='mt-1 flex items-center justify-between'>
                          <div className='flex flex-col items-center gap-1 w-2/3'>
                            <StandardInput
                              placeholder='Change task title'
                              onChange={(e) => setTaskTitle(e.target.value)}
                            />

                            <StandardInput
                              placeholder='Change task description'
                              onChange={(e) =>
                                setTaskDescription(e.target.value)
                              }
                            />
                          </div>
                          <div className='flex flex-col gap-1 sm:items-center sm:flex-row sm:gap-2'>
                            <TaskBtn
                              text={'Change Status'}
                              onClick={() => updateStatusTaskHandler(item)}
                            />
                            <TaskBtn
                              text={'Delete'}
                              customStyles={'max-w-max'}
                              onClick={() => deleteTaskHandler(item)}
                            />
                            <TaskBtn
                              text={'Update'}
                              customStyles={'max-w-max'}
                              onClick={() => updateTaskHandler(item)}
                            />
                            <TaskBtn
                              text={'Cancel'}
                              customStyles={'max-w-max'}
                              onClick={() => cancelUpdate(item)}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TaskInternal;
