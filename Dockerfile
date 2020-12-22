FROM alpine
RUN apk update && apk add npm && apk add nodejs && npm install -g typescript && npm install -g @angular/cli@10.2.0 && npm install --save rxjs-compat && addgroup -S appgroup && adduser -S appuser -G appgroup
COPY ./ /app
USER appuser
WORKDIR /app
EXPOSE 4200
ENTRYPOINT ["ng", "serve"]