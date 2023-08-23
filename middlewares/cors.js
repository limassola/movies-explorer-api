const allowedCors = [
  'http://localhost:3001',
  // Вписать домены для диплома
];

const corsMiddleware = (req, res, next) => {
  const { origin } = req.headers;

  // Проверяем, является ли источник запроса разрешенным
  if (allowedCors.includes(origin)) {
    // Устанавливаем заголовки CORS для разрешенного источника
    res.header('Access-Control-Allow-Origin', allowedCors.join(', '));
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Credentials', 'true'); // Добавляем этот заголовок для разрешения передачи куки с установленным флагом HttpOnly

    // Если это предварительный запрос (OPTIONS), возвращаем успешный ответ
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }
  }

  next();
};

module.exports = corsMiddleware;
