import { SectionWidget } from '../../src/widget/section';

test('correct size and content generated with minimum properties', () => {
  // GIVEN
  const widget = new SectionWidget({
    titleMarkdown: 'Dummy Title',
  });

  // WHEN
  const code = widget.toJson();

  // THEN
  expect(code).toHaveLength(1);
  expect(code[0].width).toStrictEqual(24);
  expect(code[0].height).toStrictEqual(2);
  expect(code[0].properties.markdown).toStrictEqual('# Dummy Title');
});

test('correct size and content generated with all properties', () => {
  // GIVEN
  const widget = new SectionWidget({
    titleMarkdown: 'Dummy Title',
    width: 12,
    height: 3,
    titleLevel: 3,
    descriptionMarkdown: 'Dummy Description in *Markdown*',
    quicklinks: [
      { url: 'https://github.com/awslabs/cdk-watchful', title: 'GitHub Repository' },
      { url: 'https://github.com/awslabs', title: 'AWS Labs Homepage' },
    ],
  });

  // WHEN
  const code = widget.toJson();

  // THEN
  expect(code).toHaveLength(1);
  expect(code[0].width).toStrictEqual(12);
  expect(code[0].height).toStrictEqual(3);
  expect(code[0].properties.markdown).toStrictEqual(
    '### Dummy Title\n\n' +
    'Dummy Description in *Markdown*\n\n' +
    '[button:GitHub Repository](https://github.com/awslabs/cdk-watchful) [button:AWS Labs Homepage](https://github.com/awslabs)',
  );
});
