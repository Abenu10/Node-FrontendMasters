import prisma from '../db';

//get update by id
export const getOneUpdate = async (req, res) => {
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.json({data: update});
};
// get all updates
export const getUpdates = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  res.json({data: updates});
};
// create update
export const createUpdate = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: req.body.productId,
      },
    });
    if (!product) {
      return res.status(400).json({message: 'Product not found'});
    }
    const update = await prisma.update.create({
      data: {
        title: req.body.title,
        body: req.body.body,
        status: req.body.status,
        version: req.body.version,
        product: {
          connect: {
            id: product.id,
          },
        },
      },
    });
    res.json({data: update});
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};
//FIXME: update update by id
export const updateUpdatesById = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);
  const match = updates.find((update) => update.id === req.params.id);
  if (!match) {
    // handle this
    return res.json({message: 'nope'});
  }

  const updateUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({data: updateUpdate});
};
// TODO: Alternative - update update by id
// export const updateUpdatesById = async (req, res) => {
//     const update = await prisma.update.findUnique({
//         where: {
//             id: req.params.id,
//         },
//     });

//     if (!update) {
//         // handle this
//         return res.json({message: 'nope'});
//     }

//     const updatedUpdate = await prisma.update.update({
//         where: {
//             id: req.params.id,
//         },
//         data: req.body,
//     });

//     res.json({data: updatedUpdate});
// };

// delete update

// TODO: make this work
// export const deleteUpdate = async (req, res) => {
//   const {updateId} = req.params;

//   // Find the update
//   const update = await prisma.update.findUnique({
//     where: {id: updateId},
//     include: {product: true}, // Include the related product
//   });

//   // If the update doesn't exist, return an error
//   if (!update) {
//     return res.status(404).json({error: 'Not found'});
//   }

//   // If the product doesn't belong to the user, return an error
//   if (update.product.belongsToId !== req.user.id) {
//     return res.status(403).json({error: 'Forbidden'});
//   }

//   // Delete the update
//   const deletedUpdate = await prisma.update.delete({
//     where: {id: updateId},
//   });

//   res
//     .status(200)
//     .json({message: 'Update deleted successfully', data: deletedUpdate});
// };

export const deleteUpdate = async (req, res) => {
  const products = await prisma.product.findMany({
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });

  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);

  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    // handle this
    return res.json({message: 'nope'});
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });

  res.json({data: deleted});
};
