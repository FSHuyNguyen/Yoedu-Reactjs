import CardCustom from '@/shared/components/card/CardCustom';
import { formatCurrency } from '@/shared/utils/currecy';
import { Descriptions } from 'antd';

const TuitionInvoiceSummary = () => {
  return (
    <CardCustom title="Thông tin thanh toán">
      <Descriptions column={1}>
        <Descriptions.Item label="Học phí gốc">{formatCurrency(1000000)}</Descriptions.Item>

        <Descriptions.Item label="Giảm giá">{formatCurrency(200000)}</Descriptions.Item>

        <Descriptions.Item label="Cần thanh toán">{formatCurrency(800000)}</Descriptions.Item>
      </Descriptions>
    </CardCustom>
  );
};

export default TuitionInvoiceSummary;
