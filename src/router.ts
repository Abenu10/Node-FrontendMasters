import {Router} from 'express';
import {body, oneOf, validationResult} from 'express-validator';
import {handleInputError} from './modules/middleware';

const router = Router();
//  Product
router.get('/product', (req, res) => {
  res.json({Message: 'message'});
});
router.get('/product/:id', (req, res) => {});

router.put(
  '/product/:id',
  body('name').isString(),
  handleInputError,
  (req, res) => {}
);

router.post('/product', body('name').isString(), handleInputError, () => {});
router.delete('/product/:id', () => {});
//  Update
router.get('/update', () => {});
router.get('/update/:id', () => {});
router.put(
  '/update/:id',
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS','SHIPPED','DEPRECATED']),
  body('version').optional(),
  handleInputError,
  () => {}
);
router.post(
  '/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  () => {}
);
router.delete('/update/:id', () => {});
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

export default router;
