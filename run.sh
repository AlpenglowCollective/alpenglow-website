#!/bin/bash

# Npm install if node_modules does not exist
[ ! -d "node_modules" ] && npm install

# Run with Meteor
meteor run --port 3000 --settings dev-settings.json
