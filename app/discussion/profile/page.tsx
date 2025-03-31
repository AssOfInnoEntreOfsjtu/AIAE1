'use client';

import { useState } from 'react';
import { User, Post, Category } from '../types';
import UserAvatar from '../components/user/UserAvatar';
import PostCard from '../components/post/PostCard';
import EditPostForm from '../components/post/EditPostForm';

// 模拟用户数据
const mockUser: User = {
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
};

// 模拟用户的帖子数据
const mockUserPosts: Post[] = [
  {
    id: 1,
    title: "AI在医疗领域的应用前景",
    content: "随着人工智能技术的不断发展，医疗领域正在经历一场革命性的变革...",
    author: mockUser,
    date: "2024-03-20",
    likes: 128,
    comments: 32,
    views: 256,
    tags: ["医疗AI", "技术创新", "产业应用"],
    category: {
      id: 1,
      name: "技术创新",
      icon: "💡",
      description: "AI技术前沿讨论",
      postCount: 0,
      followers: 0
    },
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
    id: 2,
    title: "医疗AI系统的部署经验分享",
    content: "在部署医疗AI系统时，需要考虑很多因素，包括数据安全、系统集成等...",
    author: mockUser,
    date: "2024-03-18",
    likes: 89,
    comments: 24,
    views: 178,
    tags: ["医疗AI", "系统部署", "经验分享"],
    category: {
      id: 2,
      name: "产业应用",
      icon: "🏭",
      description: "AI在产业中的应用",
      postCount: 0,
      followers: 0
    },
    isLiked: false,
    isFavorited: false,
    isShared: false,
    isFollowing: false,
    isBookmarked: false,
    isReported: false,
    status: "normal",
    lastActivity: "1天前",
    contributors: [],
    relatedPosts: []
  }
];

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

export default function ProfilePage() {
  const [user, setUser] = useState<User>(mockUser);
  const [posts, setPosts] = useState<Post[]>(mockUserPosts);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [activeTab, setActiveTab] = useState<'posts' | 'favorites' | 'following'>('posts');

  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    setShowEditForm(true);
  };

  const handleEditSubmit = (updatedPost: Post) => {
    setPosts(posts.map(post =>
      post.id === updatedPost.id ? updatedPost : post
    ));
    setShowEditForm(false);
    setSelectedPost(null);
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const handleComment = (postId: number) => {
    // TODO: 实现评论功能
  };

  const handleFavorite = (postId: number) => {
    setPosts(posts.map(post =>
      post.id === postId
        ? { ...post, isFavorited: !post.isFavorited }
        : post
    ));
  };

  const handleShare = (postId: number) => {
    // TODO: 实现分享功能
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
    // TODO: 实现举报功能
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* 用户信息卡片 */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-6">
              <UserAvatar user={user} size="xl" />
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2">
                  <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm">
                    {user.role === 'expert' ? '专家' : user.role === 'admin' ? '管理员' : '普通用户'}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{user.title}</p>
                <p className="text-gray-500 text-sm">{user.organization}</p>
                <div className="flex gap-6 mt-4">
                  <div>
                    <span className="text-gray-900 font-medium">{user.followers}</span>
                    <span className="text-gray-500 ml-1">关注者</span>
                  </div>
                  <div>
                    <span className="text-gray-900 font-medium">{user.following}</span>
                    <span className="text-gray-500 ml-1">关注</span>
                  </div>
                  <div>
                    <span className="text-gray-900 font-medium">{user.posts}</span>
                    <span className="text-gray-500 ml-1">帖子</span>
                  </div>
                  <div>
                    <span className="text-gray-900 font-medium">{user.reputation}</span>
                    <span className="text-gray-500 ml-1">声望</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowEditForm(true)}
                className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                编辑资料
              </button>
            </div>
          </div>

          {/* 内容标签页 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex gap-4 mb-6 border-b border-gray-100">
              <button
                onClick={() => setActiveTab('posts')}
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'posts'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                我的帖子
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'favorites'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                收藏的帖子
              </button>
              <button
                onClick={() => setActiveTab('following')}
                className={`px-4 py-2 text-sm font-medium ${activeTab === 'following'
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                关注的帖子
              </button>
            </div>

            {/* 帖子列表 */}
            <div className="space-y-6">
              {posts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onViewDetail={() => { }}
                  onLike={handleLike}
                  onComment={handleComment}
                  onFavorite={handleFavorite}
                  onShare={handleShare}
                  onFollow={handleFollow}
                  onBookmark={handleBookmark}
                  onReport={handleReport}
                  onEdit={() => handleEditPost(post)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 编辑帖子表单 */}
      {showEditForm && selectedPost && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 w-full max-w-4xl mx-4 shadow-xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">编辑帖子</h2>
            <EditPostForm
              post={selectedPost}
              categories={categories}
              onSubmit={handleEditSubmit}
              onCancel={() => {
                setShowEditForm(false);
                setSelectedPost(null);
              }}
            />
          </div>
        </div>
      )}
    </main>
  );
} 