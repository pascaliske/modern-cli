import { CommandObject, Arguments, Builder } from './parser';
import { LogService } from './services/logservice';
import { HttpService } from './services/httpservice';
import { ShellService } from './services/shellservice';
import { PromptService } from './services/promptservice';
import { StorageService } from './services/storageservice';
export declare class Command implements CommandObject {
    static command: string;
    static description: string;
    static aliases: Array<string>;
    root: string;
    log: LogService;
    http: HttpService;
    shell: ShellService;
    prompt: PromptService;
    storage: StorageService;
    builder(args: Builder): Builder;
    handler(args: Arguments): Promise<void>;
}
