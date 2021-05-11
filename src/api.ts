import * as cloudwatch from '@aws-cdk/aws-cloudwatch';

export interface IWatchful {
  addSection(title: string, options?: SectionOptions): void;
  addAlarm(alarm: cloudwatch.Alarm, autoResolveEvents?: boolean): void;
  addWidgets(...widgets: cloudwatch.IWidget[]): void;
}

export interface SectionOptions {
  readonly links?: QuickLink[];
}

export interface QuickLink {
  readonly title: string;
  readonly url: string;
}

