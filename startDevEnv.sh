#!/bin/bash
screen -dmS backend bash -c 'cd /home/oliver/go/src/oik-backend; fswatch'
screen -dmS frontend bash -c 'cd /home/oliver/uni/projektarbeit/oik-html-frontend; ember serve --proxy http://localhost:8080'
