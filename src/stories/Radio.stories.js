import { Radio } from "Components";
export default {
  title: "solution_react_frontend/Radio",
  component: Radio,
};

export const SampleRadio = (args) => <Radio {...args} />;

SampleRadio.args = {
  label: "Radio",
  variant: "FillGray902",
  inputClassName: "mr-1",
};
