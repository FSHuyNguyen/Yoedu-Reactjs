import { FormModalMode, type FormModalModeType } from '../../types/form-modal-mode-type';
import FormCustom, { type SectionForm } from '../form/FormCustom';
import ModalCustom from './ModalCustom';

interface ModalFormCustomProps<T> {
  open: boolean;

  title: string;

  mode: FormModalModeType;

  initialValues?: Partial<T> | null;

  loading?: boolean;

  sections: SectionForm<T>[];

  disabled?: boolean;

  onCancel: () => void;

  onSuccess: () => void;

  onSubmit: (values: T) => Promise<void>;
}

const ModalFormCustom = <T,>({
  open,
  title,
  mode,
  initialValues,
  sections,
  onCancel,
  onSuccess,
  onSubmit,
  disabled,
}: ModalFormCustomProps<T>) => {
  return (
    <ModalCustom
      open={open}
      title={
        mode === FormModalMode.CREATE
          ? `Thêm ${title.toLowerCase()}`
          : mode === FormModalMode.EDIT
            ? `Cập nhật ${title.toLowerCase()}`
            : `Thông tin ${title.toLowerCase()}`
      }
      onCancel={onCancel}
      footer={null}
    >
      <FormCustom
        open={open}
        mode={mode}
        initialValues={initialValues}
        sections={sections}
        onCancel={onCancel}
        onSuccess={onSuccess}
        onSubmit={onSubmit}
        disabled={disabled}
      />
    </ModalCustom>
  );
};

export default ModalFormCustom;
