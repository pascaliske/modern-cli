import { CommandObject, Arguments, Builder } from './parser';
import { LogService } from './services/logservice';
export declare class Command implements CommandObject {
    static command: string;
    static description: string;
    static aliases: Array<string>;
    root: string;
    log: LogService;
    prepare(): void;
    builder(args: Builder): Builder;
    handler(args: Arguments): Promise<void>;
}
