'use strict'

var _ = require('underscore'),
    defaultOptions = {
        connectionLabel: ''
    };

exports.register = function (server, options, next) {
    var io, listener;

    _.defaults(options, defaultOptions);

    if(options.connectionLabel !== '') {
        if(typeof server.select(options.connectionLabel).connections[0] === 'undefined') {
            throw "The connection label does not exist";
        }
        listener = server.select(options.connectionLabel).connections[0].listener;
    } else {
        listener = server.connections[0].listener;
    }

    io = require('socket.io')(listener);
    server.expose('io', io);

    next();
};

exports.register.attributes = {
    pkg: require('./package.json')
};