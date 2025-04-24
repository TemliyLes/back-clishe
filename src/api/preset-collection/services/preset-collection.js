'use strict';

/**
 * preset-collection service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::preset-collection.preset-collection');
