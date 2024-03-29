import {Router} from 'express';
import {body, oneOf, validationResult} from 'express-validator';
import {handleInputError} from './modules/middleware';
import {
  createProduct,
  deleteProduct,
  getOneProduct,
  getProducts,
  updateProduct,
} from './handlers/product';
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdatesById,
} from './handlers/update';

const router = Router();
//  Product
router.get('/product', getProducts);
router.get('/product/:id', getOneProduct);
router.post(
  '/product',
  body('name').isString(),
  handleInputError,
  createProduct
);

router.put(
  '/product/:id',
  body('name').isString(),
  handleInputError,
  updateProduct
);

router.delete('/product/:id', deleteProduct);

//  Update
router.get('/update', getUpdates);
router.get('/update/:id', getOneUpdate);

router.post(
  '/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  createUpdate
);
router.put(
  '/update/:id',
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
  body('version').optional(),
  handleInputError,
  updateUpdatesById
);
router.delete('/update/:id', deleteUpdate);

// Update Point
router.get('/updatepoint', () => {});
router.get('/updatepoint/:id', () => {});

router.put(
  '/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  () => {}
);

router.post(
  '/updatepoint',
  body('name').isString(),
  body('description').isString(),
  body('updateId').isString(),
  () => {}
);
router.delete('/updatepoint/:id', () => {});

router.use((err, req, res, next) => {
  console.log(err);
  res.json({message: 'in router handler'});
});

export default router;
