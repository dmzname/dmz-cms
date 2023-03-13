const Category = require("../../models/categoriesModel");
const slugify = require("slugify");

exports.createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const cat = await new Category({
      name,
      slug: slugify(name, {
        lower: true,
        remove: /[*+~.()'"!:@]/g,
      }),
    }).save();
    res.status(201).json(cat);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};
