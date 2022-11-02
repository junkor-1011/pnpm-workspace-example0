import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { CdkAppStack } from '../lib/cdk-app-stack';

describe('snapshot test', () => {
  it("TestApp Stack's Snapshot test", () => {
    const app = new cdk.App();
    const stack = new CdkAppStack(app, 'CdkAppStack');
    const template = Template.fromStack(stack).toJSON();

    expect(template).toMatchSnapshot();
  });
});
