// import * as cdk from 'aws-cdk-lib';
import {
  Duration,
  Stack,
  StackProps,
  aws_iam as iam,
  aws_apigateway as apigateway,
} from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Runtime } from 'aws-cdk-lib/aws-lambda';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';

export class CdkAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    const lambdaGetSample = new NodejsFunction(this, 'root-get', {
      entry: 'functions/apigw-backends/get.ts',
      handler: 'lambdaHandler',
      runtime: Runtime.NODEJS_16_X,
      timeout: Duration.seconds(15),
    });

    const exampleApi = new apigateway.RestApi(this, 'exampleApigateway', {
      restApiName: 'dummy-apigateway',
    });
    exampleApi.root.addMethod('GET', new apigateway.LambdaIntegration(lambdaGetSample));
  }
}
