const prisma = require("../../utils/database");

const getAllRecipes = async (req, res) => {
    try {
        const data = await prisma.recipe.findMany({
            include: { ingredients: { include: { ingredient: true }} }
        });
        const cleanData = data.map(recipe => {
            const updatedIngredients = recipe.ingredients.map(ingredientJoin => ingredientJoin.ingredient)
            return{...recipe,
                   ingredients: updatedIngredients}
        })

        console.log({ cleanData})
        
        console.log(data[0])

        res.json({ recipes: cleanData });
    } catch (error) {
      console.error({ error });

      res.status(500).json({ error: error.message });
    }
};



module.exports = {
    getAllRecipes
}