import { Button, Col } from 'antd';

import { FormFieldType, type FormFieldTypeKey } from '@/shared/types/form-field.type';
import { ReloadOutlined } from '@ant-design/icons';
import RowCustom from '../row/row-custom';
import InputCustom from '../input/input-custom';
import SelectCustom from '../select/select-custom';
import DatePickerCustom from '../datepicker/datepicker-custom';
import CardCustom from '../card/card-custom';

export interface DataFilter {
  name: string;

  label?: string;

  type: FormFieldTypeKey;

  placeholder?: string;

  options?: {
    label: string;
    value: string | number;
  }[];
}

interface FilterTableCustomProps {
  dataFilters: DataFilter[];

  values: Record<string, any>;

  onChange: (values: Record<string, any>) => void;

  onReset?: () => void;

  onSubmit?: () => void;
}

const FilterTableCustom = ({
  dataFilters,
  values,
  onChange,
  onReset,
  onSubmit,
}: FilterTableCustomProps) => {
  const handleChange = (name: string, value: any) => {
    onChange({
      ...values,
      [name]: value,
    });
  };

  return (
    <CardCustom>
      <RowCustom>
        <div className="flex flex-col w-full gap-4">
          <div className="flex w-full flex-wrap">
            {dataFilters.map((filter) => (
              <Col span={8} key={filter.name}>
                {(() => {
                  switch (filter.type) {
                    case FormFieldType.Input:
                      return (
                        <InputCustom
                          placeholder={filter.placeholder}
                          value={values[filter.name]}
                          onChange={(e) => handleChange(filter.name, e.target.value)}
                        />
                      );

                    case FormFieldType.Select:
                      return (
                        <SelectCustom
                          allowClear
                          placeholder={filter.placeholder}
                          options={filter.options}
                          value={values[filter.name]}
                          onChange={(value) => handleChange(filter.name, value)}
                        />
                      );

                    case FormFieldType.DatePicker:
                      return (
                        <DatePickerCustom
                          placeholder={filter.placeholder}
                          value={values[filter.name]}
                          onChange={(value) => handleChange(filter.name, value)}
                        />
                      );

                    default:
                      return null;
                  }
                })()}
              </Col>
            ))}

            <Col>
              <Button onClick={onReset} className="h-10!">
                <ReloadOutlined />
              </Button>
            </Col>
          </div>

          <div className="flex justify-center">
            <Button type="primary" size="large" onClick={onSubmit}>
              Tìm kiếm
            </Button>
          </div>
        </div>
      </RowCustom>
    </CardCustom>
  );
};

export default FilterTableCustom;
