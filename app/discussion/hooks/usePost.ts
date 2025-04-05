import { useState, useEffect } from 'react';
import { Post, PostFilters } from '../types/post';

export function usePost() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const loadPosts = async (pageNum: number, filters?: PostFilters) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: 实现实际的 API 调用
      const response = await fetch(`/api/posts?page=${pageNum}`);
      const data = await response.json();

      setPosts(prev => [...prev, ...data.posts]);
      setHasMore(data.hasMore);
      setPage(pageNum);
    } catch (err) {
      setError('加载帖子失败');
      console.error('Error loading posts:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterPosts = (filters: PostFilters) => {
    let filtered = [...posts];

    if (filters.categoryId) {
      filtered = filtered.filter(post => post.category.id === filters.categoryId);
    }

    if (filters.search) {
      const keyword = filters.search.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(keyword) ||
        post.content.toLowerCase().includes(keyword) ||
        post.tags.some(tag => tag.toLowerCase().includes(keyword))
      );
    }

    switch (filters.sortBy) {
      case 'latest':
        filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => b.likes - a.likes);
        break;
      case 'mostCommented':
        filtered.sort((a, b) => b.comments - a.comments);
        break;
    }

    setFilteredPosts(filtered);
  };

  const createPost = async (post: Omit<Post, 'id' | 'author' | 'date'>) => {
    try {
      // TODO: 实现实际的 API 调用
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });
      const data = await response.json();

      setPosts(prev => [data, ...prev]);
      return data;
    } catch (err) {
      setError('创建帖子失败');
      console.error('Error creating post:', err);
      throw err;
    }
  };

  const updatePost = async (id: number, updates: Partial<Post>) => {
    try {
      // TODO: 实现实际的 API 调用
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      const data = await response.json();

      setPosts(prev => prev.map(post =>
        post.id === id ? { ...post, ...data } : post
      ));
      return data;
    } catch (err) {
      setError('更新帖子失败');
      console.error('Error updating post:', err);
      throw err;
    }
  };

  const deletePost = async (id: number) => {
    try {
      // TODO: 实现实际的 API 调用
      await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      });

      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (err) {
      setError('删除帖子失败');
      console.error('Error deleting post:', err);
      throw err;
    }
  };

  return {
    posts,
    filteredPosts,
    loading,
    error,
    page,
    hasMore,
    loadPosts,
    filterPosts,
    createPost,
    updatePost,
    deletePost,
  };
} 