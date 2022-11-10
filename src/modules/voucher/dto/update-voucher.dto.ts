import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsBoolean, IsInt } from 'class-validator';
import { VoucherEntity } from '../entity/voucher.entity';

export class UpdateVoucherDto extends PartialType(VoucherEntity) {
  @IsNumber()
  @ApiProperty({
    description: 'The rate applied as discount.',
    example: 13.3,
  })
  discountRate: number;

  @IsBoolean()
  @ApiProperty({
    description:
      'Return true for an active voucher false for an inactive one (DEFAULT - FALSE).',
    example: false,
  })
  active?: boolean;

  @ApiProperty({
    description: 'The date the voucher turns active',
    example: '2023-05-17',
  })
  startDate?: string | Date;

  @IsNumber()
  @ApiProperty({
    description: 'Quantity of vouchers released.',
    example: 50,
  })
  maxQuantity?: number;

  @IsInt()
  @ApiProperty({
    description: 'Interval',
    example: 10,
  })
  interval: number;

  @ApiProperty({
    description: 'The last day the voucher is active.',
    example: '2023-05-27',
  })
  endDate?: string | Date;
}
