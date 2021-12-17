import { TextWidget } from 'aws-cdk-lib/aws-cloudwatch';
import { QuickLink } from '../api';

/**
 * Props to create SectionWidget.
 */
export interface SectionWidgetProps {
  /**
   * widget width
   * @default full width
   */
  readonly width?: number;
  /**
   * widget height
   * @default 2
   */
  readonly height?: number;
  /**
   * title level (1 = H1, 2 = H2, etc)
   * @default 1
   */
  readonly titleLevel?: number;
  /**
   * section title (might be markdown)
   */
  readonly titleMarkdown: string;
  /**
   * section description (might be markdown)
   * @default empty
   */
  readonly descriptionMarkdown?: string;
  /**
   * quick links, that will be rendered as buttons
   * @default none
   */
  readonly quicklinks?: QuickLink[];
}

/**
 * Renders a section header in the following format:
 *
 * # Header
 * Description
 * [button:label1](url1) [button:label2](url2)
 */
export class SectionWidget extends TextWidget {
  private static toMarkdown(props: SectionWidgetProps) {
    const lines: string[] = [];

    // title

    const titlePrefix = '#'.repeat(props.titleLevel ?? 1);
    lines.push(`${titlePrefix} ${props.titleMarkdown}`);

    // description

    if (props.descriptionMarkdown) {
      lines.push(props.descriptionMarkdown);
    }

    // quick links

    if (props.quicklinks && props.quicklinks.length > 0) {
      lines.push(props.quicklinks.map(link => `[button:${link.title}](${link.url})`).join(' '));
    }

    return lines.join('\n\n');
  }

  constructor(props: SectionWidgetProps) {
    super({ width: props.width ?? 24, height: props.height ?? 2, markdown: SectionWidget.toMarkdown(props) });
  }
}
