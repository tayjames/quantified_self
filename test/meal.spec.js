var shell = require('shelljs');
var request = require('supertest');
var app = require('../app');
var Food = require('../models').Food;
var Meal = require('../models').Meal;
var MealFood = require('../models').MealFood;





describe('Food API endpoints', () => {


  test('POST /api/v1/meals path',  async () => {
    let params = {
      name: "Breakfast"
    }
    const res = await request(app).post('/api/v1/meals').send(params)
    expect(res.statusCode).toEqual(201)
    expect(res.body).toBe("Meal Created")
    })

  test('GET /api/v1/meals path',  async () => {
    let params = {
      name: "Breakfast"
    }
    const res = await request(app).post('/api/v1/meals').send(params)
    let params2 = {
      name: "Lunch"
    }
    const res2 = await request(app).post('/api/v1/meals').send(params2)
    const res3 = await request(app).get('/api/v1/meals').send()
    expect(res3.statusCode).toEqual(200)
    expect(res3.body[0]).toHaveProperty("name")
    expect(res3.body[0]).toHaveProperty("id")
    expect(res3.body[0]).toHaveProperty("Food")
    expect(res3.body[0]).toHaveProperty("createdAt")
    })

  test('GET /api/v1/meals/:id/foods/:id path',  async () => {
    const res2 = await request(app).post('/api/v1/meals/1/foods/1').send()
    })

  test('GET /api/v1/meals/:id/foods/:id path',  async () => {
    const res2 = await request(app).post('/api/v1/meals/1/foods/1').send()
    expect(res2.body).toEqual("Already exists in meal.")
    })

  test('GET /api/v1/meals/:id/foods/:id path',  async () => {
    const res2 = await request(app).delete('/api/v1/meals/1/foods/1').send()
    expect(res2.statusCode).toEqual(204)
    })

  test('GET /api/v1/meals/:id/foods/:id path',  async () => {
    const res2 = await request(app).get('/api/v1/meals/1/foods').send()
    expect(res2.statusCode).toEqual(200)
    })

  // test('GET /api/v1/meals/:id path',  async () => {
  //   const res2 = await request(app).post('/api/v1/meals/1/food/1').send()
  //   expect(res2.statusCode).toEqual(200)
  //   expect(res2.body[0]).toHaveProperty("name")
  //   expect(res2.body[0]).toHaveProperty("id")
  //   expect(res2.body[0]).toHaveProperty("Food")
  //   expect(res2.body[0]).toHaveProperty("createdAt")
  //   })
  })
