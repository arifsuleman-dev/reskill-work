package com.example;

import com.amazonaws.serverless.proxy.model.AwsProxyRequest;
import com.amazonaws.serverless.proxy.model.AwsProxyResponse;
import com.amazonaws.serverless.proxy.spring.SpringBootProxyHandlerBuilder;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;

import java.io.InputStream;
import java.io.OutputStream;

public class StreamLambdaHandler implements RequestStreamHandler {
    private static final com.amazonaws.serverless.proxy.RequestHandler<AwsProxyRequest, AwsProxyResponse> handler =
        new SpringBootProxyHandlerBuilder<AwsProxyRequest>()
            .defaultProxy()
            .asyncInit()
            .springBootApplication(Application.class)
            .build();

    @Override
    public void handleRequest(InputStream inputStream, OutputStream outputStream, com.amazonaws.services.lambda.runtime.Context context) throws java.io.IOException {
        handler.proxyStream(inputStream, outputStream, context);
    }
}
