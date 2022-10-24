import { TextArea } from "Components";
export default {
  title: "solution_react_frontend/TextArea",
  component: TextArea,
};

export const SampleTextarea = (args) => <TextArea {...args} />;

SampleTextarea.args = {
  shape: "RoundedBorder4",
  variant: "OutlineGray601",
  size: "sm",
  placeholder: "placeholder",
};
