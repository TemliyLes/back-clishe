'use strict';

module.exports = {
  async receiveData(ctx) {
    try {
      const data = ctx.request.body;
      console.log('--------------------------');
      // console.log(data);

      if (data.Status === 'CONFIRMED') {

        const sales = await strapi.entityService.findMany("api::sale.sale", {
          populate: '*'
        });

        // Логика обработки запроса
        // console.log('Получены данные:', data);
        // console.log('от:', ctx.request.host);

        const entry = await strapi.entityService.create('api::log.log', {
          data: {
            host: ctx.request.host,
            message: JSON.stringify(data).toString(),
            ctx: JSON.stringify(ctx).toString(),
          },
        });
        let methodData;
        let learningData;
        let emailContent = '<body><h2>Ваши продукты</h2>';
        const current = sales.find((el) => el.email === data.Data.Email);
        if (current.with_methodic) {
          methodData = await strapi.entityService.findMany("api::methodic-page.methodic-page", {
            populate: '*'
          });
          console.log(methodData.secretCode);
        }
        if (current.with_learning) {
          learningData = await strapi.entityService.findMany("api::learning.learning", {
            populate: '*'
          });
          console.log(learningData.secretCode);
        }

        if (!current.present) {
          if (methodData) {
            emailContent += `<p>Методическое пособие: <a href="${methodData.secretCode}">${methodData.secretCode}</a></p>`;
          }
          if (learningData) {
            emailContent += `<p>Обучение: <a href="${learningData.secretCode}">${learningData.secretCode}</a></p>`;
          }
          current.preset_collections.forEach((pc) => {
            emailContent += `<p>Коллекция ${pc.name}:  <a href="${pc.secretCode}">${pc.secretCode}</a></p>`;
          })
          const sendProducts = async () => {
            const URL = 'https://cliche.academy/products.php';
            await fetch(URL, {
              method: 'POST',
              body: JSON.stringify({
                message: emailContent,
                email: data.Data.Email,
                token: 321678321
              })
            });
          }
          sendProducts();

        } else {
          const sendPresents = async () => {
            const URL = 'https://cliche.academy/presents.php';
            await fetch(URL, {
              method: 'POST',
              body: JSON.stringify({
                methodic: current.with_methodic,
                learning: current.with_learning,
                count: current.preset_collections.length ? current.preset_collections.length : 0,
                email: data.Data.Email,
                token: 321678321
              })
            });
          }
          sendPresents();
        }


      }

      // Можно, например, сохранить в БД:
      // await strapi.entityService.create('api::external.external', { data });

      ctx.send({ message: 'Данные успешно получены', received: data });
    } catch (error) {
      ctx.send({ error: 'Произошла ошибка при обработке запроса' }, 500);
    }
  },
};