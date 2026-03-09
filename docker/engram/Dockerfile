FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p /opt/engram /data

# Copy pre-built engram binary (Linux x86_64)
COPY binaries/engram-linux-x86_64 /opt/engram/engram
RUN chmod +x /opt/engram/engram

# Copy pre-loaded brain files
COPY data/russia.brain /opt/engram/russia.brain
COPY data/russia.brain.props /opt/engram/russia.brain.props
COPY data/russia.brain.types /opt/engram/russia.brain.types
COPY data/russia.brain.cooccur /opt/engram/russia.brain.cooccur

# Trial entrypoint
COPY docker/engram/entrypoint.sh /opt/engram/entrypoint.sh
RUN chmod +x /opt/engram/entrypoint.sh

EXPOSE 3030
VOLUME /data

ENTRYPOINT ["/opt/engram/entrypoint.sh"]
