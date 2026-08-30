export const insertReply = (
  comment: CommentType,
  parentCommentId: string,
  reply: CommentType,
): CommentType => {
  if (comment.id === parentCommentId) {
    return {
      ...comment,
      sub_comments: [reply, ...(comment.sub_comments ?? [])],
      _count: {
        ...comment._count,
        sub_comments: comment._count.sub_comments + 1,
      },
    };
  }

  return {
    ...comment,
    sub_comments: (comment.sub_comments ?? []).map((child) =>
      insertReply(child, parentCommentId, reply),
    ),
  };
};

export const insertReplyIntoComments = (
  comments: CommentType[],
  parentCommentId: string,
  reply: CommentType,
): CommentType[] => {
  return comments.map((comment) =>
    insertReply(comment, parentCommentId, reply),
  );
};
