type CommentWithEngagement = {
  id: string;
  sub_comment_id: string | null;
  commentLikes: { id: string }[];
  commentBookmarks: { id: string }[];
};

export type NestedComment = CommentWithEngagement & {
  isLikedByUser: boolean;
  isBookmarkedByUser: boolean;
  sub_comments: NestedComment[];
};

export const commentEngagementInclude = (userId: string) => ({
  author: true,
  commentLikes: {
    where: { user_id: userId },
    select: { id: true },
  },
  commentBookmarks: {
    where: { user_id: userId },
    select: { id: true },
  },
  _count: {
    select: {
      commentLikes: true,
      sub_comments: true,
    },
  },
});

export const nestComments = (
  comments: CommentWithEngagement[],
  parentId: string | null,
): NestedComment[] => {
  return comments
    .filter((comment) => comment.sub_comment_id === parentId)
    .map((comment) => {
      return {
        ...comment,
        isLikedByUser: comment.commentLikes.length > 0,
        isBookmarkedByUser: comment.commentBookmarks.length > 0,
        sub_comments: nestComments(comments, comment.id),
      };
    });
};

export const findCommentInTree = (
  comments: NestedComment[],
  commentId: string,
): NestedComment | null => {
  for (const comment of comments) {
    if (comment.id === commentId) {
      return comment;
    }

    const nested = findCommentInTree(comment.sub_comments, commentId);
    if (nested) {
      return nested;
    }
  }

  return null;
};
