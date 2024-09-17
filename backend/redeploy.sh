#!/usr/bin/bash
# git pull &&
npm i && npm run build && pm2 reload ecosystem.config.cjs && pm2 logs --lines 100
