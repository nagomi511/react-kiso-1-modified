import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ThreadDetails() {
  const [posts, setPosts] = useState([]); // 投稿一覧の状態
  const [newPostContent, setNewPostContent] = useState(''); // 新しい投稿の内容を保持する状態
  const { thread_id } = useParams(); // URLからthread_idを取得
  // スレッドの投稿を取得するためのuseEffect
  useEffect(() => {
    console.log (thread_id)
    fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`)
      .then(response => response.json())
      .then(data => {
        setPosts(data.posts)
        console.log (data.posts)
    })
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    console.log(posts)
  },[posts])

  // 新しい投稿を送信するための関数
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log('送信するスレッド:', { newPostContent });
    const data = {
     "post": newPostContent,
    };
    console.log(data)

    // APIへのPOSTリクエスト
    fetch(`https://railway.bulletinboard.techtrain.dev/threads/${thread_id}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
      // 投稿一覧を更新
      setPosts(prevPosts => [...prevPosts, data]);
      // 入力フィールドをクリア
      setNewPostContent('');
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div>
      <h1>スレッド詳細</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.post}</li>
        ))}
      </ul>
      {/* 新しい投稿のフォーム */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          required
        />
        <button type="submit">投稿</button>
      </form>
    </div>
  );
}

export default ThreadDetails;
