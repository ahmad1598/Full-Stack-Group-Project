const express = require('express')
const portfolioItemRouter = express.Router()
const PortfolioItem = require('../models/portfolioItem.js')

// GET ALL PORTFOLIO ITEMS FOR EVERY USER
// for generating the portfolio's menu and the portfolioItem dropdowns
portfolioItemRouter.get('/', (req, res) => {
    PortfolioItem.find((err, userPortfolioItems) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(userPortfolioItems)
    })
})

// GET ALL PORTFOLIO ITEMS FOR A SPECIFIC USER
// for generating the portfolio's menu and the portfolioItem dropdowns
portfolioItemRouter.get('/search', (req, res) => {
    PortfolioItem.find({userId: req.query.userid}, (err, userPortfolioItems) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(userPortfolioItems)
    })
})

// GET SINGLE PORTFOLIO ITEM BY ID
portfolioItemRouter.get('/:_id', (req, res) => {
    PortfolioItem.findOne({_id: req.params._id}, (err, userPortfolioItem) => {
        if (err) {
            res.status(500)
            return next(err)
        }
        return res.status(200).send(userPortfolioItem)
    })
})

// CREATE NEW CATEGORY PER USER WITH SPECIFIED CATEGORY
portfolioItemRouter.post('/:userid/:categoryid', (req, res, next) => {
    const { userid, categoryid } = req.params
    const newPortfolioItem = new PortfolioItem(req.body)
    newPortfolioItem.userId = userid
    newPortfolioItem.categoryId = categoryid
    newPortfolioItem.save((err, newSavedPortfolioItem) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(newSavedPortfolioItem)
    })
})

// DELETE A CATEGORY
portfolioItemRouter.delete('/:_id', (req, res) => {
    PortfolioItem.findOneAndRemove({ _id: req.params._id }, (err, deletedPortfolioItem) => {
        if (err) {
            res.status(500)
            return res.send(err)
        }
        // 202 allows for a response message, 204 deletes but has no message
        return res.status(202).send(`Successfully deleted PortfolioItem ${deletedPortfolioItem.title}`)
    })
})

// EDIT A CATEGORY
portfolioItemRouter.put('/:_id', (req, res) => {
    PortfolioItem.findOneAndUpdate(
        { _id: req.params._id },
        req.body,
        { new: true },
        (err, updatedPortfolioItem) => {
            if (err) {
                res.status(500)
                return res.send(err)
            }
            return res.status(201).send(updatedPortfolioItem)
        })
})

module.exports = portfolioItemRouter