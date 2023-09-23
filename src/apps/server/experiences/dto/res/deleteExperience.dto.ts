import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class DeleteExperienceResponseDto {
  @Exclude() _isDeleted: boolean;

  constructor(isDeleted: boolean) {
    this._isDeleted = isDeleted;
  }

  @Expose()
  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({ example: true, description: '경험 분해가 삭제되었는지에 대한 boolean값입니다.' })
  get isDeleted(): boolean {
    return this._isDeleted;
  }
}
