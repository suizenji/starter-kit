FROM ubuntu:latest AS base

ENV TZ Asia/Tokyo

# 前提条件
RUN apt-get update && apt-get install --no-install-recommends -y curl tzdata

# nodejsのバージョンを変えやすいようにnを用いる
RUN apt-get update && apt-get install --no-install-recommends -y npm && npm install --ignore-scripts --global n && n install latest && \
    apt-get remove -y nodejs npm && apt-get -y autoremove

# 開発を便利にするもの
RUN apt-get update && apt-get install --no-install-recommends -y sqlite3 make
RUN apt-get update && apt-get install --no-install-recommends -y git && git config --global --add safe.directory /app

# 後始末
RUN apt-get clean && apt-get -y autoremove

EXPOSE 3000
EXPOSE 5555
EXPOSE 6006
EXPOSE 8005
EXPOSE 8080
