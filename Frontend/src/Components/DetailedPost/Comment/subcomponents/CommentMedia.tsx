import styles from "../Comment.module.css";

type CommentMediaTypes = {
  media_url: string | null | undefined;
};
export default function CommentMedia({ media_url }: CommentMediaTypes) {
  //! FROM FILE HOSTING SERVICE GET INFO ABOUT FILE TYPE AND RENDER CODITIONALLY
  if (media_url !== null && media_url !== undefined) {
    return (
      <>
        <img className={styles.post__media__img} src={media_url}></img>
      </>
    );
  }
}
