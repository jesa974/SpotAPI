FROM alpine
RUN apk update && apk add npm && apk add nodejs && npm install -g typescript && npm install -g @angular/cli@10.2.0 && addgroup -S appgroup && adduser -S appuser -G appgroup && apk add curl
COPY ./ /app
USER appuser
WORKDIR /app
EXPOSE 4200
ENTRYPOINT ["ng", "serve"]