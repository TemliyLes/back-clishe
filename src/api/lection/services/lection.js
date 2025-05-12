'use strict';

/**
 * lection service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::lection.lection');
