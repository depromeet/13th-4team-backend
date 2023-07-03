import { CapabilityRepository } from '📚libs/modules/database/repositories/capability.repository';
import { ExperienceCapabilityRepository } from '📚libs/modules/database/repositories/experience-capability.repository';
import { ExperienceInfoRepository } from '📚libs/modules/database/repositories/experience-info.repository';
import { ExperienceRepository } from '📚libs/modules/database/repositories/experience.repository';
import { AiResumeRepository } from '📚libs/modules/database/repositories/ai-resume.repository';

export const experienceProviders = [
  ExperienceRepository,
  ExperienceInfoRepository,
  CapabilityRepository,
  ExperienceCapabilityRepository,
  CapabilityRepository,
  AiResumeRepository,
] as const;
