import * as cloudwatch from 'aws-cdk-lib/aws-cloudwatch';

export interface IWatchful {
  addSection(title: string, options?: SectionOptions): void;
  addAlarm(alarm: cloudwatch.IAlarm): void;
  addWidgets(...widgets: cloudwatch.IWidget[]): void;
}

export interface SectionOptions {
  readonly links?: QuickLink[];
}

export interface QuickLink {
  readonly title: string;
  readonly url: string;
}

