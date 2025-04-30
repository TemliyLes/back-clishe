'use strict';

module.exports = {
  async receiveData(ctx) {
    try {
      console.log('we are here');
      const data = ctx.request.body;

      // Логика обработки запроса
      console.log('Получены данные:', data);

      // Можно, например, сохранить в БД:
      // await strapi.entityService.create('api::external.external', { data });

      ctx.send({ message: 'Данные успешно получены', received: data });
    } catch (error) {
      ctx.send({ error: 'Произошла ошибка при обработке запроса' }, 500);
    }
  },
};