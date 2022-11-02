import {
  Duration,
  Stack,
  StackProps,
  // aws_iam as iam,
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

    const lambdaPostSample = new NodejsFunction(this, 'root-post', {
      entry: 'functions/apigw-backends/post.ts',
      handler: 'lambdaHandler',
      runtime: Runtime.NODEJS_16_X,
      timeout: Duration.seconds(15),
    });

    const exampleApi = new apigateway.RestApi(this, 'exampleApigateway', {
      restApiName: 'dummy-apigateway',
    });
    exampleApi.root.addMethod('GET', new apigateway.LambdaIntegration(lambdaGetSample));
    exampleApi.root.addMethod('POST', new apigateway.LambdaIntegration(lambdaPostSample));
    exampleApi.root.addCorsPreflight({
      allowOrigins: ['http://localhost:5173'],
      // allowOrigins: apigateway.Cors.ALL_ORIGINS,
      allowMethods: [
        // 'GET',
        'POST',
      ],
      // allowMethods: apigateway.Cors.ALL_METHODS,
      // allowHeaders: apigateway.Cors.DEFAULT_HEADERS,
    });
  }
}
