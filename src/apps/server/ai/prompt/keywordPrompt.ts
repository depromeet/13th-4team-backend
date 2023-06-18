import { PromptResumeBodyResDto } from '🔥apps/server/ai/dto/req/promptResume.req.dto';
import { PromptSummaryBodyReqDto } from '🔥apps/server/ai/dto/req/promptSummary.req.dto';
import { PromptAiKeywordBodyReqDto } from '🔥apps/server/ai/dto/req/promptAiKeyword.req.dto';

export const generateAiKeywordPrompt = (body: PromptAiKeywordBodyReqDto): string => {
  const keywordPrompt = process.env.CHATGPT_AI_KEYWORD_PROMPT;
  return `${keywordPrompt}\n\`\`\`\\nsituation: \`${body.situation}\`\\ntask: \`${body.task}\`\\naction: \`${body.action}\`\\nresult: \`${body.result}\`\\n\`\`\``;
};

export const generateResumePrompt = (body: PromptResumeBodyResDto, keywords: string[]): string => {
  const resumePrompt = process.env.CHATGPT_RESUME_PROMPT;
  return `${resumePrompt}Situation: ${body.situation}\\n\\nTask: ${body.task}\\n\\nAction: ${body.task}\\n\\nResult: ${body.result}\\n\`\`\`\\n\\nKeywords: ${keywords}"`;
};

export const generateSummaryPrompt = (body: PromptSummaryBodyReqDto): string => {
  const resumePrompt = process.env.CHATGPT_SUMMARY_PROMPT;
  return `${resumePrompt}Situation: ${body.situation}\\n\\nTask: ${body.task}\\n\\nAction: ${body.task}\\n\\nResult: ${body.result}\\n\n\`\`\`\\n"`;
};

export const generateSummaryKeywordPrompt = (body: PromptSummaryBodyReqDto): string => {
  const summayKeywordPrompt = process.env.CHATGPT_SUMMARY_KEYWORD_PROMPT;
  return `${summayKeywordPrompt}Action: ${body.task}\\n\\nResult: ${body.result}\\n\n\`\`\`\\n"`;
};

export const generateRecommendQuestionsPrompt = (body: string[]): string => {
  const summayKeywordPrompt = process.env.CHATGPT_RECOMMEND_QUESTIONS_PROMPT;
  return summayKeywordPrompt.replace('변수', JSON.stringify(body));
};
