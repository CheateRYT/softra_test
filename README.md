# Softra

## Описание проекта

Это тестовое задание для компании **Softra**, реализованное с использованием фреймворка **NestJS**. Данный проект предоставляет API, доступное по адресу [http://localhost:3000](http://localhost:3000), а также интерфейс **Swagger** для удобной документации API. База данных MySQL.

---

## Установка и запуск

### Запуск с использованием Docker

1. Сначала выполните сборку контейнеров:
   docker-compose build

2. Затем запустите приложение:
   docker-compose up
3. База данных подгружается какое то время, поэтому может выдавать варнинги с переподключением, нужно просто немного подождать и появятся endpoints 

После этого ваше приложение будет доступно по адресу [http://localhost:3000](http://localhost:3000).

---

## Swagger

Swagger UI доступен по адресу:

[http://localhost:3000/swagger](http://localhost:3000/swagger)

Swagger предоставляет удобный интерфейс для тестирования и документации вашего API.
