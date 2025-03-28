import { getSystemPrompt } from './prompts/prompts';
import optimized from './prompts/optimized';
import { getdevPrompt } from './prompts/devprompts';
import { getfollowingPrompt } from './prompts/instruction-following';

export interface PromptOptions {
  cwd: string;
  allowedHtmlElements: string[];
  modificationTagName: string;
}

export class PromptLibrary {
  static library: Record<
    string,
    {
      label: string;
      description: string;
      get: (options: PromptOptions) => string;
    }
  > = {
    default: {
      label: 'Default Prompt',
      description: 'This is the battle tested default system Prompt',
      get: (options) => getSystemPrompt(options.cwd),
    },
    optimized: {
      label: 'Optimized Prompt (experimental)',
      description: 'an Experimental version of the prompt for lower token usage',
      get: (options) => optimized(options),
    },
    dev: {
      label: 'Complete-check Prompt ',
      description: 'dev prompt for completeness checking',
      get: (options) => getdevPrompt(options.cwd),
    },
    dev2: {
      label: 'following Prompt ',
      description: 'dev prompt for completeness checking',
      get: (options) => getfollowingPrompt(options.cwd),
    },
  };
  static getList() {
    return Object.entries(this.library).map(([key, value]) => {
      const { label, description } = value;
      return {
        id: key,
        label,
        description,
      };
    });
  }
  static getPropmtFromLibrary(promptId: string, options: PromptOptions) {
    const prompt = this.library[promptId];

    if (!prompt) {
      throw 'Prompt Now Found';
    }

    return this.library[promptId]?.get(options);
  }
}
