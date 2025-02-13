import React, { useState, useEffect } from 'react';
import ThreadList from './components/ThreadList';

/* 追加*/
function ThreadList() {
  const [threads, setThreads] = useState([]);

  useEffect(() => {
    fetch('http://localhost/api/threads')
      .then(response => response.json())
      .then(data => setThreads(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>スレッド一覧</h1>
      <ul>
        {threads.map(thread => (
          <li key={thread.id}>{thread.title}</li>
        ))}
      </ul>
    </div>
  );
}
// CreateThread コンポーネント内

export default ThreadList;
