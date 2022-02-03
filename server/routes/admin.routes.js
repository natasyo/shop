const { Router } = require("express");
const { check, validationResult } = require("express-validator");
const Category = require("../models/Category");

const router = new Router();
router.post(
  "/admin/add-category",
  [check("name", "Некорректное название").not().isEmpty()],
  async (req, resp) => {
    try {
      const parent = await Category.findById(req.body.parent).exec();
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return resp.status(400).json({ message: "Некорректные данные" });
      }
      const category = new Category({ name: req.body.name });
      if (parent) {
        category.parentCategories.push(parent);
      }
      let newCategory = await category.save();
      console.log("New----------", newCategory);
      if (parent) {
        parent.childrenCategories.push(newCategory);
        await parent.save();
      }
      return resp.status(200).json({ message: "Успех" });
    } catch (e) {
      console.log(e);
    }
  }
);

router.post("/admin/get-categories", async (req, resp) => {
  const categories = await Category.where("parentCategories").size(0).exec();
  return resp.json({ categories });
});
module.exports = router;
