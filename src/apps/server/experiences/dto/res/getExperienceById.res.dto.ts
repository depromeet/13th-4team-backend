import { Exclude, Expose, Type } from 'class-transformer';
import { Experience, ExperienceStatus, KeywordType } from '@prisma/client';
import {
  ArrayMaxSize,
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptionalNumber } from '🔥apps/server/common/decorators/validation/isCustomNumber.decorator';
import { IsOptionalString } from '🔥apps/server/common/decorators/validation/isCustomString.decorator';
import { dateValidation } from '🔥apps/server/common/consts/date-validation.const';

export class GetExperienceInfoResDto {
  @Exclude() _experienceId: number;
  @Exclude() _motivation: string;
  @Exclude() _experienceRole: string;
  @Exclude() _utilization: string;

  @ApiProperty({ example: 1 })
  @IsOptionalNumber()
  get experienceId(): number {
    return this._experienceId;
  }

  @ApiPropertyOptional({
    example: '개발자와 협업 역량을 기르기 위해 하게 됨',
  })
  @IsOptionalString(0, 100)
  get motivation(): string {
    return this._motivation;
  }

  @ApiPropertyOptional({
    example: 'UI/UX 디자이너',
  })
  @IsOptionalString(0, 100)
  get experienceRole(): string {
    return this._experienceRole;
  }

  @ApiPropertyOptional({
    example: '역량 활용',
  })
  @IsOptionalString(0, 100)
  get utilization(): string {
    return this._utilization;
  }
}

class Capability {
  @IsString()
  @MaxLength(10)
  @IsNotEmpty()
  keyword: string;

  @IsString()
  @IsEnum(KeywordType)
  @IsNotEmpty()
  keywordType: KeywordType;
}

class AiResumeCapability {
  @IsArray()
  @ArrayMaxSize(2)
  @ValidateNested({ each: true })
  @Type(() => Capability)
  Capability: Capability;
}

class AiResume {
  @IsString()
  @IsNotEmpty()
  @MaxLength(700)
  content: string;

  @IsNotEmpty()
  @ArrayMaxSize(2)
  @ValidateNested({ each: true })
  @Type(() => AiResumeCapability)
  AiResumeCapability: AiResumeCapability[];
}

export class GetExperienceByIdResDto {
  @Exclude() _id: number;
  @Exclude() _title: string;
  @Exclude() _startDate: Date;
  @Exclude() _endDate: Date;
  @Exclude() _situation: string;
  @Exclude() _task: string;
  @Exclude() _action: string;
  @Exclude() _result: string;
  @Exclude() _experienceStatus: ExperienceStatus;
  @Exclude() _summaryKeywords: string[];
  @Exclude() _updatedAt: Date;
  @Exclude() _ExperienceInfo: GetExperienceInfoResDto;
  @Exclude() _AiResume: AiResume;

  constructor(experience: Partial<Experience & { ExperienceInfo; AiResume }>) {
    this._id = experience.id;
    this._title = experience.title;
    this._startDate = experience.startDate;
    this._endDate = experience.endDate;
    this._situation = experience.situation;
    this._task = experience.task;
    this._action = experience.action;
    this._result = experience.result;
    this._experienceStatus = experience.experienceStatus;
    this._summaryKeywords = experience.summaryKeywords;
    this._updatedAt = experience.updatedAt;
    this._ExperienceInfo = experience.ExperienceInfo;
    this._AiResume = experience.AiResume;
  }
  @ApiProperty({ example: 1 })
  @IsOptionalNumber()
  get id(): number {
    return this._id;
  }

  @ApiPropertyOptional({ example: '00직무 디자인 인턴' })
  @IsOptionalString(0, 100)
  get title(): string {
    return this._title;
  }

  @ApiPropertyOptional({ example: '2022-01' })
  @IsOptionalString(0, 7)
  @Matches(dateValidation.YYYY_MM)
  get startDate(): Date {
    return this._startDate;
  }

  @ApiPropertyOptional({ example: '2022-07' })
  @IsOptionalString(0, 7)
  @Matches(dateValidation.YYYY_MM)
  get endDate(): Date {
    return this._endDate;
  }

  @ApiPropertyOptional({
    example: 'INPROGRESS or DONE',
    default: 'INPROGRESS',
  })
  @IsEnum(ExperienceStatus)
  @IsOptional()
  @Expose()
  get experienceStatus(): ExperienceStatus {
    return this._experienceStatus;
  }

  @ApiPropertyOptional({ example: '개발자와 협업 역량을 쌓기 위해 IT 동아리에 들어감' })
  @IsOptionalString(0, 100)
  get situation(): string {
    return this._situation;
  }

  @ApiProperty({ example: '개발 시간이 짧아서 빠른 기간 내에 런칭을 완료해야 했음' })
  @IsOptionalString(0, 100)
  get task(): string {
    return this._task;
  }

  @ApiPropertyOptional({ example: '디자인 시스템 제작, 런칭일 정해서 린하게 개발하는 방법 제의' })
  @IsOptionalString(0, 100)
  get action(): string {
    return this._action;
  }

  @ApiPropertyOptional({ example: '4개월만에 출시를 성공하게 됨' })
  @IsOptionalString(0, 100)
  get result(): string {
    return this._result;
  }

  @ApiPropertyOptional({ example: ['협업', '리더십'] })
  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(2)
  @IsOptional()
  get summaryKeywords(): string[] {
    return this._summaryKeywords;
  }

  @IsDate()
  @IsNotEmpty()
  @Expose()
  @ApiPropertyOptional({ example: '2023-07-01T09:11:30.599Z' })
  get updatedAt(): Date {
    return this._updatedAt;
  }

  @Expose()
  @ApiProperty({
    example: [
      {
        content:
          '제가 지금까지 경험한 가장 큰 도전 중 하나는 개발당시 빠른 기간 내 출시를 완료해야 한다는 것이었습니다. 다행히도, 저는 개발자와의 협업 능력을 쌓기 위해 IT 동아리에 참여하였고, 이 경험이 이번 도전을 극복하는데 매우 유용했습니다.\n\n처음에는 개발 기간이 짧아 런칭을 완료하기가 매우 어려울 것이라고 생각했습니다. 그러나, 저와 동료 개발자들은 함께 협업하여 각자의 역할을 분담하고 일정을 조율하여 작업을 최대한 효율적으로 수행했습니다. 이를 통해 개발 기간 내에 기능 구현을 완료할 수 있었습니다.\n\n또한, 저와 동료들은 매일 업무 진행 상황을 대화하여 서로의 일정이나 어려움이 있는 부분을 공유했습니다. 이를 통해 각자의 역할을 명확히 인지하면서 작업이 수월했고, 동시에 문제가 발생하면 빠르게 대처할 수 있었습니다.\n\n최종적으로, 저희 팀은 빠른 기간 내에 개발을 완료하고, 4개월 만에 성공적으로 출시할 수 있었습니다. 이 경험은 협업 능력뿐만 아니라 프로젝트 관리 능력, 문제해결 능력 등을 기를 수 있는 좋은 기회였습니다.\n\n앞으로도, 제가 지원하는 회사에서는 빠른 기간 내에 개발을 완료할 수 있는 능력과 협업 능력을 발휘하여 회사의 발전에 기여하고자 합니다. 이전의 경험을 통해 저는 동료 개발자와 함께 협업하여 어려움을 극복할 수 있고, 아이디어를 구체화하여 높은 퀄리티의 기능을 개발할 수 있다는 것을 보여 드릴 수 있습니다.',
        AiResumeCapability: [
          {
            Capability: {
              keyword: '협업',
              keywordType: 'AI',
            },
          },
          {
            Capability: {
              keyword: '빠른 기간 내 개발',
              keywordType: 'AI',
            },
          },
        ],
      },
    ],
  })
  get AiResume(): AiResume {
    return this._AiResume;
  }

  @Expose()
  @ApiProperty({
    type: GetExperienceInfoResDto,
    example: {
      experienceId: 1,
      experienceRole: 'UI/UX 디자이너',
      motivation: '개발자와 협업 역량을 기르기 위해 하게 됨',
      utilization: '개발자와 협업이 많기로 알고 있는데 커뮤니케이션 역량을 발휘해 목표 일정에 맞게 일을 빠르고 정확하게 할 수 있을 것',
    },
  })
  get ExperienceInfo(): GetExperienceInfoResDto {
    return this._ExperienceInfo;
  }
}
