import type { InputNumberProps } from 'antd';
import { InputNumber } from 'antd';

export interface InputNumberCustomProps extends InputNumberProps {}

const InputNumberCustom: React.FC<InputNumberCustomProps> = ({ ...props }) => {
  return <InputNumber placeholder=" " className="min-h-10 w-full!" {...props} />;
};
export default InputNumberCustom;
