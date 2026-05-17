const express = require('express')

const router =
  express.Router()

/* CONTROLLER */

const {

  login,

  createUser,

  getUsers,

  getSingleUser,

  updateUser,

  deleteUser

} = require('./user.controller')

/* MIDDLEWARE */

const validate =
  require('../../middleware/validate.middleware')

const {

  protect,

  adminOnly

} = require('../../middleware/auth.middleware')

/* MULTER */

const multer =
  require('multer')

/* STORAGE */

const storage =
  multer.diskStorage({

    destination:
      (req, file, cb) => {

        cb(
          null,
          'uploads/'
        )

      },

    filename:
      (req, file, cb) => {

        cb(

          null,

          Date.now() +
          '-' +
          file.originalname

        )

      }

  })

/* UPLOAD */

const upload =
  multer({ storage })

/* LOGIN */

router.post(

  '/login',

  validate,

  login

)

/* CREATE USER */

router.post(

  '/create',

  protect,

  adminOnly,

  upload.single(
    'profileImage'
  ),

  createUser

)

/* GET ALL USERS */

router.get(

  '/',

  protect,

  adminOnly,

  getUsers

)

/* GET SINGLE USER */

router.get(

  '/:id',

  protect,

  adminOnly,

  getSingleUser

)

/* UPDATE USER */

router.put(

  '/:id',

  protect,

  adminOnly,

  upload.single(
    'profileImage'
  ),

  updateUser

)

/* DELETE USER */

router.delete(

  '/:id',

  protect,

  adminOnly,

  deleteUser

)

module.exports = router