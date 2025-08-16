const express = require('express')
const pool = require('../db/db')
const result = require('../utils/result')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'images' })

router.post('/', upload.single('photo'), (req, res) => {
  const {
    categoryId,
    title,
    details,
    address,
    contactNo,
    ownerName,
    isLakeView,
    isTV,
    isAC,
    isWifi,
    isMiniBar,
    isBreakfast,
    isParking,
    guests,
    bedrooms,
    beds,
    bathrooms,
    rent,
  } = req.body

  console.log(req.file)

  const sql = `
    INSERT INTO property (
        categoryId, title,details, address, contactNo, ownerName, isLakeView,
        isTV, isAC, isWifi, isMiniBar, isBreakfast, isParking, guests,
        bedrooms, beds, bathrooms, rent, profileImage, userId
    ) VALUES (
        ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?
    )`

  pool.query(
    sql,
    [
      categoryId,
      title,
      details,
      address,
      contactNo,
      ownerName,
      isLakeView,
      isTV,
      isAC,
      isWifi,
      isMiniBar,
      isBreakfast,
      isParking,
      guests,
      bedrooms,
      beds,
      bathrooms,
      rent,
      req.file.filename,
      req.userId,
    ],
    (error, data) => {
      console.log(error)
      console.log(data)
      res.send(result.createResult(error, data))
    }
  )
})

router.get('/', (req, res) => {
  // GET property/
  // GET property/?searchTerm=Rio
  const searchTerm = req.query.searchTerm
  let sql = `
    SELECT 
      id, title, address, rent, profileImage 
    FROM property
  `

  // check if search term is provided
  if (searchTerm) {
    sql += ` WHERE title LIKE '%${searchTerm}%'`
  }

  pool.query(sql, (error, data) => {
    res.send(result.createResult(error, data))
  })
})

router.get('/my', (req, res) => {
  const sql = `
    SELECT 
      id, title, address, rent, profileImage 
    FROM property
    WHERE userId = ?`
  pool.query(sql, [req.userId], (error, data) => {
    res.send(result.createResult(error, data))
  })
})

router.get('/details/:id', (req, res) => {
  const { id } = req.params
  const sql = `
    SELECT  
      id,
      categoryId,
      title,
      details,
      address,
      contactNo,
      ownerName,
      isLakeView,
      isTV,
      isAC,
      isWifi,
      isMiniBar,
      isBreakfast,
      isParking,
      guests,
      bedrooms,
      beds,
      bathrooms,
      rent,
      profileImage,
      createdTimestamp  
    FROM property
    WHERE id = ?`
  pool.query(sql, [id], (error, data) => {
    if (data.length > 0) {
      res.send(result.createResult(error, data[0]))
    } else {
      res.send(result.createErrorResult('Property does not exist'))
    }
  })
})

router.delete('/:id', (request, response) => {
  const { id } = request.params
  const sql = `
    DELETE FROM property
    WHERE id = ?`
  pool.query(sql, [id], (error, data) => {
    response.send(result.createResult(error, data))
  })
})

module.exports = router
