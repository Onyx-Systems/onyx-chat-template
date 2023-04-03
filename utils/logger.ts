import { writeFileSync } from "fs";

type logTypes = "info" | "error" | "warning" | "debug" | "analytics";

export class Logger {
  private log_type: logTypes = "info";
  private log_file_path: string = "storage/logs/logs.txt";
  public name: string;

  constructor({
    name,
    log_file_path,
    log_type,
  }: {
    name: string;
    log_file_path?: string;
    log_type?: logTypes;
  }) {
    this.name = name;
    this.log_type = log_type || this.log_type;
    this.log_file_path = log_file_path || this.log_file_path;
  }

  public log(message: string, ...args: any) {
    const date = new Date();
    const log_message = `[${
      this.log_type
    }] - ${date.toLocaleString()} - ${message} - ${this.name} - ${args.join(
      " "
    )}"`;
    writeFileSync(this.log_file_path, log_message + "\n", {
      flag: "a",
    });
    console.log("Logged: " + log_message);
  }

  public info(message: string, ...args: any) {
    this.log_type = "info";
    this.log(message, ...args);
  }

  public error(message: string, ...args: any) {
    this.log_type = "error";
    this.log(message, ...args);
  }

  public warning(message: string, ...args: any) {
    this.log_type = "warning";
    this.log(message, ...args);
  }

  public debug(message: string, ...args: any) {
    this.log_type = "debug";
    this.log(message, ...args);
  }

  public analytics(message: string, ...args: any) {
    this.log_type = "analytics";
    this.log(message, ...args);
  }
}
