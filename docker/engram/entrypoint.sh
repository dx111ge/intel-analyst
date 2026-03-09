#!/bin/sh
set -e

TRIAL_FILE="/data/.trial"
TRIAL_DAYS=7
BRAIN_FILE="/data/russia.brain"

# First run: write install timestamp
if [ ! -f "$TRIAL_FILE" ]; then
    date +%s > "$TRIAL_FILE"
    echo "=== Engram Intel Analyst -- Trial Started ==="
    echo "    You have ${TRIAL_DAYS} days to evaluate."
    echo "    Visit https://github.com/dx111ge/engram for licensing."
    echo "=============================================="
fi

# Check expiry
INSTALL_TS=$(cat "$TRIAL_FILE")
NOW_TS=$(date +%s)
ELAPSED=$(( (NOW_TS - INSTALL_TS) / 86400 ))
REMAINING=$(( TRIAL_DAYS - ELAPSED ))

if [ "$REMAINING" -le 0 ]; then
    echo "=== Trial Expired ==="
    echo "    Your ${TRIAL_DAYS}-day trial has ended."
    echo "    Visit https://github.com/dx111ge/engram for a license."
    echo "====================="
    exit 1
fi

echo "Trial: ${REMAINING} days remaining"

# Copy pre-loaded brain if not already in volume
if [ ! -f "$BRAIN_FILE" ]; then
    cp /opt/engram/russia.brain "$BRAIN_FILE"
    cp /opt/engram/russia.brain.props "$BRAIN_FILE.props" 2>/dev/null || true
    cp /opt/engram/russia.brain.types "$BRAIN_FILE.types" 2>/dev/null || true
    cp /opt/engram/russia.brain.cooccur "$BRAIN_FILE.cooccur" 2>/dev/null || true
    cp /opt/engram/russia.brain.vectors "$BRAIN_FILE.vectors" 2>/dev/null || true
    echo "Pre-loaded intelligence database (1010 nodes)"
fi

exec /opt/engram/engram serve "$BRAIN_FILE" 0.0.0.0:3030
