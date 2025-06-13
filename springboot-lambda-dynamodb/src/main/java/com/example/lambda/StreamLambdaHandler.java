package com.example.lambda;

import com.amazonaws.serverless.exceptions.ContainerInitializationException;
import com.amazonaws.serverless.proxy.internal.testutils.Timer;
import com.amazonaws.serverless.proxy.model.AwsProxyRequest;
import com.amazonaws.serverless.proxy.model.AwsProxyResponse;
import com.amazonaws.serverless.proxy.spring.SpringBootProxyHandlerBuilder;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestStreamHandler;
import org.springframework.cloud.function.adapter.aws.SpringBootRequestHandler;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class StreamLambdaHandler implements RequestStreamHandler {

    private static final SpringBootProxyHandlerBuilder<AwsProxyRequest, AwsProxyResponse> handlerBuilder =
            new SpringBootProxyHandlerBuilder<AwsProxyRequest, AwsProxyResponse>()
                .defaultProxy();

    private static final com.amazonaws.serverless.proxy.RequestHandler<AwsProxyRequest, AwsProxyResponse> handler;

    static {
        try {
            Timer.start("HandlerInit");
            handler = handlerBuilder.asyncInit()
                                    .springBootApplication(LambdaApp.class)
                                    .buildAndInitialize();
            Timer.stop("HandlerInit");
        } catch (ContainerInitializationException e) {
            throw new RuntimeException("Could not initialize Spring Boot application", e);
        }
    }

    @Override
    public void handleRequest(InputStream inputStream, OutputStream outputStream, Context context) throws IOException {
        handler.proxyStream(inputStream, outputStream, context);
    }
}
