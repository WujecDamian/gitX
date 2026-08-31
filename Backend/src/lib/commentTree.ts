type CommentWithEngagement = {
  id: string;
  sub_comment_id: string | null;
  commentLikes: { id: string }[];
  commentBookmarks: { id: string }[];
};

export const commentEngagementInclude = (userId: string) => ({
  author: true,
  commentLikes: {
    where: {
      user_id: userId,
    },
    select: {
      id: true,
    },
  },
  commentBookmarks: {
    where: {
      user_id: userId,
    },
    select: {
      id: true,
    },
  },
  _count: {
    select: {
      commentLikes: true,
      sub_comments: true,
    },
  },
});

export const nestComments = <T extends CommentWithEngagement>(
  comments: T[],
  parentId: string | null,
): Array<
  T & {
    isLikedByUser: boolean;
    isBookmarkedByUser: boolean;
    sub_comments: ReturnType<typeof nestComments<T>>;
  }
> => {
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

export const findCommentInTree = <T extends { id: string; sub_comments?: T[] }>(
  comments: T[],
  commentId: string,
): T | null => {
  for (const comment of comments) {
    if (comment.id === commentId) {
      return comment;
    }

    const nested = findCommentInTree(comment.sub_comments ?? [], commentId);
    if (nested) {
      return nested;
    }
  }

  return null;
};
