import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class PatchResumeRequestDto {
  @ApiProperty({
    description: '자기소개서 폴더 제목',
    example: '디프만 13기',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(13)
  title: string;
}
