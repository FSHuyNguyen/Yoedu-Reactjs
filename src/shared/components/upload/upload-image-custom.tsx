import { useState } from 'react';

import { uploadApi } from '@/features/upload/api/upload.api';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import { Upload } from 'antd';

import type { UploadFile, UploadProps } from 'antd';

export interface UploadImageCustomProps {
  value?: string;

  onChange?: (value?: string) => void;

  disabled?: boolean;
}

const UploadImageCustom = ({ value, onChange, disabled }: UploadImageCustomProps) => {
  const [loading, setLoading] = useState(false);

  const handleUpload: UploadProps['customRequest'] = async (options) => {
    try {
      setLoading(true);

      const formData = new FormData();

      formData.append('file', options.file as File);

      const res = await uploadApi.uploadImage(formData);

      const imageUrl = res.data.url;

      onChange?.(imageUrl);

      options.onSuccess?.(res);
    } catch (error) {
      options.onError?.(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const isImage = file.type.startsWith('image/');

    if (!isImage) {
      return Upload.LIST_IGNORE;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isLt2M) {
      return Upload.LIST_IGNORE;
    }

    return true;
  };

  const fileList: UploadFile[] = value
    ? [
        {
          uid: '-1',
          name: 'avatar.png',
          status: 'done',
          url: value,
        },
      ]
    : [];

  return (
    <Upload
      accept="image/*"
      listType="picture-circle"
      maxCount={1}
      customRequest={handleUpload}
      beforeUpload={beforeUpload}
      fileList={fileList}
      disabled={disabled || loading}
      onRemove={() => {
        onChange?.(undefined);

        return true;
      }}
      showUploadList={{
        showPreviewIcon: true,
        showRemoveIcon: !disabled,
      }}
    >
      {!value && (
        <div className="flex flex-col items-center justify-center">
          {loading ? <LoadingOutlined /> : <PlusOutlined />}

          <div className="mt-2 text-sm">{loading ? 'Đang tải...' : 'Tải ảnh'}</div>
        </div>
      )}
    </Upload>
  );
};

export default UploadImageCustom;
