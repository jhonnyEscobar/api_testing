const { test, expect } = require('@playwright/test');
const path = require('path');

const URL = `file://${path.resolve(__dirname, '../../public/index.html')}`;

test.describe('Landing - TiendaTech', () => {

  test('muestra el título de la página', async ({ page }) => {
    await page.goto(URL);
    await expect(page).toHaveTitle('Tienda de Productos');
  });

  test('muestra el encabezado principal', async ({ page }) => {
    await page.goto(URL);
    const header = page.locator('header h1');
    await expect(header).toHaveText('TiendaTech');
  });

  test('muestra el mensaje de bienvenida en el hero', async ({ page }) => {
    await page.goto(URL);
    const titulo = page.locator('.hero h2');
    await expect(titulo).toHaveText('Bienvenido a TiendaTech');
  });

  test('el botón Ver productos es visible', async ({ page }) => {
    await page.goto(URL);
    const boton = page.locator('#btn-ver-productos');
    await expect(boton).toBeVisible();
    await expect(boton).toHaveText('Ver productos');
  });

  test('muestra 3 tarjetas de productos', async ({ page }) => {
    await page.goto(URL);
    const tarjetas = page.locator('.card');
    await expect(tarjetas).toHaveCount(3);
  });

  test('cada tarjeta tiene botón Agregar al carrito', async ({ page }) => {
    await page.goto(URL);
    const botones = page.locator('.card button');
    await expect(botones).toHaveCount(3);
    for (const boton of await botones.all()) {
      await expect(boton).toHaveText('Agregar al carrito');
    }
  });

  test('la navegación tiene los enlaces correctos', async ({ page }) => {
    await page.goto(URL);
    await expect(page.locator('nav a[href="#productos"]')).toHaveText('Productos');
    await expect(page.locator('nav a[href="#contacto"]')).toHaveText('Contacto');
  });

  test('el footer muestra el correo de contacto', async ({ page }) => {
    await page.goto(URL);
    const footer = page.locator('footer');
    await expect(footer).toContainText('contacto@tiendatech.com');
  });

});