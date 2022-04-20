#!/bin/bash

rsync -a --exclude node_modules . root@instantmeme.net:/home/instantmeme/build001/instant-meme/server
