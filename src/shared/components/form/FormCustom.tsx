import { useEffect, useState } from "react";

import type { UserRole } from "@/features/users/types/user-role-type";
import { useNotification } from "@/shared/hooks/useNotification";
import { type FormFieldTypeKey } from "@/shared/types/form-field-type";
import { FormModalMode, type FormModalModeType } from "@/shared/types/form-modal-mode-type";
import { Button, Form, Tabs } from "antd";
import { formatFormValues } from "@/shared/utils/form";
import DynamicForm from "./DynamicForm";

export interface FormContext {
    role: UserRole;
    mode?: FormModalModeType;
}

export interface FormField<T> {
    name: keyof T;

    label: string;

    type: FormFieldTypeKey;

    placeholder?: string;

    disabled?: any;

    rules?: any[];

    options?: {
        label: string;
        value: string | number;
    }[];

    fetchOptions?: () => Promise<any>;

    col?: number;

    props?: any;

    icon?: any;
}

export interface SectionForm<T> {
    key: string;
    label: string;
    fields: FormField<T>[];
}

interface FormCustomProps<T> {
    open: boolean;

    mode: FormModalModeType;

    initialValues?: Partial<T> | null;

    loading?: boolean;

    sections: SectionForm<T>[];

    disabled?: boolean;

    onCancel: () => void;

    onSuccess: () => void;

    onSubmit: (values: T) => Promise<void>;

}

const FormCustom = <T,>({
    open,
    mode,
    initialValues,
    sections,
    onCancel,
    onSuccess,
    onSubmit,
    disabled,
}: FormCustomProps<T>) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();

    useEffect(() => {
        if (!open) {
            form.resetFields();
            return;
        }

        if (initialValues) {
            const formattedValues = formatFormValues(initialValues as T, sections);

            form.setFieldsValue(formattedValues);
        }
    }, [open, initialValues, sections, form]);

    const handleSubmit = async (values: T) => {
        try {
            setLoading(true);

            const formattedValues = formatFormValues(values, sections);

            await onSubmit(formattedValues);

            showNotification('success', 'Thành công', 'Dữ liệu đã được lưu thành công');

            form.resetFields();

            onCancel();

            onSuccess();
        } catch (error: any) {
            showNotification(
                'error',
                'Lỗi',
                error?.response?.data?.message || 'Không thể lưu dữ liệu. Vui lòng thử lại',
            );
        } finally {
            setLoading(false);
        }
    };


    return (
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Tabs
                items={sections.map((section) => ({
                    key: section.key,
                    label: section.label,
                    children: (
                        <DynamicForm<T>
                            fields={section.fields.filter((field) => mode === FormModalMode.CREATE || field.name !== 'password')} disabled={disabled}
                            mode={mode}
                        />
                    ),
                }))}
            />

            <div className="flex justify-end gap-2">
                <Button onClick={onCancel}>Hủy</Button>

                <Button type="primary" htmlType="submit" loading={loading} disabled={disabled}>
                    Lưu
                </Button>
            </div>
        </Form>
    )
};

export default FormCustom;
