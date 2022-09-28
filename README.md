# koibanx-backend-challenge
## Iniciar:
```
  > npm i
  > npm start
```
Configuraciones disponibles:
|file|config|
|-|-|
|*config/default.js*| Puerto
|*.env*| DataBase connection
## Dependencias:
Principales:
- Express
- Mongoose

Extras:
- Nodemon (facilita el desarrollo)
## DataModels:

### store:
|_id|name|cuit|concepts|currentBalance|active|lastSale|
|---|---|---|---|---|---|---|
|UniqueID|String|String|Array|Number|Bool|Date|

### user:
|username|password|
|---|---|
|String|String|
## Endpoints:
### **AUTH**
Los endpoints utilizan _BasicAuth_ como metodo de autenticacion, al iniciar la api se crea un usuario  de muestra para poder utilizar las funcionalidades:
```
BasicAuth	test@koibanx.com:test123
```
### **GET** /api/stores

> Realiza un query en la base de datos (MongoDB) y devuelve los resultados de forma paginada.

#### parámetros:
|limit|page|q|
|-|-|-|
|límite de resultados mostrados por página|índice de página a recibir|query enviado a la base de datos, utiliza la siguiente especificacion: https://restdb.io/docs/querying-with-the-api#restdb|
#### response:

|key|descripción|
|-|-|
|*data*|array con los resultados del query, paginado.|
|*page*|índice de la página actual|
|*pages*|cantidad total de páginas|
|*limit*|límite de resultados por página|
|*total*|total de instancias encontradas|

### **POST** /api/stores

> Crea una nueva entrada de **store** en la base de datos.
#### body:
|key|type|
|-|-|
|*name*|String
|*cuit*|String
|*concepts*|Array
|*currentBalance*|Number
|*active*|Bool
|*lastSale*|Date
#### response: _instancia creada_
