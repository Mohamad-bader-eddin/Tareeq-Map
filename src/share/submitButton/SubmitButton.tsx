import { StyledSubmitButton } from "./SubmitButton.style";

const SubmitButton = ({
  name,
  disabled,
}: {
  name: string;
  disabled: boolean;
}) => {
  return (
    <StyledSubmitButton type="submit" disabled={disabled}>
      {name}
    </StyledSubmitButton>
  );
};

export default SubmitButton;
