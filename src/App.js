import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; // 追加
import './App.css';
import CreateThread from './createthread';
import ThreadDetails from './threaddetails';

function ThreadList() {
  const [threads, setThreads] = useState([]);
  let navigate = useNavigate(); // 追加

  useEffect(() => {
    fetch('https://railway.bulletinboard.techtrain.dev/threads')
      .then(response => response.json())
      .then(data => setThreads(data))
      .catch(error => console.error('Error:', error));
  }, []);

  const handleCreateThreadClick = () => {
    navigate('/thread/new'); // 「スレッドを立てる」ボタンのクリックで /thread/new へ遷移
  };

  const handleThreadClick = (threadId) => {
    navigate(`/thread/${threadId}`); // スレッドIDをパスに含めて遷移
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>掲示板</h1>
        <button onClick={handleCreateThreadClick} className="create-thread">スレッドを立てる</button>
      </header>
      <main>
        <article>
          <h2 className="section-title">新着スレッド</h2>
          <ul className="thread">
            {threads.map(thread => (
              // クリック時に handleThreadClick を呼び出すための修正
              // アクセシビリティのために role="button" を追加
              <li key={thread.id} onClick={() => handleThreadClick(thread.id)} role="button" tabIndex={0}>{thread.title}</li>
            ))}
          </ul>
        </article>
      </main>
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ThreadList />} /> {/* ホーム画面（スレッドリスト） */}
        <Route path="/thread/new" element={<CreateThread />} /> {/* 新規スレッド作成画面 */}
        <Route path="/thread/:thread_id" element={<ThreadDetails />} /> {/* スレッド詳細画面 */}
      </Routes>
    </Router>
  );
}
