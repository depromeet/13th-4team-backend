import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, MaxLength } from 'class-validator';

export class PatchQuestionRequestParamDto {
  @ApiProperty({
    description: '자기소개서 문항 id',
    example: 1234,
  })
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  questionId: number;
}

export class PatchQuestionRequestBodyDto {
  @ApiPropertyOptional({
    description: '자기소개서 문항 제목',
    example: '디프만 13기 지원동기',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(300)
  title?: string | undefined;

  @ApiPropertyOptional({
    description: '자기소개서 문항 답안',
    example: '개발자로 성장하기 위해서 지원함',
  })
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @MaxLength(2500)
  answer?: string | undefined;
}
