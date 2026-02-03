FROM oven/bun:1.3

RUN apt-get update && \
    apt-get install -y git curl ffmpeg && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
