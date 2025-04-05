import { useEffect, useRef, useCallback, useState } from 'react';

interface InfiniteScrollOptions {
  threshold?: number; // 触发加载的阈值（距离底部的像素）
  rootMargin?: string; // IntersectionObserver 的 rootMargin
  enabled?: boolean; // 是否启用无限滚动
}

export function useInfiniteScroll<T>(
  loadMore: () => Promise<{
    items: T[];
    hasMore: boolean;
  }>,
  options: InfiniteScrollOptions = {}
) {
  const {
    threshold = 100,
    rootMargin = '0px',
    enabled = true,
  } = options;

  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMoreItems = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const { items: newItems, hasMore: hasMoreItems } = await loadMore();
      setItems(prev => [...prev, ...newItems]);
      setHasMore(hasMoreItems);
      setPage(prev => prev + 1);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('加载失败'));
    } finally {
      setLoading(false);
    }
  }, [loadMore, loading, hasMore]);

  useEffect(() => {
    if (!enabled) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [target] = entries;
        if (target.isIntersecting && hasMore && !loading) {
          loadMoreItems();
        }
      },
      {
        rootMargin,
        threshold: threshold / 100,
      }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [enabled, hasMore, loading, loadMoreItems, rootMargin, threshold]);

  const reset = useCallback(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
    setError(null);
  }, []);

  return {
    items,
    loading,
    error,
    hasMore,
    page,
    observerTarget,
    reset,
    loadMoreItems,
  };
}

// 使用示例：
// const {
//   items,
//   loading,
//   error,
//   hasMore,
//   observerTarget,
//   reset,
// } = useInfiniteScroll<Post>(
//   async () => {
//     const response = await fetch(`/api/posts?page=${page}`);
//     const data = await response.json();
//     return {
//       items: data.posts,
//       hasMore: data.hasMore,
//     };
//   },
//   {
//     threshold: 100,
//     rootMargin: '0px',
//   }
// );
//
// return (
//   <div>
//     {items.map(item => (
//       <PostCard key={item.id} post={item} />
//     ))}
//     <div ref={observerTarget}>
//       {loading && <LoadingSpinner />}
//       {error && <ErrorMessage error={error} />}
//       {!hasMore && <NoMoreItems />}
//     </div>
//   </div>
// ); 