import React, { useState } from 'react';
import './createthread.css';

function CreateThread() {
  
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('送信するスレッド:', { content });
    const data = {
      "title": content,
    };
    
   fetch('https://railway.bulletinboard.techtrain.dev/threads', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) 
    })

    setContent('');
  };

  return (
    <div>
      <header>
        <h1>掲示板</h1>
      </header>
      <main>
        <article>
          <h2>スレッド新規作成</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="threadContent">内容:</label>
              <textarea
                id="threadContent"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="create-thread">作成</button>
          </form>
        </article>
      </main>
    </div>
  );
}

export default CreateThread;
