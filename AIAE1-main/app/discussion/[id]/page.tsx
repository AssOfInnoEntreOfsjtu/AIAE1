'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Post, Comment, Category } from '../types';
import UserAvatar from '../components/user/UserAvatar';
import InteractionButton from '../components/interaction/InteractionButton';
import CommentDialog from '../components/interaction/CommentDialog';
import ReplyDialog from '../components/interaction/ReplyDialog';
import EditPostForm from '../components/post/EditPostForm';

// 模拟数据
const mockPost: Post = {
  id: 1,
  title: "AI在医疗领域的应用前景",
  content: `随着人工智能技术的不断发展，医疗领域正在经历一场革命性的变革。从疾病诊断到药物研发，AI都在发挥着越来越重要的作用。

1. 智能诊断
AI系统可以通过分析医学影像、病历数据等，辅助医生进行疾病诊断。例如，在放射科领域，AI可以帮助医生更准确地识别肿瘤、骨折等病变。

2. 药物研发
AI可以加速新药研发过程，通过模拟分子结构和预测药物效果，大大缩短研发周期。

3. 个性化治疗
基于患者的基因信息和病史数据，AI可以为患者提供个性化的治疗方案。

4. 医疗管理
AI可以帮助医院优化资源配置，提高运营效率，改善患者就医体验。

未来展望：
- 更精准的诊断系统
- 更高效的药物研发
- 更个性化的治疗方案
- 更智能的医疗管理

您觉得AI在医疗领域还有哪些潜在的应用场景？欢迎在评论区分享您的想法。`,
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
};

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

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [post, setPost] = useState<Post>(mockPost);
  const [showCommentDialog, setShowCommentDialog] = useState(false);
  const [showReplyDialog, setShowReplyDialog] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      content: "非常赞同您的观点，AI在医疗领域确实有很大的发展空间。",
      author: {
        id: 2,
        name: "李医生",
        avatar: "/avatars/doctor2.jpg",
        role: "expert",
        title: "医疗AI研究员",
        organization: "某研究所",
        followers: 56,
        following: 23,
        posts: 12,
        reputation: 89
      },
      date: "2024-03-20 14:30",
      likes: 12,
      isLiked: false,
      isReported: false,
      replies: [
        {
          id: 2,
          content: "是的，特别是在影像诊断方面，AI的准确率已经达到了很高的水平。",
          author: {
            id: 3,
            name: "王医生",
            avatar: "/avatars/doctor3.jpg",
            role: "expert",
            title: "放射科主任",
            organization: "某医院",
            followers: 45,
            following: 18,
            posts: 6,
            reputation: 78
          },
          date: "2024-03-20 15:00",
          likes: 5,
          isLiked: false,
          isReported: false,
          parentId: 1,
          replyTo: {
            id: 2,
            name: "李医生",
            avatar: "/avatars/doctor2.jpg",
            role: "expert",
            title: "医疗AI研究员",
            organization: "某研究所",
            followers: 56,
            following: 23,
            posts: 12,
            reputation: 89
          }
        }
      ]
    }
  ]);

  const handleLike = () => {
    setPost(prev => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
    }));
  };

  const handleComment = () => {
    setShowCommentDialog(true);
  };

  const handleCommentSubmit = (content: string) => {
    const newComment: Comment = {
      id: comments.length + 1,
      content: content.trim(),
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
      date: new Date().toLocaleString(),
      likes: 0,
      isLiked: false,
      isReported: false
    };

    setComments([newComment, ...comments]);
    setPost(prev => ({ ...prev, comments: prev.comments + 1 }));
  };

  const handleLikeComment = (commentId: number) => {
    setComments(comments.map(comment =>
      comment.id === commentId
        ? { ...comment, isLiked: !comment.isLiked, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 }
        : comment
    ));
  };

  const handleReply = (comment: Comment) => {
    setSelectedComment(comment);
    setShowReplyDialog(true);
  };

  const handleReplySubmit = (content: string) => {
    if (selectedComment) {
      const newReply: Comment = {
        id: comments.length + 1,
        content: content.trim(),
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
        date: new Date().toLocaleString(),
        likes: 0,
        isLiked: false,
        isReported: false,
        parentId: selectedComment.id,
        replyTo: selectedComment.author
      };

      setComments(comments.map(comment =>
        comment.id === selectedComment.id
          ? {
            ...comment,
            replies: [...(comment.replies || []), newReply]
          }
          : comment
      ));
    }
  };

  const handleEdit = () => {
    setShowEditForm(true);
  };

  const handleEditSubmit = (updatedPost: Post) => {
    setPost(updatedPost);
    setShowEditForm(false);
  };

  const renderComment = (comment: Comment) => (
    <div key={comment.id} className="flex gap-4">
      <UserAvatar user={comment.author} size="sm" />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-gray-900">{comment.author.name}</span>
          <span className="text-sm text-gray-500">{comment.date}</span>
        </div>
        <p className="text-gray-700 mb-2">{comment.content}</p>
        <div className="flex items-center gap-4">
          <InteractionButton
            icon="🤍"
            activeIcon="❤️"
            count={comment.likes}
            isActive={comment.isLiked}
            onClick={() => handleLikeComment(comment.id)}
            label="点赞"
            color="red"
          />
          <button
            onClick={() => handleReply(comment)}
            className="text-gray-500 hover:text-gray-700 text-sm"
          >
            回复
          </button>
        </div>

        {/* 回复列表 */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-4 space-y-4 pl-8 border-l-2 border-gray-100">
            {comment.replies.map(reply => (
              <div key={reply.id} className="flex gap-4">
                <UserAvatar user={reply.author} size="sm" />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-gray-900">{reply.author.name}</span>
                    <span className="text-sm text-gray-500">回复</span>
                    <span className="font-medium text-blue-600">{reply.replyTo?.name}</span>
                    <span className="text-sm text-gray-500">{reply.date}</span>
                  </div>
                  <p className="text-gray-700 mb-2">{reply.content}</p>
                  <div className="flex items-center gap-4">
                    <InteractionButton
                      icon="🤍"
                      activeIcon="❤️"
                      count={reply.likes}
                      isActive={reply.isLiked}
                      onClick={() => handleLikeComment(reply.id)}
                      label="点赞"
                      color="red"
                    />
                    <button
                      onClick={() => handleReply(comment)}
                      className="text-gray-500 hover:text-gray-700 text-sm"
                    >
                      回复
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <section className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* 返回按钮 */}
          <button
            onClick={() => router.back()}
            className="mb-8 text-gray-600 hover:text-gray-900 flex items-center gap-2"
          >
            <span>←</span>
            返回列表
          </button>

          {/* 帖子内容 */}
          <article className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            {/* 作者信息和编辑按钮 */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <UserAvatar user={post.author} size="lg" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{post.author.name}</h2>
                  <p className="text-gray-500">{post.author.title}</p>
                  <p className="text-sm text-gray-400">{post.author.organization}</p>
                </div>
              </div>
              <button
                onClick={handleEdit}
                className="px-4 py-2 text-gray-600 hover:text-gray-900 flex items-center gap-2"
              >
                <span>✏️</span>
                编辑
              </button>
            </div>

            {/* 编辑表单 */}
            {showEditForm ? (
              <EditPostForm
                post={post}
                categories={categories}
                onSubmit={handleEditSubmit}
                onCancel={() => setShowEditForm(false)}
              />
            ) : (
              <>
                {/* 标题和标签 */}
                <div className="mb-6">
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{post.title}</h1>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm flex items-center gap-1">
                      <span>{post.category.icon}</span>
                      {post.category.name}
                    </span>
                    {post.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 内容 */}
                <div className="prose max-w-none mb-8">
                  {post.content.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="mb-4 text-gray-700">
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* 互动按钮 */}
                <div className="flex items-center gap-6 border-t border-gray-100 pt-6">
                  <InteractionButton
                    icon="🤍"
                    activeIcon="❤️"
                    count={post.likes}
                    isActive={post.isLiked}
                    onClick={handleLike}
                    label="点赞"
                    color="red"
                  />
                  <InteractionButton
                    icon="💬"
                    activeIcon="💬"
                    count={post.comments}
                    isActive={false}
                    onClick={handleComment}
                    label="评论"
                    color="blue"
                  />
                  <InteractionButton
                    icon="☆"
                    activeIcon="⭐"
                    count={0}
                    isActive={post.isFavorited}
                    onClick={() => setPost(prev => ({ ...prev, isFavorited: !prev.isFavorited }))}
                    label="收藏"
                    color="yellow"
                    showCount={false}
                  />
                  <InteractionButton
                    icon="↗️"
                    activeIcon="↗️"
                    count={0}
                    isActive={post.isShared}
                    onClick={() => setPost(prev => ({ ...prev, isShared: true }))}
                    label="分享"
                    color="green"
                    showCount={false}
                  />
                </div>
              </>
            )}
          </article>

          {/* 评论列表 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">评论 ({post.comments})</h3>
            <div className="space-y-6">
              {comments.map(renderComment)}
            </div>
          </div>
        </div>
      </section>

      {/* 评论对话框 */}
      {showCommentDialog && (
        <CommentDialog
          postId={post.id}
          author={post.author}
          onClose={() => setShowCommentDialog(false)}
          onSubmit={handleCommentSubmit}
        />
      )}

      {/* 回复对话框 */}
      {showReplyDialog && selectedComment && (
        <ReplyDialog
          postId={post.id}
          commentId={selectedComment.id}
          author={post.author}
          replyTo={selectedComment.author}
          onClose={() => {
            setShowReplyDialog(false);
            setSelectedComment(null);
          }}
          onSubmit={handleReplySubmit}
        />
      )}
    </main>
  );
} 