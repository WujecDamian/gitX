import { ProfilePicture } from "../../UI/ProfilePicture/ProfilePicture";
import styles from "../PostCard.module.css";

type PostMediaTypes = {
  media_url: string | null | undefined;
};
export default function PostMedia({ media_url }: PostMediaTypes) {
  //! FROM FILE HOSTING SERVICE GET INFO ABOUT FILE TYPE AND RENDER CODITIONALLY
  if (media_url !== null && media_url !== undefined) {
    return (
      <>
        <img className={styles.post__media__img} src={media_url}></img>
      </>
    );
  }
}
