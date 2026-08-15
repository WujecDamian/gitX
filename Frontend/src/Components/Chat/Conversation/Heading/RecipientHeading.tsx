type RecipientHeadingTypes = {
  recipient: User;
};

export const RecipientHeading = ({ recipient }: RecipientHeadingTypes) => {
  return (
    <div>
      <h2>User Header {recipient.display_name}</h2>
    </div>
  );
};
