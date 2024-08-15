FROM ubuntu:latest AS base

RUN apt-get update && apt-get install --no-install-recommends -y curl tzdata make
RUN apt-get update && apt-get install --no-install-recommends -y npm && npm install --ignore-scripts --global n && n install latest && \
    apt-get remove -y nodejs npm && apt-get -y autoremove
RUN apt-get update && apt-get install --no-install-recommends -y git && git config --global --add safe.directory /app
RUN git config --global user.email "startarkit/nextjs" && git config --global user.name "startarkit/nextjs"
RUN apt-get clean && apt-get -y autoremove
