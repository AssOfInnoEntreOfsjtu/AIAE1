'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PostForm from './components/post/PostForm';
import PostCard from './components/post/PostCard';
import PostFilters from './components/post/PostFilters';
import CommentDialog from './components/interaction/CommentDialog';
import ShareDialog from './components/interaction/ShareDialog';
import ReportDialog from './components/interaction/ReportDialog';
import { Post, NewPost, Category, PostFilters as PostFiltersType } from './types';

export default function DiscussionPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showNewPostForm, setShowNewPostForm] = useState(false);
  const [filters, setFilters] = useState<PostFiltersType>({
    sortBy: 'latest'
  });

  // 对话框状态
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // 示例分类数据
  const categories: Category[] = [
    {
      id: 1,
      name: "技术创新",
      icon: "💡",
      description: "AI技术前沿讨论",
      postCount: 0,
      followers: 0
    },
    {
      id: 2,
      name: "产业应用",
      icon: "🏭",
      description: "AI在产业中的应用",
      postCount: 0,
      followers: 0
    },
    {
      id: 3,
      name: "创业经验",
      icon: "🚀",
      description: "AI创业经验分享",
      postCount: 0,
      followers: 0
    },
    {
      id: 4,
      name: "行业动态",
      icon: "📰",
      description: "AI行业最新动态",
      postCount: 0,
      followers: 0
    }
  ];

  // 模拟加载帖子数据
  const loadPosts = async (pageNum: number) => {
    setLoading(true);
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 1000));

    // 模拟数据
    const newPosts: Post[] = [
      {
        id: (pageNum - 1) * 2 + 1,
        title: "AI在医疗领域的应用前景",
        content: "随着人工智能技术的不断发展，医疗领域正在经历一场革命性的变革...",
        author: {
          id: 1,
          name: "张医生",
          avatar: "/avatars/doctor.jpg",
          role: "expert",
          title: "医疗AI专家",
          organization: "某三甲医院",
          followers: 128,
          following: 32,
          posts: 15,
          reputation: 256
        },
        date: "2024-03-20",
        likes: 128,
        comments: 32,
        views: 256,
        tags: ["医疗AI", "技术创新", "产业应用"],
        category: categories[0],
        isLiked: false,
        isFavorited: false,
        isShared: false,
        isFollowing: false,
        isBookmarked: false,
        isReported: false,
        status: "hot",
        lastActivity: "2小时前",
        contributors: [],
        relatedPosts: []
      },
      {
        id: (pageNum - 1) * 2 + 2,
        title: "AI创业公司如何选择技术栈",
        content: "在AI创业初期，选择合适的技术栈至关重要...",
        author: {
          id: 2,
          name: "李工程师",
          avatar: "/avatars/engineer.jpg",
          role: "expert",
          title: "AI架构师",
          organization: "某AI创业公司",
          followers: 89,
          following: 45,
          posts: 8,
          reputation: 178
        },
        date: "2024-03-19",
        likes: 89,
        comments: 24,
        views: 178,
        tags: ["创业经验", "技术选型", "架构设计"],
        category: categories[2],
        isLiked: false,
        isFavorited: false,
        isShared: false,
        isFollowing: false,
        isBookmarked: false,
        isReported: false,
        status: "featured",
        lastActivity: "5小时前",
        contributors: [],
        relatedPosts: []
      }
    ];

    setPosts(prev => [...prev, ...newPosts]);
    setHasMore(pageNum < 5); // 模拟只有5页数据
    setLoading(false);
  };

  // 初始加载
  useEffect(() => {
    loadPosts(1);
  }, []);

  // 筛选和排序帖子
  useEffect(() => {
    let filtered = [...posts];

    // 按分类筛选
    if (filters.categoryId) {
      filtered = filtered.filter(post => post.category.id === filters.categoryId);
    }

    // 按关键词搜索
    if (filters.search) {
      const keyword = filters.search.toLowerCase();
      filtered = filtered.filter(post =>
        post.title.toLowerCase().includes(keyword) ||
        post.content.toLowerCase().includes(keyword) ||
        post.tags.some(tag => tag.toLowerCase().includes(keyword))
      );
    }

    // 排序
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
  }, [posts, filters]);

  const handleSubmitPost = (post: NewPost) => {
    const newPost: Post = {
      id: posts.length + 1,
      title: post.title,
      content: post.content,
      author: {
        id: 1,
        name: "当前用户",
        avatar: "/avatars/default.jpg",
        role: "member",
        followers: 0,
        following: 0,
        posts: 1,
        reputation: 0
      },
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      comments: 0,
      views: 0,
      tags: post.tags.split(',').map(tag => tag.trim()),
      category: categories.find(c => c.id === post.categoryId) || categories[0],
      isLiked: false,
      isFavorited: false,
      isShared: false,
      isFollowing: false,
      isBookmarked: false,
      isReported: false,
      status: "normal",
      lastActivity: "刚刚",
      contributors: [],
      relatedPosts: []
    };

    setPosts([newPost, ...posts]);
    setShowNewPostForm(false);
  };

  const handleViewDetail = (postId: number) => {
    router.push(`/discussion/${postId}`);
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleComment = (postId: number) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setSelectedPost(post);
      setShowCommentDialog(true);
    }
  };

  const handleCommentSubmit = () => {
    if (selectedPost) {
      setPosts(posts.map(post =>
        post.id === selectedPost.id
          ? { ...post, comments: post.comments + 1, lastActivity: '刚刚' }
          : post
      ));
    }
  };

  const handleFavorite = (postId: number) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, isFavorited: !post.isFavorited }
        : post
    ));
  };

  const handleShare = (postId: number) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setSelectedPost(post);
      setShowShareDialog(true);
    }
  };

  const handleFollow = (postId: number) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, isFollowing: !post.isFollowing }
        : post
    ));
  };

  const handleBookmark = (postId: number) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, isBookmarked: !post.isBookmarked }
        : post
    ));
  };

  const handleReport = (postId: number) => {
    const post = posts.find(p => p.id === postId);
    if (post) {
      setSelectedPost(post);
      setShowReportDialog(true);
    }
  };

  const handleReportSubmit = (reason: string) => {
    if (selectedPost) {
      setPosts(posts.map(post =>
        post.id === selectedPost.id
          ? { ...post, isReported: true }
          : post
      ));
      console.log('Report submitted:', { postId: selectedPost.id, reason });
    }
  };

  const handleFilterChange = (newFilters: PostFiltersType) => {
    setFilters(newFilters);
    setPage(1); // 重置页码
    setPosts([]); // 清空帖子列表
    loadPosts(1); // 重新加载第一页
  };

  const handleLoadMore = () => {
    if (!loading && hasMore) {
      setPage(prev => prev + 1);
      loadPosts(page + 1);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* 页面标题和说明 */}
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-50 rounded-full mb-6">
              <span className="text-blue-600 font-medium">行业交流</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">讨论留言区</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              参与行业讨论，分享您的见解和经验。在这里，您可以与行业专家、创业者进行深入交流。
            </p>
          </div>

          {/* 发帖按钮 */}
          <div className="flex justify-end mb-8">
            <button
              onClick={() => setShowNewPostForm(true)}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <span className="text-xl">✏️</span>
              发布新帖
            </button>
          </div>

          {/* 筛选器 */}
          <PostFilters
            categories={categories}
            filters={filters}
            onFilterChange={handleFilterChange}
          />

          {/* 发帖表单 */}
          {showNewPostForm && (
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <PostForm
                onSubmit={handleSubmitPost}
                onCancel={() => setShowNewPostForm(false)}
              />
            </div>
          )}

          {/* 帖子列表 */}
          <div className="space-y-6">
            {filteredPosts.map(post => (
              <PostCard
                key={post.id}
                post={post}
                onViewDetail={handleViewDetail}
                onLike={handleLike}
                onComment={handleComment}
                onFavorite={handleFavorite}
                onShare={handleShare}
                onFollow={handleFollow}
                onBookmark={handleBookmark}
                onReport={handleReport}
              />
            ))}
          </div>

          {/* 加载更多按钮 */}
          {hasMore && (
            <div className="flex justify-center mt-12">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="px-8 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {loading ? (
                  <>
                    <span className="animate-spin">⌛</span>
                    加载中...
                  </>
                ) : (
                  '加载更多'
                )}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 评论对话框 */}
      {showCommentDialog && selectedPost && (
        <CommentDialog
          postId={selectedPost.id}
          author={selectedPost.author}
          onClose={() => {
            setShowCommentDialog(false);
            setSelectedPost(null);
          }}
          onSubmit={handleCommentSubmit}
        />
      )}

      {/* 分享对话框 */}
      {showShareDialog && selectedPost && (
        <ShareDialog
          post={selectedPost}
          onClose={() => {
            setShowShareDialog(false);
            setSelectedPost(null);
          }}
        />
      )}

      {/* 举报对话框 */}
      {showReportDialog && selectedPost && (
        <ReportDialog
          post={selectedPost}
          onClose={() => {
            setShowReportDialog(false);
            setSelectedPost(null);
          }}
          onSubmit={handleReportSubmit}
        />
      )}
    </main>
  );
} 