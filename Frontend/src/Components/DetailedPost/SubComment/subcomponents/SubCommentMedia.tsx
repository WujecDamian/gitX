import styles from "../SubComment.module.css";

type CommentMediaTypes = {
  media_url: string | null | undefined;
};
export default function SubCommentMedia({ media_url }: CommentMediaTypes) {
  //! FROM FILE HOSTING SERVICE GET INFO ABOUT FILE TYPE AND RENDER CODITIONALLY
  if (media_url !== null && media_url !== undefined) {
    return (
      <>
        <img className={styles.post__media__img} src={media_url}></img>
      </>
    );
  }
}
