import { Input } from 'antd';

import { SearchOutlined } from '@ant-design/icons';

import type { InputProps } from 'antd';

interface SearchInputProps extends InputProps {
  onSearch?: (value: string) => void;
}

const SearchInput = ({ onSearch, ...props }: SearchInputProps) => {
  return (
    <Input
      allowClear
      prefix={<SearchOutlined />}
      placeholder="Tìm kiếm..."
      onPressEnter={(e) => onSearch?.((e.target as HTMLInputElement).value)}
      {...props}
    />
  );
};

export default SearchInput;
