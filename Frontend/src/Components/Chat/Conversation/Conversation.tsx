import { RecipientHeading } from "./Heading/RecipientHeading";
import styles from "./Conversation.module.css";

export const Conversation = () => {
  return (
    <section className={styles.conversation__wrapper}>
      <RecipientHeading></RecipientHeading>
      <p>Conversation (right side of chat)</p>
      {/* map messages here */}
      <form>
        <input type="text" name="Message" id="message" />
        <input type="submit" value=">" />
      </form>
    </section>
  );
};
