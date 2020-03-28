#!/bin/sh
cd /home/lpj/Desktop/blog/server/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log
