# Wedding Guest Book - API

```
This API build with NodeJS, Express, Postgres, Sequelize, JsonWebToken, and Bcrypt

Installation

Sebelumnya dianjurkan sudah menginstall postman untuk mempermudah menjalankan aplikasi berikut atau bisa menggunakan thunder client pada vscode. Install Postgres 


1. Pertama-tama lakukan langkah berikut, pastikan anda sudah berada didalam folder Challenge2-CODE-THE-API :
   - npm install, kemudian
   - npm i -D nodemon sequelize-cli
2. setelah berhasil melakukan npm install lakukan langkah2 berikut:
   - npx sequelize db:create, kemudian npx sequelize db:migrate
   - npx nodemon app.js
```

# Endpoints

```
Asumsi: Pada API ini saya menyediakan fitur register untuk admin, karena belum ada data admin.

List of available endpoints:
- `POST /register`
- `POST /login`
- `GET /guests`
- `POST /guests`
- `GET /admin`
- `DELETE /guests/:id`
```

&nbsp;

## 1. POST /register

Request:

- body:

```json
{
	"username": "string",
	"email": "string",
	"password": "string"
}
```

_Response (201 - Created)_

```json
{
	"id": 1,
	"username": "admin",
	"email": "admin@mail.com"
}
```

&nbsp

## 2. POST /login

Request:

- body:

```json
{
	"email": "string",
	"password": "string"
}
```

_Response (200 - OK)_

```json
{
	"message": "Login Success!",
	"access_token": "string"
}
```

&nbsp

## 3. GET /guests

Description :

- Get all guests from database

_Response (200 - OK)_

```json
[
	{
		"name": "Farhan",
		"note": "Congratss for your marriage!!"
	},
	{
		"name": "Akbar",
		"note": "Congratss for your marriage brother!!"
	}
]
```

&nbsp;

## 4. POST /guests

Description:

- Create guest post

Request:

- body:

```json
{
	"name": "string",
	"address": "string",
	"phone": "integer",
	"note": "string"
}
```

_Response (201 - Created)_

```json
[
	{
		"message": "New guest has been created",
		"newGuest": {
			"id": 3,
			"name": "Andre",
			"address": "Bandung",
			"phone": 8576767,
			"note": "Asikk udah nikah nih ye!",
			"updatedAt": "2022-02-20T15:05:24.111Z",
			"createdAt": "2022-02-20T15:05:24.111Z"
		}
	}
]
```

&nbsp;

## 5. GET /admin

Description:

- It's admin page where admin can get all guests post and also can delete it

Request:

- headers:

```json
{
	"access_token": "string"
}
```

_Response (200 - OK)_

```json
[
	{
		"id": 1,
		"name": "Farhan",
		"address": "Jakarta",
		"phone": 82132132,
		"note": "Congratss for your marriage!!"
	},
	{
		"id": 2,
		"name": "Akbar",
		"address": "Bandung",
		"phone": 82132132,
		"note": "Congratss for your marriage brother!!"
	},
	{
		"id": 3,
		"name": "Andre",
		"address": "Bandung",
		"phone": 8576767,
		"note": "Asikk udah nikah nih ye!"
	}
]
```

&nbsp;

## 6. DELETE /guests/:id

Description :
Delete guests post

Request :

- headers:

```json
{
	"access_token": "string"
}
```

- params:

```json
{
   "id": "integer" (required)
}
```

_Response (200 - OK)_

```json
{
	"message": "Guest Note has been deleted"
}
```
