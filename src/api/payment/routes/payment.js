module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/payment', // путь, на который будут приходить POST-запросы
      handler: 'payment.receiveData',
      config: {
        auth: false, // если не нужно авторизовывать запрос
        policies: [],
        middlewares: [],
      },
    },
  ],
};