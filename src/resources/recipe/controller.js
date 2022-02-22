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

        console.log({ cleanData })
        
        console.log(data[0])

        res.json({ recipes: cleanData });
    } catch (error) {
      console.error({ error });

      res.status(500).json({ error: error.message });
    }
};

const getOneRecipeById = async(req, res) => {
    const recipeId = parseInt(req.params.id)
    try {
        const selectedRecipe = await prisma.recipe.findUnique({
            where: {
                id: recipeId
              }
        })
        res.json(selectedRecipe)
    } catch (error) {
        console.error("[ERROR] getOneRecipeById: ", { error });
        res.json({ error });
    }
}

module.exports = {
    getAllRecipes, getOneRecipeById
}