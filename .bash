#!/bin/bash
pm2 stop all
npm run build
pm2 start all