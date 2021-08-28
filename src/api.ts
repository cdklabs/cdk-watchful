import * as cloudwatch from '@aws-cdk/aws-cloudwatch';

export interface IWatchful {
  addSection(title: string, options?: SectionOptions): void;
  addAlarm(alarm: cloudwatch.AlarmBase): void;
  addWidgets(...widgets: cloudwatch.IWidget[]): void;
}

export interface SectionOptions {
  readonly links?: QuickLink[];
}

export interface QuickLink {
  readonly title: string;
  readonly url: string;
}

