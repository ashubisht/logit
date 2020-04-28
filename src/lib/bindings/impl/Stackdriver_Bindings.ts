import { LoggingWinston } from "@google-cloud/logging-winston";
import { Bindings } from "../Binding";
import { Verbose } from "../../utils/Verbose";
import { IStackDriverBindingOptions } from "../IBindings";
import { Options } from "@google-cloud/logging-winston/build/src/types/core";

export class StackDriverBindings extends Bindings {

    public static getInstance(): StackDriverBindings {
        if (!StackDriverBindings.instance) {
            StackDriverBindings.instance = new StackDriverBindings();
        }
        return StackDriverBindings.instance;
    }

    private static instance: StackDriverBindings;

    private constructor() {
        super();
    }

    public readonly verbose: Verbose = new Verbose();
    public transportStream?: LoggingWinston;

    private prepareConfigProperties(binding: IStackDriverBindingOptions): Options {
        const format = binding.format;
        if (format !== undefined) {
            this.getFormatFunction = () => format;
        }
        delete binding.format;
        const option = binding as Options;
        if (option.level === "trace") {
            option.level = "silly"
        }
        return option;
    }

    public config(binding: IStackDriverBindingOptions): void {
        this.transportStream = new LoggingWinston(this.prepareConfigProperties(binding));
    }

    public getStream() {
        return this.transportStream;
    }

}