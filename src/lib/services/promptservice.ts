import * as inquirer from 'inquirer'
import { PathPrompt } from 'inquirer-path'
import ChalkPipe from 'inquirer-chalk-pipe'
import { Service } from '../container'

export interface PromptQuestion extends inquirer.Question {
    name: string
}

export interface PromptAnswers extends inquirer.Answers { }

@Service()
export class PromptService {
    /* --- constants --- */

    /* --- properties --- */

    private prompt: inquirer.PromptModule

    private questions: Array<PromptQuestion> = []

    /* --- constructor --- */

    /**
     * Initializes the prompt service.
     *
     * @returns {PromptService}
     */
    public constructor() {
        this.prompt = inquirer.createPromptModule()
        this.prompt.registerPrompt('path', PathPrompt)
        this.prompt.registerPrompt('chalk-pipe', ChalkPipe)
    }

    /* --- protected --- */

    /* --- public --- */

    /**
     * Adds the given questions to the prompt instance.
     *
     * @param {Array<PromptQuestion>} questions -
     * @returns {PromptService}
     */
    public ask(questions: Array<PromptQuestion> = []): PromptService {
        this.questions = this.questions.concat(questions)

        return this
    }

    /**
     * Resets the questions on the service.
     *
     * @returns {PromptService}
     */
    public reset(): PromptService {
        this.questions = []

        return this
    }

    /**
     * Starts the prompt session.
     *
     * @returns {Promise<PromptAnswers>}
     */
    public start(): Promise<PromptAnswers> {
        return this.prompt(this.questions)
    }
}
