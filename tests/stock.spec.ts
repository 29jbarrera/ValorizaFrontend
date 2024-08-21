import { test, expect } from '@playwright/test';

test.use({
  storageState: 'auth.json',
});

const testName = 'stocks';
test(testName, async ({ page }) => {
  const OBJ_ID_ELIMINAR = 2;
  const N_ROWS = 3;
  const LOCATOR_REMOVE = `#stock-delete-${OBJ_ID_ELIMINAR}`;
  await page.goto('http://localhost:4200/authenticated');

  // Ir a la página de unidades
  await page.getByText('Stock').click();

  // Comprobamos que se ha cargado la tabla
  await page
    .getByRole('cell', { name: 'Resultado totales:' })
    .locator('span')
    .click();
  await expect(page.locator('tfoot')).toContainText(N_ROWS.toString());
  await page.screenshot({ path: `screenshots/${testName}/01-listado.png` });

  // Eliminamos un elemento
  await page
    .locator(LOCATOR_REMOVE)
    .getByRole('button', { name: ' p' })
    .click();
  await page.screenshot({
    path: `screenshots/${testName}/02-eliminación popup.png`,
  });
  await page.getByRole('button', { name: 'Yes' }).click();
  await page
    .locator('div')
    .filter({ hasText: /^ConfirmadoFila eliminada correctamente$/ })
    .nth(2)
    .isVisible();
  await page.screenshot({
    path: `screenshots/${testName}/03-eliminacion completada.png`,
  });
  // Ahora debería haber una fila menos
  await expect(page.locator('tfoot')).toContainText((N_ROWS - 1).toString());
});
