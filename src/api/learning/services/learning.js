'use strict';

/**
 * learning service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::learning.learning');
