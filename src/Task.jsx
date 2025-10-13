import React, { useState, useEffect } from 'react';
import { Trash2, Plus, GripVertical, Clock, User, Database } from 'lucide-react';
import { Link } from "react-router-dom";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [userName, setUserName] = useState('');
  const [isNameSet, setIsNameSet] = useState(false);
  const [draggedTask, setDraggedTask] = useState(null);
  const [lastSync, setLastSync] = useState(new Date());

  const statuses = ['todo', 'in-progress', 'completed'];
  const statusLabels = {
    'todo': 'To Do',
    'in-progress': 'In Progress',
    'completed': 'Completed'
  };

  useEffect(() => {
    if (!isNameSet) return;
    const syncInterval = setInterval(() => setLastSync(new Date()), 3000);
    return () => clearInterval(syncInterval);
  }, [isNameSet]);

  const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2);

  const addTask = () => {
    if (!newTask.trim()) return;
    const task = {
      id: generateId(),
      title: newTask,
      status: 'todo',
      createdBy: userName,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTasks([task, ...tasks]);
    setNewTask('');
    setLastSync(new Date());
  };

  const handleKeyPress = (e) => e.key === 'Enter' && addTask();

  const handleNameSubmit = () => userName.trim() && setIsNameSet(true);
  const handleNameKeyPress = (e) => e.key === 'Enter' && handleNameSubmit();

  const updateTaskStatus = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus, updatedAt: new Date().toISOString() } : t));
    setLastSync(new Date());
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    setLastSync(new Date());
  };

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e, status) => {
    e.preventDefault();
    if (draggedTask && draggedTask.status !== status) {
      updateTaskStatus(draggedTask.id, status);
    }
    setDraggedTask(null);
  };

  const formatTime = (date) =>
    date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  if (!isNameSet) {
    return (
      <div className="welcome-screen">
        <div className="welcome-card">
          <div className="icon-circle">
            <Database size={40} color="white" />
          </div>
          <h1>Welcome!</h1>
          <p>Enter your name to start managing tasks</p>
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            onKeyPress={handleNameKeyPress}
            placeholder="Your name"
          />
          <button onClick={handleNameSubmit}>Get Started</button>
        </div>

        <style>{`
          .welcome-screen {
            min-height: 100vh;
            background: linear-gradient(to bottom right, #6366f1, #a855f7, #ec4899);
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .welcome-card {
            background: white;
            border-radius: 16px;
            padding: 2rem;
            text-align: center;
            width: 90%;
            max-width: 400px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
          }
          .icon-circle {
            background: linear-gradient(to right, #6366f1, #a855f7);
            border-radius: 50%;
            width: 60px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
          }
          h1 { color: black; font-size: 2rem; margin-bottom: .5rem; }
          p { color: #555; margin-bottom: 1.5rem; }
          input {
            width: 100%;
            padding: .75rem;
            border: 2px solid #ccc;
            border-radius: 8px;
            margin-bottom: 1rem;
            font-size: 1rem;
            color: black;
          }
          button {
            background: linear-gradient(to right, #6366f1, #a855f7);
            color: white;
            border: none;
            padding: .75rem 1.5rem;
            border-radius: 8px;
            font-size: 1rem;
            cursor: pointer;
            transition: 0.3s;
          }
          button:hover {
            background: linear-gradient(to right, #4f46e5, #9333ea);
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="task-page">
      <div className="header">
        <div>
          <h1>Task Manager</h1>
          <p><User size={14} /> Logged in as <strong>{userName}</strong></p>
        </div>
        <div className="sync-box">
          <Clock size={14} />
          <span>Last sync: {formatTime(lastSync)}</span>
        </div>
      </div>

      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."
        />
        <button onClick={addTask}><Plus size={18} /> Add Task</button>
      </div>

      <div className="task-grid">
        {statuses.map(status => (
          <div
            key={status}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
            className="task-column"
          >
            <div className="column-header">
              <h2>{statusLabels[status]}</h2>
              <span>{tasks.filter(t => t.status === status).length}</span>
            </div>
            <div className="task-list">
              {tasks.filter(t => t.status === status).length === 0 ? (
                <div className="empty">
                  <Database size={40} color="#ccc" />
                  <p>No tasks yet</p>
                </div>
              ) : (
                tasks.filter(t => t.status === status).map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    className="task-card"
                  >
                    <GripVertical className="grip" />
                    <div className="task-info">
                      <p>{task.title}</p>
                      <div className="task-footer">
                        <span><User size={10} /> {task.createdBy}</span>
                        <button onClick={() => deleteTask(task.id)}>
                          <Trash2 size={14} color="red" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>

      <p className="footer"><Database size={14} /> Drag and drop tasks between columns to update their status • <Link to="/">Back to Home</Link></p>
      

      <style>{`
        .task-page {
          background: linear-gradient(to bottom right, #f8fafc, #f1f5f9);
          min-height: 100vh;
          padding: 2rem;
          color: black;
          font-family: 'Arial', sans-serif;
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }
        h1 { font-size: 2rem; margin: 0; color: black; }
        p { color: #333; display: flex; align-items: center; gap: 5px; }
        .sync-box {
          background: #dcfce7;
          color: #166534;
          padding: .5rem 1rem;
          border-radius: 8px;
          border: 1px solid #bbf7d0;
          font-size: .9rem;
        }
        .task-input {
          display: flex;
          gap: .5rem;
          margin-bottom: 2rem;
        }
        .task-input input {
          flex: 1;
          padding: .75rem;
          border: 2px solid #ccc;
          border-radius: 8px;
          font-size: 1rem;
          color: black;
        }
        .task-input button {
          background: #4f46e5;
          color: white;
          border: none;
          padding: .75rem 1.25rem;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.3s;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .task-input button:hover { background: #4338ca; }
        .task-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
        }
        .task-column {
          background: white;
          border-radius: 12px;
          padding: 1rem;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          min-height: 400px;
        }
        .column-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
          color: black;
        }
        .task-list .empty {
          text-align: center;
          color: #888;
          padding: 2rem 0;
        }
        .task-card {
          background: #f9fafb;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: .75rem;
          margin-bottom: .75rem;
          display: flex;
          align-items: flex-start;
          gap: .5rem;
          cursor: grab;
          transition: 0.2s;
        }
        .task-card:hover { border-color: #6366f1; box-shadow: 0 2px 6px rgba(0,0,0,0.1); }
        .task-info p { font-weight: bold; margin-bottom: .25rem; color: black; }
        .task-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: .8rem;
          color: #666;
        }
        .footer {
          text-align: center;
          margin-top: 2rem;
          color: #555;
        }
        .footer a {
          color: #2563eb;
          text-decoration: none;
        }
        .footer a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default TaskManager;
